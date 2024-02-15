"use client";

import Image from "next/image";
import React from "react";
import StackedBarChart from "../charts/StackedBarChart";

const data = {
  Asia: {
    retail: 800,
    wholesale: 200,
    distribution: 100,
  },
  Europe: {
    retail: 700,
    wholesale: 200,
    distribution: 300,
  },
  Africa: {
    retail: 800,
    wholesale: 500,
    distribution: 80,
  },
  "North America": {
    retail: 200,
    wholesale: 100,
    distribution: 150,
  },
};

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
    <div className="w-full md:h-[344px] flex flex-col md:flex-row gap-4 md:gap-10 border border-[#EEEEFF] rounded-[6px] px-8 py-6 text-[#080D19]">
      <div className="md:w-[450px] flex flex-col gap-5 justify-center">
        <span className="text-[#A9AAAE] text-sm">
          {formatDateTime("2024-02-12T15:23:51.849+00:00")}
        </span>
        <p className="text-[#61656C]">
          Electronics sales spiked in November and December across all regions,
          likely driven by holiday shopping. The increase was particularly
          notable in North America, with sales volume in December being 75%
          higher than the monthly average for the year.
        </p>
        <div className="flex gap-2 items-center w-full md:w-fit rounded border border-[#EEEEFF] px-4 py-2">
          <Image
            src="/assets/positive.svg"
            alt="chevron down icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <p>
            <span className="hidden md:inline">Positive Impact. </span>
            <span>Keep up the good work.</span>
          </p>
        </div>
        <div className="flex gap-4 text-primary underline">
          <span>Download as PNG</span>
          <span>Share</span>
        </div>
      </div>
      <div className="hidden md:block w-px bg-[#EEEEFF]"></div>
      <div className="md:w-[372px]">
        {/* <div className="">Chart</div> */}
        <div className="w-full h-full">
          <StackedBarChart data={data} />
        </div>
        {/* <div className="self-start">
          <input type="checkbox" name="" id="" />
        </div> */}
      </div>
    </div>
  );
};

export default Story;
