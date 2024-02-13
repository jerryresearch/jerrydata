"use client";

import Link from "next/link";
import React from "react";

type Props = {
  step: number;
  nextDisabled: boolean;
  handleBack: () => void;
  handleNext: () => void;
};

const Header = ({ step, nextDisabled, handleBack, handleNext }: Props) => {
  return (
    <section>
      <div className="w-full flex justify-between items-center border-b border-[#EEEEFF] py-6 px-[60px]">
        <div className="flex flex-col gap-3">
          <p>
            <Link href="/home/connectors" className="text-[#61656C]">
              Connectors /
            </Link>
            <Link href="#" className="text-primary">
              {" "}
              Add New Connection
            </Link>
          </p>
          {/* steps */}
          <div className="flex gap-5 text-[#080D19]">
            <p className="flex gap-4 items-center">
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 1
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                1
              </span>
              <span className={`${step >= 1 ? "" : "text-[#61656C]"}`}>
                Choose Type
              </span>
            </p>
            <p className="flex gap-4 items-center">
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 2
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                2
              </span>
              <span className={`${step >= 2 ? "" : "text-[#61656C]"}`}>
                Make Connection
              </span>
            </p>
            <p className="flex gap-4 items-center">
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 3
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                3
              </span>
              <span className={`${step >= 3 ? "" : "text-[#61656C]"}`}>
                Select Table
              </span>
            </p>
            <p className="flex gap-4 items-center">
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 4
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                4
              </span>
              <span className={`${step >= 4 ? "" : "text-[#61656C]"}`}>
                Edit Fields
              </span>
            </p>
            <p className="flex gap-4 items-center">
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 5
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                5
              </span>
              <span className={`${step >= 5 ? "" : "text-[#61656C]"}`}>
                Add Info
              </span>
            </p>
            <p className="flex gap-4 items-center">
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 6
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                6
              </span>
              <span className={`${step >= 6 ? "" : "text-[#61656C]"}`}>
                Other Preferences
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 h-[42px]">
          <Link
            href="/home/connectors"
            className="py-1 px-[14px] w-20 flex items-center bg-[#F1F1F1] rounded-[6px] text-[#61656C] font-medium"
          >
            Cancel
          </Link>
          <button
            onClick={() => handleNext()}
            className={`py-1 px-[14px] w-20 bg-primary rounded-[6px] text-white font-medium ${
              nextDisabled && "bg-primary/50 pointer-events-none"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
