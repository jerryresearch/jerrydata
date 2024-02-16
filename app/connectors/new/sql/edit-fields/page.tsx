import EditFields from "@/components/EditFields";
import getDataset from "@/lib/datasets/postgresql/getDataset";
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
  const type = searchParams?.type;

  const { dataset } = await getDataset(userId, datasetId, type);

  return (
    <EditFields
      id={dataset._id}
      userId={userId}
      headers={dataset.headers}
      type={type}
    />
  );
};

export default Page;
