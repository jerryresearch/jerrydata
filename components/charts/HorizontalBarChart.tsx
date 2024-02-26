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
  data?: Partial<Chart>;
};

const HorizontalBarChart = ({ data }: Props) => {
  if (!data) {
    return;
  }

  const { title, xAxis, yAxis, xData, yData } = data;

  const barChartData = {
    labels: xData,
    datasets: [
      {
        label: title,
        // backgroundColor: ["#6366F1", "#D2D2FF", "#EEEEFF"],
        backgroundColor: "#6366F1",
        borderWidth: 1,
        data: yData,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y",
    scales: {
      y: {
        // suggestedMax: 1000,
        title: {
          display: true,
          text: yAxis,
        },
        ticks: {
          stepSize: 100,
        },
      },
      x: {
        title: {
          display: true,
          text: xAxis,
        },
        beginAtZero: true,
        // suggestedMax: 1000,
      },
    },
  };

  console.log();
  return (
    <div className="w-4/5 mx-auto">
      {/* @ts-ignore */}
      <Bar data={barChartData} options={chartOptions} />
    </div>
  );
};

export default HorizontalBarChart;
