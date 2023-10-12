"use client";

import BarChart from "@/components/charts/BarChart";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [showChart, setShowChart] = useState(true);

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

  return (
    <section className="bg-[#F6F8FA] h-screen flex flex-col">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">Reports</h1>
      </div>
      <div className="flex justify-between items-center py-5 px-7 border border-[#EAEDF2] text-[#17212F]">
        <div className="flex gap-[6px] items-center">
          <p className="text-sm font-medium">Dataset</p>
          <div className="flex h-10 py-2 px-3 items-center gap-[10px] cursor-pointer rounded border border-[#EAEDF2] bg-white">
            <p className="text-sm flex-[1_0_0]">Sample - Retail Orders</p>
            <Image
              src="/assets/chevron-down.svg"
              alt="more icon"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href=""
            className="px-4 py-2 rounded border border-[#DEE8FA] bg-white text-sm font-medium"
          >
            Cancel
          </Link>
          <button className="px-4 py-2 rounded text-white bg-primary text-sm font-medium">
            Save & Close
          </button>
        </div>
      </div>
      <div className="flex flex-[1_0_0] items-start gap-5 flex-shrink-0 px-7 py-5 text-[#17212F]">
        <div className="w-[240px] flex p-[14px] flex-col gap-[14px] flex-shrink-0 self-stretch rounded border border-[#EAEDF2] bg-white">
          <h1 className="flex h-8 py-[6px] items-center gap-2 self-stretch bg-white">
            Fields
          </h1>
          <div className="h-10 self-stretch px-2 flex flex-col items-start gap-[10px] rounded border border-[#EAEDF2] bg-white">
            <div className="flex gap-2 h-full px-2 items-center">
              <Image
                src="/assets/search-icon.svg"
                alt="search icon"
                width={16}
                height={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="focus:outline-none w-full"
              />
            </div>
          </div>
          <div className="flex h-8 py-[6px] items-center gap-2 self-stretch bg-white cursor-pointer">
            <Image
              src="/assets/grip-icon.svg"
              alt="grip icon"
              width={20}
              height={20}
            />
            <Image
              src="/assets/globe.svg"
              alt="globe icon"
              width={20}
              height={20}
            />
            <p className="text-sm">Region</p>
          </div>
          <div className="flex h-8 py-[6px] items-center gap-2 self-stretch bg-white cursor-pointer">
            <Image
              src="/assets/grip-icon.svg"
              alt="grip icon"
              width={20}
              height={20}
            />
            <Image
              src="/assets/globe.svg"
              alt="globe icon"
              width={20}
              height={20}
            />
            <p className="text-sm">Country</p>
          </div>
          <div className="flex h-8 py-[6px] items-center gap-2 self-stretch bg-white cursor-pointer">
            <Image
              src="/assets/grip-icon.svg"
              alt="grip icon"
              width={20}
              height={20}
            />
            <Image
              src="/assets/calendar.svg"
              alt="globe icon"
              width={20}
              height={20}
            />
            <p className="text-sm">Order Date</p>
          </div>
          <div className="flex h-8 py-[6px] items-center gap-2 self-stretch bg-white cursor-pointer">
            <Image
              src="/assets/grip-icon.svg"
              alt="grip icon"
              width={20}
              height={20}
            />
            <Image
              src="/assets/text-type.svg"
              alt="globe icon"
              width={20}
              height={20}
            />
            <p className="text-sm">Sales channel</p>
          </div>
          <div className="flex h-8 py-[6px] items-center gap-2 self-stretch bg-white cursor-pointer">
            <Image
              src="/assets/grip-icon.svg"
              alt="grip icon"
              width={20}
              height={20}
            />
            <Image
              src="/assets/digit-type.svg"
              alt="globe icon"
              width={20}
              height={20}
            />
            <p className="text-sm">Unit cost</p>
          </div>
        </div>
        <section className="flex flex-col gap-5 flex-[1_0_0] self-stretch items-start">
          <div className="flex justify-between items-start self-stretch">
            <div className="flex gap-[10px] items-center">
              <p className="text-sm font-medium">Chart Type</p>
              <div className="flex w-[150px] h-10 py-2 px-3 items-center gap-[10px] cursor-pointer rounded border border-[#EAEDF2] bg-white">
                <p className="text-sm flex-[1_0_0]">Grouped bar</p>
                <Image
                  src="/assets/chevron-down.svg"
                  alt="more icon"
                  width={16}
                  height={16}
                />
              </div>
            </div>
            <div className="h-10 flex gap-[18px]">
              <div className="inline-flex items-center gap-[10px]">
                <p className="text-sm font-medium">X Axis</p>
                <input
                  type="text"
                  placeholder="+ Aggregate"
                  className="flex h-10 py-[14px] w-[150px] text-sm px-3 gap-[10px] flex-[1_0_0] rounded border border-[#EAEDF2] bg-white"
                />
              </div>
              <div className="inline-flex items-center gap-[10px]">
                <p className="text-sm font-medium">Y Axis</p>
                <input
                  type="text"
                  placeholder="+ Category"
                  className="flex h-10 py-[14px] w-[150px] text-sm px-3 gap-[10px] flex-[1_0_0] rounded border border-[#EAEDF2] bg-white"
                />
              </div>
              <div className="inline-flex items-center gap-[10px]">
                <p className="text-sm font-medium">Series</p>
                <input
                  type="text"
                  placeholder="+ Aggregate"
                  className="flex h-10 py-[14px] w-[150px] text-sm px-3 gap-[10px] flex-[1_0_0] rounded border border-[#EAEDF2] bg-white"
                />
              </div>
            </div>
          </div>
          {showChart ? (
            <div className="flex p-[14px] gap-6 flex-col items-center overflow-auto justify-center flex-[1_0_0] self-stretch rounded border border-[#EAEDF2] bg-white">
              <h1 className="font-semibold text-lg">Unit Cost by Region</h1>
              <BarChart data={data} />
            </div>
          ) : (
            <div className="flex p-[14px] flex-col gap-[14px] items-center justify-center flex-[1_0_0] self-stretch rounded border border-[#EAEDF2] bg-white">
              <Image
                src="/assets/bar-chart.svg"
                alt="chart icon"
                width={24}
                height={24}
              />
              <p className="text-[#ADB3BB] text-sm">
                Select the parameters to preview a chart
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  );
};

export default Page;
