import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  selected: boolean;
};

const ImageCard = ({ image, selected }: Props) => {
  return (
    <div
      className={`w-[150px] h-[150px] cursor-pointer rounded bg-white border relative flex items-center justify-center shadow-md ${
        selected && "border border-[#2770EF]"
      }`}
    >
      {selected && (
        <div className="flex w-5 h-5 bg-[#2770EF] absolute top-[10px] right-[11px] flex-col items-center justify-center rounded-[14px]">
          <Image
            src="/assets/check-icon.svg"
            alt="checked"
            width={14}
            height={14}
          />
        </div>
      )}
      <Image
        src={image}
        alt="csv file"
        width={62}
        height={72}
        className="w-fit h-fit"
      />
    </div>
  );
};

export default ImageCard;
