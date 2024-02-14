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
    <aside className="flex flex-col h-full w-[280px] py-6 items-center gap-6 border-r border-[#EEEEFF]">
      <div className="px-6 flex flex-col gap-4">
        <Link
          href={"ask-jerry"}
          className="h-10 px-2 bg-primary text-white rounded-[6px] flex items-center gap-[6px]"
        >
          <Image
            src="/assets/plus-icon.svg"
            alt="add new chat"
            width={20}
            height={20}
          />
          <span>New Chat</span>
        </Link>
        <div className="h-10 px-2 border border-[#EEEEFF] rounded-[6px] flex items-center gap-[10px]">
          <Image
            src="/assets/search-icon.svg"
            alt="add new chat"
            width={20}
            height={20}
          />
          <input
            type="text"
            placeholder="Search chat"
            onChange={(e) => handleSearch(e.target.value)}
            className="focus:outline-none w-full"
          />
        </div>
      </div>
      <div className="h-px border border-[#EEEEFF] w-full"></div>
      <div className="px-6 w-full overflow-auto">
        <div className="flex flex-col gap-[14px] text-[#080D19]">
          <h1 className="font-medium fixed bg-white">Recent chats</h1>
          <div className="flex flex-col gap-[10px] pt-10">
            {filteredChats.map((chat, index) => (
              <Link
                href={`ask-jerry?id=${chat._id}`}
                key={index}
                className={`flex py-[10px] px-[6px] gap-2 bg-white ${
                  chat._id == chatId && "bg-[#FAFAFA] rounded-[6px]"
                }`}
              >
                {/* <Image
                  src="/assets/message-icon.svg"
                  alt="message icon"
                  width={20}
                  height={20}
                /> */}
                <span className="truncate">{chat.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatsList;
