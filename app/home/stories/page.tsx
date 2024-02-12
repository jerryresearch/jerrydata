import Stories from "@/components/stories/Stories";
import getDatasets from "@/lib/getDatasets";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;

  const datasetsData: Promise<Dataset[]> = getDatasets(userId);
  const datasets = await datasetsData;

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">Stories</h1>
      </div>
      <Stories datasets={datasets} />
    </section>
  );
};

export default Page;
