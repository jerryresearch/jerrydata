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
    accessKeyId: process.env.AWS_ACCESS_KEY,
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

    const { message } = await req.json();

    const chat = await Chat.findOne({ _id: chatId, createdBy: userId });
    const dataset = await Dataset.findById(chat.dataset);
    const assistantId = chat.assistant.id;

    await openai.beta.threads.messages.create(chat.thread.id, {
      role: "user",
      content:
        message +
        " If possible, generate the JSON object that includes the fields chartType, xAxis, yAxis, title.",
    });

    await Message.create({
      role: "user",
      type: "text",
      content: message,
      chat: chat._id,
    });

    // Run the Assistant
    let myRun = await openai.beta.threads.runs.create(chat.thread.id, {
      assistant_id: assistantId,
      // instructions: "In the result, if possible, give a javascript object",
    });

    let runStatus = myRun.status;
    console.log("fetch resp");
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(1000); // 1 seconds delay
      myRun = await openai.beta.threads.runs.retrieve(chat.thread.id, myRun.id);
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
    const messages = await openai.beta.threads.messages.list(chat.thread.id);

    // let images = [];
    // let messageContent = "";

    // if (Array.isArray(messages.data[0].content)) {
    //   const content = messages.data[0].content;
    //   for (let i = 0; i < content.length; i++) {
    //     const item = content[i];
    //     if (item.type == "image_file") {
    //       const response = await openai.files.content(item.image_file.file_id);
    //       const image_data = await response.arrayBuffer();
    //       const image_data_buffer = Buffer.from(image_data).toString("base64");
    //       images.push(image_data_buffer);
    //     } else if (item.type == "text") {
    //       messageContent += `
    //       ${item.text.value}
    //       `;
    //     }
    //   }
    //   await Message.create({
    //     role: "assistant",
    //     content: messageContent,
    //     imageIds: images,
    //     chat: chat._id,
    //   });
    // } else {
    //   messageContent = "Something went wrong";
    //   await Message.create({
    //     role: "assistant",
    //     content: messageContent,
    //     chat: chat._id,
    //   });
    // }

    const responseMessage =
      Array.isArray(messages.data[0].content) &&
      messages.data[0].content[0]?.type === "text"
        ? messages.data[0].content[0].text.value
        : "No text content found";

    console.log(responseMessage);
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

    const messagesList = await Message.find({ chat: chatId });

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
    const assistantId = chat.assistant.id;

    const threadDeleted = await openai.beta.threads.del(chat.thread.id);
    if (!threadDeleted.deleted) {
      return NextResponse.json(
        { message: "Thread cannot be deleted, try again" },
        { status: 500 }
      );
    }

    const assistantDeleted = await openai.beta.assistants.del(assistantId);
    if (!assistantDeleted.deleted) {
      return NextResponse.json(
        { message: "Assistant cannot be deleted, try again" },
        { status: 500 }
      );
    }

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
