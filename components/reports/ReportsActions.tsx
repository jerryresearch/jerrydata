"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import DeleteReportModal from "./DeleteReportModal";
import duplicateReport from "@/lib/reports/duplicateReport";
import EditReportModal from "./EditReportModal";
import { useToast } from "../ui/use-toast";

type Props = {
  report: Reports;
  userId: string;
};

const ReportsActions = ({ report, userId }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleCloseEditModal = () => {
    setEditOpen(false);
  };

  const handleDuplicate = async () => {
    try {
      const res = await duplicateReport(userId, report._id, report);
      location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue deleting the dashboard. Please try again later.",
      });
      // console.log(error);
    }
  };

  return (
    <Popover open={popUpOpen} onOpenChange={setPopUpOpen}>
      <PopoverTrigger>
        <Image
          src="/assets/vertical-ellipsis.svg"
          alt="more"
          width={20}
          height={20}
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-2 rounded-[6px] bg-white w-[180px] text-[#080D19] shadow-custom">
        <span
          onClick={() => {
            setPopUpOpen(false);
            setEditOpen(true);
          }}
          className="px-3 py-[12px] rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Edit title
        </span>
        {/* <span
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
        </span> */}
        <span
          onClick={() => {
            setPopUpOpen(false);
            handleDuplicate();
          }}
          className="px-3 py-[12px] rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Duplicate
        </span>
        <span
          onClick={() => {
            setPopUpOpen(false);
            setOpen(true);
          }}
          className="px-3 py-[12px] rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Delete
        </span>
      </PopoverContent>
      <EditReportModal
        open={editOpen}
        onClose={handleCloseEditModal}
        report={report}
        userId={userId}
      />
      <DeleteReportModal
        report={report}
        userId={userId}
        open={open}
        onClose={handleCloseModal}
      />
    </Popover>
  );
};

export default ReportsActions;
