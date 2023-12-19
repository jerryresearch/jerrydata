"use client";
import React from "react";
import AnalyticCard from "../AnalyticCard";
import Header from "./Header";
import Chart from "./Chart";

type Props = {
  charts: Chart[];
  report: Reports;
};

const ChartsContainer = ({ charts, report }: Props) => {
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
            <Chart chart={chart} key={index} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ChartsContainer;
