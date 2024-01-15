"use client";

import React, { useState } from "react";
import ImageCard from "./ImageCard";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/navigation";

const data = {
  files: [
    { name: "CSV", image: "/assets/csv-file.svg" },
    { name: "XLS", image: "/assets/xls-file.svg" },
  ],
  databases: [
    { name: "mysql", image: "/assets/mysql.svg" },
    { name: "sql-server", image: "/assets/sql-server.svg" },
    {
      name: "google-analytics",
      image: "/assets/google-analytics.svg",
    },
    { name: "oracle", image: "/assets/oracle.svg" },
    { name: "mariadb", image: "/assets/mariadb.svg" },
  ],
  cloud: [
    {
      name: "amazon-redshift",
      image: "/assets/amazon-redshift.svg",
      selected: false,
    },
    { name: "snowflake", image: "/assets/snowflake.svg" },
  ],
};

type Props = {
  id: string;
  type: string;
};

const ConnectionType = ({ id, type }: Props) => {
  const [selectedType, setSelectedType] = useState(type);
  const currentStep = 1;

  const router = useRouter();

  const handleNext = () => {
    router.push(`upload-file/?type=${selectedType}`);
  };

  const handleBack = () => {};

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <section className="px-7 py-10 flex-1 flex flex-col items-start gap-6">
        <div className="flex flex-col items-start gap-6">
          <p className="text-[17px] font-medium leading-7">Files</p>
          <div className="flex gap-6 items-start">
            {data.files.map((file, index) => (
              <div
                key={index}
                onClick={() => {
                  if (file.name == "CSV") setSelectedType(file.name);
                }}
              >
                <ImageCard
                  image={file.image}
                  selected={selectedType === file.name}
                  disabled={file.name != "CSV"}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="text-[17px] font-medium leading-7">Databases</p>
          <div className="flex gap-6 items-start">
            {data.databases.map((database, index) => (
              <div key={index}>
                <ImageCard
                  image={database.image}
                  selected={selectedType === database.name}
                  disabled={true}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-6">
          <p className="text-[17px] font-medium leading-7">Cloud Storage</p>
          <div className="flex gap-6 items-start">
            {data.cloud.map((storage, index) => (
              <div key={index}>
                <ImageCard
                  image={storage.image}
                  selected={selectedType === storage.name}
                  disabled={true}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer
        step={currentStep}
        nextDisabled={selectedType == ""}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default ConnectionType;
