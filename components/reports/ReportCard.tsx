import Link from "next/link";
import ReportsActions from "./ReportsActions";
import { formatLastLoad } from "@/lib/formatDatasets";

type Props = {
  userId: string;
  report: Reports;
};

function formatDateTime(dateTimeString: string) {
  const dateTime = new Date(dateTimeString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  // @ts-ignore
  return dateTime.toLocaleDateString("en-US", options);

  // const date = dateTime
  //   // @ts-ignore
  //   .toLocaleDateString("en-US", optionsDate)
  //   .replace(/\//g, "/");

  // return `${date}`;
}

const ReportCard = ({ userId, report }: Props) => {
  const { _id, name, chartsCount, updatedAt, charts } = report;
  return (
    <div className="flex shadow-custom p-6 rounded-[6px] items-start justify-between gap-1 h-full">
      <div className="flex flex-col gap-[10px] justify-start">
        <Link
          href={`reports/${name}/?id=${_id}`}
          className="text-xl font-medium text-[#080D19]"
        >
          {name.length > 26 ? name.substring(0, 26) + "..." : name}
          {/* Lorem ipsum dolor sit amet consectetur */}
        </Link>
        <p className="text-[#61656C] text-sm">
          Last edited {formatDateTime(updatedAt)}
        </p>
      </div>
      <ReportsActions report={report} userId={userId} />
    </div>
  );
};

export default ReportCard;
