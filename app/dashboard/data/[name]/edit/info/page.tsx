import EditDatasetInfo from "@/components/data/edit/EditDatasetInfo";
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
  const id = searchParams?.id || "";

  const datasetData: Promise<Dataset> = getDataset(userId, id);
  const dataset = await datasetData;

  return (
    <EditDatasetInfo
      dataset={dataset}
      userId={userId}
      userName={session?.user?.fullName}
    />
  );
};

export default Page;
