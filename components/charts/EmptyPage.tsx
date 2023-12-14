"use client";

import Image from "next/image";
import Header from "./Header";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type Props = {
  report: Reports;
};

const EmptyPage = ({ report }: Props) => {
  const chartsCount = 0;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;
  const reportId = searchParams.get("id");

  return (
    <section>
      <Header name={report?.name} chartsCount={chartsCount} />
      <section className="flex h-[calc(100vh-129px)] py-5 px-7 items-center justify-center gap-5 flex-shrink-0">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/assets/no-reports.svg"
            alt="no reports"
            width={82}
            height={88}
          />
          <div className="flex flex-col items-center">
            <h1 className="text-[#17212F] text-xl font-semibold gap-[10px]">
              No Charts
            </h1>
            <p className="text-[#ADB3BB] text-sm mt-[10px]">
              You can add a chart to the report.
            </p>
          </div>
          <div className="inline-flex flex-col justify-center items-center gap-[10px]">
            <Link
              href={`${pathname}/new?id=${reportId}`}
              className=" h-[36px] flex items-center justify-center gap-[10px] self-stretch px-4 py-2 rounded bg-primary text-white"
            >
              Add Chart
            </Link>
          </div>
        </div>
      </section>
    </section>
  );
};

export default EmptyPage;
