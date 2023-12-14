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
  data?: Chart;
};

const BarChart = ({ data }: Props) => {
  if (!data) {
    return;
  }

  const { title, xAxis, yAxis, xData, yData } = data;

  const aggregatedData = xData.reduce((acc, curr, index) => {
    if (acc[curr]) {
      acc[curr] += parseInt(yData[index]);
    } else {
      acc[curr] = parseInt(yData[index]);
    }
    return acc;
  }, {});

  // Extract aggregated xData and yData
  const aggregatedXData = Object.keys(aggregatedData);
  const aggregatedYData = Object.values(aggregatedData);

  const barChartData = {
    labels: aggregatedXData,
    datasets: [
      {
        label: yAxis,
        // backgroundColor: ["#16CC62", "#2272E3", "#FFD111"],
        backgroundColor: "#16CC62",
        borderWidth: 1,
        data: aggregatedYData,
      },
    ],
  };

  const chartOptions = {
    title: {
      display: true,
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
