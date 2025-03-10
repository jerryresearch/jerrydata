"use client";

import React, { useRef, useState } from "react";
import ChartActions from "./ChartActions";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutGraph";
import PloarAreaChart from "./PolarAreaChart";
import HorizontalBarChart from "./HorizontalBarChart";
import Image from "next/image";
import updateChart from "@/lib/charts/updateChart";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";
import generatePDF, { Margin } from "react-to-pdf";
import { useToast } from "../ui/use-toast";

type Props = {
  chart: Chart;
};

const Chart = ({ chart }: Props) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;
  const reportId = searchParams.get("id") || "";
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chart.title);

  const elementRef = useRef(null);
  const options = {
    page: {
      margin: Margin.LARGE,
    },
    filename: `${title}.pdf`,
  };

  const handleUpdate = async () => {
    try {
      let data = chart;
      data.title = title;
      const res = await updateChart(userId, reportId, chart._id, data);
      setIsEditing(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue updating the name. Please try again later.",
      });
      // console.log(error);
    }
  };

  const htmlToImageConvert = () => {
    // @ts-ignore
    toPng(elementRef?.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${title}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error: any) => {
        toast({
          variant: "destructive",
          title: `Uh oh! ${error.message}.`,
          description: "Please try again later.",
        });
        // console.log(error);
      });
  };

  const htmlToPDF = () => {
    const getTargetElement = () => document.getElementById(chart._id);
    generatePDF(getTargetElement, options);
  };

  return (
    <section
      id={chart._id}
      ref={elementRef}
      className="w-full h-full rounded-[6px] border border-[#EEEEFF] flex flex-col text-[10px] py-4 font-medium items-center justify-center gap-[10px]"
    >
      <div className="flex items-center w-full px-8">
        <header className="flex-1 text-base h-5 2xl:h-10 text-center">
          {isEditing ? (
            <span className="flex justify-center gap-[10px]">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-[240px] border border-[#EAEDF2] py-1 2xl:py-2 px-3 rounded focus:outline-none font-normal"
              />
              <span
                onClick={handleUpdate}
                className="bg-primary cursor-pointer w-7 flex items-center justify-center 2xl:w-10 2xl:h-10 rounded"
              >
                <Image
                  src="/assets/check-icon.svg"
                  alt="confirm icon"
                  width={16}
                  height={16}
                />
              </span>
              <span
                onClick={() => setIsEditing(false)}
                className="w-7 cursor-pointer border border-[#DEE8FA] flex items-center justify-center 2xl:w-10 2xl:h-10 rounded"
              >
                <Image
                  src="/assets/dismiss.svg"
                  alt="cancel icon"
                  width={16}
                  height={16}
                />
              </span>
            </span>
          ) : (
            <span className="cursor-pointer" onClick={() => setIsEditing(true)}>
              {/* {chart.title} */}
              {chart.title.length > 40
                ? chart.title.substring(0, 40) + "..."
                : chart.title}
            </span>
          )}
        </header>
        <div className="justify-self-end">
          <ChartActions
            chart={chart}
            downloadPNG={htmlToImageConvert}
            downloadPDF={htmlToPDF}
          />
        </div>
      </div>
      <div className="w-full flex-1 flex items-center">
        {chart.chartType == "bar" ? (
          <BarChart data={chart} />
        ) : chart.chartType == "line" ? (
          <LineChart data={chart} />
        ) : chart.chartType == "pie" ? (
          <PieChart data={chart} />
        ) : chart.chartType == "doughnut" ? (
          <DoughnutChart data={chart} />
        ) : chart.chartType == "polar area" ? (
          <PloarAreaChart data={chart} />
        ) : (
          <HorizontalBarChart data={chart} />
        )}
      </div>
    </section>
  );
};

export default Chart;
