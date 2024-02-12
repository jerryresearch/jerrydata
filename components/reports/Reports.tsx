"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
                <li className="flex gap-2 items-center w-full px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                  Last modified date
                </li>
                <li className="flex gap-2 items-center w-full px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                  Title, A to Z
                </li>
                <li className="flex gap-2 items-center w-full px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
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
                onChange={(e) => handleSearch(e.target.value)}
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
          <button
            onClick={() => setOpenAutoGenerate(true)}
            className="flex h-[40px] py-2 px-4 items-center justify-center gap-[10px] bg-[#17212F] text-white rounded"
          >
            Auto Generate Report
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 py-5 px-7 items-center gap-5 justify-between">
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
