import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  Legend
);

type Props = {
  data?: Partial<Chart>;
};

const BarChart = ({ data }: Props) => {
  if (!data) {
    return;
  }

  const { title, xAxis, yAxis, xData, yData } = data;

  const barChartData = {
    labels: xData,
    datasets: [
      {
        label: yAxis,
        // backgroundColor: ["#6366F1", "#D2D2FF", "#EEEEFF"],
        backgroundColor: "#6366F1",
        borderWidth: 1,
        data: yData,
      },
    ],
  };

  const chartOptions = {
    title: {
      display: title && true,
      text: title,
      fontSize: 20,
    },
    scales: {
      y: {
        suggestedMax: 10000,
        title: {
          display: true,
          text: yAxis,
        },
        // ticks: {
        //   stepSize: 100,
        // },
      },
      x: {
        title: {
          display: true,
          text: xAxis,
        },
      },
    },
  };

  return (
    <div className="w-4/5 mx-auto">
      <Bar data={barChartData} options={chartOptions} />
    </div>
  );
};

export default BarChart;
