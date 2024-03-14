export const maxDuration = 300;

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
    const assistantId = chat.exploratoryAssistant.id;
    const threadId = chat.exploratoryThread.id;

    await Message.create({
      role: "user",
      type: "text",
      content: message,
      chat: chat._id,
      mode: "Dissect",
    });

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message + " .Give an SQL query for this question.",
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
    myRun = await openai.beta.threads.runs.retrieve(threadId, myRun.id);
    console.log(myRun.last_error);
    console.log("runStatus", runStatus);

    // Retrieve the Messages added by the Assistant to the Thread
    const messages = await openai.beta.threads.messages.list(threadId);
    const responseMessage =
      messages.data[0].content[0]?.type === "text"
        ? messages.data[0].content[0].text.value
        : "Couldn't generate response";

    const resArray = responseMessage.split("```");
    let query = "";
    if (resArray.length >= 3) {
      query = resArray[1].replace("sql", "").trim();
    }
    const asstMessage = await Message.create({
      role: "assistant",
      type: "text",
      content: message,
      query,
      mode: "Dissect",
      chat: chat._id,
    });
    return NextResponse.json({ message: asstMessage }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
