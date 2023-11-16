import AddDatasetInfo from "@/components/AddDatasetInfo";
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

  const res = await fetch(
    `${process.env.BASE_URL}/api/dataset/${userId}/${datasetId}`
  );
  if (!res.ok) {
    console.log("error");
  }
  const dataset = await res.json();

  return <AddDatasetInfo userId={userId} id={datasetId} dataset={dataset} />;
};

export default Page;
