import Chat from "@/models/Chat";
import Dataset from "@/models/Dataset";
import User from "@/models/User";
import { connectToDB } from "@/utils/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import Message from "@/models/Message";

type Props = {
  params: {
    userId: string;
  };
};

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
      instructions:
        "You are an analytics bot. Access the dataset provided (in CSV or Excel format) and utilize its information to respond accurately to user questions based on the dataset's analytics. If possible give the result that contains a javascript object with 4 fields. They are: xAxis, yAxis, xData and yData. xAxis and yAxis are column names for x axis and y axis of the chart and xData and yData are arrays which contain values of these columns",
      name: "Analytics Assistant",
      tools: [{ type: "code_interpreter" }, { type: "retrieval" }],
      model: "gpt-3.5-turbo-1106",
      file_ids: [datasetObj.openAPIFile.id],
    });

    const assistantId = assistant.id;

    const thread = await openai.beta.threads.create({});
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: "Hello",
    });
    let firstRun = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    let firstRunStatus = firstRun.status;
    while (firstRunStatus === "queued" || firstRunStatus === "in_progress") {
      await delay(15000); // 15 seconds delay
      firstRun = await openai.beta.threads.runs.retrieve(
        thread.id,
        firstRun.id
      );
      firstRunStatus = firstRun.status;
    }

    // Step 1: Add Messages to the Thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content:
        message +
        " If possible, give a javascript object for that information that has 4 fields. xAxis, yAxis, xData and yData",
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
      instructions: "In the result, if possible, give a javascript object",
    });

    let runStatus = myRun.status;
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(15000); // 15 seconds delay
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

    const resArray = responseMessage.split("```");
    if (resArray.length >= 3) {
      const obj = JSON.parse(resArray[1].replace("javascript", ""));
      await Message.create({
        role: "assistant",
        type: "chart",
        chartType: "bar",
        xAxis: obj.xAxis,
        yAxis: obj.yAxis,
        xData: obj.xData,
        yData: obj.yData,
        chat: chat._id,
      });
    } else {
      await Message.create({
        role: "assistant",
        type: "text",
        content: responseMessage,
        chat: chat._id,
      });
    }

    const messagesList = await Message.find({ chat: chat._id });

    return NextResponse.json(
      { chat, messages: messagesList, message: "chat created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
