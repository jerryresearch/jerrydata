import Image from "next/image";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatActions from "./ChatActions";

const Chat = () => {
  const datasets = [
    "Sample - Retail Orders",
    "Wholesale Market",
    "Asian Pacific Region",
    "45+ Age Group",
    "Back Sales",
    "Sample - Retail Orders",
    "Wholesale Market",
    "Asian Pacific Region",
    "45+ Age Group",
    "Back Sales",
  ];

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
          <div className="flex w-[204px] h-10 py-2 px-3 justify-between items-center border border-[#EAEDF2] bg-white">
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
              <PopoverContent className="w-fit min-w-[340px] max-h-[208px] overflow-auto py-[14px] px-[10px] shadow-custom bg-white rounded">
                <ul className="text-sm font-normal flex-shrink-0 flex flex-col items-start">
                  {datasets.map((dataset, index) => (
                    <li
                      key={index}
                      className="flex px-2 items-center justify-center gap-[10px]"
                    >
                      <input type="checkbox" name="" id="" />
                      <label className="flex gap-2 items-center w-fit px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                        {dataset}
                      </label>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex w-[280px] flex-col pl-2 h-10 pr-[100px] items-start gap-[10px] border border-[#EAEDF2] bg-white">
            <div className="py-[10px] px-2 flex gap-2 self-stretch">
              <Image
                src="/assets/search-icon.svg"
                alt="search icon"
                width={16}
                height={16}
              />
              <input type="text" placeholder="Search conversation" />
            </div>
          </div>
          <div>
            <ChatActions />
          </div>
        </div>
      </div>
      <section className="flex-1 overflow-auto"></section>
      <div className="flex w-full px-[29px] mb-5 h-10 gap-2">
        <div className="flex-1 flex items-start flex-col gap-[10px] rounded border border-[#EAEDF2] bg-white pl-2 pr-[100px]">
          <input
            type="text"
            placeholder="Type here"
            className="flex items-center py-[7px] px-2 gap-2 self-stretch"
          />
        </div>
        <button className="bg-primary text-white rounded h-10 py-2 px-4 flex justify-center items-center flex-shrink-0">
          Send message
        </button>
      </div>
    </section>
  );
};

export default Chat;
