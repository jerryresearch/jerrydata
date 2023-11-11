"use client";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  id: string;
  selected: string;
};

const MenuBar = ({ id, selected }: Props) => {
  const items = ["Info", "Field", "Data"];
  return (
    <div className="w-[180px] flex px-[5px] py-1 rounded bg-white border border-[#EAEDF2]">
      {items.map((item) => (
        <Link
          href={`${item.toLowerCase()}?id=${id}`}
          key={item}
          className={`px-[12px] py-[6px] ${
            selected === item &&
            "bg-primary text-white rounded border border-[#EAEDF2] font-medium"
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default MenuBar;
