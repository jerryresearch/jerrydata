import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data?: Chart;
};

const DoughnutChart = ({ data }: Props) => {
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

  const doughnutChartData = {
    labels: aggregatedXData,
    datasets: [
      {
        data: aggregatedYData,
        backgroundColor: ["#2272E3", "#FFD111", "#16CC62"],
        // hoverBackgroundColor: [
        //   "rgba(255, 99, 132, 0.8)",
        //   "rgba(54, 162, 235, 0.8)",
        //   "rgba(255, 206, 86, 0.8)",
        //   "rgba(75, 192, 192, 0.8)",
        //   "rgba(153, 102, 255, 0.8)",
        //   "rgba(255, 159, 64, 0.8)",
        //   // Add more colors as needed
        // ],
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
      <Doughnut data={doughnutChartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
