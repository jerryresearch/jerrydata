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
    <section className="h-screen">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">ChatIQ</h1>
      </div>
      <section className="flex h-[calc(100vh-49px)] items-start py-5 px-7 gap-5 flex-shrink-0">
        <ChatsList chats={chats} />
        <Chat datasets={datasets} />
      </section>
    </section>
  );
};

export default Page;
