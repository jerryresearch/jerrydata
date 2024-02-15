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
          ? "fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-[#1A1B5826]"
          : "hidden"
      }`}
    >
      <div className="bg-white flex w-[640px] min-h-[340px] rounded-[6px] flex-col gap-6 flex-shrink-0 items-center text-[#080D19] pb-6">
        <div className="h-20 w-full rounded-[6px] py-6 px-8 flex items-center justify-between flex-shrink-0 border-b border-[#EEEEFF] bg-[#FAFAFA]">
          <p className="font-medium text-xl">New Dashboard</p>
          <Image
            src="/assets/dismiss.svg"
            alt="close modal"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <form className="flex flex-col gap-6 w-[576px] items-center h-[266px]">
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="title" className="font-medium">
              <span className="text-[#D30A0A]">* </span>Dashboard Name
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name here"
              className="flex h-10 py-[14px] px-3 items-center self-stretch rounded-[6px] focus:outline-none border border-[#EEEEFF] bg-white"
            />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="h-[120px] py-[14px] px-3 flex items-start self-stretch rounded-[6px] focus:outline-none border border-[#EEEEFF] bg-white"
            ></textarea>
          </div>
        </form>
        <div className="flex flex-col gap-4 justify-center items-center w-[576px]">
          <button
            onClick={onClose}
            className={`rounded-[6px] bg-[#F1F1F1] px-6 py-2 h-12 w-full`}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className={`rounded-[6px] text-white cursor-pointer bg-primary px-6 py-2 h-12 w-full disabled:opacity-50 disabled:pointer-events-none`}
          >
            <span>Create New Dashboard</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddReportModal;
