"use client";

import React, { useState } from "react";

const Filters = () => {
  const [active, setActive] = useState("shared");
  return (
    <div className="w-[180px] flex px-[5px] py-1 rounded bg-white border border-[#EAEDF2]">
      <button
        className={`px-[12px] py-[6px] ${
          active === "all" &&
          "bg-primary text-white rounded border border-[#EAEDF2] font-medium"
        }`}
        onClick={() => setActive("all")}
      >
        All
      </button>
      <button
        className={`px-[12px] py-[6px] ${
          active === "mine" &&
          "bg-primary text-white rounded border border-[#EAEDF2] font-medium"
        }`}
        onClick={() => setActive("mine")}
      >
        Mine
      </button>
      <button
        className={`px-[12px] py-[6px] ${
          active === "shared" &&
          "bg-primary text-white rounded border border-[#EAEDF2] font-medium"
        }`}
        onClick={() => setActive("shared")}
      >
        Shared
      </button>
    </div>
  );
};

export default Filters;
