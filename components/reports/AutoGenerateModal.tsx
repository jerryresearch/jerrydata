import autogenerateReport from "@/lib/datasets/autogenerateReport";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  setIsLoading: (val: any) => void;
  datasets: Dataset[];
  userId: string;
};

import React, { useState } from "react";

const AutoGenerateModal = ({
  open,
  onClose,
  datasets,
  userId,
  setIsLoading,
}: Props) => {
  const [selectedDataset, setSelectedDataset] = useState("");

  const handleGenerate = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await autogenerateReport(userId, id);
      console.log(response.message);
      console.log(response.messageList);
    } catch (error) {
      console.log("error in generating report");
      alert("something went wrong");
    } finally {
      setIsLoading(false);
      onClose();
      location.reload();
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
      <div className="flex flex-col items-center gap-6 bg-white w-[640px] h-[522px] flex-shrink-0 text-[#080D19] shadow-custom rounded-[8px] pb-8">
        <div className="h-20 w-full py-6 px-8 flex items-center rounded-[6px] justify-between border-b border-[#EEEEFF] bg-[#FAFAFA]">
          <p className="text-xl font-medium">Select Dataset</p>
          <Image
            src="/assets/dismiss.svg"
            alt="close modal"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="flex py-[14px] px-2 flex-1 overflow-y-auto justify-between items-start mx-auto self-stretch rounded border border-[#EEEEFF] bg-white w-[576px]">
          <div className="flex flex-col items-start gap-[10px]">
            {datasets.map((dataset) => (
              <div key={dataset._id} className="px-2">
                <div className="flex py-2 justify-center items-center gap-[10px] self-stretch">
                  <div className="flex items-center justify-center gap-[10px]">
                    <input
                      type="radio"
                      name={"dataset"}
                      checked={selectedDataset == dataset._id}
                      onChange={() => setSelectedDataset(dataset._id)}
                      id={dataset._id}
                      className="cursor-pointer accent-primary mt-0.5"
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
        <div className="flex flex-col gap-4 justify-center items-center w-[576px]">
          <button
            onClick={onClose}
            className={`rounded-[6px] bg-[#F1F1F1] px-6 py-2 h-12 w-full`}
          >
            Cancel
          </button>
          <button
            disabled={selectedDataset == ""}
            onClick={() => {
              handleGenerate(selectedDataset);
              //   onClose();
            }}
            className={`rounded-[6px] text-white cursor-pointer bg-primary px-6 py-2 h-12 w-full flex items-center justify-center gap-[10px] disabled:opacity-50 disabled:pointer-events-none`}
          >
            <Image
              src="/assets/magic-dashboard-active.svg"
              alt="magic dashboard"
              width={20}
              height={20}
            />
            <span>Generate Magic Dashboard</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AutoGenerateModal;
