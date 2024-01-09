import Chat from "@/models/Chat";
import mongoose from "mongoose";
import { connectToDB } from "@/utils/mongoose";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import Message from "@/models/Message";

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
    const assistantId = chat.assistant.id;

    await openai.beta.threads.messages.create(chat.thread.id, {
      role: "user",
      content:
        message +
        " If possible, give a javascript object for that information that has 4 fields. xAxis, yAxis, xData and yData",
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
      instructions: "In the result, if possible, give a javascript object",
    });

    let runStatus = myRun.status;
    while (runStatus === "queued" || runStatus === "in_progress") {
      await delay(15000); // 15 seconds delay
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
    const responseMessage =
      Array.isArray(messages.data[0].content) &&
      messages.data[0].content[0]?.type === "text"
        ? messages.data[0].content[0].text.value
        : "No text content found";

    const resArray = responseMessage.split("```");
    if (resArray.length >= 2) {
      let obj = resArray[1].replace("javascript", "");
      obj = obj.replace(/([{,]?\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:/g, '$1"$2":');
      obj = obj.replaceAll("'", '"');
      const { xAxis, yAxis, xData, yData } = JSON.parse(obj);
      await Message.create({
        role: "assistant",
        type: "chart",
        chartType: "bar",
        xAxis,
        yAxis,
        xData,
        yData,
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

    const messagesList = await Message.find({ chat: chatId });

    return NextResponse.json(
      { chat, messages: messagesList, message: "chat created" },
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
