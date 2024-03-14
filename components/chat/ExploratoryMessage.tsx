import Image from "next/image";
import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import { marked } from "marked";
import "github-markdown-css";
import BarChart from "../charts/BarChart";
import LineChart from "../charts/LineChart";
import PieChart from "../charts/PieChart";
import DoughnutChart from "../charts/DoughnutGraph";
import PloarAreaChart from "../charts/PolarAreaChart";
import HorizontalBarChart from "../charts/HorizontalBarChart";

type Props = {
  message: Message;
};

const data = {
  Asia: {
    retail: 800,
    wholesale: 200,
    distribution: 100,
  },
  Europe: {
    retail: "700",
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
    distribution: "1150",
  },
};

const ExploratoryMessage = ({ message }: Props) => {
  const animationContainer = useRef(null);
  const animationContainer2 = useRef(null);
  const animationContainer3 = useRef(null);

  useEffect(() => {
    const animation1 = lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/assets/jd_completed.json",
    });

    const animation2 = lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer2.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/assets/jd_completed.json",
    });

    const animation3 = lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer3.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "/assets/jd_completed.json",
    });

    return () => {
      animation1.destroy();
      animation2.destroy();
      animation3.destroy();
    };
  }, []);

  return (
    <section className="flex flex-col gap-10">
      <div className="flex gap-4">
        <Image
          src="/assets/assistant.svg"
          alt="avatar"
          width={34}
          height={34}
          className="self-start"
        />
        <div className="flex flex-col w-full gap-4">
          <p className="text-primary font-semibold">Jerry</p>
          <div className="flex flex-col w-full gap-6 text-[#080D19]">
            <div className="flex items-center gap-4 h-10">
              <div className="border border-[#EEEEFF] h-full items-center px-3 rounded-[6px] bg-white gap-2 flex justify-between">
                <span>Scanning Data</span>
                <div ref={animationContainer} className="h-8 w-8"></div>
              </div>
              <div className="border border-[#EEEEFF] h-full items-center px-3 rounded-[6px] bg-white gap-2 flex justify-between">
                <span>Generating Analysis and Suggestion</span>
                <div ref={animationContainer2} className="h-8 w-8"></div>
              </div>
              <div className="border border-[#EEEEFF] h-full items-center px-3 rounded-[6px] bg-white w-[240px] flex justify-between">
                <span>Generating Visualization</span>
                <div ref={animationContainer3} className="h-8 w-8"></div>
              </div>
            </div>
            <p>Here&apos;s the exploratory analysis for your question:</p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-[6px] items-center text-[#61656C]">
                <Image
                  src="/assets/analysis.svg"
                  alt="analysis"
                  width={16}
                  height={16}
                />
                <span>ANALYSIS</span>
              </div>
              <div className="text-base">
                <span className="font-semibold">How?</span>
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{
                    __html: marked(message.how || ""),
                  }}
                ></div>
              </div>
              <div>
                <span className="font-semibold">Why?</span>
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{
                    __html: marked(message.why || ""),
                  }}
                ></div>
              </div>
              <div>
                <span className="font-semibold">What?</span>
                <div
                  className="markdown-body"
                  dangerouslySetInnerHTML={{
                    __html: marked(message.what || ""),
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-[6px] items-center text-[#61656C]">
                <Image
                  src="/assets/suggestion.svg"
                  alt="analysis"
                  width={16}
                  height={16}
                />
                <span>SUGGESTION</span>
              </div>
              <div
                className="markdown-body"
                dangerouslySetInnerHTML={{
                  __html: marked(message.suggestion || ""),
                }}
              ></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-[6px] items-center text-[#61656C]">
                <Image
                  src="/assets/visualization.svg"
                  alt="analysis"
                  width={16}
                  height={16}
                />
                <span>VISUALIZATION</span>
              </div>
              <div className="w-3/5 border border-[#EEEEFF] bg-white rounded-[6px] p-10">
                {/* @ts-ignore */}
                {/* <StackedBarChart data={data} /> */}
                {message.chartType == "bar" ? (
                  <BarChart data={message} />
                ) : message.chartType == "line" ? (
                  <LineChart data={message} />
                ) : message.chartType == "pie" ? (
                  <PieChart data={message} />
                ) : message.chartType == "doughnut" ? (
                  <DoughnutChart data={message} />
                ) : message.chartType == "polar area" ? (
                  <PloarAreaChart data={message} />
                ) : (
                  <HorizontalBarChart data={message} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-[#EEEEFF] h-px w-full"></div>
    </section>
  );
};

export default ExploratoryMessage;
