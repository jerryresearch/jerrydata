import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartActions from "./ChartActions";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: {
    [key: string]: number;
  };
};

const PieChart = ({ data }: Props) => {
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
    <div className="w-3/5">
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
