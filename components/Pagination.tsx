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
      <div className="py-[10px] px-2 flex gap-[5px] rounded-[6px]">
        {currentPage > 2 && (
          <Link
            href={`${href}&page=${1}`}
            className="py-[2px] px-3 cursor-pointer"
          >
            1
          </Link>
        )}
        {currentPage > 3 && (
          <div className="py-[2px] cursor-pointer">
            <Image
              src="/assets/ellipsis.svg"
              alt="more"
              width={24}
              height={20}
            />
          </div>
        )}
        {currentPage != 1 && (
          <Link
            href={`${href}&page=${currentPage - 1}`}
            className="py-[2px] px-3 cursor-pointer"
          >
            {currentPage - 1}
          </Link>
        )}
        <div className="py-[2px] px-3 bg-[#EEEEFF] rounded -[6px] font-medium cursor-pointer">
          {currentPage}
        </div>
        {currentPage != totalPages && (
          <Link
            href={`${href}&page=${currentPage + 1}`}
            className="py-[2px] px-3 cursor-pointer"
          >
            {currentPage + 1}
          </Link>
        )}
        {currentPage + 1 < totalPages - 1 && (
          <div className="py-[2px] cursor-pointer">
            <Image
              src="/assets/ellipsis.svg"
              alt="more"
              width={24}
              height={20}
            />
          </div>
        )}
        {currentPage < totalPages - 1 && (
          <Link
            href={`${href}&page=${totalPages}`}
            className="py-[2px] px-3 cursor-pointer"
          >
            {totalPages}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
