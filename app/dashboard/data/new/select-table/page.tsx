import TableSelection from "@/components/TableSelection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import getDataset from "@/lib/getDataset";

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

  return (
    <TableSelection
      userId={userId}
      id={id}
      datatype={dataset.datatype}
      name={dataset.name}
      headers={dataset.headers}
    />
  );
};

export default Page;
