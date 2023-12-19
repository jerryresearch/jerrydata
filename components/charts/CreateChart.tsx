"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SelectDatasetModal from "./SelectDatasetModal";
import createChart from "@/lib/charts/createChart";
import { useSession } from "next-auth/react";
import getChart from "@/lib/charts/getChart";
import updateChart from "@/lib/charts/updateChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DoughnutChart from "./DoughnutGraph";
import deleteChart from "@/lib/charts/deleteChart";
import Loading from "../Loading";
import PloarAreaChart from "./PolarAreaChart";
import HorizontalBarChart from "./HorizontalBarChart";
import styles from "@/app/user/styles.module.css";

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
};

const CreateChart = ({ datasets }: Props) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;
  const reportId = searchParams.get("id") || "";
  const chartId = searchParams.get("chart") || "";

  const [isLoading, setIsLoading] = useState(true);
  const [showChart, setShowChart] = useState(false);
  const [open, setOpen] = useState(chartId == "");
  const [selectedDataset, setSelectedDataset] = useState<any>();
  const [chart, setChart] = useState<Chart>();
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState("Bar");

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpen(false);
  };

  // Function to handle selecting a dataset
  const handleSelectDataset = (id: string) => {
    setSelectedDataset(datasets.find((dataset) => dataset._id == id));
  };

  // Function to handle chart deletion
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      if (chartId != "") {
        await deleteChart(userId, reportId, chartId);
        console.log("deleted");
      }
      router.push(pathname.replace("/new", "") + `?id=${reportId}`);
    } catch (error) {
      console.log("error");
    }
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const data = {
      title: title || `${type} chart`,
      chartType: type,
      dataset: selectedDataset._id,
      report: reportId,
      xAxis,
      yAxis,
    };
    try {
      setIsLoading(true);
      let res;
      if (chartId == "") {
        res = await createChart(userId, reportId, data);
        router.replace(pathname + `?id=${reportId}&chart=${res.chart._id}`);
      } else {
        res = await updateChart(userId, reportId, chartId, data);
      }
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
      } catch (error) {
        console.log("error getting chart data");
      }
    };
    if (chartId != "") {
      fetchData();
    }
    setIsLoading(false);
  }, [chartId, userId, reportId]);

  if (isLoading) {
    return <Loading />;
  }

  // Render loading state
  return (
    <section className="bg-[#F6F8FA] h-screen flex flex-col">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">Reports</h1>
      </div>
      <div className="flex justify-between items-center py-5 px-7 border border-[#EAEDF2] text-[#17212F]">
        <div className="flex gap-[6px] items-center">
          <p className="text-sm font-medium">Dataset</p>
          <div
            onClick={() => setOpen(true)}
            className="flex h-10 py-2 px-3 items-center gap-[10px] cursor-pointer rounded border border-[#EAEDF2] bg-white"
          >
            <p className="text-sm flex-[1_0_0]">
              {selectedDataset ? selectedDataset?.name : "Select dataset"}
            </p>
            <Image
              src="/assets/chevron-down.svg"
              alt="more icon"
              width={16}
              height={16}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded border border-[#DEE8FA] bg-white text-sm font-medium"
          >
            Cancel
          </button>
          <button
            disabled={!selectedDataset || !xAxis || !yAxis}
            onClick={handleSubmit}
            className={`px-4 py-2 rounded text-white bg-primary text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Save & Close
          </button>
        </div>
      </div>
      <div className="flex flex-[1_0_0] items-start gap-5 flex-shrink-0 px-7 py-5 text-[#17212F]">
        <div className="w-[240px] flex p-[14px] flex-col gap-[14px] flex-shrink-0 self-stretch rounded border border-[#EAEDF2] bg-white">
          <h1 className="flex h-8 py-[6px] items-center gap-2 self-stretch bg-white">
            Fields
          </h1>
          <div className="h-10 self-stretch px-2 flex flex-col items-start gap-[10px] rounded border border-[#EAEDF2] bg-white">
            <div className="flex gap-2 h-full px-2 items-center">
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
          </div>
          <div className="overflow-auto flex-[1_0_0] gap-[6px] flex flex-col">
            {selectedDataset?.headers?.map((header: any, index: string) => (
              <div
                key={index}
                className="flex h-8 py-[6px] items-center gap-2 self-stretch bg-white cursor-pointer"
              >
                <Image
                  src="/assets/grip-icon.svg"
                  alt="grip icon"
                  width={20}
                  height={20}
                />
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
        <section className="flex flex-col gap-5 flex-[1_0_0] self-stretch items-start">
          <div className="flex justify-between items-start self-stretch">
            <div className="flex gap-[10px] items-center">
              <p className="text-sm font-medium">Chart Type</p>
              <Popover>
                <PopoverTrigger className="flex w-[150px] h-10 py-2 px-3 items-center gap-[10px] cursor-pointer rounded border border-[#EAEDF2] bg-white">
                  <p className="text-sm flex-[1_0_0] text-start">{type}</p>
                  <Image
                    src="/assets/chevron-down.svg"
                    alt="more icon"
                    width={16}
                    height={16}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[150px] text-sm bg-white">
                  <ul className="">
                    {chartTypes.map((chartType: string, index: number) => (
                      <li
                        key={index}
                        onClick={() => setType(chartType)}
                        className="flex gap-2 items-center p-1 cursor-pointer hover:bg-[#F8FAFC] rounded"
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
                <p className="text-sm font-medium">X Axis</p>
                <Popover>
                  <PopoverTrigger className="flex h-10 py-[10px] w-[150px] text-sm px-3 gap-[10px] flex-[1_0_0] rounded border border-[#EAEDF2] bg-white">
                    <span
                      className={`flex-[1_0_0] text-start ${
                        !xAxis && "text-[#ADB3BB]"
                      }`}
                    >
                      {xAxis ? xAxis : "+ Aggregate"}
                    </span>
                    <Image
                      src="/assets/chevron-down.svg"
                      alt="chevron down icon"
                      width={16}
                      height={16}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`max-w-max text-sm bg-white max-h-96 overflow-y-auto 2xl:max-h-none ${styles.scrollbar}`}
                  >
                    <ul className="">
                      {selectedDataset?.headers?.map(
                        (header: any, index: string) => (
                          <li
                            key={index}
                            onClick={() => setXAxis(header.name)}
                            className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded"
                          >
                            {header.name}
                          </li>
                        )
                      )}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="inline-flex items-center gap-[10px]">
                <p className="text-sm font-medium">Y Axis</p>
                <Popover>
                  <PopoverTrigger className="flex h-10 py-[10px] w-[150px] text-sm px-3 gap-[10px] flex-[1_0_0] rounded border border-[#EAEDF2] bg-white">
                    <span
                      className={`flex-[1_0_0] text-start ${
                        !yAxis && "text-[#ADB3BB]"
                      }`}
                    >
                      {yAxis ? yAxis : "+ Category"}
                    </span>
                    <Image
                      src="/assets/chevron-down.svg"
                      alt="chevron down icon"
                      width={16}
                      height={16}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`max-w-max text-sm bg-white max-h-96 overflow-y-auto 2xl:max-h-none ${styles.scrollbar}`}
                  >
                    <ul className="">
                      {selectedDataset?.headers?.map(
                        (header: any, index: string) => (
                          <li
                            key={index}
                            onClick={() => setYAxis(header.name)}
                            className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded"
                          >
                            {header.name}
                          </li>
                        )
                      )}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="inline-flex items-center gap-[10px]">
                <p className="text-sm font-medium">Series</p>
                <input
                  type="text"
                  placeholder="+ Aggregate"
                  className="flex h-10 py-[14px] w-[150px] text-sm px-3 gap-[10px] flex-[1_0_0] rounded border border-[#EAEDF2] bg-white"
                />
              </div>
            </div>
          </div>
          {showChart && chart ? (
            <div className="flex p-[14px] gap-6 flex-col items-center overflow-auto flex-[1_0_0] 2xl:justify-center self-stretch rounded border border-[#EAEDF2] bg-white">
              <header className="text-base h-5 2xl:h-10 text-center">
                {isEditing ? (
                  <span className="flex justify-center gap-[10px]">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-[240px] border border-[#EAEDF2] py-1 2xl:py-2 px-3 rounded focus:outline-none font-normal"
                    />
                    <span
                      onClick={handleSubmit}
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
                        alt="confirm icon"
                        width={16}
                        height={16}
                      />
                    </span>
                  </span>
                ) : (
                  <span
                    className="cursor-pointer font-semibold"
                    onClick={() => setIsEditing(true)}
                  >
                    {chart.title}
                  </span>
                )}
              </header>
              {chart.chartType == "Bar" ? (
                <BarChart data={chart} />
              ) : chart.chartType == "Line" ? (
                <LineChart data={chart} />
              ) : chart.chartType == "Pie" ? (
                <PieChart data={chart} />
              ) : chart.chartType == "Doughnut" ? (
                <DoughnutChart data={chart} />
              ) : chart.chartType == "Polar Area" ? (
                <PloarAreaChart data={chart} />
              ) : (
                <HorizontalBarChart data={chart} />
              )}
            </div>
          ) : (
            <div className="flex p-[14px] flex-col gap-[14px] items-center justify-center flex-[1_0_0] self-stretch rounded border border-[#EAEDF2] bg-white">
              <Image
                src="/assets/bar-chart.svg"
                alt="chart icon"
                width={24}
                height={24}
              />
              <p className="text-[#ADB3BB] text-sm">
                Select the parameters to preview a chart
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

export default CreateChart;
