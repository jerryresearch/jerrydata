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
    <div className="text-[#080D19]">
      <div className="flex gap-2">
        <Image
          src={`/assets/${
            message.role == "user" ? "avatar" : message.role
          }.svg`}
          alt="avatar"
          width={34}
          height={34}
          className="self-start"
        />
        <div className="flex-1">
          <div>
            {message.type == "text" ? (
              <p className="w-fit rounded-[6px] border border-[#EEEEFF] bg-white py-2 px-2">
                {message.content}
              </p>
            ) : (
              <div className="flex flex-col items-center gap-4 w-4/5 rounded-[6px] border border-[#EEEEFF] bg-white">
                {/* <p>{message.content}</p> */}
                <p className="font-medium pt-4">{message.title}</p>
                {message.chartType == "bar" ? (
                  <BarChart data={message} />
                ) : message.chartType == "line" ? (
                  <LineChart data={message} />
                ) : message.chartType == "pie" ? (
                  <PieChart data={message} />
                ) : message.chartType == "doughnut" ? (
                  <DoughnutChart data={message} />
                ) : message.chartType == "polar area" ? (
                  <PloarAreaChart data={message} />
                ) : (
                  <HorizontalBarChart data={message} />
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
