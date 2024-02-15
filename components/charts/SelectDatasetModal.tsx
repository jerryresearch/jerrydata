import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          {/* <Accordion
            type="single"
            collapsible
            className="flex flex-col w-[382px] items-start gap-[4px]"
          > */}
          <Accordion
            type="single"
            collapsible
            className="flex flex-col items-start w-full"
          >
            {datasets.map((dataset, index) => (
              <AccordionItem
                key={dataset._id}
                value={`item-${index}`}
                className="w-full"
              >
                <div className="px-2 flex items-center gap-[10px] text-base">
                  <AccordionTrigger></AccordionTrigger>
                  <input
                    type="checkbox"
                    name={"dataset"}
                    checked={selectedDataset == dataset._id}
                    onChange={() => setSelectedDataset(dataset._id)}
                    id={dataset._id}
                    className="cursor-pointer accent-primary"
                  />
                  <label htmlFor={dataset._id} className="cursor-pointer">
                    {dataset.name}
                  </label>
                </div>
                <AccordionContent className="flex flex-col gap-[10px] text-base px-[54px]">
                  {dataset.headers.map((header, index) => (
                    <p key={index} className="py-2">
                      {header.name}
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
              handleSelectDataset(selectedDataset);
              onClose();
            }}
            className={`rounded-[6px] text-white cursor-pointer bg-primary px-6 py-2 h-12 w-full flex items-center justify-center gap-[10px] disabled:opacity-50 disabled:pointer-events-none`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default SelectDatasetModal;
