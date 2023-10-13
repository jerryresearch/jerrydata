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
import ChartActions from "./ChartActions";

ChartJS.register(
  BarElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  Legend
);

type Props = {
  data: {
    [key: string]: {
      retail: number;
      wholesale: number;
      distribution: number;
    };
  };
};

const StackedBarChart = ({ data }: Props) => {
  const labels = Object.keys(data);
  const retailData = labels.map((label) => data[label].retail);
  const wholesaleData = labels.map((label) => data[label].wholesale);
  const distributionData = labels.map((label) => data[label].distribution);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Retail",
        data: retailData,
        backgroundColor: "#16CC62",
        barThickness: 45,
      },
      {
        label: "Wholesale",
        data: wholesaleData,
        backgroundColor: "#2272E3",
        barThickness: 45,
      },
      {
        label: "Distribution",
        data: distributionData,
        backgroundColor: "#FFD111",
        barThickness: 45,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        suggestedMax: 2000,
        suggestedMin: -2000,
        title: {
          display: true,
          text: "Unit cost",
        },
        ticks: {
          stepSize: 1000,
        },
        stacked: true,
      },
      x: {
        title: {
          display: true,
          text: "Region",
        },
        stacked: true,
      },
    },
  };

  return (
    <div className="w-4/5 mx-auto">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default StackedBarChart;
