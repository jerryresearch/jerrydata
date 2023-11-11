"use client";

import EditFooter from "@/components/EditFooter";
import MenuBar from "@/components/MenuBar";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { formatLastLoad, formatRows, formatSize } from "@/lib/formatDatasets";

type Props = {
  dataset: Dataset;
  userId: string;
  userName: string;
};

const fields = {
  "Column Type": ["Attribute", "Measure"],
  "Default Aggregate": [
    "No Aggregate",
    "Average",
    "Count",
    "Max",
    "Median",
    "Min",
    "Standard Deviation",
    "Sum",
    "Unique Count",
    "Variance",
  ],
  "Date Field Type": ["None", "Year", "Date"],
  "Geo Field Type": [
    "None",
    "Street address",
    "Country code (3 letters)",
    "Country code (2 letters)",
    "Country name",
    "City code",
    "City name",
    "GPS",
    "Metro Code",
    "Metro Name",
    "Sub continent code",
    "Sub continent name",
    "State code",
    "Zip code",
  ],
};

const datatypes = ["String", "Date", "Location", "Number"];

const EditDatasetFields = ({ dataset, userId, userName }: Props) => {
  let count = 1;
  const disabled = false;

  return (
    <section className="bg-[#F6F8FA] min-h-screen flex flex-col">
      <div className="flex items-center bg-[#DEE8FA] py-3 px-7">
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
        <MenuBar selected={"Field"} id={dataset._id} />
      </div>
      <div className="flex-1">
        <section className="py-4 px-7">
          <div className="w-full p-5 rounded border border-[#EAEDF2] bg-white">
            <table className="w-full table-auto min-w-max text-left bg-white rounded text-sm text-[#17212F]">
              {/* row */}
              <thead>
                <tr className="rounded bg-[#F8FAFC]">
                  <th className="p-5 font-medium text-sm text-[#17212F]">NP</th>
                  <th className="p-5 font-medium text-sm text-[#17212F]">
                    Name
                  </th>
                  <th className="p-5 font-medium text-sm text-[#17212F]">
                    Default Data type
                  </th>
                  <th className="p-5 font-medium text-sm text-[#17212F]">
                    <div className="flex items-center justify-between">
                      <span>Column Type</span>
                      <Image
                        src="/assets/info-icon.svg"
                        alt="info"
                        width={20}
                        height={20}
                      />
                    </div>
                  </th>
                  <th className="p-5 font-medium text-sm text-[#17212F]">
                    <div className="flex items-center justify-between">
                      <span>Default Aggregate</span>
                      <Image
                        src="/assets/info-icon.svg"
                        alt="info"
                        width={20}
                        height={20}
                      />
                    </div>
                  </th>
                  <th className="p-5 font-medium text-sm text-[#17212F]">
                    <div className="flex items-center justify-between">
                      <span>Date Field Type</span>
                      <Image
                        src="/assets/info-icon.svg"
                        alt="info"
                        width={20}
                        height={20}
                      />
                    </div>
                  </th>
                  <th className="p-5 font-medium text-sm text-[#17212F]">
                    <div className="flex items-center justify-between">
                      <span>Default Geo Type</span>
                      <Image
                        src="/assets/info-icon.svg"
                        alt="info"
                        width={20}
                        height={20}
                      />
                    </div>
                  </th>
                  <th className="p-5 font-medium text-sm text-[#17212F]">
                    Hidden
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataset.headers?.map((row, index) => {
                  if (!row.isDisabled)
                    return (
                      <tr
                        key={index}
                        className="text-sm text-[#17212F] font-medium border-b border-b-[#EAEDF2]"
                      >
                        <td className="p-5 font-medium">{count++}</td>
                        <td className="p-5">
                          {/* <Image
                    src={row.image}
                    width={20}
                    height={20}
                    alt={row.name}
                  /> */}
                          {row.name}
                        </td>
                        <td>
                          <Popover modal={true}>
                            <div className="flex items-center justify-between p-5">
                              <span
                                className={`${disabled && "text-[#ADB3BB]"}`}
                              >
                                {row.datatype}
                              </span>
                              <PopoverTrigger>
                                {disabled ? (
                                  <Image
                                    src="/assets/chevron-down-disabled.svg"
                                    alt="chevron down icon"
                                    width={16}
                                    height={16}
                                  />
                                ) : (
                                  <Image
                                    src="/assets/chevron-down.svg"
                                    alt="chevron down icon"
                                    width={16}
                                    height={16}
                                  />
                                )}
                              </PopoverTrigger>
                            </div>
                            <PopoverContent className="w-fit min-w-[122px] p-0 shadow-custom bg-white rounded">
                              <ul className="text-sm font-normal p-2 flex flex-col items-start">
                                {datatypes.map((val, index) => (
                                  <li
                                    key={index}
                                    className="flex gap-2 items-center w-full px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded"
                                  >
                                    {val}
                                  </li>
                                ))}
                              </ul>
                            </PopoverContent>
                          </Popover>
                        </td>
                        {Object.keys(fields).map((field, ind) => (
                          <td key={ind}>
                            <Popover modal={true}>
                              <div className="flex items-center justify-between p-5">
                                <span
                                  className={`${disabled && "text-[#ADB3BB]"}`}
                                >
                                  {/* @ts-ignore */}
                                  {fields[field][0]}
                                </span>
                                <PopoverTrigger>
                                  {disabled ? (
                                    <Image
                                      src="/assets/chevron-down-disabled.svg"
                                      alt="chevron down icon"
                                      width={16}
                                      height={16}
                                    />
                                  ) : (
                                    <Image
                                      src="/assets/chevron-down.svg"
                                      alt="chevron down icon"
                                      width={16}
                                      height={16}
                                    />
                                  )}
                                </PopoverTrigger>
                              </div>
                              <PopoverContent className="w-fit min-w-[122px] p-0 shadow-custom bg-white rounded">
                                <ul className="text-sm font-normal p-2 flex flex-col items-start">
                                  {/* @ts-ignore */}
                                  {fields[field].map((val, index) => (
                                    <li
                                      key={index}
                                      className="flex gap-2 items-center w-full px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded"
                                    >
                                      {val}
                                    </li>
                                  ))}
                                </ul>
                              </PopoverContent>
                            </Popover>
                          </td>
                        ))}
                        <td className="p-5">
                          <Switch />
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <EditFooter id={dataset._id} userId={userId} />
    </section>
  );
};

export default EditDatasetFields;
