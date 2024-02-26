import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data?: Partial<Chart>;
};

const PieChart = ({ data }: Props) => {
  if (!data) {
    return;
  }

  const { title, xAxis, yAxis, xData, yData } = data;

  const pieChartData = {
    labels: xData,
    datasets: [
      {
        label: title,
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
      <Pie data={pieChartData} options={options} />
    </div>
  );
};

export default PieChart;
