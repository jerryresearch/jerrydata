"use client";

import React, { useState } from "react";
import Datasets from "./Datasets";
import Filters from "./Filters";
import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

type Props = {
  datasets: Dataset[];
  userId: string;
};

const DatasetsContainer = ({ datasets, userId }: Props) => {
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
    <section className="h-screen bg-[#F6F8FA] text-sm">
      <div className="sticky top-0 px-7 py-5 border-b border-[#EAEDF2] flex justify-between items-center">
        <div className="flex items-center justify-between w-[423px] text-sm">
          <Filters />
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
              onChange={(e) => handleSearch(e.target.value)}
              className="px-2 py-[10px] focus:outline-none"
            />
          </div>
          <Link href="data/new/connection-type" className="">
            <Button isLoading={false}>
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
      <section className="w-full px-7 py-4">
        <Datasets datasets={filteredDatasets} userId={userId} />
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

export default DatasetsContainer;
