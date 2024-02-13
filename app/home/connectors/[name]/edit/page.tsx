import EditDataContainer from "@/components/data/edit/EditDataContainer";
import EditDatasetFields from "@/components/data/edit/EditDatasetFields";
import EditDatasetInfo from "@/components/data/edit/EditDatasetInfo";
import getDataset from "@/lib/getDataset";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const userName = session?.user?.name;

  const id = searchParams?.id || "";
  const type = searchParams?.type || "info";

  const datasetData: Promise<Dataset> = getDataset(userId, id);
  const dataset = await datasetData;

  return (
    <section className="text-[#080D19] px-[60px]">
      {type == "data" ? (
        <EditDataContainer params={params} searchParams={searchParams} />
      ) : type == "info" ? (
        <EditDatasetInfo
          dataset={dataset}
          userId={userId}
          userName={userName}
        />
      ) : (
        <EditDatasetFields
          dataset={dataset}
          userId={userId}
          userName={userName}
        />
      )}
    </section>
  );
};

export default page;
