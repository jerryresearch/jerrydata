"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Story from "./Story";

type Props = {
  datasets: Dataset[];
};

const Stories = ({ datasets }: Props) => {
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>(datasets);

  const handleSelect = (dataset: Dataset) => {
    if (selectedDatasets.includes(dataset)) {
      const currDatasets = selectedDatasets.filter(
        (currDataset) => currDataset._id !== dataset._id
      );
      setSelectedDatasets(currDatasets);
    } else {
      setSelectedDatasets([...selectedDatasets, dataset]);
    }
  };

  return (
    <section>
      <div className="fixed md:left-16 right-0 flex justify-between items-center py-5 px-7 border-b border-[#EAEDF2]">
        <Popover>
          <PopoverTrigger className="flex w-[400px] h-10 py-2 px-3 justify-between items-center rounded border border-[#EAEDF2] bg-white">
            <span className="text-sm truncate ">
              {selectedDatasets.length > 0
                ? selectedDatasets.map((dataset) => dataset.name).join(", ")
                : "Select Dataset"}
            </span>
            <Image
              src="/assets/chevron-down.svg"
              alt="chevron down icon"
              width={16}
              height={16}
            />
          </PopoverTrigger>
          <PopoverContent className="w-fit max-w-[400px] min-w-[204px] max-h-[208px] overflow-auto py-[14px] px-[10px] shadow-custom bg-white rounded">
            <ul className="text-sm font-normal flex-shrink-0 flex flex-col items-start">
              {datasets.map((dataset, index) => (
                <li
                  key={index}
                  className="flex w-full px-2 items-center justify-center gap-[10px]"
                  onClick={() => handleSelect(dataset)}
                >
                  <input
                    type="checkbox"
                    name={dataset._id}
                    id={dataset._id}
                    readOnly
                    checked={selectedDatasets.includes(dataset)}
                  />
                  <label
                    htmlFor={dataset._id}
                    className="flex gap-2 truncate items-center w-full px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded"
                  >
                    {dataset.name}
                  </label>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
        <div>
          <button className="bg-primary text-white rounded px-2 py-1">
            Refresh
          </button>
        </div>
      </div>
      <div className="pt-28 px-7 flex flex-col gap-6">
        <span>9 new stories | Unread</span>
        <p>Select items to build pool deck</p>
        <Story />
      </div>
    </section>
  );
};

export default Stories;
