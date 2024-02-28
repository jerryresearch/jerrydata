"use client";

import Image from "next/image";
import React, { useState } from "react";
import { formatLastLoad, formatRows, formatSize } from "@/lib/formatDatasets";
import Link from "next/link";
import DeleteModal from "../DeleteModal";
import { useToast } from "@/components/ui/use-toast";
import refreshDataset from "@/lib/datasets/refreshDataset";

type Props = {
  datasets: Dataset[];
  userId: string;
};

const Datasets = ({ datasets, userId }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [dataset, setDataset] = useState<Dataset | undefined>();

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleRefresh = async (datasetId: string) => {
    try {
      toast({
        title: "Your connection is being refreshed",
        description: "Check after a while!",
      });
      const res = await refreshDataset(userId, datasetId);
      location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue refreshing the connection. Please try again later.",
      });
      // console.log(error);
    }
  };

  return (
    <div className="rounded border border-[#EEEEFF]">
      <table className="w-full table-auto min-w-max text-left rounded text-[#080D19]">
        {/* row */}
        <thead>
          <tr className="bg-[#FAFAFA] border-b border-[#EEEEFF] font-medium">
            <th className="p-5 font-medium">Name</th>
            <th className="p-5 font-medium">Datatype</th>
            <th className="p-5 font-medium">Size</th>
            <th className="p-5 font-medium">Rows</th>
            <th className="p-5 font-medium">Columns</th>
            <th className="flex justify-between p-5 font-medium">
              <span>Last Load</span>
              <Image
                src="/assets/chevron-down.svg"
                alt="down icon"
                width={20}
                height={20}
              />
            </th>
            <th className="p-5 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {datasets.map((row, index) => (
            <tr
              key={index}
              className="rounded border-b border-[#EEEEFF] font-medium"
            >
              <td className="p-5 text-primary">
                <Link
                  href={`connectors/${row.name}/edit?type=data&id=${row._id}`}
                >
                  {row.name}
                </Link>
              </td>
              <td className="p-5">{row.datatype}</td>
              <td className="p-5">{formatSize(row.size)}</td>
              <td className="p-5">{formatRows(row.rows)}</td>
              <td className="p-5">{row.columns}</td>
              <td className="p-5">{formatLastLoad(row.lastLoad)}</td>
              <td className="px-5 py-4 gap-4 flex">
                <Link
                  href={`connectors/${row.name}/edit?type=info&id=${row._id}`}
                >
                  <Image
                    src="/assets/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                  />
                </Link>
                <Image
                  src="/assets/refresh.svg"
                  alt="edit"
                  width={20}
                  height={20}
                  className={`cursor-pointer ${
                    row.datatype.includes("SQL")
                      ? ""
                      : "pointer-events-none opacity-50"
                  }`}
                  onClick={() => handleRefresh(row._id)}
                />
                <Image
                  onClick={() => {
                    setDataset(row);
                    setOpen(true);
                  }}
                  src="/assets/delete.svg"
                  alt="edit"
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        userId={userId}
        id={dataset?._id || ""}
        open={open}
        name={dataset?.name || ""}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Datasets;
