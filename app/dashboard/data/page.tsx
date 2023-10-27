import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import getDatasets from "@/lib/getDatasets";
import DatasetsContainer from "@/components/data/DatasetsContainer";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;

  const datasetsData: Promise<Dataset[]> = getDatasets(userId);
  const datasets = await datasetsData;

  return <DatasetsContainer datasets={datasets} userId={userId} />;
};

export default Page;
