"use client";

import Image from "next/image";
import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "../../ui/switch";
import DeleteModal from "../../DeleteModal";
import EditFooter from "./EditFooter";
import MenuBar from "../../MenuBar";
import { formatLastLoad, formatRows, formatSize } from "@/lib/formatDatasets";

type Props = {
  dataset: Dataset;
  userId: string;
  userName: string;
};

const EditDatasetInfo = ({ dataset, userId, userName }: Props) => {
  const [name, setName] = useState(dataset.name);
  const [description, setDescription] = useState(dataset.description);
  const [isUpdated, setIsUpdated] = useState(false);

  const [open, setOpen] = useState(false);
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <section className="bg-[#F6F8FA] min-h-screen flex flex-col">
      <div className="sticky top-0 z-10 flex items-center bg-[#DEE8FA] py-3 px-7">
        <h1 className="font-semibold text-lg">Edit Dataset</h1>
      </div>
      <div className="flex px-7 py-5  flex-col justify-center items-start gap-[10px] border-b border-[#EAEDF2] bg-[#F6F8FA]">
        <div className="flex gap-2">
          <Image
            src={"/assets/csv.svg"}
            alt="file image"
            width={26}
            height={26}
          />
          <h1>{dataset.name}</h1>
        </div>
        <div className="flex items-start gap-[10px] text-[#ADB3BB]">
          <p>{formatSize(dataset.size)}</p>
          <p>|</p>
          <p>{formatRows(dataset.rows)}</p>
          <p>|</p>
          <p>{dataset.columns}</p>
          <p>|</p>
          <p>{`Created by ${userName} ${formatLastLoad(dataset.createdAt)}`}</p>
          <p>|</p>
          <p>{`Modified ${formatLastLoad(dataset.updatedAt)}`}</p>
          <p>|</p>
          <p>{`Last completed data load ${formatLastLoad(
            dataset.lastLoad
          )}`}</p>
        </div>
      </div>
      <div className="flex px-7 py-5 items-center gap-[10px] bg-[#F6F8FA]">
        <MenuBar selected="Info" id={dataset._id} />
      </div>
      <div className="flex-1">
        <section className="flex overflow-y-auto items-start gap-[60px] py-10 px-7 text-[#17212F]">
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
                    src="/assets/chevron-down-disabled.svg"
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
                    src="/assets/chevron-down-disabled.svg"
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
                    src="/assets/chevron-down-disabled.svg"
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
        <div className="px-7">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center px-4 py-2 gap-[10px] bg-white border border-[#DEE8FA] rounded text-[#D30A0A] mb-5"
          >
            <Image
              src="/assets/trash.svg"
              alt="delete"
              width={20}
              height={20}
            />
            <span>Delete Dataset</span>
          </button>
        </div>
      </div>
      <DeleteModal
        id={dataset._id}
        userId={userId}
        open={open}
        name={dataset.name}
        onClose={handleCloseModal}
      />
      <EditFooter
        userId={userId}
        id={dataset._id}
        updates={isUpdated ? { name, description } : undefined}
      />
    </section>
  );
};

export default EditDatasetInfo;
