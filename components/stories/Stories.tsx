"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Story from "./Story";
import KPIStory from "./KPIStory";

type Props = {
  datasets: Dataset[];
};

function formatDate(date: any) {
  const currentDate = new Date();
  const inputDate = new Date(date);

  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "Today";
  } else {
    const options = { month: "long", day: "numeric", year: "numeric" };
    // @ts-ignore
    return inputDate.toLocaleDateString("en-US", options);
  }
}

const Stories = ({ datasets }: Props) => {
  const stories = {
    "2024-02-12T15:23:51.849+00:00": [1, 3],
    "2023-11-28T15:23:51.849+00:00": [2],
  };

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
    <section className="text-[#080D19] flex flex-col gap-6">
      <section className="flex flex-col gap-6">
        <div className="flex justify-between">
          <h1 className="font-medium text-xl">KPI Stories</h1>
          <div className="flex gap-[20px]">
            <Image
              src="/assets/left-arrow.svg"
              alt="chevron down icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <Image
              src="/assets/right-arrow.svg"
              alt="chevron down icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <KPIStory type="increase" />
          <KPIStory type="decrease" />
          <KPIStory type="increase" />
          <KPIStory type="increase" />
        </div>
      </section>
      <div className="bg-[#EEEEFF] h-px"></div>
      <section className="flex justify-between items-center">
        <Popover>
          <PopoverTrigger className="flex w-[298px] h-[42px] py-2 px-3 justify-between items-center rounded border border-[#EEEEFF] bg-white">
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
          <PopoverContent className="w-[298px] max-h-[208px] overflow-auto py-[14px] px-[10px] shadow-custom bg-white rounded">
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
                    className="flex-1 truncate items-center px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded"
                  >
                    {dataset.name}
                  </label>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>
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
          <button className="flex bg-primary text-white rounded px-4 py-2 h-[42px] gap-2">
            <Image
              src="/assets/story-book.svg"
              alt="chevron down icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <span>Download Storybook</span>
          </button>
        </div>
      </section>
      {Object.keys(stories).map((date, index) => (
        <div key={index}>
          <span className="font-medium text-xl">{formatDate(date)}</span>
          <div className="flex flex-col gap-6 my-6">
            {/* @ts-ignore */}
            {stories[date].map((story, ind) => (
              <div key={ind}>
                <Story />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Stories;
