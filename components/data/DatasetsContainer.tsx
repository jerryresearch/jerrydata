"use client";

import React, { useState } from "react";
import Datasets from "./Datasets";
import Image from "next/image";
import Link from "next/link";

type Props = {
  datasets: Dataset[];
  userId: string;
};

const DatasetsContainer = ({ datasets, userId }: Props) => {
  const [page, setPage] = useState(1);
  const [filteredDatasets, setFilteredDatasets] = useState(datasets);

  const handleSearch = (query: string) => {
    if (query == "") {
      setFilteredDatasets(datasets);
    } else {
      setFilteredDatasets(
        datasets.filter((dataset) =>
          dataset.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <section className="text-sm py-6 px-[60px] text-[#080D19]">
      <h1 className="font-medium text-2xl">Connectors</h1>
      <div className="h-[90px] py-6">
        <div className="flex w-full justify-between">
          <div className="flex gap-2 border border-[#EEEEFF] rounded-[6px] h-[42px] w-[380px] px-2 py-[10px]">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              placeholder="Search Data"
              onChange={(e) => handleSearch(e.target.value)}
              className="focus:outline-none flex-1"
            />
          </div>
          <div className="flex gap-4">
            <button className="flex h-[42px] rounded-[6px] gap-[6px] items-center px-5 bg-[#F1F1F1] font-medium">
              <Image
                src="/assets/refresh.svg"
                alt="chevron down icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <span className="text-[#61656C]">Refresh</span>
            </button>
            <Link
              href={"connectors/new/connection-type"}
              className="flex bg-primary text-white rounded items-center px-4 py-2 h-[42px] gap-2"
            >
              <Image
                src="/assets/plus-icon.svg"
                alt="add connection icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <span>New Connection</span>
            </Link>
          </div>
        </div>
      </div>
      <Datasets datasets={filteredDatasets} userId={userId} />
      {datasets.length > 1 && (
        <div className="flex justify-between items-center py-6">
          <div className="text-[#A9AAAE]">Showing 1-2 of 2</div>
          <div className="py-[10px] px-2 flex gap-[5px] rounded-[6px]">
            <div className="py-[2px] px-3 bg-[#EEEEFF] rounded -[6px] font-medium cursor-pointer">
              1
            </div>
            <div className="py-[2px] px-3 cursor-pointer">2</div>
            <div className="py-[2px] cursor-pointer">
              <Image
                src="/assets/ellipsis.svg"
                alt="more"
                width={24}
                height={20}
              />
            </div>
            <div className="py-[2px] px-3 cursor-pointer">23</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DatasetsContainer;
