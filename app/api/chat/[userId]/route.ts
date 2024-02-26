import Chat from "@/models/Chat";
import Dataset from "@/models/Dataset";
import User from "@/models/User";
import { connectToDB } from "@/utils/mongoose";
import mongoose from "mongoose";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import csv from "csv-parser";
import { OpenAI } from "openai";
import Message from "@/models/Message";

type Props = {
  params: {
    userId: string;
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

export async function GET(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    const chats = await Chat.find({ createdBy: userId }).sort("-createdAt");
    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request, { params: { userId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    const { title, dataset, message } = await req.json();
    if (!title || !dataset || !message) {
      return NextResponse.json(
        { message: "Fill all details" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }

    const datasetObj = await Dataset.findById(dataset);
    if (!datasetObj) {
      return NextResponse.json({ message: "Invalid dataset" }, { status: 404 });
    }

    const assistant = await openai.beta.assistants.create({
      instructions: `
      Interpret User Queries: When you receive a user query regarding data analysis and visualization, analyze the query to understand the key components necessary for creating a chart. Focus on identifying the metrics or dimensions mentioned in the query.

      Determine Chart Parameters:
      Chart Type: Based on the query, determine the most appropriate type of chart from "bar", "doughnut", "pie", "line", "polar area", "horizontal bar". Consider the nature of the data and the user's intent in your decision.
      X and Y Axes: Identify which data columns should be mapped to the x-axis and y-axis. These should be directly derived from the key components of the user's query and both of them should be exactly a column name from the dataset.
      Chart Title: Generate a concise and informative title for the chart that reflects the user's intent and the data being visualized.
      Generate Standardized JSON Output: Your response should be a JSON object containing the details necessary for creating the chart. The format of your response should be as follows:
      {
        "chartType": "<Identified Chart Type>",
        "xAxis": "<Column for X-axis>",
        "yAxis": "<Column for Y-axis>",
        "title": "<Generated Chart Title>"
      }
      
      Clarity and Precision: Ensure that your responses are clear and directly address the user's query. The output should be unambiguous and precisely formatted as per the JSON structure outlined.

      User-Centric Approach: Always prioritize the user's analytical needs and the context of their query when generating the output. Your response should facilitate an intuitive and insightful visualization of the data as per the user's request.

      `,
      name: "Analytics Assistant",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-3.5-turbo-1106",
      file_ids: [datasetObj.openAPIFile.id],
    });

    const assistantId = assistant.id;

    const thread = await openai.beta.threads.create({});

    // Step 1: Add Messages to the Thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content:
        message +
        " If possible, generate the JSON object that includes the fields chartType, xAxis, yAxis, title.",
    });

    const chat = await Chat.create({
      title,
      assistant,
      dataset,
      thread,
      createdBy: userId,
    });

    await Message.create({
      role: "user",
      type: "text",
      content: message,
      chat: chat._id,
    });

    // Step 2: Run the Assistant
    let myRun = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      // instructions: "In the result, if possible, give a javascript object",
    });

    let runStatus = myRun.status;
    console.log("fetch resp");
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(1000); // 1 second delay
      myRun = await openai.beta.threads.runs.retrieve(thread.id, myRun.id);
      runStatus = myRun.status;
    }

    // if (!(runStatus === "completed")) {
    //   return NextResponse.json(
    //     { message: "Something went wrong, try again" },
    //     { status: 500 }
    //   );
    // }
    console.log("runStatus", runStatus);

    // Step 4: Retrieve the Messages added by the Assistant to the Thread
    const messages = await openai.beta.threads.messages.list(thread.id);

    const responseMessage =
      Array.isArray(messages.data[0].content) &&
      messages.data[0].content[0]?.type === "text"
        ? messages.data[0].content[0].text.value
        : "No text content found";

    // console.log(responseMessage);
    const resArray = responseMessage.split("```");
    if (resArray.length >= 3) {
      let obj = resArray[1].replace("json", "");
      let { chartType, xAxis, yAxis, title } = JSON.parse(obj);

      const getObjectParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_FILES_BUCKET_NAME,
        Key: datasetObj.key,
      };

      const command = new GetObjectCommand(getObjectParams);
      const resp = await s3.send(command);
      const fileData: any = resp.Body;

      let xData: any[] = [];
      let yData: any[] = [];

      await new Promise((resolve, reject) => {
        fileData
          .pipe(csv())
          .on("data", (row: any) => {
            xData.push(row[xAxis]);
            yData.push(row[yAxis]);
          })
          .on("end", () => {
            resolve("done");
          })
          .on("error", (error: Error) => {
            reject(error);
          });
      });

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

      await Message.create({
        role: "assistant",
        type: "chart",
        title,
        content: resArray[0],
        chartType,
        xAxis,
        yAxis,
        xData,
        yData,
        chat: chat._id,
      });
      console.log("chart done");
    } else {
      console.log("message done");
      await Message.create({
        role: "assistant",
        type: "text",
        content: responseMessage,
        chat: chat._id,
      });
    }

    const messagesList = await Message.find({ chat: chat._id });

    return NextResponse.json(
      {
        chat,
        messages: messagesList,
        asstMessages: messages,
        message: "chat created",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
