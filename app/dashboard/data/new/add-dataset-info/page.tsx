import AddDatasetInfo from "@/components/AddDatasetInfo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const currentStep = 5;
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const datasetId = searchParams?.id;

  const res = await fetch(
    `http://localhost:3000/api/dataset/${userId}/${datasetId}`
  );
  if (!res.ok) {
    console.log("error");
  }
  const dataset = await res.json();

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <div className="flex-1">
        <AddDatasetInfo dataset={dataset} />
      </div>
      <Footer
        step={currentStep}
        nextHref="/dashboard/data"
        backHref={`edit-fields?id=${datasetId}`}
        nextDisabled={false}
      />
    </div>
  );
};

export default Page;
