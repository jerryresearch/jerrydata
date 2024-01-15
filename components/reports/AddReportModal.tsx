import createReport from "@/lib/reports/createReport";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
  userId: string;
};

import React, { useState } from "react";

const AddReportModal = ({ open, onClose, userId }: Props) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreate = async () => {
    console.log(name, description);
    setIsLoading(true);
    try {
      const res = await createReport(userId, { name, description });
      onClose();
      // router.refresh();
      location.reload();
    } catch (error) {
      console.log("error in creating report");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section
      className={`${
        open
          ? "fixed inset-0 h-screen w-screen flex items-center justify-center bg-[#334155]/20"
          : "hidden"
      }`}
    >
      <div className="flex flex-col items-center gap-6 bg-white w-[640px] h-[524px] flex-shrink-0 text-[#17212F] shadow-custom rounded-[8px]">
        <div className="h-[92px] w-full p-8 inline-flex items-start justify-center gap-[442px] flex-shrink-0 border-b border-[#EAEDF2] bg-[#F8FAFC]">
          <p className="text-xl font-semibold">Add Report</p>
          <Image
            src="/assets/dismiss.svg"
            alt="close modal"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4 w-[576px] justify-center items-start text-sm">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter title name here"
            className="flex h-10 py-[14px] px-3 items-center self-stretch rounded border border-[#EAEDF2] bg-white"
          />
        </div>
        <div className="flex flex-col gap-4 w-[576px] justify-center items-start text-sm">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="h-[180px] py-[14px] px-3 flex items-start self-stretch rounded border border-[#EAEDF2] bg-white"
          ></textarea>
        </div>
        <div className="flex gap-[10px] justify-end items-center w-[576px]">
          <button
            onClick={onClose}
            disabled={isLoading}
            className={`rounded border border-[#DEE8FA] px-4 py-2 h-[36px] flex items-center justify-center gap-[10px]`}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className={`rounded text-white bg-primary px-4 py-2 h-[36px] flex items-center justify-center gap-[10px] ${
              isLoading && "opacity-50 cursor-progress"
            }`}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddReportModal;
