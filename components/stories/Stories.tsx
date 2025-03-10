"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Story from "./Story";
// import KPIStory from "./KPIStory";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import generatePDF, { Margin } from "react-to-pdf";

type Props = {
  datasets: Dataset[];
  stories: Story[];
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

function groupObjectsByDate(objects: Story[]) {
  const groupedObjects: { [key: string]: Story[] } = {};

  objects.forEach((obj) => {
    const createdAt = obj.createdAt.split("T")[0]; // Extracting date part only
    if (!groupedObjects[createdAt]) {
      groupedObjects[createdAt] = [obj];
    } else {
      groupedObjects[createdAt].push(obj);
    }
  });

  return groupedObjects;
}

const Stories = ({ datasets, stories }: Props) => {
  const [selectedDatasets, setSelectedDatasets] = useState<Dataset[]>(datasets);
  const datasetIds = selectedDatasets.map((dataset) => dataset._id);

  const groupedStories = groupObjectsByDate(
    stories.filter((story) => datasetIds.includes(story.dataset))
  );

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

  const options = {
    page: {
      margin: Margin.LARGE,
    },
    filename: `stories.pdf`,
  };

  const htmlToPDF = () => {
    const getTargetElement = () => document.getElementById("stories-container");
    generatePDF(getTargetElement, options);
  };

  const kpis = [
    "increase",
    "decrease",
    "increase",
    "increase",
    "decrease",
    "increase",
    "decrease",
  ];

  return (
    <section className="text-[#080D19] flex flex-col gap-6">
      {/* <Carousel
        className="flex flex-col gap-6"
        opts={{
          align(viewSize, snapSize, index) {
            return 1;
          },
        }}
      >
        <div className="flex justify-between">
          <h1 className="font-medium text-xl">KPI Stories</h1>
          <div className="flex gap-[20px]">
            <CarouselPrevious variant="ghost" />
            <CarouselNext variant="ghost" />
          </div>
        </div>
        <CarouselContent>
          {kpis.map((kpi, index) => (
            <CarouselItem key={index} className="lg:basis-1/4">
              <KPIStory type={kpi} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
      {/* <div className="bg-[#EEEEFF] h-px"></div> */}
      <section className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
        <Popover>
          <PopoverTrigger className="flex w-full md:w-[298px] h-[42px] py-2 px-3 justify-between items-center rounded border border-[#EEEEFF] bg-white">
            <span className="text-sm truncate max-w-[138px]">
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
                    className="accent-primary"
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
            <span className="text-[#61656C] font-medium text-sm md:text-base">
              Refresh
            </span>
          </button>
          <button
            onClick={() => htmlToPDF()}
            className="flex bg-primary text-white rounded items-center px-4 py-2 h-[42px] gap-2"
          >
            <Image
              src="/assets/story-book.svg"
              alt="chevron down icon"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <span className="text-sm md:text-base">Download Storybook</span>
          </button>
        </div>
      </section>
      <section id="stories-container">
        {Object.keys(groupedStories).map((date, index) => (
          <div key={index}>
            <span className="font-medium text-xl">{formatDate(date)}</span>
            <div className="flex flex-col gap-6 my-6">
              {/* @ts-ignore */}
              {groupedStories[date].map((story, ind) => (
                <div key={ind}>
                  <Story story={story} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Stories;
