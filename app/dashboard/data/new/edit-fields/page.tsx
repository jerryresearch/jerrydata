import EditFields from "@/components/EditFields";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import getDataset from "@/lib/getDataset";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const id = searchParams?.id;

  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;

  const datasetData: Promise<Dataset> = getDataset(userId, id);
  const dataset = await datasetData;

  return <EditFields id={id} userId={userId} headers={dataset.headers} />;
};

export default Page;
