import Image from "next/image";
import React from "react";
import Actions from "../Actions";
import { formatLastLoad, formatRows, formatSize } from "@/lib/formatDatasets";
import Link from "next/link";

type Props = {
  datasets: Dataset[];
  userId: string;
};

const Datasets = ({ datasets, userId }: Props) => {
  return (
    <div className="p-5 w-full rounded border border-[#EAEDF2] bg-white">
      <table className="w-full table-auto min-w-max text-left bg-white rounded text-sm text-[#17212F]">
        {/* row */}
        <thead>
          <tr className="rounded bg-[#F8FAFC] border-b font-medium">
            <th className="p-5 font-medium">Type</th>
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
            <tr key={index} className="rounded border-b font-medium">
              <td className="p-5">
                <Image
                  src={`/assets/${row.datatype.toLowerCase()}.svg`}
                  alt="csv file"
                  width={26}
                  height={26}
                />
              </td>
              <td className="p-5 text-blue-500">
                <Link href={`data/${row.name}?id=${row._id}&page=1`}>
                  {row.name}
                </Link>
              </td>
              <td className="p-5">{row.datatype}</td>
              <td className="p-5">{formatSize(row.size)}</td>
              <td className="p-5">{formatRows(row.rows)}</td>
              <td className="p-5">{row.columns}</td>
              <td className="p-5">{formatLastLoad(row.lastLoad)}</td>
              <td className="p-5">
                <Actions userId={userId} id={row._id} name={row.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datasets;
