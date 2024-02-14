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
    <div className="flex py-5 px-[60px] justify-between items-center border-b border-b-[#EEEEFF] text-[#080D19]">
      <Link href="/home/dashboards" className="flex items-center gap-4">
        <Image src="/assets/back.svg" alt="back icon" width={20} height={20} />
        <span className="font-medium text-xl">{name}</span>
      </Link>
      <div className="h-[42px] flex gap-4">
        {chartsCount > 0 && (
          <button
            className={`h-full py-1 px-5 rounded-[6px] border border-[#EEEEFF] bg-white text-[#61656C] font-medium`}
            onClick={() => {
              onDownloadPNG && onDownloadPNG();
            }}
          >
            Download as PNG
          </button>
        )}
        {chartsCount > 0 && (
          <button
            className={`h-full py-1 px-5 rounded-[6px] border border-[#EEEEFF] bg-white text-[#61656C] font-medium`}
            onClick={() => {
              onDownloadPDF && onDownloadPDF();
            }}
          >
            Download as PDF
          </button>
        )}
        <button
          className={`flex h-full py-1 px-5 items-center gap-[6px] rounded-[6px] bg-[#F1F1F1] text-[#61656C] font-medium`}
        >
          <Image
            src="/assets/refresh.svg"
            alt="back icon"
            width={20}
            height={20}
          />
          <span>Refresh</span>
        </button>
        <Link
          href={`${pathname}/new?id=${reportId}`}
          className="flex h-full py-1 px-5 items-center gap-[6px] rounded-[6px] bg-primary text-white font-medium"
        >
          <Image
            src="/assets/plus-icon.svg"
            alt="back icon"
            width={20}
            height={20}
          />
          <span>Add Chart</span>
        </Link>
        <ShareChartModal open={open} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default Header;
