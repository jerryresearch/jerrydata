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

  const [filteredChats, setFilteredChats] = useState(chats);
  const handleSearch = (query: string) => {
    if (query == "") {
      setFilteredChats(chats);
    } else {
      setFilteredChats(
        chats.filter((chat) =>
          chat.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <aside className="flex max-h-full overflow-auto w-[252px] py-6 flex-col text-sm items-center gap-6 flex-shrink-0 self-stretch rounded border border-[#EAEDF2] bg-white">
      <div className="w-[226px] flex flex-col gap-[10px]">
        <Link
          href={"chatIQ"}
          className="h-10 px-2 bg-primary text-white rounded flex items-center gap-2"
        >
          <Image
            src="/assets/plus-icon.svg"
            alt="add new chat"
            width={20}
            height={20}
          />
          <span>New Chat</span>
        </Link>
        <input
          type="text"
          placeholder="Search chat"
          onChange={(e) => handleSearch(e.target.value)}
          className="h-10 px-2 border border-[#EAEDF2] rounded flex items-center gap-2"
        />
      </div>
      <div className="h-px border border-[#EAEDF2] w-full"></div>
      <div className="flex justify-center items-start gap-[10px] self-stretch">
        <div className="w-[212px] flex flex-col gap-[14px]">
          <h1>Recent chats</h1>
          {filteredChats.map((chat, index) => (
            <Link
              href={`chatIQ?id=${chat._id}`}
              key={index}
              className={`flex h-8 py-[6px] px-[10px] gap-2 ${
                chat._id == chatId && "bg-[#EAEDF2] rounded"
              }`}
            >
              <Image
                src="/assets/message-icon.svg"
                alt="message icon"
                width={20}
                height={20}
              />
              <span className="truncate text-sm">{chat.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ChatsList;
