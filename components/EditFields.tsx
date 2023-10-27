"use client";

import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Header from "./Header";
import Footer from "./Footer";

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

type Props = {
  id: string;
  userId: string;
  headers: [
    {
      name: string;
      datatype: string;
      isDisabled: boolean;
    }
  ];
};

const EditFields = ({ id, userId, headers }: Props) => {
  const disabled = false;
  const currentStep = 4;
  let count = 1;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <div className="flex-1">
        <section className="flex flex-col items-start gap-7 py-4 px-7">
          {/* search */}
          <div className="w-[380px] h-[40px]">
            <div className="flex flex-col items-start gap-[10px] w-full pr-[100px] pl-2 rounded border border-[#EAEDF2] bg-white">
              <div className="flex items-center self-stretch gap-2 py-[10px] px-2">
                <Image
                  src="/assets/search-icon.svg"
                  alt="search icon"
                  width={16}
                  height={16}
                />
                <input
                  type="text"
                  placeholder="Search Data"
                  className="text-sm"
                />
              </div>
            </div>
          </div>
          {/* table */}
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
                {headers?.map((row, index) => {
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
        {/* <section className="px-7 pb-2">
          <div className="w-full flex justify-between items-center pl-1 py-2">
            <div className="text-[#ADB3BB]">Showing 1-2 of 2</div>
            <div className="p-[10px] flex justify-center items-center gap-[5px] rounded border border-[#EAEDF2] bg-white">
              <div className="py-[6px] px-3 bg-[#DEE8FA] cursor-pointer">1</div>
              <div className="py-[6px] px-3 cursor-pointer">2</div>
              <div className="py-[6px] px-3 cursor-pointer">
                <Image
                  src="/assets/chevron-right.svg"
                  alt="more"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </section> */}
      </div>
      <Footer
        step={currentStep}
        nextHref={`add-dataset-info?id=${id}`}
        backHref={`select-table?id=${id}`}
        nextDisabled={false}
        id={id}
        userId={userId}
      />
    </div>
  );
};

export default EditFields;
