"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import DeleteReportModal from "./reports/DeleteReportModal";

type Props = {
  id: string;
  userId: string;
};

const ReportsActions = ({ id, userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Popover open={popUpOpen} onOpenChange={setPopUpOpen}>
      <PopoverTrigger>
        <Image src="/assets/ellipsis.svg" alt="more" width={24} height={20} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-2 rounded bg-white w-[171px] text-sm shadow-custom">
        <span
          onClick={() => setPopUpOpen(false)}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Edit title
        </span>
        <span
          onClick={() => setPopUpOpen(false)}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Save as PNG
        </span>
        <span
          onClick={() => setPopUpOpen(false)}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Save as PDF
        </span>
        <span
          onClick={() => setPopUpOpen(false)}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Duplicate
        </span>
        <span
          onClick={() => {
            setPopUpOpen(false);
            setOpen(true);
          }}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer text-[#D30A0A]"
        >
          Delete
        </span>
      </PopoverContent>
      <DeleteReportModal
        id={id}
        userId={userId}
        open={open}
        onClose={handleCloseModal}
      />
    </Popover>
  );
};

export default ReportsActions;
