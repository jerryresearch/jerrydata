"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Loading from "@/components/Loading";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  Legend
);

type Props = {
  params: {
    name: string;
  };
};

export default function Page({ params: { name } }: Props) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData(name: string) {
      try {
        const res = await axios.get(`${process.env.BASE_URL}/api/file/${name}`);
        setData(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(name);
  }, [name]);

  const lineChartData = {
    labels: data.map((item) => item["Order Date"]),
    datasets: [
      {
        label: "Total Revenue",
        data: data.map((item) => parseFloat(item["Total Revenue"])),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const chartData = {
    labels: data.map((item: any) => item.Country),
    datasets: [
      {
        label: "Total Profit",
        data: data.map((item: any) => parseFloat(item["Total Profit"])),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {data.length > 0 ? (
        <section className="grid grid-cols-2 min-h-screen items-center">
          <div className="px-10">
            <Bar data={chartData} />
          </div>
          <div className="px-10">
            <Line data={lineChartData} />
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  );
}
