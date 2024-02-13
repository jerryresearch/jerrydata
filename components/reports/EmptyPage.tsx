"use client";

import Image from "next/image";
import React, { useState } from "react";
import AddReportModal from "./AddReportModal";
import AutoGenerateModal from "./AutoGenerateModal";
import Loading from "../Loading";

type Props = {
  userId: string;
  datasets: Dataset[];
};

const EmptyPage = ({ userId, datasets }: Props) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [openAutoGenerate, setOpenAutoGenerate] = useState(false);

  const handleCloseModalAutoGenerate = () => {
    setOpenAutoGenerate(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col w-full h-[calc(100vh-56px)] flex-shrink-0">
      <div className=" py-5 px-[60px] flex items-center justify-between border-b border-[#EEEEFF]">
        <h1 className="font-medium text-2xl">Dashboards</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setOpenAutoGenerate(true)}
            className="flex gap-[6px] items-center bg-[#F1F1F1] py-1 px-[14px] h-[42px] rounded-[6px]"
          >
            <Image
              src="/assets/magic-dashboard.svg"
              alt="magic dashboard"
              width={20}
              height={20}
            />
            <span className="font-medium text-[#61656C]">Magic Dashboard</span>
          </button>
          <button
            onClick={() => setOpen(true)}
            className="flex gap-[6px] items-center bg-primary py-1 px-[14px] h-[42px] rounded-[6px]"
          >
            <Image
              src="/assets/plus-icon.svg"
              alt="add report"
              width={20}
              height={20}
            />
            <span className="font-medium text-white">New Dashboard</span>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-[60px] items-center gap-[40px]">
        <Image
          src="/assets/no-dashboards.svg"
          alt="no reports"
          width={124}
          height={84}
        />
        <h1 className="text-[#A9AAAE] text-2xl font-medium gap-[10px]">
          No Dashboards found
        </h1>
      </div>
      <AddReportModal open={open} onClose={handleCloseModal} userId={userId} />
      <AutoGenerateModal
        open={openAutoGenerate}
        onClose={handleCloseModalAutoGenerate}
        setIsLoading={setIsLoading}
        datasets={datasets}
        userId={userId}
      />
    </section>
  );
};

export default EmptyPage;
