"use client";

import MenuBar from "@/components/MenuBar";
import updateDataset from "@/lib/datasets/updateDataset";
import {
  formatLastLoad,
  formatModified,
  formatRows,
  formatSize,
} from "@/lib/formatDatasets";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  dataset: Dataset;
  userName: string;
  type: string;
  updates?: any;
  userId?: string;
};

const EditHeader = ({ dataset, userName, type, updates, userId }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    if (userId && updates) {
      setIsLoading(true);
      try {
        const res = await updateDataset(userId, dataset._id, updates);
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
    <section className="fixed inset-x-0 px-[60px] bg-white z-50">
      <div className="w-full flex justify-between items-center border-b border-[#EEEEFF] py-6">
        <div className="flex flex-col gap-3">
          <p>
            <Link href="/home/connectors" className="text-[#61656C]">
              Connectors /
            </Link>
            <Link href="#" className="text-primary">
              {" "}
              Edit Dataset
            </Link>
          </p>
          <h1 className="flex gap-[14px] items-center">
            <span className="text-2xl font-medium capitalize">
              {dataset.name}
            </span>
            <span className="border border-[#080D19] py-[6px] px-[6px] rounded-[6px] text-[8px] font-medium">
              {dataset.datatype}
            </span>
          </h1>
          <div className="flex gap-[8px] items-center">
            <div className="flex gap-[4px] text-sm">
              <span className="text-[#61656C] text-sm">Size</span>
              <span className="">{formatSize(dataset.size)}</span>
            </div>
            <p className="text-[#EEEEFF]">|</p>
            <div className="flex gap-[10px] text-sm">
              <span className="text-[#61656C] text-sm">Rows</span>
              <span>{formatRows(dataset.rows)}</span>
            </div>
            <p className="text-[#EEEEFF]">|</p>
            <div className="flex gap-[10px] text-sm">
              <span className="text-[#61656C] text-sm">Columns</span>
              <span>{dataset.columns}</span>
            </div>
            <p className="text-[#EEEEFF]">|</p>
            <div className="flex gap-[10px] text-sm">
              <span className="text-[#61656C] text-sm">Created By</span>
              <span>{userName}</span>
            </div>
            <p className="text-[#EEEEFF]">|</p>
            <div className="flex gap-[10px] text-sm">
              <span className="text-[#61656C] text-sm">Created On</span>
              <span>{formatLastLoad(dataset.createdAt)}</span>
            </div>
            <p className="text-[#EEEEFF]">|</p>
            <div className="flex gap-[10px] text-sm">
              <span className="text-[#61656C] text-sm">Modified</span>
              <span>{formatModified(dataset.updatedAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 h-[42px]">
          <Link
            href="/home/connectors"
            className="py-1 px-[14px] w-20 flex items-center bg-[#F1F1F1] rounded-[6px] text-[#61656C] font-medium"
          >
            Cancel
          </Link>
          <button
            onClick={handleUpdate}
            className={`py-1 px-[14px] w-20 bg-primary rounded-[6px] text-white font-medium ${
              (isLoading || !updates) && "bg-primary/50 pointer-events-none"
            }`}
          >
            Save
          </button>
        </div>
      </div>
      <div className="py-6 flex flex-col gap-[30px]">
        <MenuBar selected={type} id={dataset._id} />
      </div>
    </section>
  );
};

export default EditHeader;
