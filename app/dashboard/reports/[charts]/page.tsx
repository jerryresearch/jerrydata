"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import AnalyticCard from "@/components/AnalyticCard";
import BarChart from "@/components/charts/BarChart";
import ShareChartModal from "@/components/ShareChartModal";
import StackedBarChart from "@/components/charts/StackedBarChart";
import HorizontalBarChart from "@/components/charts/HorizontalBarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import DoughnutChart from "@/components/charts/DoughnutGraph";
import PloarAreaChart from "@/components/charts/PolarAreaChart";
import { usePathname } from "next/navigation";
import ChartActions from "@/components/charts/ChartActions";

const Page = () => {
  const [chartCount, setChartCount] = useState(1);
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

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

  const pieData = {
    retail: 30,
    wholesale: 10,
    distribution: 40,
    credit: 60,
    workingCapital: 65,
  };

  const horizontalData = {
    Asia: {
      retail: 800,
      wholesale: -200,
      distribution: 100,
    },
    Europe: {
      retail: 700,
      wholesale: 200,
      distribution: -300,
    },
    Africa: {
      retail: -800,
      wholesale: 500,
      distribution: 80,
    },
    "North America": {
      retail: 200,
      wholesale: 100,
      distribution: 150,
    },
  };

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">Reports</h1>
      </div>
      <div className="flex h-[80px] py-5 px-7 justify-between items-center border-b border-b-[#EAEDF2]">
        <Link href="/dashboard/reports">
          <p className="flex items-center gap-2">
            <Image
              src="/assets/chevron-left.svg"
              alt="back icon"
              width={20}
              height={20}
            />
            <span>RaptorIQ Analytics</span>
          </p>
        </Link>
        <div className="w-[323px] h-10 text-sm flex gap-2">
          <button
            className={`inline-flex h-full py-2 px-4 justify-center items-center gap-[10px] flex-shrink-0 rounded border border-[#DEE8FA] bg-white ${
              chartCount == 0 && "opacity-50"
            }`}
          >
            Refresh
          </button>
          <button
            className={`inline-flex h-full py-2 px-4 justify-center items-center gap-[10px] flex-shrink-0 rounded border border-[#DEE8FA] bg-white ${
              chartCount == 0 && "opacity-50"
            }`}
            onClick={() => {
              if (chartCount > 0) {
                setOpen(true);
              }
            }}
          >
            Share Report
          </button>
          <Link
            href={`${pathname}/new`}
            className="inline-flex h-full py-2 px-4 justify-center items-center gap-[10px] flex-shrink-0 rounded bg-primary text-white"
          >
            Add Chart
          </Link>
          <ShareChartModal open={open} onClose={handleCloseModal} />
        </div>
      </div>
      {chartCount > 0 ? (
        <section className="my-6 px-7 flex flex-col gap-6">
          <div className="grid grid-cols-4 gap-6">
            <AnalyticCard name="Key Analytic 1" value="324" />
            <AnalyticCard name="Key Analytic 2" value="40 Hours" />
            <AnalyticCard name="Key Analytic 3" value="23" />
            <AnalyticCard name="Key Analytic 4" value="43 Million" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
              <div className="flex items-center w-full px-8">
                <header className="flex-1 text-base text-center">
                  Unit Cost by Region
                </header>
                <div className="justify-self-end">
                  <ChartActions />
                </div>
              </div>
              <BarChart data={data} />
            </section>
            <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
              <div className="flex items-center w-full px-8">
                <header className="flex-1 text-base text-center">
                  Unit Cost by Region
                </header>
                <div className="justify-self-end">
                  <ChartActions />
                </div>
              </div>
              <StackedBarChart data={data} />
            </section>
            <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
              <div className="flex items-center w-full px-8">
                <header className="flex-1 text-base text-center">
                  Unit Cost by Region
                </header>
                <div className="justify-self-end">
                  <ChartActions />
                </div>
              </div>
              <HorizontalBarChart data={horizontalData} />
            </section>
            <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
              <div className="flex items-center w-full px-8">
                <header className="flex-1 text-base text-center">
                  Unit Cost by Region
                </header>
                <div className="justify-self-end">
                  <ChartActions />
                </div>
              </div>
              <LineChart data={data} />
            </section>
            <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
              <div className="flex items-center w-full px-8">
                <header className="flex-1 text-base text-center">
                  Unit Cost by Region
                </header>
                <div className="justify-self-end">
                  <ChartActions />
                </div>
              </div>
              <PieChart data={pieData} />
            </section>
            <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
              <div className="flex items-center w-full px-8">
                <header className="flex-1 text-base text-center">
                  Unit Cost by Region
                </header>
                <div className="justify-self-end">
                  <ChartActions />
                </div>
              </div>
              <DoughnutChart data={pieData} />
            </section>
            <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
              <div className="flex items-center w-full px-8">
                <header className="flex-1 text-base text-center">
                  Unit Cost by Region
                </header>
                <div className="justify-self-end">
                  <ChartActions />
                </div>
              </div>
              <PloarAreaChart data={pieData} />
            </section>
          </div>
        </section>
      ) : (
        <section className="flex h-[calc(100vh-129px)] py-5 px-7 items-center justify-center gap-5 flex-shrink-0">
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/assets/no-reports.svg"
              alt="no reports"
              width={82}
              height={88}
            />
            <div className="flex flex-col items-center">
              <h1 className="text-[#17212F] text-xl font-semibold gap-[10px]">
                No Charts
              </h1>
              <p className="text-[#ADB3BB] text-sm mt-[10px]">
                You can add a chart to the report.
              </p>
            </div>
            <div className="inline-flex flex-col justify-center items-center gap-[10px]">
              <button className=" h-[36px] flex items-center justify-center gap-[10px] self-stretch px-4 py-2 rounded bg-primary text-white">
                Add Chart
              </button>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default Page;
