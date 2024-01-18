"use client";
import React, { useRef } from "react";
import AnalyticCard from "../AnalyticCard";
import Header from "./Header";
import Chart from "./Chart";
import { toPng } from "html-to-image";
import generatePDF, { Margin } from "react-to-pdf";

type Props = {
  charts: Chart[];
  report: Reports;
};

const ChartsContainer = ({ charts, report }: Props) => {
  const elementRef = useRef(null);
  const options = {
    page: {
      margin: Margin.MEDIUM,
    },
    filename: `${report.name}.pdf`,
  };

  const htmlToImageConvert = () => {
    console.log("start");
    // @ts-ignore
    toPng(elementRef?.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${report.name}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("done");
  };

  const htmlToPDF = () => {
    const getTargetElement = () => document.getElementById(report._id);
    generatePDF(getTargetElement, options);
  };

  return (
    <section>
      <Header
        onDownloadPNG={htmlToImageConvert}
        onDownloadPDF={htmlToPDF}
        name={report.name}
        chartsCount={charts.length}
      />
      <section className="my-6 px-7 flex flex-col gap-6">
        {/* <div className="grid grid-cols-4 gap-6">
          <AnalyticCard name="Key Analytic 1" value="324" />
          <AnalyticCard name="Key Analytic 2" value="40 Hours" />
          <AnalyticCard name="Key Analytic 3" value="23" />
          <AnalyticCard name="Key Analytic 4" value="43 Million" />
        </div> */}
        <div
          ref={elementRef}
          id={report._id}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {charts.map((chart, index) => (
            <Chart chart={chart} key={index} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ChartsContainer;
