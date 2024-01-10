import MenuBar from "@/components/MenuBar";
import Pagination from "@/components/Pagination";
import { formatLastLoad, formatRows, formatSize } from "@/lib/formatDatasets";
import Image from "next/image";
import React from "react";
import Data from "../Data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import EditFooter from "@/components/data/edit/EditFooter";

type Props = {
  dataset: Dataset;
  records: any[];
  currentPage: number;
  totalPages: number;
};

const EditDatasetData = async ({
  dataset,
  records,
  currentPage,
  totalPages,
}: Props) => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const userName = session?.user?.fullName;

  return (
    <section className="bg-[#F6F8FA] min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 flex items-center bg-[#DEE8FA] py-3 px-7">
        <h1 className="font-semibold text-lg">Edit Dataset</h1>
      </div>
      <div className="flex px-7 py-5  flex-col justify-center items-start gap-[10px] border-b border-[#EAEDF2] bg-[#F6F8FA]">
        <div className="flex gap-2">
          <Image
            src={"/assets/csv.svg"}
            alt="file image"
            width={26}
            height={26}
          />
          <h1>{dataset.name}</h1>
        </div>
        <div className="flex items-start gap-[10px] text-[#ADB3BB]">
          <p>{formatSize(dataset.size)}</p>
          <p>|</p>
          <p>{formatRows(dataset.rows)}</p>
          <p>|</p>
          <p>{dataset.columns}</p>
          <p>|</p>
          <p>{`Created by ${userName} ${formatLastLoad(dataset.createdAt)}`}</p>
          <p>|</p>
          <p>{`Modified ${formatLastLoad(dataset.updatedAt)}`}</p>
          <p>|</p>
          <p>{`Last completed data load ${formatLastLoad(
            dataset.lastLoad
          )}`}</p>
        </div>
      </div>
      <div className="flex px-7 py-5 items-center gap-[10px] bg-[#F6F8FA]">
        <MenuBar selected="Data" id={dataset._id} />
      </div>
      <div className="flex-1">
        <Data headers={dataset.headers} records={records} />
        <Pagination
          href={`/dashboard/data/${dataset.name}/edit/data?id=${dataset._id}`}
          length={records.length}
          totalRecords={dataset.rows}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
      <EditFooter id={dataset._id} userId={userId} updates={undefined} />
    </section>
  );
};

export default EditDatasetData;
