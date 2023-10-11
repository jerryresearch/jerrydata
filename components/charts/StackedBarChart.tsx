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
    <section className="rounded border border-[#EAEDF2] bg-white w-[650px] h-[340px] flex flex-col text-[10px] font-semibold items-center justify-center gap-[10px]">
      <div className="flex items-center w-full px-8">
        <header className="flex-1 text-center">Unit Cost by Region</header>
        <div className="justify-self-end">
          <ChartActions />
        </div>
      </div>
      <div className="w-[440px] h-[236px]">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </section>
  );
};

export default StackedBarChart;
