"use client";

import updateDataset from "@/lib/datasets/updateDataset";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  updates?: any;
  userId?: string;
  id: string;
};

const EditFooter = ({ updates, userId, id }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (userId && updates) {
      setIsLoading(true);
      try {
        const res = await updateDataset(userId, id, updates);
        console.log(res);
        location.reload();
      } catch (error) {
        console.log("error in updating dataset");
        alert("error updating");
      }
      setIsLoading(false);
    }
  };

  return (
    <footer className="p-5 sticky bottom-0 z-10 flex flex-col items-start gap-6">
      <div className="flex p-3 justify-between items-center self-stretch rounded border border-[#EAEDF2] bg-white">
        <div className="flex justify-between items-center flex-[1_0_0]">
          <Link
            href={"/dashboard/data"}
            className="flex py-2 px-4 justify-center items-center gap-[10px] rounded border border-[#DEE8FA]"
          >
            Cancel
          </Link>
          <button
            onClick={handleUpdate}
            className={`flex py-2 px-4 justify-center items-center gap-[10px] rounded bg-primary text-white ${
              (isLoading || !updates) && "opacity-50 pointer-events-none"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </footer>
  );
};

export default EditFooter;
