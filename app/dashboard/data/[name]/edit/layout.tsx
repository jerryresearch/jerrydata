import EditFooter from "@/components/EditFooter";
import MenuBar from "@/components/MenuBar";
import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const items = ["Info", "Field", "Data"];

  const row = {
    image: "/assets/csv.svg",
    name: "Sample - Retail Orders",
    datatype: "CSV",
    size: "12 mb",
    rows: "11.7 k",
    columns: 21,
    lastLoad: "8 Hours Ago",
    createdBy: "raptorIQ",
    createdAt: "3 Days Ago",
    modifiedAt: "3 Aays Ago",
  };

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center bg-[#DEE8FA] py-3 px-7">
        <h1 className="font-semibold text-lg">Edit Dataset</h1>
      </div>
      <div className="flex px-7 py-5  flex-col justify-center items-start gap-[10px] border-b border-[#EAEDF2] bg-[#F6F8FA]">
        <div className="flex gap-2">
          <Image src={row.image} alt="file image" width={26} height={26} />
          <h1>{row.name}</h1>
        </div>
        <div className="flex items-start gap-[10px] text-[#ADB3BB]">
          <p>{row.size}</p>
          <p>|</p>
          <p>{row.rows}</p>
          <p>|</p>
          <p>{row.columns}</p>
          <p>|</p>
          <p>{`Created by ${row.createdBy} ${row.createdAt}`}</p>
          <p>|</p>
          <p>{`Modified ${row.createdAt}`}</p>
          <p>|</p>
          <p>{`Last completed data load ${row.lastLoad}`}</p>
        </div>
      </div>
      <div className="flex px-7 py-5 items-center gap-[10px] bg-[#F6F8FA]">
        <MenuBar items={items} />
      </div>
      {children}
      <EditFooter />
    </section>
  );
};

export default Layout;
