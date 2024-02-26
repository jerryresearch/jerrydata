import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import Dataset from "@/models/Dataset";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { OpenAI } from "openai";
import csv from "csv-parser";
import Report from "@/models/Report";
import Chart from "@/models/Chart";

type Props = {
  params: {
    userId: string;
    datasetId: string;
  };
};

// create a s3 client
// @ts-ignore
const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
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

    const headers = dataset.headers
      // @ts-ignore
      .filter((header) => !header.isDisabled)
      // @ts-ignore
      .map((header) => header.name);

    const assistant = await openai.beta.assistants.create({
      instructions: `
      Take a look at the uploaded dataset and give me 10 basic questions about the dataset from these columns: ${headers} to get insights.
      Questions should be in a way that the answers of the questions can be graphs.
      `,
      name: "Analytics Assistant",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-3.5-turbo-1106",
      file_ids: [dataset.openAPIFile.id],
    });

    const assistantId = assistant.id;
    const thread = await openai.beta.threads.create({});

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: `Analyse Dataset Structure:
        Identify key columns and their data types (numerical, categorical, text, etc.).
        Understand the overall structure of the dataset (e.g., time series, cross-sectional, multivariate).

        Formulate Questions Based on Data Characteristics:
        Trend Questions: For time-series data (e.g., "What are the trends over time for key metrics?").
        Comparison Questions: For categorical data (e.g., "How do different categories compare in terms of key metrics?").
        Correlation Questions: For numerical data (e.g., "Which variables are strongly correlated?").
        Outlier Detection Questions: (e.g., "Are there any significant outliers in important variables?").
        Predictive Potential Questions: If suitable for predictive analysis (e.g., "What outcomes can potentially be predicted using this dataset?").
        Segmentation Questions: For demographic or segmentation data (e.g., "How do different segments behave in terms of a key variable?").
        Performance Analysis Questions: For datasets with performance metrics (e.g., "Which are the top-performing entities in the dataset?").
        Resource Utilization Questions: For datasets involving resources (e.g., "How are the resources being utilized in different areas?").
        Custom Industry-Specific Questions: Tailor questions based on the industry or field of the dataset.

        Convert Questions to JSON Format:
        Format each question as a JSON object with relevant keys (e.g., {"question": "What are the trends over time for key metrics?", "type": "trend_analysis"}).
        Compile all questions into a JSON array.

        Output Format
        JSON Output:
        Ensure the final output is a well-structured JSON array containing all the generated questions.
        Example JSON Output:
        [
          {"question": "What are the trends over time for key metrics?", "type": "trend_analysis"},
          {"question": "How do different categories compare in terms of key metrics?", "type": "comparison_analysis"},
          ...
        ]`,
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

    let responseMessage;
    for (let i = 0; i < messages.data.length; i++) {
      const message = messages.data[i];
      if (
        message.content[0].type == "text" &&
        message.content[0].text.value.includes("```json")
      ) {
        responseMessage = message.content[0].text.value;
        responseMessage = responseMessage.split("```")[1].replace("json", "");
        dataset.questions = JSON.parse(responseMessage);
        await dataset.save();
        console.log(dataset.questions);
      }
    }

    return NextResponse.json(
      { responseMessage, message: messages.data },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(
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

    const assistant = await openai.beta.assistants.create({
      instructions: `
        Act as an advanced expert analytics assistant capable of interpreting user queries about data visualization and providing standardized JSON outputs for chart generation, specifically using actual column names from the uploaded dataset.

        Input Sample:
        Example JSON:
                [
                  {"question": "What are the trends over time for key metrics?", "type": "trend_analysis"},
                  {"question": "How do different categories compare in terms of key metrics?", "type": "comparison_analysis"},
                  ...
                ]

        Instructions:

        Interpret User Queries:
        Analyze each user query to understand the key components necessary for creating a chart.
        Focus on identifying specific metrics or dimensions mentioned in the query that directly correspond to column headers in the dataset.

        Determine Chart Parameters:
        Chart Type: Determine the most appropriate type of chart (Charts Available:"bar", "doughnut", "pie", "line", "polar area", "horizontal bar") based on the nature of the data and the user's intent.
        X and Y Axes:
        Identify and provide the exact column name from the dataset for the x-axis and y-axis.
        Ensure that each axis is represented by a single, specific column header, not an array or a combination of headers.
        The column names should exactly match those in the dataset, without alteration or generalization.
        Chart Title: Generate a concise and informative title for the chart that accurately reflects the user's intent and the data being visualized.

        Generate Standardized JSON Output:
        Your response should be a JSON object containing the details necessary for creating the chart, precisely formatted as follows:
        {
          "chartType": "<Identified Chart Type>",
          "xAxis": "<Exact Column Name for X-axis>",
          "yAxis": "<Exact Column Name for Y-axis>",
          "title": "<Generated Chart Title>"
        }

        Exclude Additional Insights:
        Refrain from providing additional insights or analysis recommendations in your output. Focus solely on the specifics needed for chart details generation.

        Clarity and Precision:
        Ensure that your responses are clear, unambiguous, and directly address the user's query.
        Adhere strictly to the JSON structure outlined, maintaining precision in the format and content of your output.
        User-Centric Approach:
        Always prioritize the user's analytical needs and the context of their query when generating the output.
        Your response should facilitate an intuitive and insightful visualization of the data as per the user's request.

        Additional Note on Column Names:
        Column Name Accuracy: It is critical that the column names provided in the output match exactly with those used in the user's dataset. This ensures that the user can directly use the output for data visualization without needing to interpret or modify the column references.
      `,
      name: "Analytics Assistant",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-4-turbo-preview",
      file_ids: [dataset.openAPIFile.id],
    });

    const assistantId = assistant.id;
    const thread = await openai.beta.threads.create({});

    const report = await Report.create({
      name: `${dataset.name} Report`,
      description: "Auto generated report",
      createdBy: userId,
    });

    const getObjectParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_FILES_BUCKET_NAME,
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

    let messageList = [];
    for (let i = 0; i < dataset.questions.length; i++) {
      await openai.beta.threads.messages.create(thread.id, {
        role: "user",
        content: `
        Question: ${dataset.questions[i].question}.
        Type: ${dataset.questions[i].type}
        
        For the question give JSON object with the fields chartType, xAxis, yAxis, title.
        `,
      });

      let myRun = await openai.beta.threads.runs.create(thread.id, {
        assistant_id: assistantId,
      });

      let runStatus = myRun.status;
      while (runStatus === "queued" || runStatus === "in_progress") {
        await delay(1000); // 1 second delay
        myRun = await openai.beta.threads.runs.retrieve(thread.id, myRun.id);
        runStatus = myRun.status;
      }

      console.log("runStatus", runStatus);
      const messages = await openai.beta.threads.messages.list(thread.id);
      const message = messages.data[0];

      // @ts-ignore
      messageList.push(message.content[0].text.value);

      let chart;
      if (
        message.content[0].type == "text" &&
        message.content[0].text.value.includes("```json")
      ) {
        chart = message.content[0].text.value;
        chart = chart.split("```")[1].replace("json", "");
        let { chartType, xAxis, yAxis, title } = JSON.parse(chart);

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

        await Chart.create({
          title,
          chartType,
          dataset: dataset._id,
          report: report._id,
          xAxis,
          yAxis,
          xData,
          yData,
          createdBy: userId,
        });
      }
    }

    console.log("done");
    const messages = await openai.beta.threads.messages.list(thread.id);
    return NextResponse.json(
      { message: messages, messageList },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
