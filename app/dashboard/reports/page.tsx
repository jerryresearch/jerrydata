import EmptyPage from "@/components/reports/EmptyPage";
import Reports from "@/components/reports/Reports";
import getReports from "@/lib/getReports";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const reportsData: Promise<Reports[]> = getReports(userId);

  const reports = await reportsData;

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">Reports</h1>
      </div>
      {reports.length == 0 ? (
        <EmptyPage userId={userId} />
      ) : (
        <Reports userId={userId} reports={reports} />
      )}
    </section>
  );
};

export default Page;
