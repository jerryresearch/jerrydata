import CreateChart from "@/components/charts/CreateChart";
import getDatasets from "@/lib/getDatasets";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const reportId = searchParams?.id || "";

  const datasets: Dataset[] = await getDatasets(userId);

  return <CreateChart datasets={datasets} />;
};

export default Page;
