"use client";

import Image from "next/image";
import React from "react";

function formatDateTime(dateTimeString: string) {
  const dateTime = new Date(dateTimeString);

  const optionsTime = { hour: "numeric", minute: "numeric" };
  const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };

  // @ts-ignore
  const time = dateTime.toLocaleTimeString("en-US", optionsTime);
  const date = dateTime
    // @ts-ignore
    .toLocaleDateString("en-US", optionsDate)
    .replace(/\//g, "/");

  return `${time.toLowerCase()}, ${date}`;
}

const Story = () => {
  return (
    <div className="w-full h-[344px] flex gap-10 border border-[#EEEEFF] rounded-[6px] px-8 text-[#080D19]">
      <div className="w-[450px] flex flex-col gap-5 justify-center">
        <span className="text-[#A9AAAE] text-sm">
          {formatDateTime("2024-02-12T15:23:51.849+00:00")}
        </span>
        <p className="text-[#61656C]">
          Electronics sales spiked in November and December across all regions,
          likely driven by holiday shopping. The increase was particularly
          notable in North America, with sales volume in December being 75%
          higher than the monthly average for the year.
        </p>
        <div className="flex gap-2 items-center w-fit rounded border border-[#EEEEFF] px-4 py-2">
          <Image
            src="/assets/positive.svg"
            alt="chevron down icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <span>Positive Impact. Keep up the good work.</span>
        </div>
        <div className="flex gap-4 text-primary underline">
          <span>Download as PNG</span>
          <span>Share</span>
        </div>
      </div>
      <div className="w-px bg-[#EEEEFF]"></div>
      <div className="w-[372px] flex py-8">
        <div className="">Chart</div>
        {/* <div className="self-start">
          <input type="checkbox" name="" id="" />
        </div> */}
      </div>
    </div>
  );
};

export default Story;
