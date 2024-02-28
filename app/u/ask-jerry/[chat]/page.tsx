import Chat from "@/components/chat/Chat";
import ChatsList from "@/components/chat/ChatsList";
import getChat from "@/lib/chats/getChat";
import getChats from "@/lib/chats/getChats";
import getDatasets from "@/lib/getDatasets";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const chatId = searchParams?.id || "";

  const datasets: Dataset[] = await getDatasets(userId);
  const { chat, messages } = await getChat(userId, chatId);

  return (
    <Chat datasets={datasets} chat={chat} messages={messages} userId={userId} />
  );
};

export default Page;
