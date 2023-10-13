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
    <div className="w-3/5">
      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PloarAreaChart;
