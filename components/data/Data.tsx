"use client";

import Image from "next/image";
import React, { useState } from "react";
import EditHeader from "./edit/EditHeader";

type Props = {
  records: any[];
  dataset: Dataset;
  userName: string;
  headers: [
    {
      name: string;
      datatype: string;
      isDisabled: boolean;
      isHidden: boolean;
    }
  ];
};

const Data = ({ records, headers, dataset, userName }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  const filteredRecords = records.filter((record) =>
    // @ts-ignore
    Object.values(record).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  return (
    <section className="flex flex-col gap-4 text-[#080D19]">
      <EditHeader dataset={dataset} type="data" userName={userName} />
      <div className="flex gap-[10px] px-2 py-[10px] rounded-[6px] border border-[#EEEEFF] h-[42px] w-[380px]">
        <Image
          src="/assets/search-icon.svg"
          alt="search icon"
          width={16}
          height={16}
        />
        <input
          type="text"
          placeholder="Search Data"
          onChange={(e) => setSearchInput(e.target.value)}
          className="focus:outline-none flex-1"
        />
      </div>
      <div className="py-4">
        <section className="w-full overflow-auto rounded-[6px] border border-[#EAEDF2] bg-white">
          <table className="w-full table-auto min-w-max text-left bg-white rounded-[6px]">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-[#EEEEFF]">
                {headers
                  .filter((header) => !header.isDisabled && !header.isHidden)
                  .map((head, index: number) => (
                    <th
                      key={index}
                      className="font-normal rounded bg-[F8FAFC] p-5 gap-2"
                    >
                      {head.name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value: any, index: number) => (
                    <td
                      key={index}
                      className="text-[#080D19] p-5 gap-2 border-b border-b-[#EEEEFF]"
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </section>
  );
};

export default Data;
