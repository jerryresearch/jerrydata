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
    <section className="flex flex-col w-full h-[calc(100vh-56px)] flex-shrink-0">
      <Header name={report?.name} chartsCount={chartsCount} />
      <div className="flex-1 flex flex-col justify-center px-[60px] items-center gap-[40px]">
        <Image
          src="/assets/no-dashboards.svg"
          alt="no reports"
          width={124}
          height={84}
        />
        <h1 className="text-[#A9AAAE] text-2xl font-medium gap-[10px]">
          No Charts found
        </h1>
      </div>
    </section>
  );
};

export default EmptyPage;
