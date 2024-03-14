import Image from "next/image";
import lottie from "lottie-web";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React, { useEffect, useRef } from "react";
import { marked } from "marked";

type Props = {
  message?: Message;
  step: number;
};

const data = [
  { name: "Sales Data", size: "12 MB", columns: 24, lastLoad: "8 Hours Ago" },
  { name: "Sales Data", size: "12 MB", columns: 24, lastLoad: "8 Hours Ago" },
];

const DissectMessageLoading = ({ message, step }: Props) => {
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
      loop: step < 4,
      autoplay: true,
      path: `${
        step < 2 ? "/assets/jd_loader.json" : "/assets/jd_completed.json"
      }`,
    });

    const animation3 = lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer3.current,
      renderer: "svg",
      loop: step < 5,
      autoplay: true,
      path: `${
        step < 5 ? "/assets/jd_loader.json" : "/assets/jd_completed.json"
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
              <span>Generating Query</span>
              <div className="h-8 w-8 flex items-center justify-center bg-clip-content">
                <div ref={animationContainer2} className="h-20 w-20"></div>
              </div>
            </div>
            <div className="border border-[#EEEEFF] h-full items-center px-3 rounded-[6px] bg-white gap-2 flex justify-between">
              <span>Generating Result</span>
              <div ref={animationContainer3} className="h-8 w-8"></div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-[6px] items-center text-[#61656C]">
              <Image
                src="/assets/query.svg"
                alt="analysis"
                width={16}
                height={16}
              />
              <span>QUERY</span>
            </div>
            <div className="w-[648px] border border-[#EEEEFF] rounded-[6px]">
              <div className="flex justify-between border-b border-[#EEEEFF] rounded-[6px] items-center h-6 px-4 bg-white">
                <p className="text-[#61656C] text-xs">SQL</p>
                <Image
                  src="/assets/copy.svg"
                  alt="analysis"
                  width={12}
                  height={12}
                  className="cursor-pointer"
                />
              </div>
              {step < 2 ? (
                <div className="h-40 p-4 bg-white">
                  <div className="bg-slate-200 w-full h-full rounded-[6px] animate-pulse"></div>
                </div>
              ) : (
                <SyntaxHighlighter
                  language="sql"
                  style={docco}
                  customStyle={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                    padding: "16px",
                    fontSize: "14px",
                  }}
                >
                  {message?.query || ""}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-[6px] items-center text-[#61656C]">
              <Image
                src="/assets/description.svg"
                alt="analysis"
                width={16}
                height={16}
              />
              <span>DESCRIPTION</span>
            </div>
            {step < 3 ? (
              <div className="flex flex-col gap-2">
                <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                  h
                </div>
                <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                  h
                </div>
              </div>
            ) : (
              <p>{message?.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-[6px] items-center text-[#61656C]">
              <Image
                src="/assets/assumptions.svg"
                alt="analysis"
                width={16}
                height={16}
              />
              <span>ASSUMPTIONS</span>
            </div>
            {step < 4 ? (
              <div className="flex flex-col gap-2">
                <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                  h
                </div>
                <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                  h
                </div>
                <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                  h
                </div>
              </div>
            ) : (
              // <ol className="list-decimal list-inside">
              //   {message?.assumptions?.map((assumption, index) => (
              //     <li key={index}>{assumption}</li>
              //   ))}
              // </ol>
              <p>{message?.assumptions}</p>
            )}
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-[6px] items-center text-[#61656C]">
              <Image
                src="/assets/result.svg"
                alt="analysis"
                width={16}
                height={16}
              />
              <span>RESULT</span>
            </div>
            {step < 5 ? (
              <div className="w-fit min-w-[820px] rounded-[6px] border border-[#EEEEFF] bg-white">
                <table className="w-full table-auto min-w-max text-left rounded text-[#080D19]">
                  {/* row */}
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EEEEFF] font-medium">
                      <th className="p-5 font-medium">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </th>
                      <th className="p-5 font-medium">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </th>
                      <th className="p-5 font-medium">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </th>
                      <th className="flex justify-between p-5 font-medium">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="rounded border-b border-[#EEEEFF] font-medium">
                      <td className="p-5 text-primary">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                    </tr>
                    <tr className="rounded border-b border-[#EEEEFF] font-medium">
                      <td className="p-5 text-primary">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                    </tr>
                    <tr className="rounded border-b border-[#EEEEFF] font-medium">
                      <td className="p-5 text-primary">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                    </tr>
                    <tr className="rounded border-b border-[#EEEEFF] font-medium">
                      <td className="p-5 text-primary">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="w-full bg-slate-200 text-slate-200 animate-pulse rounded-[6px] ">
                          h
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="w-fit min-w-[820px] rounded-[6px] border border-[#EEEEFF] bg-white">
                <table className="w-full table-auto min-w-max text-left rounded text-[#080D19]">
                  {/* row */}
                  <thead>
                    <tr className="bg-[#FAFAFA] border-b border-[#EEEEFF] font-medium">
                      <th className="p-5 font-medium">Name</th>
                      <th className="p-5 font-medium">Size</th>
                      <th className="p-5 font-medium">Columns</th>
                      <th className="flex justify-between p-5 font-medium">
                        <span>Last Load</span>
                        <Image
                          src="/assets/chevron-down.svg"
                          alt="down icon"
                          width={20}
                          height={20}
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, index) => (
                      <tr
                        key={index}
                        className="rounded border-b border-[#EEEEFF] font-medium"
                      >
                        <td className="p-5 text-primary">{row.name}</td>
                        <td className="p-5">{row.size}</td>
                        <td className="p-5">{row.columns}</td>
                        <td className="p-5">{row.lastLoad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DissectMessageLoading;
