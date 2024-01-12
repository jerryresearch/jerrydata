import React from "react";

import Link from "next/link";
import ReportsActions from "./ReportsActions";
import { formatLastLoad } from "@/lib/formatDatasets";

type Props = {
  userId: string;
  report: Reports;
};

const ReportCard = ({ userId, report }: Props) => {
  const { _id, name, chartsCount, updatedAt, charts } = report;
  return (
    <div className="flex h-[260px] font-medium pt-5 flex-col justify-end items-center flex-shrink-0 rounded-[8px] border border-[#EAEDF2] bg-white">
      <div className="flex w-11/12 py-5 px-[18px] justify-between items-center rounded  bg-[#F8FAFC]">
        <Link href={`reports/${name}/?id=${_id}`}>
          {name.length > 26 ? name.substring(0, 26) + "..." : name}
        </Link>
        <ReportsActions report={report} userId={userId} />
      </div>
      {charts.length < 0 ? (
        <div className="w-full min-h-[120px]">
          <div className="flex w-full py-5 px-8 gap-8 flex-[1_0_0] border-b border-[#EAEDF2]">
            {charts[0]}
          </div>
          <div className="flex w-full py-5 px-8 gap-8 flex-[1_0_0] border-b border-[#EAEDF2]">
            {charts[1]}
          </div>
          <p></p>
        </div>
      ) : (
        <div className="flex w-full px-8 min-h-[120px] py-5 justify-center items-center gap-8 flex-[1_0_0] border-b border-b-[#EAEDF2]">
          <p className="text-[#ADB3BB] text-sm">No summary</p>
        </div>
      )}
      <div className="flex w-full justify-between items-center flex-[1_0_0] py-5 px-8 text-[#ADB3BB] text-sm">
        <p>{chartsCount == 0 ? "No" : chartsCount} charts</p>
        <p>Modified {formatLastLoad(updatedAt)}</p>
      </div>
    </div>
  );
};

export default ReportCard;
