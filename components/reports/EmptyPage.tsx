"use client";

import Image from "next/image";
import React, { useState } from "react";
import AddReportModal from "./AddReportModal";
import AutoGenerateModal from "./AutoGenerateModal";

type Props = {
  userId: string;
  datasets: Dataset[];
};

const EmptyPage = ({ userId, datasets }: Props) => {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [openAutoGenerate, setOpenAutoGenerate] = useState(false);

  const handleCloseModalAutoGenerate = () => {
    setOpenAutoGenerate(false);
  };

  return (
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
          <button
            onClick={() => setOpen(true)}
            className="w-[210px] h-[40px] flex items-center justify-center gap-[10px] self-stretch px-4 py-2 rounded bg-primary text-white"
          >
            Add Report
          </button>
          <button
            onClick={() => setOpenAutoGenerate(true)}
            className="w-[210px] h-[40px] flex items-center justify-center gap-[10px] self-stretch px-4 py-2 rounded bg-[#17212F] text-white"
          >
            Generate Auto Report
          </button>
        </div>
      </div>
      <AddReportModal open={open} onClose={handleCloseModal} userId={userId} />
      <AutoGenerateModal
        open={openAutoGenerate}
        onClose={handleCloseModalAutoGenerate}
        datasets={datasets}
        userId={userId}
      />
    </section>
  );
};

export default EmptyPage;
