export const maxDuration = 300;

import Chat from "@/models/Chat";
import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import Message from "@/models/Message";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import csv from "csv-parser";
import Dataset from "@/models/Dataset";

type Props = {
  params: {
    userId: string;
    chatId: string;
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

export async function POST(
  req: Request,
  { params: { userId, chatId } }: Props
) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!chatId || !mongoose.isValidObjectId(chatId)) {
      return NextResponse.json({ message: "Invalid chat" }, { status: 404 });
    }

    const { messageId } = await req.json();
    const chat = await Chat.findOne({ _id: chatId, createdBy: userId });
    const dataset = await Dataset.findById(chat.dataset);
    const assistantId = chat.exploratoryAssistant.id;
    const threadId = chat.exploratoryThread.id;

    const headers =
      "[ " +
      dataset.headers.map((header: any) => header.name).join(", ") +
      " ]";

    const messageExists = await Message.findById(messageId);
    if (!messageExists) {
      return NextResponse.json(
        { message: "Message does not exists" },
        { status: 404 }
      );
    }

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content:
        messageExists.content +
        ` Give a json object for this question with four fields 
        {
         "chartType": "<Identified Chart Type>",
         "xAxis": "<Column for X-axis>",
         "yAxis": "<Column for Y-axis>",
         "title": "<Generated Chart Title>"
       }
       Chart Type: Based on the query, determine the most appropriate type of chart from "bar", "doughnut", "pie", "line", "polar area", "horizontal bar". Consider the nature of the data and the user's intent in your decision.
        X and Y Axes: Identify which data columns should be mapped to the x-axis and y-axis. These should be directly derived from the key components of the user's query and both the xAxis and yAxis shoud be exactly a name from the ${headers}.
        Chart Title: Generate a concise and informative title for the chart that reflects the user's intent and the data being visualized.
       `,
    });

    // Run the Assistant
    let myRun = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    let runStatus = myRun.status;
    console.log("fetch resp");
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(1000); // 1 seconds delay
      myRun = await openai.beta.threads.runs.retrieve(threadId, myRun.id);
      runStatus = myRun.status;
    }
    console.log("runStatus", runStatus);

    // Retrieve the Messages added by the Assistant to the Thread
    const messages = await openai.beta.threads.messages.list(threadId);
    const responseMessage =
      messages.data[0].content[0]?.type === "text"
        ? messages.data[0].content[0].text.value
        : "No text";

    const resArray = responseMessage.split("```");
    if (resArray.length >= 3) {
      let obj = resArray[1].replace("json", "");
      let { chartType, xAxis, yAxis, title } = JSON.parse(obj);

      const getObjectParams = {
        Bucket: process.env.AWS_FILES_BUCKET_NAME,
        Key: dataset.key,
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
      const message = await Message.findByIdAndUpdate(
        messageId,
        {
          chartType,
          title,
          xAxis,
          yAxis,
          xData,
          yData,
        },
        { new: true, runValidators: true }
      );
      return NextResponse.json({ message }, { status: 201 });
    } else {
      console.log(responseMessage);
    }
    return NextResponse.json({ message: messageExists }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
