"use client";

import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import updateChat from "@/lib/chats/updateChat";
import lottie from "lottie-web";
import DeleteChatModal from "./DeleteChatModal";
import { useToast } from "../ui/use-toast";
import UserMessage from "./UserMessage";
import ExploratoryMessage from "./ExploratoryMessage";
import DissectMessage from "./DissectMessage";
import getHow from "@/lib/chats/getHow";
import getWhy from "@/lib/chats/getWhy";
import getWhat from "@/lib/chats/getWhat";
import getSuggestion from "@/lib/chats/getSuggestion";
import getVisualization from "@/lib/chats/getVisualization";
import getQuery from "@/lib/chats/getQuery";
import getDescription from "@/lib/chats/getDescription";
import getAssumptions from "@/lib/chats/getAssumptions";
import ExploratoryMessageLoading from "./ExploratoryMessageLoading";
import DissectMessageLoading from "./DissectMessageLoading";

type Props = {
  datasets: Dataset[];
  chat: Chat;
  messages: Message[];
  userId: string;
};

const Chat = ({ datasets, chat, messages, userId }: Props) => {
  console.log(messages);
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [messageList, setMessages] = useState<Message[]>(messages);
  const [step, setStep] = useState(0);
  const [asstMessage, setAsstMessage] = useState<Message | undefined>();

  const [selectedDataset, setSelectedDataset] = useState(chat.dataset);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [mode, setMode] = useState("Exploratory");
  const [modeopen, setModeOpen] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const chatContainerRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    setMessages(messages);
    setTitle(chat.title);
    setSelectedDataset(chat.dataset);
  }, [messages, chat]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      // @ts-ignore
      container.scrollTop = container.scrollHeight;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isLoading || !message) {
      return;
    }
    if (!selectedDataset) {
      toast({
        variant: "destructive",
        title: `Uh oh! Couldn't create chat.`,
        description: "Please select a dataset",
      });
      return;
    }
    setMessages([
      ...messageList,
      {
        _id: "123123",
        role: "user",
        type: "text",
        content: message,
        chat: chat._id,
        mode,
      },
    ]);
    try {
      setIsLoading(true);
      setMessage("");
      const chatId = chat._id;
      if (mode == "Exploratory") {
        const howResponse = await getHow(userId, chatId, { message: content });
        setAsstMessage(howResponse.message);
        setStep(2);
        const messageId = howResponse.message._id;
        const whyResponse = await getWhy(userId, chatId, { messageId });
        setAsstMessage(whyResponse.message);
        setStep(3);
        const whatResponse = await getWhat(userId, chatId, { messageId });
        setAsstMessage(whatResponse.message);
        setStep(4);
        const suggestionResponse = await getSuggestion(userId, chatId, {
          messageId,
        });
        setStep(5);
        setAsstMessage(suggestionResponse.message);
        const visualizationResponse = await getVisualization(userId, chatId, {
          messageId,
        });
        setStep(6);
        setAsstMessage(visualizationResponse.message);
        setMessages([...messageList, visualizationResponse.message]);
      } else {
        const queryResponse = await getQuery(userId, chatId, {
          message: content,
        });
        setAsstMessage(queryResponse.message);
        setStep(2);
        const messageId = queryResponse.message._id;
        const descResponse = await getDescription(userId, chatId, {
          messageId,
        });
        setAsstMessage(descResponse.message);
        setStep(3);
        const assumpResponse = await getAssumptions(userId, chatId, {
          messageId,
        });
        setStep(4);
        setAsstMessage(assumpResponse.message);
        setMessages([...messageList, assumpResponse.message]);
      }
      console.log(messageList.length);
      setIsLoading(false);
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
      router.refresh();
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

  const animationContainer = useRef(null);
  useEffect(() => {
    const animation = lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/assets/jd_loader.json",
    });

    return () => animation.destroy();
  }, [isLoading]);

  return (
    <section className="flex-[1_0_0] h-full flex flex-col self-stretch bg-white">
      <div className="border-b border-[#EEEEFF] flex py-4 px-6 h-[74px] justify-between items-center bg-white">
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
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
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
              <PopoverContent className="w-fit min-w-[204px] max-w-[240px] max-h-[208px] overflow-auto py-[14px] px-[10px] shadow-custom bg-white rounded">
                <ul className="text-sm font-normal flex flex-col items-start">
                  {datasets.map((dataset, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        // setSelectedDataset(dataset._id);
                        setPopoverOpen(false);
                      }}
                      className="flex w-full px-2 items-center justify-center gap-[10px]"
                    >
                      <input
                        type="checkbox"
                        name={dataset._id}
                        id={dataset._id}
                        readOnly
                        checked={selectedDataset == dataset._id}
                        className="accent-primary"
                      />
                      <label
                        htmlFor={dataset._id}
                        className="truncate w-full  py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded"
                      >
                        {dataset.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex w-10 h-10 items-center justify-center gap-2 py-5 rounded-[6px] border border-[#EEEEFF] bg-white">
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
      <div className="flex-[1_0_0] flex flex-col gap-6 bg-[#FAFAFA]">
        <section
          ref={chatContainerRef}
          className="flex flex-col gap-[30px] flex-[1_0_0] overflow-auto py-6 px-[30px]"
        >
          <div className="flex flex-col gap-6">
            {messageList &&
              messageList.map((message, index) =>
                message.role == "user" ? (
                  <UserMessage
                    key={index}
                    message={message}
                    mode={
                      index == 0
                        ? true
                        : !(messages[index - 1]?.mode == message.mode)
                    }
                  />
                ) : message.mode == "Exploratory" ? (
                  <ExploratoryMessage key={index} message={message} />
                ) : (
                  <DissectMessage key={index} message={message} />
                )
              )}
            {isLoading &&
              (mode == "Exploratory" ? (
                <ExploratoryMessageLoading step={step} message={asstMessage} />
              ) : (
                <DissectMessageLoading step={step} message={asstMessage} />
              ))}
          </div>
        </section>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 py-6 px-[30px] border-t border-[#EEEEFF]"
        >
          <div className="flex justify-between">
            {isLoading ? (
              <div className="flex gap-0 items-center">
                <div className="w-6 h-6">
                  <div ref={animationContainer} className="w-full h-full"></div>
                </div>
                <p className="text-sm text-primary">
                  {mode == "Exploratory"
                    ? "Jerry is drilling deep..."
                    : "Jerry is dissecting..."}
                </p>
              </div>
            ) : (
              <div className="flex gap-1 items-center">
                <Image
                  src="/assets/jerry-chat.svg"
                  alt="jerry"
                  width={20}
                  height={20}
                />
                <p className="text-sm text-primary">
                  Jerry is waiting for your command...
                </p>
              </div>
            )}
            <div
              className={`flex gap-1 items-center ${
                !isLoading && "opacity-50"
              }`}
            >
              <Image
                src="/assets/stop.svg"
                alt="jerry"
                width={16}
                height={16}
              />
              <p className="text-sm text-[#D30A0A]">Stop generating</p>
            </div>
          </div>
          <div className="flex gap-3 items-center h-[46px]">
            <div className="h-full flex gap-[10px] bg-white border border-[#EEEEFF] rounded-[6px] flex-1 px-2">
              <input
                type="text"
                placeholder="Enter your prompt here"
                value={message}
                onChange={(e) => {
                  setContent(e.target.value);
                  setMessage(e.target.value);
                }}
                className="flex-1 focus:outline-none"
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
            </div>
            <div className="border border-[#EEEEFF] rounded-[6px] bg-white h-full w-[200px] flex items-center px-3 py-[14px]">
              <Popover open={modeopen} onOpenChange={setModeOpen}>
                <PopoverTrigger className="flex justify-between items-center w-full gap-1">
                  <span className="truncate">{mode} Mode</span>
                  <Image
                    src="/assets/chevron-down.svg"
                    alt="chevron down icon"
                    width={16}
                    height={16}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[200px] max-h-[208px] overflow-auto py-[14px] px-[10px] shadow-custom bg-white rounded">
                  <ul className="font-normal flex flex-col gap-[10px] items-start text-[#080D19]">
                    <li
                      onClick={() => {
                        setMode("Exploratory");
                        setModeOpen(false);
                      }}
                      className="px-2 py-1 cursor-pointer hover:bg-[#FAFAFA] w-full rounded-[6px]"
                    >
                      Exploratory Mode
                    </li>
                    <li
                      onClick={() => {
                        setMode("Dissect");
                        setModeOpen(false);
                      }}
                      className="px-2 py-1 cursor-pointer hover:bg-[#FAFAFA] w-full rounded-[6px]"
                    >
                      Dissect Mode
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </form>
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
