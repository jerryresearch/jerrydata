"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const currentStep = 1;
  const searchParams = useSearchParams();
  const [selectedType, setSelectedType] = useState(
    searchParams.get("type") || ""
  );

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
                  setSelectedType(file.name);
                }}
              >
                <ImageCard
                  image={file.image}
                  selected={selectedType === file.name}
                  disabled={false}
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
        nextHref={`upload-file/?type=${selectedType}`}
        backHref=""
      />
    </div>
  );
};

export default Page;
