import EmptyPage from "@/components/reports/EmptyPage";
import Reports from "@/components/reports/Reports";
import getReports from "@/lib/getReports";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

type Reports = {
  title: string;
  chartsCount: number;
  lastModified: string;
  charts: string[];
  createdBy: string;
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  // @ts-ignore
  const reportsData: Promise<Reports[]> = getReports(session?.user?._id);

  const reports = await reportsData;
  // const reports = [
  //   {
  //     title: "Spellmint Analytics",
  //     chartsCount: 0,
  //     lastModified: "0 days",
  //     charts: [],
  //   },
  //   {
  //     title: "Hurrae Analytics",
  //     chartsCount: 6,
  //     lastModified: "2 days",
  //     charts: [
  //       "Total No. of Website Visitors",
  //       "No. of Signups to Hurrae Infinity",
  //     ],
  //   },
  // ] as Report[];

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center py-3 px-7 bg-[#DEE8FA] h-[49px]">
        <h1 className="text-lg font-semibold text-[#17212F]">Reports</h1>
      </div>
      {reports.length == 0 ? <EmptyPage /> : <Reports reports={reports} />}
      {/* <EmptyPage /> */}
    </section>
  );
};

export default Page;
