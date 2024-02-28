"use client";

import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Message from "./Message";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loading from "../Loading";
import sendMessage from "@/lib/chats/sendMessage";
import updateChat from "@/lib/chats/updateChat";
import DeleteChatModal from "./DeleteChatModal";
import { useToast } from "../ui/use-toast";

type Props = {
  datasets: Dataset[];
  chat: Chat;
  messages: Message[];
  userId: string;
};

const Chat = ({ datasets, chat, messages, userId }: Props) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);
  const [message, setMessage] = useState("");
  const [selectedDataset, setSelectedDataset] = useState(chat.dataset);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      // @ts-ignore
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedDataset) {
      alert("select a dataset");
      return;
    }
    try {
      setIsLoading(true);
      const res = await sendMessage(userId, chat._id, { message });
      setMessage("");
      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue sending the message. Please try again later.",
      });
      // console.log(error);
    }
    setIsLoading(false);
  };

  const handleUpdate = async () => {
    try {
      const data = { title };
      const res = await updateChat(userId, chat._id, data);
      location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue updating chat name. Please try again later.",
      });
      // console.log(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex-[1_0_0] h-full flex flex-col self-stretch bg-white">
      <div className="border-b border-[#EEEEFF] flex py-4 px-6 justify-between items-center bg-white">
        {isEditing ? (
          <span className="flex justify-center gap-[10px]">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-[200px] border border-[#EAEDF2] py-1 2xl:py-2 px-3 rounded focus:outline-none font-normal"
            />
            <span
              onClick={handleUpdate}
              className="bg-primary cursor-pointer w-7 flex items-center justify-center 2xl:w-10 2xl:h-10 rounded"
            >
              <Image
                src="/assets/check-icon.svg"
                alt="confirm icon"
                width={16}
                height={16}
              />
            </span>
            <span
              onClick={() => {
                setIsEditing(false);
                setTitle(chat.title);
              }}
              className="w-7 cursor-pointer border border-[#DEE8FA] flex items-center justify-center 2xl:w-10 2xl:h-10 rounded"
            >
              <Image
                src="/assets/dismiss.svg"
                alt="cancel icon"
                width={16}
                height={16}
              />
            </span>
          </span>
        ) : (
          <div className="flex gap-[10px] items-center">
            <span className="font-medium">{chat.title}</span>
            <Image
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
              src="/assets/edit.svg"
              alt="edit icon"
              width={20}
              height={20}
            />
          </div>
        )}
        <div className="flex gap-[10px] items-center">
          <div className="font-medium">Dataset</div>
          <div className="flex w-[240px] h-10 py-2 px-3 justify-between items-center rounded-[6px] border border-[#EEEEFF] bg-white">
            <Popover>
              <PopoverTrigger className="flex justify-between items-center w-full gap-1">
                <span className="truncate ">
                  {selectedDataset
                    ? datasets.find((dataset) => dataset._id == selectedDataset)
                        ?.name
                    : "Select Dataset"}
                </span>
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
                        readOnly
                        checked={selectedDataset == dataset._id}
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
          <div className="flex w-[280px] flex-col pl-2 h-10 pr-[100px] items-start gap-[10px] rounded-[6px] border border-[#EEEEFF] bg-white">
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
          <div className="flex w-10 h-10 items-center justify-center gap-2 py-5  rounded-[6px] border border-[#EEEEFF] bg-white ">
            <Image
              onClick={() => setOpenDeleteModal(true)}
              src="/assets/delete.svg"
              alt="search icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="flex-[1_0_0] flex flex-col rounded-[6px] p-[30px]">
        <section
          ref={chatContainerRef}
          className="flex-[1_0_0] flex flex-col gap-6 px-[30px] py-4 rounded-[8px] bg-[#FAFAFA] overflow-auto"
        >
          <div className="flex flex-col gap-6 flex-[1_0_0] justify-end">
            {messages &&
              messages.map((item, index) => (
                <Message key={index} message={item} />
              ))}
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex sticky bottom-0 border border-[#EEEEFF] rounded-[124px] px-[10px] py-3 bg-white"
          >
            <input
              type="text"
              placeholder="Enter your prompt here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="rounded-[124px] flex-1 px-2 focus:outline-none"
            />
            <button type="submit">
              <Image
                src="/assets/send.svg"
                alt="send"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </button>
          </form>
        </section>
      </div>
      <DeleteChatModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        id={chat._id}
        userId={userId}
        title={title}
      />
    </section>
  );
};

export default Chat;
