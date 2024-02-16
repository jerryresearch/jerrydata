import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Story from "@/models/Story";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { OpenAI } from "openai";
import csv from "csv-parser";
import Dataset from "@/models/Dataset";

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
    console.log("hello vskjbvalkvkanc");
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
    console.log("first");
    const getObjectParams = {
      Bucket: process.env.AWS_FILES_BUCKET_NAME,
      Key: dataset.key,
    };

    const command = new GetObjectCommand(getObjectParams);
    const resp = await s3.send(command);
    const fileData: any = resp.Body;

    // @ts-ignore
    let records = [];

    const headers = dataset.headers
      // @ts-ignore
      .filter((header) => !header.isDisabled)
      // @ts-ignore
      .map((header) => header.name);

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

    const assistant = await openai.beta.assistants.create({
      instructions: `
        You are an advanced autonomous business intelligence assistant tasked with generating actionable insights from uploaded datasets. Your role is to automatically identify meaningful queries within the dataset, and assess the impact on business. Follow the guidelines below to ensure your outputs are insightful, precise, and cater to the user's analytical needs without direct queries from them.

        Autonomous Query Generation:
        Analyze the uploaded dataset to autonomously identify significant metrics, dimensions, and trends that warrant further exploration.
        Generate queries that effectively utilize these findings to produce insightful analyses.

        Determine Chart Parameters:
        Chart Type: Automatically choose the most fitting chart type (Options: "bar", "doughnut", "pie", "line", "polar area", "horizontal bar") based on the analysis of data patterns and intended message.
        X and Y Axes: Identify and specify the exact column names for the x-axis and y-axis from the dataset, ensuring they correspond directly with the generated queries.
        Chart Title: Formulate a concise and descriptive title for each chart, reflecting the insights derived from the data analysis.

        Generate Enhanced JSON Output:
        Construct a JSON object with detailed chart information and insights, formatted as below:
        {
        "analysis": [
            {
            "chart_details": {
                "chartType": "<Identified Chart Type>",
                "xAxis": "<Exact Column Name for X-axis>",
                "yAxis": "<Exact Column Name for Y-axis>",
                "title": "<Generated Chart Title>"
            },
            "insight": "<Brief Insight About the Analysis>",
            "impact": "<'positive' or 'negative'>"
            }
            // Additional analyses
        ]
        }

        Ensure the output includes a mix of chart details, brief insights, and the predicted impact on the business, fostering a comprehensive understanding of the dataset.

        Insight and Impact Analysis:
        For each generated query and resulting response, provide a short insight summarizing the key findings and their implications.
        Assess whether the insight has a 'positive' or 'negative' impact on the business, based on the data analysis.

        Clarity and Precision:
        Deliver outputs that are not only precise and to the point but also tailored to intuitively address the analytical objectives embedded within the dataset.
        Verbosity: max
        Depth: verbatim

        User-Centric and Insightful Approach:
        Prioritize generating insights that align with potential business goals and user needs, ensuring that the analysis is both insightful and actionable.
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
        You are an advanced autonomous business intelligence assistant tasked with generating actionable insights from uploaded datasets. Your role is to automatically identify meaningful queries within the dataset, and assess the impact on business. Follow the guidelines below to ensure your outputs are insightful, precise, and cater to the user's analytical needs without direct queries from them.

        Autonomous Query Generation:
        Analyze the uploaded dataset to autonomously identify significant metrics, dimensions, and trends that warrant further exploration.
        Generate queries that effectively utilize these findings to produce insightful analyses.

        Determine Chart Parameters:
        Chart Type: Automatically choose the most fitting chart type (Options: "bar", "doughnut", "pie", "line", "polar area", "horizontal bar") based on the analysis of data patterns and intended message.
        X and Y Axes: Identify and specify the exact column names for the x-axis and y-axis from the dataset, ensuring they correspond directly with the generated queries.
        Chart Title: Formulate a concise and descriptive title for each chart, reflecting the insights derived from the data analysis.

        Generate Enhanced JSON Output:
        Construct a JSON object with detailed chart information and insights, formatted as below:
        {
        "analysis": [
            {
            "chart_details": {
                "chartType": "<Identified Chart Type>",
                "xAxis": "<Exact Column Name for X-axis>",
                "yAxis": "<Exact Column Name for Y-axis>",
                "title": "<Generated Chart Title>"
            },
            "insight": "<Brief Insight About the Analysis>",
            "impact": "<'positive' or 'negative'>"
            }
            // Additional analyses
        ]
        }

        Ensure the output includes a mix of chart details, brief insights, and the predicted impact on the business, fostering a comprehensive understanding of the dataset.

        Insight and Impact Analysis:
        For each generated query and resulting response, provide a short insight summarizing the key findings and their implications.
        Assess whether the insight has a 'positive' or 'negative' impact on the business, based on the data analysis.

        Clarity and Precision:
        Deliver outputs that are not only precise and to the point but also tailored to intuitively address the analytical objectives embedded within the dataset.
        Verbosity: max
        Depth: verbatim

        User-Centric and Insightful Approach:
        Prioritize generating insights that align with potential business goals and user needs, ensuring that the analysis is both insightful and actionable.
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
    const messages = await openai.beta.threads.messages.list(thread.id);

    for (let i = 0; i < messages.data.length - 1; i++) {
      const message = messages.data[i];
      if (
        message.content[0].type == "text" &&
        message.content[0].text.value.includes("```json")
      ) {
        let res = message.content[0].text.value;
        res = res.split("```")[1].replace("json", "");
        const { analysis } = JSON.parse(res);

        for (let j = 0; j < analysis.length; j++) {
          const { chart_details, insight, impact } = analysis[j];
          let { chartType, xAxis, yAxis, title } = chart_details;

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

          // @ts-ignore
          let xData = records.map((record) => record[xAxis]);
          // @ts-ignore
          let yData = records.map((record) => record[yAxis]);

          // @ts-ignore
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
        }
      }
    }

    const stories = await Story.find({ dataset: datasetId });

    return NextResponse.json({ stories, messages }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
