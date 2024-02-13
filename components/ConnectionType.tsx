"use client";

import React, { useState } from "react";
import ImageCard from "./ImageCard";
import { useRouter } from "next/navigation";
import Header from "./data/Header";

const data = {
  files: [
    { name: "CSV", image: "/assets/csv-file.svg" },
    { name: "XLS", image: "/assets/xls-file.svg" },
  ],
  databases: [
    { name: "mysql", image: "/assets/mysql.svg" },
    { name: "postgresql", image: "/assets/postgresql.svg" },
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

  const router = useRouter();

  const handleNext = () => {
    if (selectedType == "CSV" || selectedType == "XLS")
      router.push(`upload-file/?type=${selectedType}`);
    if (selectedType.includes("sql"))
      router.push(`sql/add-connection/?type=${selectedType}`);
  };

  const handleBack = () => {};

  return (
    <section>
      <Header
        step={1}
        nextDisabled={selectedType == ""}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <section className="px-[60px] py-6 flex flex-col gap-6 text-[#080D19]">
        <h1 className="font-medium text-2xl">Choose Type</h1>
        <div className="flex flex-col gap-6">
          <p className="text-[#61656C]">Files</p>
          <div className="flex gap-6">
            {data.files.map((file, index) => (
              <div key={index} onClick={() => setSelectedType(file.name)}>
                <ImageCard
                  image={file.image}
                  selected={selectedType === file.name}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-[#61656C]">Databases</p>
          <div className="flex gap-6">
            {data.databases.map((database, index) => (
              <div
                key={index}
                onClick={() => {
                  if (database.name.endsWith("sql"))
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
        <div className="flex flex-col gap-6">
          <p className="text-[#61656C]">Cloud Storage</p>
          <div className="flex gap-6">
            {data.cloud.map((storage, index) => (
              <div key={index}>
                <ImageCard
                  image={storage.image}
                  selected={selectedType === storage.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default ConnectionType;
