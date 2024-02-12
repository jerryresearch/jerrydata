import Image from "next/image";
import React from "react";

type Props = {
  type: string;
};

const KPIStory = ({ type }: Props) => {
  return (
    <div className="w-[220px] rounded-[6px] border border-[#EEEEFF] bg-[#FAFAFA] flex flex-col gap-[2px] px-6 py-4">
      <p className="flex gap-[10px] font-medium text-2xl text-[#080D19]">
        <Image
          src={`/assets/${type}.svg`}
          alt="chevron down icon"
          width={20}
          height={20}
        />
        <span>$50K</span>
      </p>
      <p className="text-[#61656C]">Pipeline Value</p>
    </div>
  );
};

export default KPIStory;
