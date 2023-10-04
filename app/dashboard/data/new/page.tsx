"use client";

import React, { useState } from "react";
import Footer from "@/components/Footer";
import TableSelection from "@/components/TableSelection";
import UploadFile from "@/components/UploadFile";
import ConnectionType from "@/components/ConnectionType";
import Image from "next/image";

const Page = () => {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    {
      number: 1,
      title: "Connection Type",
      content: <ConnectionType />,
    },
    {
      number: 2,
      title: "Upload File",
      content: <UploadFile />,
    },
    {
      number: 3,
      title: "Select Table",
      content: <TableSelection />,
    },
    { number: 4, title: "Edit fields", content: <p>Hello</p> },
    { number: 5, title: "Add Dataset Info", content: <p>Hello</p> },
  ];

  return (
    <div>
      <div className="h-[49px] px-7 py-3 flex justify-between items-center bg-[#DEE8FA]">
        <p className="text-[#17212F] text-lg font-semibold">Add New Dataset</p>
        <div className="flex gap-6 items-center justify-center">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-[10px] text-[#17212F] text-sm font-medium"
            >
              <span
                className={`w-5 flex items-center justify-center self-stretch rounded ${
                  step.number <= currentStep
                    ? "bg-[#2770EF] text-white"
                    : "bg-white"
                }`}
              >
                {step.number < currentStep ? (
                  <Image
                    src="/assets/check-icon.svg"
                    alt="checked"
                    width={16}
                    height={16}
                  />
                ) : (
                  step.number
                )}
              </span>
              <span>{step.title}</span>
            </div>
          ))}
        </div>
      </div>
      {steps[currentStep - 1].content}
      <Footer step={currentStep} />
    </div>
  );
};

export default Page;
