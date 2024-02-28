import Pagination from "@/components/Pagination";
import React from "react";
import Data from "../Data";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

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
  const userName = session?.user?.name;

  return (
    <div className="">
      <Data
        dataset={dataset}
        headers={dataset.headers}
        records={records}
        userName={userName}
      />
      <Pagination
        href={`/u/connectors/${dataset.name}/edit?type=data&id=${dataset._id}`}
        length={records.length}
        totalRecords={dataset.rows}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default EditDatasetData;
