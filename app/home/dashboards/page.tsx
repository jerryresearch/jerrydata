import EmptyPage from "@/components/reports/EmptyPage";
import Reports from "@/components/reports/Reports";
import getDatasets from "@/lib/getDatasets";
import getReports from "@/lib/getReports";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const reportsData: Promise<Reports[]> = getReports(userId);
  const datasetsData: Promise<Dataset[]> = getDatasets(userId);

  const reports = await reportsData;
  const datasets = await datasetsData;

  return (
    <section>
      {reports.length == 0 ? (
        <EmptyPage userId={userId} datasets={datasets} />
      ) : (
        <Reports userId={userId} reports={reports} datasets={datasets} />
      )}
    </section>
  );
};

export default Page;
