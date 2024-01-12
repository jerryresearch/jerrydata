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

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  PolarAreaController,
  RadialLinearScale
);

type Props = {
  data?: Partial<Chart>;
};

const PloarAreaChart = ({ data }: Props) => {
  if (!data) {
    return;
  }

  const { title, xAxis, yAxis, xData, yData } = data;

  const polarChartData = {
    labels: xData,
    datasets: [
      {
        data: yData,
        backgroundColor: ["#2272E3", "#FFD111", "#16CC62"],
        // hoverBackgroundColor: [ Add more colors as needed ],
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
      <PolarArea data={polarChartData} options={options} />
    </div>
  );
};

export default PloarAreaChart;
