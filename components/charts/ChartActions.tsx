"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import DeleteChartModal from "./DeleteChartModal";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import duplicateChart from "@/lib/charts/duplicateChart";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  chart: Chart;
  downloadPNG: () => void;
  downloadPDF: () => void;
};

const ChartActions = ({ chart, downloadPNG, downloadPDF }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;
  const reportId = searchParams.get("id") || "";

  const [open, setOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDuplicate = async () => {
    try {
      const res = await duplicateChart(userId, reportId, chart._id, chart);
      console.log(res);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover open={popUpOpen} onOpenChange={setPopUpOpen}>
      <PopoverTrigger>
        <Image src="/assets/ellipsis.svg" alt="more" width={24} height={20} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-2 rounded bg-white w-[171px] text-sm shadow-custom">
        <Link
          href={`${pathname}/update?id=${reportId}&chart=${chart._id}`}
          onClick={() => setPopUpOpen(false)}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Edit chart
        </Link>
        <span
          onClick={() => {
            downloadPNG();
            setPopUpOpen(false);
          }}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Save as PNG
        </span>
        <span
          onClick={() => {
            downloadPDF();
            setPopUpOpen(false);
          }}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Save as PDF
        </span>
        <span
          onClick={() => {
            setPopUpOpen(false);
            handleDuplicate();
          }}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Duplicate
        </span>
        <span
          onClick={() => {
            setPopUpOpen(false);
            setOpen(true);
          }}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Delete
        </span>
      </PopoverContent>
      <DeleteChartModal
        title={chart.title}
        open={open}
        onClose={handleCloseModal}
        userId={userId}
        reportId={reportId}
        chartId={chart._id}
      />
    </Popover>
  );
};

export default ChartActions;
