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
  data?: Chart;
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
        // hoverBackgroundColor: [
        //   "rgba(255, 99, 132, 0.8)",
        //   "rgba(54, 162, 235, 0.8)",
        //   "rgba(255, 206, 86, 0.8)",
        //   "rgba(75, 192, 192, 0.8)",
        //   "rgba(153, 102, 255, 0.8)",
        //   "rgba(255, 159, 64, 0.8)",
        //   // Add more colors as needed
        // ],
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
