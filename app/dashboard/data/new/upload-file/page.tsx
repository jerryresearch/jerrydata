import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
  const currentStep = 2;
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
    console.log("Hello");
    dataset = await datasetData;
  }

  const handleDelete = async () => {
    "use server";
    const res = await deleteDataset(userId, id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <UploadFile
        handleDelete={handleDelete}
        dataset={dataset}
        id={id}
        type={type}
      />
      <Footer
        step={currentStep}
        nextHref={`select-table?id=${id}`}
        backHref={`connection-type?type=${type}`}
        nextDisabled={id == ""}
      />
    </div>
  );
};

export default Page;
