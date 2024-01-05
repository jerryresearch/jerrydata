"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatActions from "./ChatActions";
import Message from "./Message";
import BarChart from "../charts/BarChart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import getChat from "@/lib/chats/getChat";
import Loading from "../Loading";
import createChat from "@/lib/chats/createChat";
import sendMessage from "@/lib/chats/sendMessage";

type Props = {
  datasets: Dataset[];
};

const Chat = ({ datasets }: Props) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;
  const chatId = searchParams.get("id") || "";

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState("");

  const handleSubmit = async () => {
    if (!selectedDataset) {
      alert("select a dataset");
      return;
    }
    const data = {
      title: "Demo",
      dataset: selectedDataset,
      message,
    };
    try {
      setIsLoading(true);
      let res;
      if (chatId == "") {
        res = await createChat(userId, data);
        router.replace(pathname + `?id=${res.chat._id}`);
      }
      res = await sendMessage(userId, chatId, { message });
      setMessage("");
      setSelectedDataset(res.chat.dataset);
      setMessages(res.messages.data.reverse());
      console.log(res.messages.data);
    } catch (error) {
      console.log("error chat");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || !chatId) return;
        setIsLoading(true);
        const res = await getChat(userId, chatId);
        setSelectedDataset(res.chat.dataset);
        setMessages(res.messages.data.reverse());
        setIsLoading(false);
        console.log(res.messages.data);
      } catch (error) {
        console.log("error getting chat data");
      }
    };
    if (chatId != "") {
      fetchData();
    } else {
      setMessage("");
      setMessages([]);
      setSelectedDataset("");
    }
  }, [setIsLoading, chatId, userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex-[1_0_0] flex flex-col self-stretch rounded border border-[#EAEDF2] bg-white">
      <div className="border border-[#EAEDF2] flex py-[14px] px-7 justify-between items-center bg-white">
        <div className="flex gap-[10px] items-center">
          <span className="font-semibold">Analytics for sales of Hurrae</span>
          <Image
            src="/assets/edit-icon.svg"
            alt="edit icon"
            width={16}
            height={16}
          />
        </div>
        <div className="flex gap-[10px] items-center">
          <div className="flex w-[204px] h-10 py-2 px-3 justify-between items-center rounded border border-[#EAEDF2] bg-white">
            <Popover>
              <PopoverTrigger className="flex justify-between items-center w-full">
                <span>Select Dataset</span>
                <Image
                  src="/assets/chevron-down.svg"
                  alt="chevron down icon"
                  width={16}
                  height={16}
                />
              </PopoverTrigger>
              <PopoverContent className="w-fit min-w-[204px] max-h-[208px] overflow-auto py-[14px] px-[10px] shadow-custom bg-white rounded">
                <ul className="text-sm font-normal flex-shrink-0 flex flex-col items-start">
                  {datasets.map((dataset, index) => (
                    <li
                      key={index}
                      className="flex w-full px-2 items-center justify-center gap-[10px]"
                    >
                      <input
                        type="checkbox"
                        name={dataset._id}
                        id={dataset._id}
                      />
                      <label
                        htmlFor={dataset._id}
                        onClick={() => setSelectedDataset(dataset._id)}
                        className="flex gap-2 items-center w-full px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded"
                      >
                        {dataset.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex w-[280px] flex-col pl-2 h-10 pr-[100px] items-start gap-[10px] rounded border border-[#EAEDF2] bg-white">
            <div className="items-center h-full px-2 flex gap-2 self-stretch">
              <Image
                src="/assets/search-icon.svg"
                alt="search icon"
                width={16}
                height={16}
              />
              <input
                type="text"
                placeholder="Search conversation"
                className="focus:outline-none"
              />
            </div>
          </div>
          <div className="flex w-10 h-10 items-center justify-center gap-2 py-5  rounded border border-[#EAEDF2] bg-white">
            <ChatActions />
          </div>
        </div>
      </div>
      <section className="flex-1 overflow-auto px-7 mt-6 mb-[14px] flex flex-col gap-[14px]">
        {/* <Message>Analytics for sales of hurrae</Message> */}
        {/* <Message><BarChart data={data} /> Chart</Message> */}
        {messages.map((item, index) => (
          <Message key={index}>
            {/* @ts-ignore */}
            {item.content[0].text
              ? /* @ts-ignore */
                item.content[0].text.value
              : /* @ts-ignore */
                item.content[0].image_file.file_id}
          </Message>
        ))}
      </section>
      <div className="flex w-full px-[29px] mb-5 h-10 gap-2">
        <div className="flex-1 flex items-start flex-col gap-[10px] rounded border border-[#EAEDF2] bg-white pl-2 pr-[100px]">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex items-center py-[7px] px-2 gap-2 self-stretch focus:outline-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-primary text-white rounded h-10 py-2 px-4 flex justify-center items-center flex-shrink-0"
        >
          Send message
        </button>
      </div>
    </section>
  );
};

export default Chat;
