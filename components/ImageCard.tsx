import Image from "next/image";
import React from "react";

type Props = {
  image: string;
  selected: boolean;
};

const ImageCard = ({ image, selected }: Props) => {
  return (
    <div
      className={`w-[120px] h-[120px] cursor-pointer rounded-[6px] border relative flex items-center justify-center ${
        selected ? "border-primary shadow-custom" : "border-[#EEEEFF]"
      }`}
    >
      <Image
        src={image}
        alt="csv file"
        width={62}
        height={60}
        className="w-fit h-fit"
      />
    </div>
  );
};

export default ImageCard;
