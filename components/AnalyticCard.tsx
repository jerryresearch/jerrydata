import React from "react";

type Props = {
  name: string;
  value: string;
};

const AnalyticCard = ({ name, value }: Props) => {
  return (
    <div className="flex p-[14px] flex-col justify-center items-center rounded border border-[#EAEDF2] bg-white">
      <div className="flex h-14 py-5 px-[14px] justify-center items-center gap-2 self-stretch rounded bg-[#F8FAFC]">
        <p className="text-sm font-medium">{name}</p>
      </div>
      <div className="flex py-[19px] px-[14px] justify-center gap-[10px] self-stretch">
        <p className="font-medium text-[44px] leading-[62px]">{value}</p>
      </div>
    </div>
  );
};

export default AnalyticCard;
