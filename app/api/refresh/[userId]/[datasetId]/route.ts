import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Story from "@/models/Story";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { Client } from "pg";
import { OpenAI } from "openai";
import mysql from "mysql2/promise";
import fs from "fs";
import csv from "csv-parser";
import Dataset from "@/models/Dataset";
import { decrypt } from "@/utils/encryption";

type Props = {
  params: {
    userId: string;
    datasetId: string;
  };
};

// create a s3 client
// @ts-ignore
const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(
  req: Request,
  { params: { userId, datasetId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!datasetId || !mongoose.isValidObjectId(datasetId)) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    const dataset = await Dataset.findOne({ _id: datasetId, addedBy: userId });
    if (!dataset) {
      return NextResponse.json(
        { message: "Dataset not found" },
        { status: 404 }
      );
    }

    const headers = dataset.headers.map((header: any) => header.name);

    if (dataset.datatype.includes("SQL")) {
      console.log("sql start");
      let { host, port, database, user, password, connString, table } =
        dataset.sql;
      password = decrypt(
        password,
        process.env.SQL_KEY as string,
        process.env.SQL_IV as string
      );

      let csvStream = headers.join(",") + "\n";
      let rowCount;
      if (dataset.datatype == "MySQL") {
        let client;
        if (connString) {
          client = await mysql.createConnection(connString);
        } else {
          client = await mysql.createConnection({
            host,
            port,
            database,
            user,
            password,
          });
        }
        const [rows, dummy] = await client.execute(
          `SELECT COUNT(*) AS row_count FROM ${table}`
        );
        // @ts-ignore
        rowCount = rows[0].row_count;

        const [actualRows] = await client.execute(`SELECT * FROM ${table}`);
        csvStream += actualRows
          // @ts-ignore
          .map((row) => Object.values(row).join(","))
          .join("\n");
      } else if (dataset.datatype == "PostgreSQL") {
        let client;
        if (connString) {
          client = new Client({
            connectionString: connString,
          });
        } else {
          client = new Client({
            host,
            port,
            database,
            user,
            password,
          });
        }

        await client.connect();

        const rows = await client.query(
          `SELECT COUNT(*) AS row_count FROM ${table};`
        );
        rowCount = rows.rows[0].row_count;

        const rw = await client.query(`SELECT * FROM ${table}`);
        csvStream += rw.rows
          .map((row) => Object.values(row).join(","))
          .join("\n");
      }

      fs.writeFileSync(`${table}.csv`, csvStream, "utf8");
      const buffer = Buffer.from(csvStream);

      const params = {
        Bucket: process.env.AWS_FILES_BUCKET_NAME,
        Key: dataset.key,
        Body: buffer,
      };

      const openAPIFile = await openai.files.create({
        file: fs.createReadStream(`${table}.csv`),
        purpose: "assistants",
      });

      dataset.rows = rowCount;
      dataset.openAPIFile = openAPIFile;
      await dataset.save();

      // upload to s3
      const command = new PutObjectCommand(params);
      await s3.send(command);

      if (dataset.assistantId) {
        const jsonResp =
          "```json \n " +
          `{
          "insight": "Online sales have grown by 30% year-over-year, outpacing in-store sales growth.",
          "impact": "positive"
        }` +
          "\n```";

        const assistant = await openai.beta.assistants.update(
          dataset.assistantId,
          {
            instructions: `
        You are an advanced autonomous business intelligence assistant tasked with generating actionable insights from uploaded datasets. Your role is to automatically identify meaningful queries within the dataset, produce unique insights, and assess the impact on business. Follow the guidelines below to ensure your outputs are insightful, precise, and cater to the user's analytical needs without direct queries from them.

        Generate JSON Output:
        Your task is to construct an insight in a JSON format. Below is an example of how your output should be structured:
        ${jsonResp}
      `,
            name: "AutoInsight Analyst",
            tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
            model: "gpt-3.5-turbo-1106",
            file_ids: [dataset.openAPIFile.id],
          }
        );
      }

      fs.unlink(`${table}.csv`, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return;
        }
      });

      console.log("sql done");
    }

    if (!dataset.stories) {
      return NextResponse.json(
        { message: "Refresh complete" },
        { status: 200 }
      );
    }

    console.log("stories start");

    const getObjectParams = {
      Bucket: process.env.AWS_FILES_BUCKET_NAME,
      Key: dataset.key,
    };

    const command = new GetObjectCommand(getObjectParams);
    const resp = await s3.send(command);
    const fileData: any = resp.Body;

    // @ts-ignore
    let records: any[] = [];

    const chartTypes = [
      "bar",
      "doughnut",
      "pie",
      "line",
      "polar area",
      "horizontal bar",
    ];

    await new Promise((resolve, reject) => {
      fileData
        .pipe(csv())
        .on("data", (row: any) => {
          records.push(row);
        })
        .on("end", () => {
          resolve("done");
        })
        .on("error", (error: Error) => {
          reject(error);
        });
    });

    const insights: any = [];
    const charts: any = [];
    let messages;
    let flag = true;

    const jsonResp =
      "```json \n " +
      `{
          "insight": "Online sales have grown by 30% year-over-year, outpacing in-store sales growth.",
          "impact": "positive"
        }` +
      "\n```";

    if (!dataset.assistantId) {
      const assistant = await openai.beta.assistants.create({
        instructions: `
        You are an advanced autonomous business intelligence assistant tasked with generating actionable insights from uploaded datasets. Your role is to automatically identify meaningful queries within the dataset, produce unique insights, and assess the impact on business. Follow the guidelines below to ensure your outputs are insightful, precise, and cater to the user's analytical needs without direct queries from them.

        Generate JSON Output:
        Your task is to construct an insight in a JSON format. Below is an example of how your output should be structured:
        ${jsonResp}
      `,
        name: "AutoInsight Analyst",
        tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
        model: "gpt-3.5-turbo-1106",
        file_ids: [dataset.openAPIFile.id],
      });

      const assistantId = assistant.id;
      const thread = await openai.beta.threads.create({});

      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: `
        Generate JSON Output:
        Your task is to construct an insight from the dataset uploaded in a JSON format. Below is an example of how your output should be structured:
        ${jsonResp}
      `,
      });

      let myRun = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
      });

      let runStatus = myRun.status;
      console.log("fetch resp");
      while (runStatus === "queued" || runStatus === "in_progress") {
        await delay(1000); // 1 second delay
        myRun = await openai.beta.threads.runs.retrieve(thread.id, myRun.id);
        runStatus = myRun.status;
      }

      console.log("runStatus", runStatus);
      messages = await openai.beta.threads.messages.list(thread.id);

      const message = messages.data[0];

      if (
        message.content[0].type == "text" &&
        message.content[0].text.value.includes("```json")
      ) {
        dataset.assistantId = assistantId;
        dataset.threadId = thread.id;
        await dataset.save();

        let res = message.content[0].text.value;
        res = res.split("```")[1].replace("json", "");
        const insight = JSON.parse(res);
        insights.push(insight);
      } else {
        flag = false;
      }
    }

    if (!flag) {
      return NextResponse.json(
        { message: "couldn't create stories" },
        { status: 200 }
      );
    }

    for (let i = 0; i < 5; i++) {
      await openai.beta.threads.messages.create(dataset.threadId, {
        role: "user",
        content: `Can you give one more insight in the same format?
            ${jsonResp}
          `,
      });

      let myRun = await openai.beta.threads.runs.create(dataset.threadId, {
        assistant_id: dataset.assistantId,
      });

      let runStatus = myRun.status;
      console.log("fetch resp in loop");
      while (runStatus === "queued" || runStatus === "in_progress") {
        await delay(1000); // 1 second delay
        myRun = await openai.beta.threads.runs.retrieve(
          dataset.threadId,
          myRun.id
        );
        runStatus = myRun.status;
      }

      console.log("runStatus", runStatus);
      const messages = await openai.beta.threads.messages.list(
        dataset.threadId
      );

      const message = messages.data[0];
      if (
        message.content[0].type == "text" &&
        message.content[0].text.value.includes("```json")
      ) {
        let res = message.content[0].text.value;
        res = res.split("```")[1].replace("json", "");
        const insight = JSON.parse(res);
        insights.push(insight);
      }
    }

    const chartResp =
      "```json \n " +
      `{
          "chartType": "<Identified Chart Type>",
          "xAxis": "<Exact Column Name for X-axis>",
          "yAxis": "<Exact Column Name for Y-axis>",
          "title": "<Generated Chart Title>"
        }` +
      "\n```";

    for (let i = 0; i < insights.length; i++) {
      const { insight, impact } = insights[i];
      await openai.beta.threads.messages.create(dataset.threadId, {
        role: "user",
        content: `
          Insight: ${insight}

          The above insight is about the dataset, for this insight give a JSON object as response in the following format
          ${chartResp}

          About the fields in object:
          chartType: Determine the most appropriate type of chart (Charts Available:"bar", "doughnut", "pie", "line", "polar area", "horizontal bar").
          xAxis and yAxis: Identify and provide the exact column name from the dataset for the xAxis and yAxis. Ensure that each axis is represented by a single, specific column header, not an array or a combination of headers.The column names should exactly match those in the dataset, without alteration or generalization.
        `,
      });

      let myRun = await openai.beta.threads.runs.create(dataset.threadId, {
        assistant_id: dataset.assistantId,
      });

      let runStatus = myRun.status;
      console.log("fetch resp in chart loop");
      while (runStatus === "queued" || runStatus === "in_progress") {
        await delay(1000); // 1 second delay
        myRun = await openai.beta.threads.runs.retrieve(
          dataset.threadId,
          myRun.id
        );
        runStatus = myRun.status;
      }

      console.log("runStatus", runStatus);
      const messages = await openai.beta.threads.messages.list(
        dataset.threadId
      );
      const message = messages.data[0];

      let chart;
      if (
        message.content[0].type == "text" &&
        message.content[0].text.value.includes("```json")
      ) {
        chart = message.content[0].text.value;
        chart = chart.split("```")[1].replace("json", "");
        chart = JSON.parse(chart);

        charts.push(chart);
        let { chartType, xAxis, yAxis, title } = chart;

        if (Array.isArray(xAxis)) {
          xAxis = xAxis[0];
        }
        if (Array.isArray(yAxis)) {
          yAxis = yAxis[0];
        }

        if (!headers.includes(xAxis) || !headers.includes(yAxis)) {
          console.log("Dataset does not contain the given columns");
          continue;
        }

        if (!chartTypes.includes(chartType)) {
          console.log("Dataset does not contain the given columns");
          continue;
        }

        let xData = records.map((record) => record[xAxis]);
        let yData = records.map((record) => record[yAxis]);

        const aggregatedData = xData.reduce((acc, curr, index) => {
          if (acc[curr]) {
            acc[curr] += parseInt(yData[index]);
          } else {
            acc[curr] = parseInt(yData[index]);
          }
          return acc;
        }, {});

        // Extract aggregated xData and yData
        xData = Object.keys(aggregatedData);
        yData = Object.values(aggregatedData);

        await Story.create({
          dataset: datasetId,
          insight,
          impact,
          createdBy: userId,
          chartType,
          title,
          xAxis,
          yAxis,
          xData,
          yData,
        });
        console.log("story created!!!");
      } else {
        charts.push(message.content[0]);
      }
    }

    console.log("done");
    return NextResponse.json({ message: "done" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
