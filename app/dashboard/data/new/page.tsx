"use client";

import Footer from "@/components/Footer";
import ImageCard from "@/components/ImageCard";
import React, { useState } from "react";

const steps = [
  { number: 1, title: "Connection Type" },
  { number: 2, title: "Upload File" },
  { number: 3, title: "Select Table" },
  { number: 4, title: "Edit fields" },
  { number: 5, title: "Add Dataset Info" },
];

const data = {
  files: [
    { name: "csv", image: "/assets/csv-file.svg", selected: false },
    { name: "xls", image: "/assets/xls-file.svg", selected: false },
  ],
  databases: [
    { name: "mysql", image: "/assets/mysql.svg", selected: false },
    { name: "sql-server", image: "/assets/sql-server.svg", selected: false },
    {
      name: "google-analytics",
      image: "/assets/google-analytics.svg",
      selected: false,
    },
    { name: "oracle", image: "/assets/oracle.svg", selected: false },
    { name: "mariadb", image: "/assets/mariadb.svg", selected: false },
  ],
  cloud: [
    {
      name: "amazon-redshift",
      image: "/assets/amazon-redshift.svg",
      selected: false,
    },
    { name: "snowflake", image: "/assets/snowflake.svg", selected: false },
  ],
};

const Page = () => {
  const [selectedType, setSelectedType] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

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
                className={`w-5 px-[6px] flex items-center justify-center rounded ${
                  step.number === currentStep
                    ? "bg-[#2770EF] text-white"
                    : "bg-white"
                }`}
              >
                {step.number}
              </span>
              <span>{step.title}</span>
            </div>
          ))}
        </div>
      </div>
      <section className="px-7 py-10 flex flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-6">
          <p className="text-[17px] font-medium leading-7">Files</p>
          <div className="flex gap-6 items-start">
            {data.files.map((file, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedType(file.name);
                }}
              >
                <ImageCard
                  image={file.image}
                  selected={selectedType === file.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="text-[17px] font-medium leading-7">Databases</p>
          <div className="flex gap-6 items-start">
            {data.databases.map((database, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedType(database.name);
                }}
              >
                <ImageCard
                  image={database.image}
                  selected={selectedType === database.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="text-[17px] font-medium leading-7">Cloud Storage</p>
          <div className="flex gap-6 items-start">
            {data.cloud.map((storage, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedType(storage.name);
                }}
              >
                <ImageCard
                  image={storage.image}
                  selected={selectedType === storage.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Page;
