"use client";

import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import Actions from "@/components/Actions";

const Page = () => {
  const [active, setActive] = useState("shared");
  const rows = [
    {
      image: "/assets/csv.svg",
      name: "Sample - Retail Orders",
      datatype: "CSV",
      size: "12 mb",
      rows: "11.7 k",
      columns: 21,
      lastLoad: "8 hours ago",
      actions: <Actions />,
    },
    {
      image: "/assets/xls.svg",
      name: "Sample - Retail Orders",
      datatype: "CSV",
      size: "12 mb",
      rows: "11.7 k",
      columns: 21,
      lastLoad: "8 hours ago",
      actions: <Actions />,
    },
  ];
  return (
    <section className="h-screen bg-[#F6F8FA] text-sm">
      <div className="px-7 py-5 border-b border-[#EAEDF2] flex justify-between items-center">
        <div className="flex items-center justify-between w-[423px] text-sm">
          <div className="w-[180px] flex px-[5px] py-1 rounded bg-white border border-[#EAEDF2]">
            <button
              className={`px-[12px] py-[6px] ${
                active === "all" &&
                "bg-primary text-white rounded border border-[#EAEDF2] font-medium"
              }`}
              onClick={() => setActive("all")}
            >
              All
            </button>
            <button
              className={`px-[12px] py-[6px] ${
                active === "mine" &&
                "bg-primary text-white rounded border border-[#EAEDF2] font-medium"
              }`}
              onClick={() => setActive("mine")}
            >
              Mine
            </button>
            <button
              className={`px-[12px] py-[6px] ${
                active === "shared" &&
                "bg-primary text-white rounded border border-[#EAEDF2] font-medium"
              }`}
              onClick={() => setActive("shared")}
            >
              Shared
            </button>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="scheduled" id="scheduled" />{" "}
            <span>Scheduled</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="scheduled" id="scheduled" />{" "}
            <span>Has Load Errors</span>
          </div>
        </div>
        <div className="flex gap-3 rounded">
          <div className="flex gap-2 w-[380px] border border-[#EAEDF2] bg-white rounded pr-[100px] pl-2">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              placeholder="Search Data"
              className="px-2 py-[10px]"
            />
          </div>
          <Link href="data/new" className="">
            <Button>
              <div className="flex gap-[10px] w-[184px] h-10 py-2 px-4 items-center justify-center">
                <Image
                  src="/assets/plus-icon.svg"
                  width={24}
                  height={24}
                  alt="plus icon"
                />
                <span>Add New Dataset</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <section className="px-7 py-4">
        <table className="p-5 flex flex-col bg-white rounded border border-[#EAEDF2] text-sm text-[#17212F]">
          {/* row */}
          <thead>
            <tr className="flex self-stretch items-start rounded bg-[#F8FAFC] border-b font-medium">
              <th className="w-[70px] py-5 flex items-center justify-center font-medium">
                Type
              </th>
              <th className="w-[240px] p-5 flex items-center font-medium">
                Name
              </th>
              <th className="w-[150px] p-5 flex items-center font-medium">
                Datatype
              </th>
              <th className="w-[150px] p-5 flex items-center font-medium">
                Size
              </th>
              <th className="w-[150px] p-5 flex items-center font-medium">
                Rows
              </th>
              <th className="w-[150px] p-5 flex items-center font-medium">
                Columns
              </th>
              <th className="w-[150px] p-5 flex items-center justify-between font-medium">
                <span>Last Load</span>
                <Image
                  src="/assets/chevron-down.svg"
                  alt="down icon"
                  width={20}
                  height={20}
                />
              </th>
              <th className="w-[220px] p-5 flex items-center justify-center font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="flex self-stretch items-start rounded border-b font-medium"
              >
                <td className="w-[70px] py-[10px] flex items-center justify-center">
                  <Image
                    src={row.image}
                    alt="csv file"
                    width={26}
                    height={26}
                  />
                </td>
                <td className="w-[240px] p-5 flex items-center text-blue-500">
                  {row.name}
                </td>
                <td className="w-[150px] p-5 flex items-center">
                  {row.datatype}
                </td>
                <td className="w-[150px] p-5 flex items-center">{row.size}</td>
                <td className="w-[150px] p-5 flex items-center">{row.rows}</td>
                <td className="w-[150px] p-5 flex items-center">
                  {row.columns}
                </td>
                <td className="w-[150px] p-5 flex items-center">
                  {row.lastLoad}
                </td>
                <td className="w-[220px] p-5 flex items-center justify-center">
                  {row.actions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <div className="flex justify-between items-center px-7 py-2">
        <div className="text-[#ADB3BB]">Showing 1-2 of 2</div>
        <div className="p-[10px] flex justify-center items-center gap-[5px] rounded border border-[#EAEDF2] bg-white">
          <div className="py-[6px] px-3 bg-[#DEE8FA] cursor-pointer">1</div>
          <div className="py-[6px] px-3 cursor-pointer">2</div>
          <div className="py-[6px] px-3 cursor-pointer">
            <Image
              src="/assets/chevron-right.svg"
              alt="more"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
