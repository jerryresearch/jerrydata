import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const ChartActions = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Image src="/assets/ellipsis.svg" alt="more" width={24} height={20} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-2 rounded bg-white w-[171px] text-sm shadow-custom">
        <span className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer">
          Edit chart
        </span>
        <span className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer">
          Save as PNG
        </span>
        <span className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer">
          Save as PDF
        </span>
        <span className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer">
          Duplicate
        </span>
        <span className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer text-[#D30A0A]">
          Delete
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default ChartActions;
