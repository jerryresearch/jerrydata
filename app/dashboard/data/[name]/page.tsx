import Pagination from "@/components/Pagination";
import Data from "@/components/data/Data";
import { formatLastLoad, formatRows, formatSize } from "@/lib/formatDatasets";
import getRecords from "@/lib/getRecords";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

type Result = {
  records: any[];
  totalRecords: number;
  currentPage: number;
  totalPages: number;
};

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const session: any = await getServerSession(authOptions);
  const pageNo = parseInt(searchParams?.page || "1");
  const id = searchParams?.id || "";

  const recordsData: Promise<Result> = getRecords(
    session?.user?._id || session?.user?.id,
    id,
    pageNo
  );

  const userId = session?.user?._id || session?.user?.id;
  const datasetId = searchParams?.id;

  const res = await fetch(
    `http://localhost:3000/api/dataset/${userId}/${datasetId}`
  );
  if (!res.ok) {
    console.log("error");
  }
  const dataset = await res.json();

  const { records, totalRecords, currentPage, totalPages } = await recordsData;

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
        <h1 className="font-semibold text-lg">Data</h1>
      </div>
      <div className="flex px-7 py-5  flex-col justify-center items-start gap-[10px] border-b border-[#EAEDF2] bg-[#F6F8FA]">
        <div className="flex gap-2">
          <Image src={row.image} alt="file image" width={26} height={26} />
          <h1>{dataset.name}</h1>
        </div>
        <div className="flex items-start gap-[10px] text-[#ADB3BB]">
          <p>{formatSize(dataset.size)}</p>
          <p>|</p>
          <p>{formatRows(dataset.rows)}</p>
          <p>|</p>
          <p>{dataset.columns}</p>
          <p>|</p>
          <p>{`Created by ${session?.user?.fullName} ${dataset.createdAt}`}</p>
          <p>|</p>
          <p>{`Modified ${dataset.updatedAt}`}</p>
          <p>|</p>
          <p>{`Last completed data load ${formatLastLoad(
            dataset.lastLoad
          )}`}</p>
        </div>
      </div>
      <Data headers={dataset.headers} records={records} />
      <Pagination
        name={params.name}
        id={id}
        length={records.length}
        totalRecords={dataset.rows}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
};

export default Page;
