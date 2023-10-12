import React, { useState } from "react";
import ImageCard from "./ImageCard";

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

const ConnectionType = () => {
  const [selectedType, setSelectedType] = useState("");

  return (
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
  );
};

export default ConnectionType;
