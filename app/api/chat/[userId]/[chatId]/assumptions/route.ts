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

    const { messageId } = await req.json();
    const chat = await Chat.findOne({ _id: chatId, createdBy: userId });
    const assistantId = chat.exploratoryAssistant.id;
    const threadId = chat.exploratoryThread.id;

    const messageExists = await Message.findById(messageId);
    if (!messageExists) {
      return NextResponse.json(
        { message: "Message does not exists" },
        { status: 404 }
      );
    }

    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: "Give assumptions for the response.",
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
        : "Couldn't generate response";

    const message = await Message.findByIdAndUpdate(
      messageId,
      { assumptions: responseMessage },
      { new: true, runValidators: true }
    );
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
