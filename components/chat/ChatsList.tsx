"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  chats: Chat[];
};

const ChatsList = ({ chats }: Props) => {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id") || "";

  return (
    <aside className="flex flex-col h-full w-[280px] items-center gap-4 border-r border-[#EEEEFF]">
      <div className="px-6 py-4 flex items-center w-full border-b border-[#EEEEFF]">
        <Link
          href={"/u/ask-jerry"}
          className="h-[41px] px-2 bg-primary w-full text-white rounded-[6px] flex items-center gap-[6px]"
        >
          <Image
            src="/assets/plus-icon.svg"
            alt="add new chat"
            width={20}
            height={20}
          />
          <span>New Chat</span>
        </Link>
      </div>
      <div className="px-6 w-full overflow-auto">
        <div className="flex flex-col gap-[6px] bg-white">
          {chats.map((chat, index) => (
            <Link
              href={`/u/ask-jerry/${chat.title}?id=${chat._id}`}
              key={index}
              className={`py-[6px] px-[10px] gap-2 h-[42] rounded-[6px] hover:bg-[#FAFAFA] ${
                chat._id == chatId ? "bg-[#FAFAFA]" : "bg-white"
              }`}
            >
              <span className="truncate text-[#080D19]">{chat.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatsList;
