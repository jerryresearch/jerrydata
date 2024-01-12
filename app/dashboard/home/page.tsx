import Image from "next/image";
import RecentChat from "@/components/chat/RecentChat";
import ReportCard from "@/components/ReportCard";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import getReports from "@/lib/getReports";
import Datasets from "@/components/data/Datasets";
import getDatasets from "@/lib/getDatasets";
import getChats from "@/lib/chats/getChats";
import { formatLastLoad } from "@/lib/formatDatasets";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;

  const reportsData: Promise<Reports[]> = getReports(userId);
  const datasetsData: Promise<Dataset[]> = getDatasets(userId);
  const chatsData: Promise<Chat[]> = getChats(userId);

  const reports = await reportsData;
  const datasets = await datasetsData;
  const chats = await chatsData;

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
        <div className="grid grid-cols-3 w-full items-center gap-6">
          {reports &&
            reports
              .slice(0, 3)
              .map((report, index) => (
                <ReportCard userId={userId} key={index} report={report} />
              ))}
        </div>
      </div>
      <div className="flex flex-col p-6 justify-center items-start gap-6">
        <h1 className="text-base font-medium">Recent Datasets</h1>
        <Datasets userId={userId} datasets={datasets} />
      </div>
      <div className="flex flex-col p-6 justify-center items-start gap-6">
        <h1 className="text-base font-medium">Recent Chats</h1>
        <div className="grid grid-cols-2 items-center gap-6 w-full">
          {chats.slice(0, 2).map((chat, index) => (
            <RecentChat
              key={index}
              id={chat._id}
              name={chat.title}
              lastModified={formatLastLoad(chat.updatedAt)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
