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
    <section className="rounded border border-[#EAEDF2] bg-white w-[650px] h-[340px] flex flex-col text-[10px] font-semibold items-center justify-center gap-[10px]">
      <div className="flex items-center w-full px-8">
        <header className="flex-1 text-center">Unit Cost by Region</header>
        <div className="justify-self-end">
          <ChartActions />
        </div>
      </div>
      <div className="w-[440px] h-[236px]">
        <Line data={chartData} options={chartOptions} />
      </div>
    </section>
  );
};

export default LineChart;
