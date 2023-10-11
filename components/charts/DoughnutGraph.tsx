import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartActions from "./ChartActions";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: {
    [key: string]: number;
  };
};

const DoughnutChart = ({ data }: Props) => {
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
  };

  return (
    <section className="rounded border border-[#EAEDF2] bg-white w-[426px] flex flex-col text-[10px] font-semibold items-center justify-center gap-[10px] py-4">
      <div className="flex items-center w-full px-8">
        <header className="flex-1 text-center">Unit Cost by Region</header>
        <div className="justify-self-end">
          <ChartActions />
        </div>
      </div>
      <div className="w-[300px]">
        <Doughnut data={chartData} options={options} />
      </div>
    </section>
  );
};

export default DoughnutChart;
