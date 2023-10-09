"use client";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  items: string[];
};

const MenuBar = ({ items }: Props) => {
  const [active, setActive] = useState<string>(items[0]);
  return (
    <div className="w-[180px] flex px-[5px] py-1 rounded bg-white border border-[#EAEDF2]">
      {items.map((item) => (
        <Link
          href={item.toLowerCase()}
          key={item}
          className={`px-[12px] py-[6px] ${
            active === item &&
            "bg-primary text-white rounded border border-[#EAEDF2] font-medium"
          }`}
          onClick={() => setActive(item)}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default MenuBar;
