import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PolarAreaController,
  RadialLinearScale,
} from "chart.js";
import ChartActions from "./ChartActions";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  PolarAreaController,
  RadialLinearScale
);

type Props = {
  data: {
    [key: string]: number;
  };
};

const PloarAreaChart = ({ data }: Props) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "#16CC62",
          "#2272E3",
          "#FFD111",
          "#D242E9",
          "#F63333",
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
        maxWidth: 100,
      },
    },
    scales: {
      r: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <section className="rounded border border-[#EAEDF2] bg-white flex flex-col text-[10px] font-semibold items-center justify-center gap-[10px] py-4">
      <div className="flex items-center w-full px-8">
        <header className="flex-1 text-center">Unit Cost by Region</header>
        <div className="justify-self-end">
          <ChartActions />
        </div>
      </div>
      <div className="w-[300px]">
        <PolarArea data={chartData} options={options} />
      </div>
    </section>
  );
};

export default PloarAreaChart;
