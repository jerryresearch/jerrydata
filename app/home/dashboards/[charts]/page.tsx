import { getServerSession } from "next-auth";
import getCharts from "@/lib/charts/getCharts";
import { authOptions } from "@/utils/authOptions";
import EmptyPage from "@/components/charts/EmptyPage";
import ChartsContainer from "@/components/charts/ChartsContainer";
import getReport from "@/lib/reports/getReport";

const Page = async ({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: { [key: string]: any };
}) => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const reportId = searchParams?.id || "";

  const charts = await getCharts(userId, reportId);
  const report = await getReport(userId, reportId);
  const chartsCount = charts.length;

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">Reports</h1>
      </div>
      {chartsCount > 0 ? (
        <ChartsContainer charts={charts} report={report} />
      ) : (
        <EmptyPage report={report} />
      )}
    </section>
  );
};

export default Page;
