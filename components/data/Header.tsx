"use client";

import deleteDataset from "@/lib/datasets/deleteDataset";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {
  step: number;
  nextDisabled: boolean;
  handleBack: () => void;
  handleNext: () => void;
  type?: string;
  id?: string;
};

const Header = ({
  step,
  nextDisabled,
  handleBack,
  handleNext,
  type,
  id,
}: Props) => {
  const pathname = usePathname();
  const ind = pathname.lastIndexOf("/");
  const path = pathname.substring(0, ind);
  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;

  const handleDelete = async () => {
    console.log("first");
    if (id) {
      try {
        await deleteDataset(userId, id);
        console.log("done");
        location.replace("/connectors");
      } catch (error) {
        alert("error");
        console.log(error);
      }
    }
  };

  return (
    <section className="fixed inset-x-0 bg-white z-50">
      <div className="hidden w-full md:flex justify-between items-center border-b border-[#EEEEFF] py-6 px-[60px]">
        <div className="flex flex-col gap-3">
          <p>
            <Link href="/connectors" className="text-[#61656C]">
              Connectors /
            </Link>
            <Link href="#" className="text-primary">
              {" "}
              Add New Connection
            </Link>
          </p>
          {/* steps */}
          <div className="flex gap-5 text-[#080D19]">
            <p
              // href={`${path}/connector-type?type=${type}&id=${id}`}
              className={`flex gap-4 items-center`}
            >
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 1
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                1
              </span>
              <span className={`${step >= 1 ? "" : "text-[#61656C]"}`}>
                Choose Type
              </span>
            </p>
            <p
              // href={`${path}/${
              //   type?.includes("sql") ? "make-connection" : "upload-file"
              // }?type=${type}&id=${id}`}
              className={`flex gap-4 items-center ${
                true && "pointer-events-auto"
              }`}
            >
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 2
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C] pointer-events-none"
                }`}
              >
                2
              </span>
              <span className={`${step >= 2 ? "" : "text-[#61656C]"}`}>
                Make Connection
              </span>
            </p>
            <p
              className={`flex gap-4 items-center ${
                step <= 2 && "pointer-events-auto"
              }`}
            >
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 3
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                3
              </span>
              <span className={`${step >= 3 ? "" : "text-[#61656C]"}`}>
                Select Table
              </span>
            </p>
            <p
              className={`flex gap-4 items-center ${
                step <= 2 && "pointer-events-auto"
              }`}
            >
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 4
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                4
              </span>
              <span className={`${step >= 4 ? "" : "text-[#61656C]"}`}>
                Edit Fields
              </span>
            </p>
            <p
              className={`flex gap-4 items-center ${
                step <= 2 && "pointer-events-auto"
              }`}
            >
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 5
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                5
              </span>
              <span className={`${step >= 5 ? "" : "text-[#61656C]"}`}>
                Add Info
              </span>
            </p>
            <p
              className={`flex gap-4 items-center ${
                step <= 2 && "pointer-events-auto"
              }`}
            >
              <span
                className={`flex items-center justify-center w-[26px] h-[26px] rounded-full ${
                  step >= 6
                    ? "bg-primary text-white"
                    : "text-[#61656C] border border-[#61656C]"
                }`}
              >
                6
              </span>
              <span className={`${step >= 6 ? "" : "text-[#61656C]"}`}>
                Other Preferences
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-4 h-[42px]">
          <button
            onClick={() => handleDelete()}
            className="py-1 px-[14px] w-20 flex items-center bg-[#F1F1F1] rounded-[6px] text-[#61656C] font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => handleNext()}
            className={`py-1 px-[14px] w-20 bg-primary rounded-[6px] text-white font-medium ${
              nextDisabled && "bg-primary/50 pointer-events-none"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Header;
