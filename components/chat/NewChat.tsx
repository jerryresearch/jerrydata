"use client";

import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loading from "../Loading";
import createChat from "@/lib/chats/createChat";
import lottie from "lottie-web";
import { useToast } from "../ui/use-toast";

type Props = {
  datasets: Dataset[];
  userId: string;
};

const NewChat = ({ datasets, userId }: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [prevTitle, setPrevTitle] = useState("New Chat");
  const [title, setTitle] = useState("New Chat");
  const [message, setMessage] = useState("");
  const [selectedDataset, setSelectedDataset] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("first");
    if (!selectedDataset) {
      alert("select a dataset");
      return;
    }
    const data = {
      title,
      dataset: selectedDataset,
      message,
    };
    try {
      setIsLoading(true);
      const res = await createChat(userId, data);
      location.replace(`/u/ask-jerry/${res.chat.title}?id=${res.chat._id}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue creating the chat. Please try again later.",
      });
      // console.log(error);
    }
    setIsLoading(false);
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  const animationContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/assets/jd_loader_2.json",
    });
  }, []);

  // return

  return (
    <section className="flex-[1_0_0] flex flex-col self-stretch bg-white">
      <div className="border-b border-[#EEEEFF] flex py-4 px-6 justify-between items-center bg-white">
        {isEditing ? (
          <span className="flex justify-center gap-[10px]">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-[200px] border border-[#EAEDF2] py-1 2xl:py-2 px-3 rounded focus:outline-none font-normal"
            />
            <span
              onClick={() => {
                setPrevTitle(title);
                setIsEditing(false);
              }}
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
                setTitle(prevTitle);
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
            <span className="font-medium">{title}</span>
            <Image
              className="cursor-pointer"
              onClick={() => {
                setPrevTitle(title);
                setIsEditing(true);
              }}
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
                      onClick={() => setSelectedDataset(dataset._id)}
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
          <div className="flex w-10 h-10 items-center justify-center gap-2 py-5 rounded-[6px] border border-[#EEEEFF] bg-white opacity-50">
            <Image
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
        <section className="flex-[1_0_0] flex flex-col gap-6 px-[30px] py-4 rounded-[8px] bg-[#FAFAFA] overflow-auto">
          <div className="flex flex-col gap-6 flex-[1_0_0] justify-end">
            <div ref={animationContainer} className="w-5 h-5"></div>
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
    </section>
  );
};

export default NewChat;
