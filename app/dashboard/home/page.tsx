import Image from "next/image";
import Actions from "@/components/Actions";
import RecentChat from "@/components/chat/RecentChat";
import ReportCard from "@/components/ReportCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import getReports from "@/lib/getReports";
import Datasets from "@/components/data/Datasets";
import getDatasets from "@/lib/getDatasets";

const Page = async () => {
  const session: any = await getServerSession(authOptions);

  const reportsData: Promise<Reports[]> = getReports(
    session?.user?._id || session?.user?.id
  );

  const datasetsData: Promise<Dataset[]> = getDatasets(
    session?.user?._id || session?.user?.id
  );

  const reports = await reportsData;
  const datasets = await datasetsData;

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
  // ];

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <header className="flex py-5 px-7 flex-col justify-center items-start gap-6">
        <div className="h-[82px] flex justify-between self-stretch rounded-[8px] border border-[#EAEDF2] bg-white text-[#17212F] text-2xl">
          <p className="font-semibold my-6 mx-8">Welcome, Manoj.</p>
          <Image
            src="/assets/nav-icon.svg"
            alt="icon"
            width={510}
            height={255}
          />
        </div>
      </header>
      <div className="flex flex-col p-6 justify-center items-start gap-6">
        <h1 className="text-base font-medium">Recent Reports</h1>
        <div className="flex items-center gap-6">
          {reports.map((report, index) => (
            <ReportCard key={index} {...report} />
          ))}
        </div>
      </div>
      <div className="flex flex-col p-6 justify-center items-start gap-6">
        <h1 className="text-base font-medium">Recent Datasets</h1>
        <Datasets datasets={datasets} />
      </div>
      <div className="flex flex-col p-6 justify-center items-start gap-6">
        <h1 className="text-base font-medium">Recent Chats</h1>
        <div className="grid grid-cols-2 items-center gap-6 w-full">
          <RecentChat
            name="Analytics for sales of hurrae"
            lastModified="5 days"
          />
          <RecentChat
            name="Analytics for sales of hurrae"
            lastModified="5 mins"
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
