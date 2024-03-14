import Image from "next/image";
import lottie from "lottie-web";
import React, { useEffect, useRef } from "react";
import StackedBarChart from "../charts/StackedBarChart";

type Props = {
  message?: Message;
  step: number;
};

const data = {
  Asia: {
    retail: "800",
    wholesale: "200",
    distribution: "100",
  },
  Europe: {
    retail: "700",
    wholesale: "200",
    distribution: "300",
  },
  Africa: {
    retail: "800",
    wholesale: "500",
    distribution: "80",
  },
  "North America": {
    retail: "200",
    wholesale: "100",
    distribution: "1150",
  },
};

const ExploratoryMessageLoading = ({ message, step }: Props) => {
  const animationContainer = useRef(null);
  const animationContainer2 = useRef(null);
  const animationContainer3 = useRef(null);

  useEffect(() => {
    const animation1 = lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer.current,
      renderer: "svg",
      loop: step < 1,
      autoplay: true,
      path: `${
        step < 1 ? "/assets/jd_loader.json" : "/assets/jd_completed.json"
      }`,
    });

    const animation2 = lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer2.current,
      renderer: "svg",
      loop: step < 5,
      autoplay: true,
      path: `${
        step < 5 ? "/assets/jd_loader.json" : "/assets/jd_completed.json"
      }`,
    });

    const animation3 = lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer3.current,
      renderer: "svg",
      loop: step < 6,
      autoplay: true,
      path: `${
        step < 6 ? "/assets/jd_loader.json" : "/assets/jd_completed.json"
      }`,
    });
    return () => {
      animation1.destroy();
      animation2.destroy();
      animation3.destroy();
    };
  }, [step]);

  return (
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
              <div className="h-8 w-8 flex items-center justify-center bg-clip-content">
                <div ref={animationContainer2} className="h-20 w-20"></div>
              </div>
            </div>
            <div className="border border-[#EEEEFF] h-full items-center px-3 rounded-[6px] bg-white gap-2 flex justify-between">
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
            {step < 2 ? (
              <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                h
              </div>
            ) : (
              <div>
                <span className="font-semibold">How?</span>
                <span> - {message?.how}</span>
              </div>
            )}
            {step < 3 ? (
              <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                h
              </div>
            ) : (
              <div>
                <span className="font-semibold">Why?</span>
                <span> - {message?.why}</span>
              </div>
            )}
            {step < 4 ? (
              <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                h
              </div>
            ) : (
              <div>
                <span className="font-semibold">What?</span>
                <span> - {message?.what}</span>
              </div>
            )}
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
            {step < 5 ? (
              <div className="flex flex-col gap-2">
                <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                  h
                </div>
                <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                  h
                </div>
              </div>
            ) : (
              <p>{message?.suggestion}</p>
            )}
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
            {step < 6 ? (
              <div className="w-3/5 h-96 border border-[#EEEEFF] bg-white rounded-[6px] p-10">
                <div className="bg-slate-200 w-full h-full rounded-[6px] animate-pulse"></div>
              </div>
            ) : (
              <div className="w-3/5 border border-[#EEEEFF] bg-white rounded-[6px] p-10">
                {/* @ts-ignore */}
                <StackedBarChart data={data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploratoryMessageLoading;
