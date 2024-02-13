"use client";

import React, { useState } from "react";
import AddReportModal from "@/components/reports/AddReportModal";
import ReportCard from "@/components/reports/ReportCard";
import Image from "next/image";
import AutoGenerateModal from "./AutoGenerateModal";
import Loading from "../Loading";

type Props = {
  reports: Reports[];
  userId: string;
  datasets: Dataset[];
};

const Reports = ({ reports, userId, datasets }: Props) => {
  const [filteredReports, setFilteredReports] = useState(reports);
  const handleSearch = (query: string) => {
    if (query == "") {
      setFilteredReports(reports);
    } else {
      setFilteredReports(
        reports.filter((report) =>
          report.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

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
    <section>
      <div className=" py-5 px-[60px] flex items-center justify-between border-b border-[#EEEEFF]">
        <h1 className="font-medium text-2xl">Dashboards</h1>
        <div className="flex gap-4">
          <div className="flex px-2 gap-2 items-center border border-[#EEEEFF] w-[340px] h-[42px] rounded-[6px]">
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
              onChange={(e) => handleSearch(e.target.value)}
              className="focus:outline-none"
            />
          </div>
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
      <div className="grid grid-cols-4 py-5 px-[60px] items-center gap-5 justify-between">
        {filteredReports.map((report, index) => (
          <ReportCard userId={userId} report={report} key={index} />
        ))}
      </div>
      <AddReportModal open={open} userId={userId} onClose={handleCloseModal} />
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

export default Reports;
