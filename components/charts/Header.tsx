"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import ShareChartModal from "../ShareChartModal";

type Props = {
  name: string;
  chartsCount: number;
  onDownloadPNG?: () => void;
  onDownloadPDF?: () => void;
};

const Header = ({ name, chartsCount, onDownloadPNG, onDownloadPDF }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;
  const reportId = searchParams.get("id");

  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className="flex h-[80px] py-5 px-7 justify-between items-center border-b border-b-[#EAEDF2]">
      <Link href="/dashboard/reports">
        <p className="flex items-center gap-2">
          <Image
            src="/assets/chevron-left.svg"
            alt="back icon"
            width={20}
            height={20}
          />
          <span>{name}</span>
        </p>
      </Link>
      <div className="h-10 text-sm flex gap-2">
        <button
          className={`inline-flex h-full py-2 px-4 justify-center items-center gap-[10px] flex-shrink-0 rounded border border-[#DEE8FA] bg-white ${
            chartsCount == 0 && "opacity-50"
          }`}
        >
          Refresh
        </button>
        <button
          className={`inline-flex h-full py-2 px-4 justify-center items-center gap-[10px] flex-shrink-0 rounded border border-[#DEE8FA] bg-white ${
            chartsCount == 0 && "opacity-50"
          }`}
          onClick={() => {
            // if (chartsCount > 0) {
            //   setOpen(true);
            // }
            onDownloadPNG && onDownloadPNG();
          }}
        >
          Download as PNG
        </button>
        <button
          className={`inline-flex h-full py-2 px-4 justify-center items-center gap-[10px] flex-shrink-0 rounded border border-[#DEE8FA] bg-white ${
            chartsCount == 0 && "opacity-50"
          }`}
          onClick={() => {
            onDownloadPDF && onDownloadPDF();
          }}
        >
          Download as PDF
        </button>
        <Link
          href={`${pathname}/new?id=${reportId}`}
          className="inline-flex h-full py-2 px-4 justify-center items-center gap-[10px] flex-shrink-0 rounded bg-primary text-white"
        >
          Add Chart
        </Link>
        <ShareChartModal open={open} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Header;
