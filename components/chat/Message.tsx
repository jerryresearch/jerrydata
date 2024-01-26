import Image from "next/image";
import LineChart from "../charts/LineChart";
import BarChart from "../charts/BarChart";
import PieChart from "../charts/PieChart";
import DoughnutChart from "../charts/DoughnutGraph";
import PloarAreaChart from "../charts/PolarAreaChart";
import HorizontalBarChart from "../charts/HorizontalBarChart";

interface Props {
  message: Message;
}

const Message = ({ message }: Props) => {
  // console.log(message);
  return (
    <div className="flex py-5 px-[14px] items-center rounded bg-[#F6F8FA]">
      <div className="flex w-full gap-[13px]">
        <Image
          src={`/assets/${message.role}.svg`}
          alt="avatar"
          width={34}
          height={34}
          className="self-start"
        />
        <div className="flex-1 inline-flex px-2 flex-col items-start gap-[10px] rounded bg-white">
          <div className="py-[10px] w-full px-2 text-[#17212F] text-sm">
            {message.type == "text" ? (
              message.content
            ) : (
              <div className="flex flex-col gap-10">
                {/* <p>{message.content}</p> */}
                {message.chartType == "bar" ? (
                  <BarChart
                    data={{
                      xAxis: message.xAxis,
                      yAxis: message.yAxis,
                      xData: message.xData,
                      yData: message.yData,
                    }}
                  />
                ) : message.chartType == "line" ? (
                  <LineChart
                    data={{
                      xAxis: message.xAxis,
                      yAxis: message.yAxis,
                      xData: message.xData,
                      yData: message.yData,
                    }}
                  />
                ) : message.chartType == "pie" ? (
                  <PieChart
                    data={{
                      xAxis: message.xAxis,
                      yAxis: message.yAxis,
                      xData: message.xData,
                      yData: message.yData,
                    }}
                  />
                ) : message.chartType == "doughnut" ? (
                  <DoughnutChart
                    data={{
                      xAxis: message.xAxis,
                      yAxis: message.yAxis,
                      xData: message.xData,
                      yData: message.yData,
                    }}
                  />
                ) : message.chartType == "polar area" ? (
                  <PloarAreaChart
                    data={{
                      xAxis: message.xAxis,
                      yAxis: message.yAxis,
                      xData: message.xData,
                      yData: message.yData,
                    }}
                  />
                ) : (
                  <HorizontalBarChart
                    data={{
                      xAxis: message.xAxis,
                      yAxis: message.yAxis,
                      xData: message.xData,
                      yData: message.yData,
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
