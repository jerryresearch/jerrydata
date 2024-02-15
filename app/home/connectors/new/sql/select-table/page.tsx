import TableSelection from "@/components/data/database/TableSelection";
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

  const { tables } = await getDataset(userId, datasetId, type);

  return (
    <TableSelection
      tables={tables}
      id={datasetId}
      userId={userId}
      type={type}
    />
  );
};

export default Page;
