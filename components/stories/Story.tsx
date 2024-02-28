"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { toPng } from "html-to-image";
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChart";
import DoughnutChart from "../charts/DoughnutGraph";
import PloarAreaChart from "../charts/PolarAreaChart";
import HorizontalBarChart from "../charts/HorizontalBarChart";
import { useToast } from "../ui/use-toast";

const data = {
  Asia: {
    retail: 800,
    wholesale: 200,
    distribution: 100,
  },
  Europe: {
    retail: 700,
    wholesale: 200,
    distribution: 300,
  },
  Africa: {
    retail: 800,
    wholesale: 500,
    distribution: 80,
  },
  "North America": {
    retail: 200,
    wholesale: 100,
    distribution: 150,
  },
};

function formatDateTime(dateTimeString: string) {
  const dateTime = new Date(dateTimeString);

  const optionsTime = { hour: "numeric", minute: "numeric" };
  const optionsDate = { day: "2-digit", month: "2-digit", year: "numeric" };

  // @ts-ignore
  const time = dateTime.toLocaleTimeString("en-US", optionsTime);
  const date = dateTime
    // @ts-ignore
    .toLocaleDateString("en-US", optionsDate)
    .replace(/\//g, "/");

  return `${time.toLowerCase()}, ${date}`;
}

type Props = {
  story: Story;
};

const Story = ({ story }: Props) => {
  const { toast } = useToast();
  const elementRef = useRef(null);

  const htmlToImageConvert = () => {
    // @ts-ignore
    toPng(elementRef?.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${story.title}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: `Uh oh! ${error.message}.`,
          description: "Please try again later.",
        });
        // console.log(error);
      });
  };

  return (
    <div
      ref={elementRef}
      className="w-full flex flex-col md:flex-row gap-4 md:gap-10 border border-[#EEEEFF] rounded-[6px] px-8 text-[#080D19]"
    >
      <div className="md:w-1/2 flex flex-col gap-5 justify-center py-6">
        <span className="text-[#A9AAAE] text-sm">
          {formatDateTime(story.createdAt)}
        </span>
        <p className="text-[#61656C]">{story.insight}</p>
        {story.impact == "positive" ? (
          <div className="flex gap-2 items-center w-full md:w-fit rounded border border-[#EEEEFF] px-4 py-2">
            <Image
              src="/assets/positive.svg"
              alt="positive"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <p>
              <span className="hidden md:inline capitalize">
                {`${story.impact}`} Impact.{" "}
              </span>
              <span>Keep up the good work.</span>
            </p>
          </div>
        ) : (
          <div className="flex gap-2 items-center w-full md:w-fit rounded border border-[#EEEEFF] px-4 py-2">
            <Image
              src="/assets/negative.svg"
              alt="negative"
              width={20}
              height={20}
              className="cursor-pointer"
            />
            <p>
              <span className="hidden md:inline capitalize">
                {`${story.impact}`} Impact.{" "}
              </span>
              <span>Time to grind.</span>
            </p>
          </div>
        )}
        <div className="flex gap-4 text-primary underline">
          <span className="cursor-pointer" onClick={() => htmlToImageConvert()}>
            Download as PNG
          </span>
          <span>Share</span>
        </div>
      </div>
      <div className="hidden md:block w-px bg-[#EEEEFF]"></div>
      <div className="md:w-1/2 py-6">
        {/* <div className="">Chart</div> */}
        <div className="w-full h-full flex items-center">
          {story.chartType == "bar" ? (
            <BarChart data={story} />
          ) : story.chartType == "line" ? (
            <LineChart data={story} />
          ) : story.chartType == "pie" ? (
            <PieChart data={story} />
          ) : story.chartType == "doughnut" ? (
            <DoughnutChart data={story} />
          ) : story.chartType == "polar area" ? (
            <PloarAreaChart data={story} />
          ) : (
            <HorizontalBarChart data={story} />
          )}
        </div>
        {/* <div className="self-start">
          <input type="checkbox" name="" id="" />
        </div> */}
      </div>
    </div>
  );
};

export default Story;
