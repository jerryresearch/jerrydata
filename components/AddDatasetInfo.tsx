"use client";

import React, { useState } from "react";
import { Switch } from "./ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/navigation";
import updateDataset from "@/lib/datasets/updateDataset";

type Props = {
  dataset: Dataset;
  id: string;
  userId: string;
};

const AddDatasetInfo = ({ id, userId, dataset }: Props) => {
  const currentStep = 5;
  const [name, setName] = useState(dataset.name);
  const [description, setDescription] = useState(dataset.description);
  const [isUpdated, setIsUpdated] = useState(false);

  const router = useRouter();

  const handleBack = () => {
    router.push(`edit-fields?id=${id}`);
  };

  const handleNext = async () => {
    if (isUpdated) {
      try {
        const res = await updateDataset(userId, id, {
          name,
          description,
        });
        router.push("/dashboard/data");
        router.refresh();
      } catch (error) {
        console.log("error in updating dataset");
        alert("error updating");
      }
    } else {
      router.push("/dashboard/data");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <div className="flex-1">
        <section className="flex items-start gap-[60px] py-10 px-7 text-[#17212F]">
          <div className="flex flex-col gap-6 items-start w-[500px] flex-shrink-0">
            <div className="flex gap-4 items-center self-stretch">
              <label className="text-sm font-medium w-[120px]">
                Dataset Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setIsUpdated(true);
                  setName(e.target.value);
                }}
                className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
              />
            </div>
            <div className="flex items-center self-stretch gap-4">
              <label className="text-sm font-medium w-[120px]">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => {
                  setIsUpdated(true);
                  setDescription(e.target.value);
                }}
                className="flex-[1_0_0] h-[120px] py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
              ></textarea>
            </div>
            <div className="flex items-center gap-4 self-stretch pointer-events-none text-[#ADB3BB]">
              <label className="text-sm font-medium w-[120px]">
                Record Name
              </label>
              <input
                type="text"
                className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
              />
            </div>
          </div>

          <div className="flex flex-col flex-shrink-0 gap-6 items-start w-[500px] pointer-events-none text-[#ADB3BB]">
            <div className="flex items-center self-stretch gap-4">
              <label className="w-[120px] text-sm font-medium">
                Default Date Field
              </label>
              <Popover>
                <PopoverTrigger className="flex py-[14px] px-3 justify-between flex-[1_0_0] items-center border border-[#EAEDF2] bg-white">
                  <span className="flex-[1_0_0] text-start">Ship Date</span>
                  <Image
                    src="/assets/chevron-down.svg"
                    alt="chevron down icon"
                    width={16}
                    height={16}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[364px] bg-white">
                  <ul className="">
                    <li className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                      Order Date
                    </li>
                    <li className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                      Ship Date
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center self-stretch gap-4">
              <label className="w-[120px] text-sm font-medium">
                Default Geo Field
              </label>
              <Popover>
                <PopoverTrigger className="flex py-[14px] px-3 justify-between flex-[1_0_0] items-center border border-[#EAEDF2] bg-white">
                  <span className="flex-[1_0_0] text-start">Country</span>
                  <Image
                    src="/assets/chevron-down.svg"
                    alt="chevron down icon"
                    width={16}
                    height={16}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[364px] bg-white">
                  <ul className="">
                    <li className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                      Country
                    </li>
                    <li className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                      State
                    </li>
                    <li className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                      City
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center self-stretch gap-4">
              <label className="w-[120px] text-sm font-medium">
                Default Metric
              </label>
              <Popover>
                <PopoverTrigger className="flex py-[14px] px-3 justify-between flex-[1_0_0] items-center border border-[#EAEDF2] bg-white">
                  <span className="flex-[1_0_0] text-start">
                    Count of rows (Default)
                  </span>
                  <Image
                    src="/assets/chevron-down.svg"
                    alt="chevron down icon"
                    width={16}
                    height={16}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-[364px] bg-white">
                  <ul className="">
                    <li className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                      Count of rows (Default)
                    </li>
                    <li className="flex gap-2 items-center p-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                      Sum of Rows
                    </li>
                  </ul>
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center self-stretch gap-4">
              <label className="w-[120px] text-sm font-medium">Active</label>
              <Switch />
            </div>
          </div>
        </section>
      </div>
      <Footer
        step={currentStep}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default AddDatasetInfo;
