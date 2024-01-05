import Chat from "@/models/Chat";
import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

type Props = {
  params: {
    userId: string;
    chatId: string;
  };
};

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

    // Retrieve the Messages added by the Assistant to the Thread
    const messages = await openai.beta.threads.messages.list(chat.thread.id);

    return NextResponse.json({ chat, messages }, { status: 200 });
    // return NextResponse.json({ chat }, { status: 200 });
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
    const assistantId = chat.assistant.id;

    await openai.beta.threads.messages.create(chat.thread.id, {
      role: "user",
      content: message,
    });

    // Run the Assistant
    let myRun = await openai.beta.threads.runs.create(chat.thread.id, {
      assistant_id: assistantId,
      instructions:
        "give a javascript object in the result, the object should contain 4 fields xAxis, yAxis, xData and yData. xAxis and yAxis are column names for x axis and y axis of the chart and xData and yData are arrays which contain values of these columns.",
    });

    let runStatus = myRun.status;
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(15000); // 15 seconds delay
      myRun = await openai.beta.threads.runs.retrieve(chat.thread.id, myRun.id);
      runStatus = myRun.status;

      if (runStatus === "completed") {
        break;
      }
    }

    // Retrieve the Messages added by the Assistant to the Thread
    const messages = await openai.beta.threads.messages.list(chat.thread.id);
    const responseMessage = Array.isArray(messages.data[0].content)
      ? messages.data[0].content[0]
      : // ?.type === "text"
        //   ? messages.data[0].content[0].text.value
        "No text content found";

    console.log(responseMessage);
    myRun = await openai.beta.threads.runs.retrieve(chat.thread.id, myRun.id);
    runStatus = myRun.status;
    console.log(runStatus);

    return NextResponse.json(
      { chat, messages, message: "chat created" },
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
      { deletedChat, message: "chat created" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
