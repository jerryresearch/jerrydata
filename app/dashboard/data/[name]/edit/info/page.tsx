"use client";

import AddDatasetInfo from "@/components/AddDatasetInfo";
import DeleteModal from "@/components/DeleteModal";
import MenuBar from "@/components/MenuBar";
import Image from "next/image";
import React, { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <section>
      <AddDatasetInfo />
      <div className="px-7">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center px-4 py-2 gap-[10px] bg-[#DEE8FA] rounded"
        >
          <Image src="/assets/trash.svg" alt="delete" width={20} height={20} />
          <span>Delete Dataset</span>
        </button>
      </div>
      <DeleteModal open={open} onClose={handleCloseModal} />
    </section>
  );
};

export default Page;
