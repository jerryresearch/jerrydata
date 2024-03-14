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

export async function GET(req: Request, { params: { userId, chatId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!chatId || !mongoose.isValidObjectId(chatId)) {
      return NextResponse.json({ message: "Invalid chat" }, { status: 404 });
    }
    const chat = await Chat.findOne({
      _id: chatId,
      createdBy: userId,
    });

    // Retrieve the Messages
    const messages = await Message.find({ chat: chatId });
    // const messages = await openai.beta.threads.messages.list(chat.thread.id);

    return NextResponse.json({ chat, messages }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

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

    const { message, mode } = await req.json();

    const chat = await Chat.findOne({ _id: chatId, createdBy: userId });
    const dataset = await Dataset.findById(chat.dataset);

    const assistantId =
      mode === "Exploratory"
        ? chat.exploratoryAssistant.id
        : chat.dissectAssistant.id;
    const threadId =
      mode === "Exploratory"
        ? chat.exploratoryThread.id
        : chat.dissectThread.id;

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    await Message.create({
      role: "user",
      type: "text",
      content: message,
      chat: chat._id,
      mode,
    });

    // Run the Assistant
    let myRun = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      // instructions: "In the result, if possible, give a javascript object",
    });

    let runStatus = myRun.status;
    console.log("fetch resp");
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(1000); // 1 seconds delay
      myRun = await openai.beta.threads.runs.retrieve(threadId, myRun.id);
      runStatus = myRun.status;
    }

    // if (!(runStatus === "completed")) {
    //   return NextResponse.json(
    //     { message: "Something went wrong, try again" },
    //     { status: 500 }
    //   );
    // }
    console.log("runStatus", runStatus);

    // Retrieve the Messages added by the Assistant to the Thread
    const messages = await openai.beta.threads.messages.list(threadId);
    const responseMessage =
      messages.data[0].content[0]?.type === "text"
        ? messages.data[0].content[0].text.value
        : "No text content found";

    let newMessage;
    const resArray = responseMessage.split("```");
    if (resArray.length >= 3) {
      let obj = resArray[1].replace("json", "");
      let { how, why, what, suggestion } = JSON.parse(obj);

      // const getObjectParams = {
      //   Bucket: process.env.AWS_FILES_BUCKET_NAME,
      //   Key: datasetObj.key,
      // };

      // const command = new GetObjectCommand(getObjectParams);
      // const resp = await s3.send(command);
      // const fileData: any = resp.Body;

      // let xData: any[] = [];
      // let yData: any[] = [];

      // await new Promise((resolve, reject) => {
      //   fileData
      //     .pipe(csv())
      //     .on("data", (row: any) => {
      //       xData.push(row[xAxis]);
      //       yData.push(row[yAxis]);
      //     })
      //     .on("end", () => {
      //       resolve("done");
      //     })
      //     .on("error", (error: Error) => {
      //       reject(error);
      //     });
      // });

      // const aggregatedData = xData.reduce((acc, curr, index) => {
      //   if (acc[curr]) {
      //     acc[curr] += parseInt(yData[index]);
      //   } else {
      //     acc[curr] = parseInt(yData[index]);
      //   }
      //   return acc;
      // }, {});

      // Extract aggregated xData and yData
      // xData = Object.keys(aggregatedData);
      // yData = Object.values(aggregatedData);

      newMessage = await Message.create({
        role: "assistant",
        type: "text",
        content: obj,
        how,
        why,
        what,
        suggestion,
        mode,
        chat: chat._id,
      });
      console.log("created exploratory");
    } else {
      console.log("message done");
      newMessage = await Message.create({
        role: "assistant",
        type: "text",
        content: responseMessage,
        chat: chat._id,
      });
    }

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function PUT(req: Request, { params: { userId, chatId } }: Props) {
  try {
    await connectToDB();
    if (!userId || !mongoose.isValidObjectId(userId)) {
      return NextResponse.json({ message: "Invalid session" }, { status: 403 });
    }
    if (!chatId || !mongoose.isValidObjectId(chatId)) {
      return NextResponse.json({ message: "Invalid chat" }, { status: 404 });
    }

    const chat = await Chat.findOne({ _id: chatId, createdBy: userId });
    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { message: "Nothing to update" },
        { status: 400 }
      );
    }

    const updatedChat = await Chat.findByIdAndUpdate(chatId, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      { updatedChat, message: "chat updated" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function DELETE(
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

    const chat = await Chat.findOne({ _id: chatId, createdBy: userId });
    // const assistantId = chat.assistant.id;

    // const threadDeleted = await openai.beta.threads.del(chat.thread.id);
    // if (!threadDeleted.deleted) {
    //   return NextResponse.json(
    //     { message: "Thread cannot be deleted, try again" },
    //     { status: 500 }
    //   );
    // }

    await openai.beta.threads.del(chat.exploratoryThread.id);
    await openai.beta.threads.del(chat.dissectThread.id);

    await openai.beta.assistants.del(chat.exploratoryAssistant.id);
    await openai.beta.assistants.del(chat.dissectAssistant.id);

    // const assistantDeleted = await openai.beta.assistants.del(assistantId);
    // if (!assistantDeleted.deleted) {
    //   return NextResponse.json(
    //     { message: "Assistant cannot be deleted, try again" },
    //     { status: 500 }
    //   );
    // }

    const deletedChat = await Chat.findByIdAndDelete(chatId);
    return NextResponse.json(
      { deletedChat, message: "chat deleted" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
