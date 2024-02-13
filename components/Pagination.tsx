import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  length: number;
  totalRecords: number;
  currentPage: number;
  totalPages: number;
  href: string;
};

const Pagination = ({
  length,
  totalRecords,
  currentPage,
  totalPages,
  href,
}: Props) => {
  const start = (currentPage - 1) * 100 + 1;
  const end = start - 1 + length;
  return (
    <div className="flex justify-between items-center pt-2 pb-5">
      <div className="text-[#ADB3BB]">
        Showing {`${start} - ${end}`} of {totalRecords}
      </div>
      <div className="p-[10px] flex justify-center items-center gap-[5px] rounded border border-[#EAEDF2] bg-white">
        {currentPage != 1 && (
          <Link
            href={`${href}&page=${currentPage - 1}`}
            className="py-[6px] px-3 cursor-pointer"
          >
            <Image
              src="/assets/chevron-left.svg"
              alt="more"
              width={24}
              height={24}
            />
          </Link>
        )}
        <Link
          href={`${href}&page=${currentPage}`}
          className="py-[6px] px-3 bg-[#DEE8FA] cursor-pointer"
        >
          {currentPage}
        </Link>
        <Link
          href={`${href}&page=${currentPage + 1}`}
          className="py-[6px] px-3 cursor-pointer"
        >
          {currentPage + 1}
        </Link>
        {currentPage != totalPages && (
          <Link
            href={`${href}&page=${currentPage + 1}`}
            className="py-[6px] px-3 cursor-pointer"
          >
            <Image
              src="/assets/chevron-right.svg"
              alt="more"
              width={24}
              height={24}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
