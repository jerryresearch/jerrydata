"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ReportsActions from "@/components/ReportsActions";
import AddReportModal from "@/components/AddReportModal";

const Page = () => {
  const [reportsCount, setReportsCount] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">Reports</h1>
      </div>
      {reportsCount == 0 ? (
        <section className="flex h-[calc(100vh-49px)] py-5 px-7 items-center justify-center gap-5 flex-shrink-0">
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/assets/no-reports.svg"
              alt="no reports"
              width={82}
              height={88}
            />
            <div className="flex flex-col items-center">
              <h1 className="text-[#17212F] text-xl font-semibold gap-[10px]">
                No Reports
              </h1>
              <p className="text-[#ADB3BB] text-sm">
                No reports found. Please add a report.
              </p>
            </div>
            <div className="inline-flex flex-col justify-center items-center gap-[10px]">
              <button className="w-[210px] h-[40px] flex items-center justify-center gap-[10px] self-stretch px-4 py-2 rounded bg-primary text-white">
                Add Report
              </button>
              <button className="w-[210px] h-[40px] flex items-center justify-center gap-[10px] self-stretch px-4 py-2 rounded bg-[#17212F] text-white">
                Generate Auto Report
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section>
          <div className="flex py-5 px-7 justify-between items-center border-b border-b-[#EAEDF2]">
            <div>
              <Popover>
                <PopoverTrigger>
                  <div className="flex items-center justify-between w-[204px] py-2 px-3 flex-shrink-0 rounded border border-[#EAEDF2] bg-white">
                    <span>Last modified date</span>

                    <Image
                      src="/assets/chevron-down.svg"
                      alt="chevron down icon"
                      width={16}
                      height={16}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[204px] p-0 shadow-custom bg-white rounded">
                  <ul className="text-sm font-normal p-2 flex flex-col items-start">
                    <li className="flex gap-2 items-center w-fit px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                      Last modified date
                    </li>
                    <li className="flex gap-2 items-center w-fit px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                      Title, A to Z
                    </li>
                    <li className="flex gap-2 items-center w-fit px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                      Title, Z to A
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-[10px] items-center">
              <div className="flex w-[380px] pr-[100px] pl-2 flex-col items-start rounded border border-[#EAEDF2] bg-white">
                <div className="flex py-[10px] px-2 gap-2 items-center self-stretch">
                  <Image
                    src="/assets/search-icon.svg"
                    alt="search icon"
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search Data"
                    className="focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => setOpen(true)}
                className="flex h-[40px] py-2 px-4 items-center justify-center gap-[10px] bg-primary text-white rounded"
              >
                Add report
              </button>
              <button className="flex h-[40px] py-2 px-4 items-center justify-center gap-[10px] bg-[#17212F] text-white rounded">
                Auto Generate Report
              </button>
            </div>
          </div>
          <div className="flex py-5 px-7 items-center gap-5">
            <div className="flex w-[400px] font-medium pt-5 flex-col justify-end items-center flex-shrink-0 rounded-[8px] border border-[#EAEDF2] bg-white">
              <div className="flex w-[372px] py-5 px-[18px] justify-between items-center rounded  bg-[#F8FAFC]">
                <p>Spellmint Analytics</p>
                <ReportsActions />
              </div>
              <div className="flex w-full px-8 min-h-[120px] py-5 justify-center items-center gap-8 flex-[1_0_0] border-b border-b-[#EAEDF2]">
                <p className="text-[#ADB3BB] text-sm">No summary</p>
              </div>
              <div className="flex w-full justify-between items-center flex-[1_0_0] py-5 px-8 text-[#ADB3BB] text-sm">
                <p>No charts</p>
                <p>Modified 0 days ago</p>
              </div>
            </div>
            <div className="flex w-[400px] font-medium pt-5 flex-col justify-end items-center flex-shrink-0 rounded-[8px] border border-[#EAEDF2] bg-white">
              <div className="flex w-[372px] py-5 px-[18px] justify-between items-center rounded  bg-[#F8FAFC]">
                <p>Hurrae Ventures</p>
                <ReportsActions />
              </div>
              <div className="flex w-full py-5 px-8 gap-8 flex-[1_0_0] border-b border-[#EAEDF2]">
                Total No. of Website Visitors
              </div>
              <div className="flex w-full py-5 px-8 gap-8 flex-[1_0_0] border-b border-[#EAEDF2]">
                No. of Signups to Hurrae Infinity
              </div>
              <div className="flex w-full justify-between items-center flex-[1_0_0] py-5 px-8 text-[#ADB3BB] text-sm">
                <p>6 charts</p>
                <p>Modified 2 days ago</p>
              </div>
            </div>
          </div>
          <AddReportModal open={open} onClose={handleCloseModal} />
        </section>
      )}
    </section>
  );
};

export default Page;
