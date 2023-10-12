"use client";

import EditFields from "@/components/EditFields";
import Image from "next/image";
import React from "react";

const Page = () => {
  const currentStep = 4;
  return (
    <div className="bg-[#F6F8FA] overflow-auto flex-1">
      <EditFields />
      <section className="px-7">
        <div className="w-full flex justify-between items-center pl-1 py-2">
          <div className="text-[#ADB3BB]">Showing 1-2 of 2</div>
          <div className="p-[10px] flex justify-center items-center gap-[5px] rounded border border-[#EAEDF2] bg-white">
            <div className="py-[6px] px-3 bg-[#DEE8FA] cursor-pointer">1</div>
            <div className="py-[6px] px-3 cursor-pointer">2</div>
            <div className="py-[6px] px-3 cursor-pointer">
              <Image
                src="/assets/chevron-right.svg"
                alt="more"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
