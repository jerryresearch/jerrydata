import NewChat from "@/components/chat/NewChat";
import getDatasets from "@/lib/getDatasets";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;

  const datasets: Dataset[] = await getDatasets(userId);

  return <NewChat datasets={datasets} userId={userId} />;
};

export default Page;
