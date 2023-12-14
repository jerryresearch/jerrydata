"use client";
import React from "react";
import AnalyticCard from "../AnalyticCard";
import ChartActions from "./ChartActions";
import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";
import HorizontalBarChart from "./HorizontalBarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutGraph";
import PloarAreaChart from "./PolarAreaChart";
import Header from "./Header";

type Props = {
  charts: Chart[];
  report: Reports;
};

const ChartsContainer = ({ charts, report }: Props) => {
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
    <section>
      <Header name={report.name} chartsCount={charts.length} />
      <section className="my-6 px-7 flex flex-col gap-6">
        <div className="grid grid-cols-4 gap-6">
          <AnalyticCard name="Key Analytic 1" value="324" />
          <AnalyticCard name="Key Analytic 2" value="40 Hours" />
          <AnalyticCard name="Key Analytic 3" value="23" />
          <AnalyticCard name="Key Analytic 4" value="43 Million" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charts.map((chart, index) => (
            <section
              key={index}
              className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]"
            >
              <div className="flex items-center w-full px-8">
                <header className="flex-1 text-base text-center">
                  {chart.title}
                </header>
                <div className="justify-self-end">
                  <ChartActions chartId={chart._id} />
                </div>
              </div>
              {chart.chartType == "Bar" ? (
                <BarChart data={chart} />
              ) : chart.chartType == "Line" ? (
                <LineChart data={chart} />
              ) : chart.chartType == "Pie" ? (
                <PieChart data={chart} />
              ) : (
                <DoughnutChart data={chart} />
              )}
            </section>
          ))}
          {/* <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
            <div className="flex items-center w-full px-8">
              <header className="flex-1 text-base text-center">
                Unit Cost by Region
              </header>
              <div className="justify-self-end">
                <ChartActions />
              </div>
            </div>
            <BarChart data={data} />
          </section> */}
          {/* <section className="w-full rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] py-4 font-semibold items-center justify-center gap-[10px]">
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
          </section> */}
        </div>
      </section>
    </section>
  );
};

export default ChartsContainer;
