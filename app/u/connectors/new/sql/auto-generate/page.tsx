import AutoGenerate from "@/components/AutoGenerate";
import getDataset from "@/lib/getDataset";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const datasetId = searchParams?.id;

  const datasetData: Promise<Dataset> = getDataset(userId, datasetId);
  const dataset = await datasetData;

  return <AutoGenerate dataset={dataset} id={datasetId} userId={userId} />;
};

export default Page;
