"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams, usePathname } from "next/navigation";
import SelectDatasetModal from "./SelectDatasetModal";
import { useSession } from "next-auth/react";
import getChart from "@/lib/charts/getChart";
import updateChart from "@/lib/charts/updateChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutGraph";
import Loading from "../Loading";
import PloarAreaChart from "./PolarAreaChart";
import HorizontalBarChart from "./HorizontalBarChart";
import styles from "@/app/user/styles.module.css";
import Link from "next/link";

const chartTypes = [
  "Bar",
  "Doughnut",
  "Pie",
  "Line",
  "Polar Area",
  "Horizontal Bar",
];

type Props = {
  datasets: Dataset[];
  report: Reports;
};

const UpdateChart = ({ datasets, report }: Props) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;
  const reportId = searchParams.get("id") || "";
  const chartId = searchParams.get("chart") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<any>();
  const [chart, setChart] = useState<Chart>();
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState("Bar");
  const [typePopUpOpen, setTypePopUpOpen] = useState(false);
  const [xPopUpOpen, setXPopUpOpen] = useState(false);
  const [yPopUpOpen, setYPopUpOpen] = useState(false);

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpen(false);
  };

  // Function to handle selecting a dataset
  const handleSelectDataset = (id: string) => {
    setSelectedDataset(datasets.find((dataset) => dataset._id == id));
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const data = {
      title: title || `${type} chart`,
      chartType: type.toLowerCase(),
      dataset: selectedDataset._id,
      report: reportId,
      xAxis,
      yAxis,
    };
    try {
      setIsLoading(true);
      if (chartId == "") {
        alert("Try again");
      }
      const res = await updateChart(userId, reportId, chartId, data);
      setIsEditing(false);
      setChart(res.chart);
      setXAxis(res.chart.xAxis);
      setYAxis(res.chart.yAxis);
      setType(res.chart.chartType);
      setTitle(res.chart.title);
      handleSelectDataset(res.chart.dataset);
      setShowChart(true);
    } catch (error) {
      console.log("error chart");
    }
    setIsLoading(false);
  };

  // Fetch chart data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userId || !reportId || !chartId) return;
        const res = await getChart(userId, reportId, chartId);
        setChart(res);
        setXAxis(res.xAxis);
        setYAxis(res.yAxis);
        setType(res.chartType);
        setTitle(res.title);
        handleSelectDataset(res.dataset);
        setShowChart(true);
        setIsLoading(false);
      } catch (error) {
        console.log("error getting chart data");
      }
    };
    if (chartId != "") {
      fetchData();
    }
  }, [chartId, userId, reportId]);

  if (isLoading) {
    return <Loading />;
  }

  // Render loading state
  return (
    <section className="flex flex-col text-[#080D19] h-[calc(100vh-56px)] flex-shrink-0">
      <div className="flex justify-between items-center py-5 px-[60px] border-b border-[#EEEEFF]">
        <div className="flex flex-col gap-4">
          <p>
            <Link href="/home/dashboards" className="text-[#61656C]">
              Dashboards /
            </Link>
            <Link
              href={`/home/dashboards/${report.name}?id=${reportId}`}
              className="text-primary"
            >
              {" "}
              {report.name}
            </Link>
          </p>
          <div className="flex gap-4 items-center">
            <p className="font-medium">Dataset</p>
            <div
              onClick={() => setOpen(true)}
              className="flex w-[280px] h-[42px] py-2 px-3 items-center gap-[10px] cursor-pointer rounded-[6px] border border-[#EEEEFF] bg-white"
            >
              <p className="flex-1 truncate">
                {selectedDataset ? selectedDataset?.name : "Select dataset"}
              </p>
              <Image
                src="/assets/chevron-down.svg"
                alt="more icon"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>
        <div className="flex h-[42px] gap-4">
          {/* <button
            // onClick={handleDelete}
            className="px-5 py-1 rounded-[6px] bg-[#F1F1F1] text-[#61656C] font-medium"
          >
            Cancel
          </button> */}
          <button
            disabled={!selectedDataset || !xAxis || !yAxis}
            onClick={handleSubmit}
            className={`flex gap-[6px] items-center px-5 py-1 rounded-[6px] bg-[#F1F1F1] text-[#61656C] font-medium disabled:pointer-events-none`}
          >
            <Image
              src="/assets/generate-chart.svg"
              alt="more icon"
              width={20}
              height={20}
            />
            <span>Generate</span>
          </button>
          <button
            disabled={!chart}
            onClick={() => {
              location.replace(
                pathname.replace("/update", "") + `?id=${reportId}`
              );
            }}
            className={`px-5 py-1 rounded-[6px] text-white bg-primary font-medium disabled:opacity-50 disabled:pointer-events-none`}
          >
            Save & Close
          </button>
        </div>
      </div>
      <div className="flex flex-[1_0_0]">
        <div className="w-[240px] flex p-6 flex-col gap-[14px] flex-shrink-0 self-stretch rounded border-r border-[#EEEEFF]">
          <h1 className="font-medium">Fields</h1>
          <div className="h-[42px] px-2 flex gap-[10px] rounded-[6px] border border-[#EEEEFF]">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              placeholder="Search"
              className="focus:outline-none w-full"
            />
          </div>
          <div className="overflow-auto flex-[1_0_0] gap-[6px] flex flex-col">
            {selectedDataset?.headers?.map((header: any, index: string) => (
              <div
                key={index}
                className="flex h-[42px] py-[6px] items-center gap-2 self-stretch bg-white cursor-pointer"
              >
                <Image
                  src="/assets/globe.svg"
                  alt="globe icon"
                  width={20}
                  height={20}
                />
                <p className="text-sm">{header.name}</p>
              </div>
            ))}
          </div>
        </div>
        <section className="flex flex-col flex-[1_0_0] self-stretch items-start">
          <div className="flex justify-between items-start self-stretch py-4 px-6 border-b border-[#EEEEFF]">
            <div className="flex gap-[10px] items-center">
              <p className="font-medium">Chart Type</p>
              <Popover open={typePopUpOpen} onOpenChange={setTypePopUpOpen}>
                <PopoverTrigger className="flex w-[150px] truncate 2xl:w-[200px] h-10 px-3 items-center gap-[10px] cursor-pointer rounded-[6px] border border-[#EEEEFF] bg-white">
                  <p className="flex-[1_0_0] text-start capitalize">{type}</p>
                  <Image
                    src="/assets/chevron-down.svg"
                    alt="more icon"
                    width={16}
                    height={16}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[150px] 2xl:w-[200px] bg-white">
                  <ul className="">
                    {chartTypes.map((chartType: string, index: number) => (
                      <li
                        key={index}
                        onClick={() => {
                          setType(chartType);
                          setTypePopUpOpen(false);
                        }}
                        className="flex gap-2 items-center truncate p-1 cursor-pointer hover:bg-[#F8FAFC] rounded-[6px]"
                      >
                        {chartType}
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
            <div className="h-10 flex gap-[18px]">
              <div className="inline-flex items-center gap-[10px]">
                <p className="font-medium">X Axis</p>
                <Popover open={xPopUpOpen} onOpenChange={setXPopUpOpen}>
                  <PopoverTrigger className="flex h-10 items-center truncate w-[150px] 2xl:w-[200px] px-3 gap-[10px] flex-[1_0_0] rounded-[6px] border border-[#EEEEFF] bg-white">
                    <span
                      className={`flex-[1_0_0] text-start ${
                        !xAxis && "text-[#ADB3BB]"
                      }`}
                    >
                      {xAxis ? xAxis : "+ Category"}
                    </span>
                    <Image
                      src="/assets/chevron-down.svg"
                      alt="chevron down icon"
                      width={16}
                      height={16}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`w-[150px] 2xl:w-[200px] bg-white max-h-96 overflow-y-auto 2xl:max-h-none ${styles.scrollbar}`}
                  >
                    <ul className="">
                      {selectedDataset?.headers?.map(
                        (header: any, index: string) => {
                          if (header.columnType === "Attribute") {
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  setXAxis(header.name);
                                  setXPopUpOpen(false);
                                }}
                                className="flex gap-2 items-center truncate p-2 cursor-pointer hover:bg-[#F8FAFC] rounded-[6px]"
                              >
                                {header.name}
                              </li>
                            );
                          }
                          return null; // Return null for non-"Measure" columnType
                        }
                      )}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="inline-flex items-center gap-[10px]">
                <p className="text-sm font-medium">Y Axis</p>
                <Popover open={yPopUpOpen} onOpenChange={setYPopUpOpen}>
                  <PopoverTrigger className="flex h-10 items-center truncate w-[150px] 2xl:w-[200px] px-3 gap-[10px] flex-[1_0_0] rounded-[6px] border border-[#EEEEFF] bg-white">
                    <span
                      className={`flex-[1_0_0] text-start ${
                        !yAxis && "text-[#ADB3BB]"
                      }`}
                    >
                      {yAxis ? yAxis : "+ Aggregate"}
                    </span>
                    <Image
                      src="/assets/chevron-down.svg"
                      alt="chevron down icon"
                      width={16}
                      height={16}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`w-[150px] 2xl:w-[200px] bg-white max-h-96 overflow-y-auto 2xl:max-h-none`}
                  >
                    <ul className="">
                      {selectedDataset?.headers?.map(
                        (header: any, index: string) => {
                          if (header.columnType === "Measure") {
                            return (
                              <li
                                key={index}
                                onClick={() => {
                                  setYAxis(header.name);
                                  setYPopUpOpen(false);
                                }}
                                className="flex gap-2 items-center truncate p-2 cursor-pointer hover:bg-[#F8FAFC] rounded-[6px]"
                              >
                                {header.name}
                              </li>
                            );
                          }
                          return null; // Return null for non-"Measure" columnType
                        }
                      )}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="inline-flex items-center gap-[10px]">
                <p className="font-medium">Series</p>
                <input
                  type="text"
                  placeholder="+ Aggregate"
                  className="flex h-10 py-[14px] w-[150px] 2xl:w-[200px] px-3 gap-[10px] flex-[1_0_0] rounded-[6px] border border-[#EEEEFF] bg-white"
                />
              </div>
            </div>
          </div>
          {showChart && chart ? (
            <div className="flex p-[14px] gap-6 flex-col items-center overflow-auto flex-[1_0_0] 2xl:justify-center self-stretch rounded bg-white">
              <header className="text-sm text-center">
                {isEditing ? (
                  <span className="flex justify-center gap-[10px]">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-[240px] border border-[#EEEEFF] text-sm py-1 2xl:py-2 px-3 rounded-[6px] focus:outline-none font-normal"
                    />
                    <span
                      onClick={handleSubmit}
                      className="bg-primary cursor-pointer w-7 flex items-center justify-center 2xl:w-10 2xl:h-10 rounded"
                    >
                      <Image
                        src="/assets/check-icon.svg"
                        alt="confirm icon"
                        width={20}
                        height={20}
                      />
                    </span>
                    <span
                      onClick={() => setIsEditing(false)}
                      className="w-7 cursor-pointer border border-[#DEE8FA] flex items-center justify-center 2xl:w-10 2xl:h-10 rounded"
                    >
                      <Image
                        src="/assets/dismiss.svg"
                        alt="confirm icon"
                        width={16}
                        height={16}
                      />
                    </span>
                  </span>
                ) : (
                  <p
                    className="cursor-pointer font-medium text-sm h-[30px] 2xl:h-10 flex items-center"
                    onClick={() => setIsEditing(true)}
                  >
                    {chart.title}
                  </p>
                )}
              </header>
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
          ) : (
            <div className="flex p-[14px] flex-col gap-[14px] 2xl:gap-6 items-center justify-center flex-[1_0_0] self-stretch rounded bg-white">
              <Image
                src="/assets/no-dashboards.svg"
                alt="chart icon"
                width={90}
                height={60}
              />
              <p className="text-[#A9AAAE] font-medium">
                Choose parameters and click generate to preview a chart.
              </p>
            </div>
          )}
        </section>
      </div>
      <SelectDatasetModal
        open={open}
        onClose={handleCloseModal}
        datasets={datasets}
        handleSelectDataset={handleSelectDataset}
      />
    </section>
  );
};

export default UpdateChart;
