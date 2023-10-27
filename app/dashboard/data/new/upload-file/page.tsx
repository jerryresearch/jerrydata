import UploadFile from "@/components/UploadFile";
import deleteDataset from "@/lib/datasets/deleteDataset";
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
  const id = searchParams?.id || "";
  const type = searchParams?.type || "";

  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;

  let dataset: Dataset = {
    _id: "string",
    name: "File name",
    datatype: "string",
    size: "string",
    rows: 0,
    headers: [
      {
        name: "string",
        datatype: "string",
        isDisabled: false,
      },
    ],
    columns: 0,
    lastLoad: "string",
  };

  if (id) {
    const datasetData: Promise<Dataset> = getDataset(userId, id);
    dataset = await datasetData;
  }

  const handleDelete = async () => {
    "use server";
    const res = await deleteDataset(userId, id);
  };

  return (
    <UploadFile
      handleDelete={handleDelete}
      dataset={dataset}
      id={id}
      type={type}
    />
  );
};

export default Page;
