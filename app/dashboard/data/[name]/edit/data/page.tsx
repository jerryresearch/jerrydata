import EditDatasetData from "@/components/data/edit/EditDatasetData";
import getDataset from "@/lib/getDataset";
import getRecords from "@/lib/getRecords";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
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
  const userId = session?.user?._id || session?.user?.id;

  const pageNo = parseInt(searchParams?.page || "1");
  const id = searchParams?.id || "";

  const recordsData: Promise<Result> = getRecords(userId, id, pageNo);
  const datasetData: Promise<Dataset> = getDataset(userId, id);

  const dataset = await datasetData;
  const { records, totalRecords, currentPage, totalPages } = await recordsData;

  return (
    <EditDatasetData
      dataset={dataset}
      userId={userId}
      records={records}
      name={params.name}
      totalPages={totalPages}
      currentPage={currentPage}
      userName={session?.user?.fullName}
    />
  );
};

export default Page;
