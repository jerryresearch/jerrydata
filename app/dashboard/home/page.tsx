"use client";

import Actions from "@/components/Actions";
import RecentChat from "@/components/RecentChat";
import ReportCard from "@/components/ReportCard";
import Image from "next/image";
import React from "react";

const page = () => {
  const reports = [
    {
      name: "Spellmint Analytics",
      chartsCount: 0,
      lastModified: "0 days",
      charts: [],
    },
    {
      name: "Hurrae Analytics",
      chartsCount: 6,
      lastModified: "2 days",
      charts: [
        "Total No. of Website Visitors",
        "No. of Signups to Hurrae Infinity",
      ],
    },
  ];

  const rows = [
    {
      image: "/assets/csv.svg",
      name: "Sample - Retail Orders",
      datatype: "CSV",
      size: "12 mb",
      rows: "11.7 k",
      columns: 21,
      lastLoad: "8 hours ago",
    },
    {
      image: "/assets/xls.svg",
      name: "Sample - Retail Orders",
      datatype: "CSV",
      size: "12 mb",
      rows: "11.7 k",
      columns: 21,
      lastLoad: "8 hours ago",
    },
  ];

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <header className="flex py-5 px-7 flex-col justify-center items-start gap-6">
        <div className="h-[82px] flex justify-between self-stretch rounded-[8px] border border-[#EAEDF2] bg-white text-[#17212F] text-2xl">
          <p className="font-semibold my-6 mx-8">Welcome, Manoj.</p>
          <Image
            src="/assets/nav-icon.svg"
            alt="icon"
            width={510}
            height={255}
          />
        </div>
      </header>
      <div className="flex flex-col p-6 justify-center items-start gap-6">
        <h1 className="text-base font-medium">Recent Reports</h1>
        <div className="flex items-center gap-6">
          {reports.map((report, index) => (
            <ReportCard key={index} {...report} />
          ))}
        </div>
      </div>
      <div className="flex flex-col p-6 justify-center items-start gap-6">
        <h1 className="text-base font-medium">Recent Datasets</h1>
        <div className="p-5 w-full rounded border border-[#EAEDF2] bg-white">
          <table className="w-full table-auto min-w-max text-left bg-white rounded text-sm text-[#17212F]">
            {/* row */}
            <thead>
              <tr className="rounded bg-[#F8FAFC] border-b font-medium">
                <th className="p-5 font-medium">Type</th>
                <th className="p-5 font-medium">Name</th>
                <th className="p-5 font-medium">Datatype</th>
                <th className="p-5 font-medium">Size</th>
                <th className="p-5 font-medium">Rows</th>
                <th className="p-5 font-medium">Columns</th>
                <th className="flex justify-between p-5 font-medium">
                  <span>Last Load</span>
                  <Image
                    src="/assets/chevron-down.svg"
                    alt="down icon"
                    width={20}
                    height={20}
                  />
                </th>
                <th className="p-5 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="rounded border-b font-medium">
                  <td className="p-5">
                    <Image
                      src={row.image}
                      alt="csv file"
                      width={26}
                      height={26}
                    />
                  </td>
                  <td className="p-5 text-blue-500">{row.name}</td>
                  <td className="p-5">{row.datatype}</td>
                  <td className="p-5">{row.size}</td>
                  <td className="p-5">{row.rows}</td>
                  <td className="p-5">{row.columns}</td>
                  <td className="p-5">{row.lastLoad}</td>
                  <td className="p-5">
                    <Actions name={row.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col p-6 justify-center items-start gap-6">
        <h1 className="text-base font-medium">Recent Chats</h1>
        <div className="grid grid-cols-2 items-center gap-6 w-full">
          <RecentChat
            name="Analytics for sales of hurrae"
            lastModified="5 days"
          />
          <RecentChat
            name="Analytics for sales of hurrae"
            lastModified="5 mins"
          />
        </div>
      </div>
    </section>
  );
};

export default page;
