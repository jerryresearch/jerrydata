import Chat from "@/components/chat/Chat";
import ChatsList from "@/components/chat/ChatsList";
import getChats from "@/lib/chats/getChats";
import getDatasets from "@/lib/getDatasets";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;

  const chats: Chat[] = await getChats(userId);
  const datasets: Dataset[] = await getDatasets(userId);

  return (
    <section className="flex w-full h-[calc(100vh-56px)]">
      <ChatsList chats={chats} />
      <Chat datasets={datasets} />
    </section>
  );
};

export default Page;
