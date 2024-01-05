import Chat from "@/models/Chat";
import Dataset from "@/models/Dataset";
import User from "@/models/User";
import { connectToDB } from "@/utils/mongoose";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import fs from "fs";

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
    const chats = await Chat.find({ createdBy: userId });
    // const response = await openai.files.content(
    //   "file-2Ho6l0ar8GDreEqp4DXgBspy"
    // );

    // // Extract the binary data from the Response object
    // const image_data = await response.arrayBuffer();

    // // Convert the binary data to a Buffer
    // const image_data_buffer = Buffer.from(image_data);

    // console.log("start image");
    // // Save the image to a specific location
    // fs.writeFileSync("./my-image.png", image_data_buffer);
    // console.log("done image");
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
        "You are an analytics bot. Access the dataset provided (in CSV or Excel format) and utilize its information to respond accurately to user questions based on the dataset's analytics. If the user asks general questions about the dataset then just answer those questions. But if the user asks questions which can be answered with charts then parse the dataset and give a javascript object in the result, the object should contain 4 fields xAxis, yAxis, xData and yData. xAxis and yAxis are column names for x axis and y axis of the chart and xData and yData are arrays which contain values of these columns.",
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
      content: message,
    });

    const chat = await Chat.create({
      title,
      assistant,
      dataset,
      thread,
      createdBy: userId,
    });

    // Step 2: Run the Assistant
    let myRun = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
      // instructions: "",
    });

    let runStatus = myRun.status;
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(15000); // 15 seconds delay
      myRun = await openai.beta.threads.runs.retrieve(thread.id, myRun.id);
      runStatus = myRun.status;

      if (runStatus === "completed") {
        break;
      }
    }

    // Step 4: Retrieve the Messages added by the Assistant to the Thread
    const messages = await openai.beta.threads.messages.list(thread.id);
    const responseMessage =
      Array.isArray(messages.data[0].content) &&
      messages.data[0].content[0]?.type === "text"
        ? messages.data[0].content[0].text.value
        : "No text content found";

    console.log(responseMessage);

    return NextResponse.json(
      { chat, messages, message: "chat created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
