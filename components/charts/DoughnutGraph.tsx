import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data?: Partial<Chart>;
};

const DoughnutChart = ({ data }: Props) => {
  if (!data) {
    return;
  }

  const { title, xAxis, yAxis, xData, yData } = data;

  const doughnutChartData = {
    labels: xData,
    datasets: [
      {
        data: yData,
        backgroundColor: ["#6366F1", "#D2D2FF", "#EEEEFF"],
        // hoverBackgroundColor: [ Add more colors as needed ],
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
    <div className="w-3/5 mx-auto">
      <Doughnut data={doughnutChartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
