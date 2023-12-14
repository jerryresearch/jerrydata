import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  datasets: Dataset[];
  handleSelectDataset: (id: string) => void;
};

import React, { useState } from "react";

const SelectDatasetModal = ({
  open,
  onClose,
  datasets,
  handleSelectDataset,
}: Props) => {
  const [selectedDataset, setSelectedDataset] = useState("");

  return (
    <section
      className={`${
        open
          ? "fixed inset-0 h-screen w-screen flex items-center justify-center bg-[#334155]/20"
          : "hidden"
      }`}
    >
      <div className="flex flex-col items-center gap-6 bg-white w-[640px] h-[522px] flex-shrink-0 text-[#17212F] shadow-custom rounded-[8px] pb-8">
        <div className="h-[92px] w-full p-8 inline-flex items-start justify-center gap-[410px] flex-shrink-0 border-b border-[#EAEDF2] bg-[#F8FAFC]">
          <p className="text-xl font-semibold">Select Dataset</p>
          <Image
            src="/assets/dismiss.svg"
            alt="close modal"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="flex py-[14px] px-[10px] flex-1 overflow-y-auto justify-between items-start mx-auto self-stretch rounded border border-[#EAEDF2] bg-white w-[576px]">
          <div className="flex flex-col items-start gap-[14px]">
            {datasets.map((dataset) => (
              <div key={dataset._id} className="px-2">
                <div className="flex py-2 justify-center items-center gap-[10px] self-stretch">
                  <Image
                    src="/assets/chevron-right.svg"
                    alt="down icon"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                  <div className="flex items-center justify-center gap-[10px]">
                    <input
                      type="checkbox"
                      name={dataset._id}
                      checked={selectedDataset == dataset._id}
                      onChange={() => setSelectedDataset(dataset._id)}
                      id={dataset._id}
                      className="cursor-pointer"
                    />
                    <label
                      htmlFor={dataset._id}
                      className="text-sm cursor-pointer"
                    >
                      {dataset.name}
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-[10px] justify-end items-center w-[576px]">
          <button
            onClick={onClose}
            className={`rounded border border-[#DEE8FA] px-4 py-2 h-[36px] flex items-center justify-center gap-[10px]`}
          >
            Cancel
          </button>
          <button
            disabled={selectedDataset == ""}
            onClick={() => {
              handleSelectDataset(selectedDataset);
              onClose();
            }}
            className={`rounded text-white bg-primary px-4 py-2 h-[36px] flex items-center justify-center gap-[10px] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SelectDatasetModal;
