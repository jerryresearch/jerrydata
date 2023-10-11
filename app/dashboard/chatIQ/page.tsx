import Chat from "@/components/chat/Chat";
import ChatsList from "@/components/chat/ChatsList";
import React from "react";

const page = () => {
  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">ChatIQ</h1>
      </div>
      <section className="flex h-[calc(100vh-49px)] items-start py-5 px-7 gap-5 flex-shrink-0">
        <ChatsList />
        <Chat />
      </section>
    </section>
  );
};

export default page;
