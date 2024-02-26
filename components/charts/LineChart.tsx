import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  Legend
);

type Props = {
  data?: Partial<Chart>;
};

const LineChart = ({ data }: Props) => {
  if (!data) {
    return;
  }

  const { title, xAxis, yAxis, xData, yData } = data;

  const lineChartData = {
    labels: xData,
    datasets: [
      {
        label: title,
        backgroundColor: "#6366F1",
        // backgroundColor: ["#6366F1", "#D2D2FF", "#EEEEFF"],
        borderColor: "#000",
        borderWidth: 1,
        pointBorderColor: "#6366F1",
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
        // suggestedMax: 10000,
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
      <Line data={lineChartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
