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
import ChartActions from "./ChartActions";

ChartJS.register(
  LineElement,
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

const LineChart = ({ data }: Props) => {
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
        borderColor: "#16CC62",
        backgroundColor: "#16CC62",
      },
      {
        label: "Wholesale",
        data: wholesaleData,
        borderColor: "#2272E3",
        backgroundColor: "#2272E3",
      },
      {
        label: "Distribution",
        data: distributionData,
        borderColor: "#FFD111",
        backgroundColor: "#FFD111",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        suggestedMax: 1000,
        title: {
          display: true,
          text: "Unit cost",
        },
        ticks: {
          stepSize: 100,
        },
      },
      x: {
        title: {
          display: true,
          text: "Region",
        },
      },
    },
  };

  return (
    <div className="w-4/5 mx-auto">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default LineChart;
