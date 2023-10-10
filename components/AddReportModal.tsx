import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
};

import React from "react";

const AddReportModal = ({ open, onClose }: Props) => {
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
            placeholder="Description"
            className="h-[180px] py-[14px] px-3 flex items-start self-stretch rounded border border-[#EAEDF2] bg-white"
          ></textarea>
        </div>
        <div className="flex gap-[10px] justify-end items-center w-[576px]">
          <button
            onClick={onClose}
            className="rounded border border-[#DEE8FA] px-4 py-2 h-[36px] flex items-center justify-center gap-[10px]"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="rounded text-white bg-primary px-4 py-2 h-[36px] flex items-center justify-center gap-[10px]"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddReportModal;
