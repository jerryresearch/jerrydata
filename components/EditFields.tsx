"use client";

import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Footer from "./Footer";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import updateDataset from "@/lib/datasets/updateDataset";
import Header from "./data/Header";

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
      columnType: string;
      defaultAggregate: string;
      dateFieldType: string;
      geoFieldType: string;
      isDisabled: boolean;
      isHidden: boolean;
    }
  ];
};

type SelectedAttributes = {
  columnType: string;
  defaultAggregate: string;
  dateFieldType: string;
  geoFieldType: string;
  [key: string]: string;
};

const EditFields = ({ id, userId, headers }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [newupdatedheaders, setNewUpdatedHeaders] = useState(
    headers.map((header) => ({
      ...header,
    }))
  );

  const [filteredHeaders, setFilteredHeaders] = useState(
    newupdatedheaders.filter((row) =>
      row.name.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  useEffect(() => {
    setFilteredHeaders(
      newupdatedheaders.filter((row) =>
        row.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, newupdatedheaders]);

  const [selectedAttributes, setSelectedAttributes] = useState<
    Array<SelectedAttributes>
  >(
    Array.from({ length: headers.length }, () => ({
      columnType: "Attribute",
      defaultAggregate: "No Aggregate",
      dateFieldType: "None",
      geoFieldType: "None",
    }))
  );

  const disabled = false;
  const currentStep = 4;
  let count = 1;

  const router = useRouter();

  const handleBack = () => {
    router.push(`select-table?id=${id}`);
  };

  const handleNext = async () => {
    try {
      const res = await updateDataset(userId, id, {
        headers: newupdatedheaders,
      });
      router.push(`add-dataset-info?id=${id}`);
    } catch (error) {
      console.log("error in updating dataset");
      alert("error updating");
    }
  };

  const handleOnClickSwitch = (index: number) => {
    setFilteredHeaders((prevFilteredHeaders) => {
      const updatedFilteredHeaders = [...prevFilteredHeaders];
      updatedFilteredHeaders[index] = {
        ...updatedFilteredHeaders[index],
        isHidden: !updatedFilteredHeaders[index].isHidden,
      };
      return updatedFilteredHeaders;
    });

    setNewUpdatedHeaders((prevHeaders) => {
      const updatedHeaders = [...prevHeaders];
      const headerIndex = prevHeaders.findIndex(
        (header) => header.name === filteredHeaders[index].name
      );
      if (headerIndex !== -1) {
        updatedHeaders[headerIndex] = {
          ...updatedHeaders[headerIndex],
          isHidden: !updatedHeaders[headerIndex].isHidden,
        };
      }
      return updatedHeaders;
    });
  };

  const handleClickOnDropdown = (
    field: string,
    value: string,
    rowIndex: number
  ) => {
    setNewUpdatedHeaders((prevHeaders) => {
      const updatedHeaders = [...prevHeaders];
      const headerIndex = prevHeaders.findIndex(
        (header) => header.name === filteredHeaders[rowIndex].name
      );

      if (headerIndex !== -1) {
        const updatedHeader = {
          ...updatedHeaders[headerIndex],
          ...(field === "Column Type" && { columnType: value }),
          ...(field === "Default Aggregate" && { defaultAggregate: value }),
          ...(field === "Date Field Type" && { dateFieldType: value }),
          ...(field === "Geo Field Type" && { geoFieldType: value }),
        };

        if (field === "Column Type" && value === "Attribute") {
          updatedHeader.defaultAggregate = "No Aggregate";
        }

        if (field === "Column Type" && value === "Measure") {
          updatedHeader.dateFieldType = "None";
          updatedHeader.geoFieldType = "None";
        }

        if (field === "Date Field Type" && value !== "None") {
          updatedHeader.geoFieldType = "None";
        }

        if (field === "Geo Field Type" && value !== "None") {
          updatedHeader.dateFieldType = "None";
        }

        updatedHeaders[headerIndex] = updatedHeader;
      }

      return updatedHeaders;
    });

    setSelectedAttributes((prevState) => {
      const updatedRows = [...prevState];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        ...(field === "Column Type" && { columnType: value }),
        ...(field === "Default Aggregate" && { defaultAggregate: value }),
        ...(field === "Date Field Type" && { dateFieldType: value }),
        ...(field === "Geo Field Type" && { geoFieldType: value }),
      };

      if (field === "Column Type" && value === "Attribute") {
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          "Default Aggregate": "No Aggregate",
        };
      }

      if (field === "Column Type" && value === "Measure") {
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          "Date Field Type": "None",
          "Geo Field Type": "None",
        };
      }

      if (field === "Date Field Type" && value !== "None") {
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          "Geo Field Type": "None",
        };
      }

      if (field === "Geo Field Type" && value !== "None") {
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          "Date Field Type": "None",
        };
      }

      return updatedRows;
    });
  };

  return (
    <section>
      <Header
        step={currentStep}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <section className="px-[60px] py-6 flex flex-col gap-6 text-[#080D19]">
        <h1 className="font-medium text-2xl">Edit Fields</h1>
        {/* search */}
        <div className="px-2 w-[380px] h-[42px] rounded-[6px] border border-[#EEEEFF]">
          <div className="flex py-[10px] px-2 items-center gap-2 self-stretch">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              placeholder="Search Data"
              className="text-sm focus:outline-0 w-full"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        {/* table */}
        <div className="w-full rounded-[6px] border border-[#EEEEFF] bg-white">
          <table className="w-full table-auto min-w-max text-left bg-white rounded">
            {/* row */}
            <thead>
              <tr className="rounded-[6px] bg-[#FAFAFA] border-b border-[#EEEEFF] text-[#080D19]">
                <th className="p-5 font-normal">NP</th>
                <th className="p-5 font-normal">Name</th>
                <th className="p-5 font-normal">
                  <div className="flex items-center justify-between">
                    <span>Column Type</span>
                    <Image
                      src="/assets/info.svg"
                      alt="info"
                      width={20}
                      height={20}
                    />
                  </div>
                </th>
                <th className="p-5 font-normal">
                  <div className="flex items-center justify-between">
                    <span>Default Aggregate</span>
                    <Image
                      src="/assets/info.svg"
                      alt="info"
                      width={20}
                      height={20}
                    />
                  </div>
                </th>
                <th className="p-5 font-normal">
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
                <th className="p-5 font-normal">
                  <div className="flex items-center justify-between">
                    <span>Default Geo Type</span>
                    <Image
                      src="/assets/info.svg"
                      alt="info"
                      width={20}
                      height={20}
                    />
                  </div>
                </th>
                <th className="p-5 font-normal">Hidden</th>
              </tr>
            </thead>
            <tbody>
              {filteredHeaders
                ?.filter((row) => !row.isDisabled)
                .map((row, index) => {
                  // if (!row.isDisabled)
                  return (
                    <tr
                      key={index}
                      className={`bg-white ${
                        row.isHidden ? "text-[#A9AAAE]" : "text-[#080D19]"
                      } border-b border-b-[#EEEEFF]`}
                    >
                      <td className="p-5">{count++}</td>
                      <td className="p-5">
                        {/* <Image
                    src={row.image}
                    width={20}
                    height={20}
                    alt={row.name}
                  /> */}
                        {row.name}
                      </td>
                      {Object.keys(fields).map((field, ind) => (
                        <td key={ind}>
                          <Popover modal={true}>
                            <div className="flex items-center justify-between p-5">
                              <span
                                className={`${disabled && "text-[#A9AAAE]"} ${
                                  !(
                                    (field === "Default Aggregate" &&
                                      selectedAttributes[index].columnType ===
                                        "Attribute") ||
                                    (field === "Date Field Type" &&
                                      selectedAttributes[index].columnType ===
                                        "Measure") ||
                                    (field === "Geo Field Type" &&
                                      selectedAttributes[index].columnType ===
                                        "Measure") ||
                                    (field === "Date Field Type" &&
                                      selectedAttributes[index].geoFieldType !==
                                        "None") ||
                                    (field === "Geo Field Type" &&
                                      selectedAttributes[index]
                                        .dateFieldType !== "None")
                                  ) && !row.isHidden
                                    ? "text-[#080D19]"
                                    : "text-[#A9AAAE]"
                                }`}
                              >
                                {(() => {
                                  if (field === "Column Type") {
                                    return selectedAttributes[index].columnType;
                                  } else if (field === "Default Aggregate") {
                                    return selectedAttributes[index]
                                      .defaultAggregate;
                                  } else if (field === "Date Field Type") {
                                    return selectedAttributes[index]
                                      .dateFieldType;
                                  } else if (field === "Geo Field Type") {
                                    return selectedAttributes[index]
                                      .geoFieldType;
                                  } else {
                                    return "";
                                  }
                                })()}
                              </span>
                              {!(
                                field === "Default Aggregate" &&
                                selectedAttributes[index].columnType ===
                                  "Attribute"
                              ) &&
                              !(
                                field === "Date Field Type" &&
                                selectedAttributes[index].columnType ===
                                  "Measure"
                              ) &&
                              !(
                                field === "Geo Field Type" &&
                                selectedAttributes[index].columnType ===
                                  "Measure"
                              ) &&
                              !(
                                field === "Date Field Type" &&
                                selectedAttributes[index].geoFieldType !==
                                  "None"
                              ) &&
                              !(
                                field === "Geo Field Type" &&
                                selectedAttributes[index].dateFieldType !==
                                  "None"
                              ) &&
                              !row.isHidden ? (
                                <PopoverTrigger>
                                  <Image
                                    src="/assets/chevron-down.svg"
                                    alt="chevron down icon"
                                    width={16}
                                    height={16}
                                  />
                                </PopoverTrigger>
                              ) : (
                                <Image
                                  src="/assets/chevron-down-disabled.svg"
                                  alt="chevron down icon"
                                  width={16}
                                  height={16}
                                />
                              )}
                            </div>
                            <PopoverContent className="w-fit min-w-[122px] p-0 shadow-custom bg-white rounded">
                              <ul className="text-sm font-normal p-2 flex flex-col items-start">
                                {/* @ts-ignore */}
                                {fields[field].map((val, valIndex) => (
                                  <li
                                    key={valIndex}
                                    className="flex gap-2 items-center w-full px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded"
                                    onClick={() => {
                                      handleClickOnDropdown(field, val, index);
                                    }}
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
                        <Switch
                          onClick={() => handleOnClickSwitch(index)}
                          checked={row.isHidden}
                        />
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
      {/* <Footer
        step={currentStep}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      /> */}
    </section>
  );
};

export default EditFields;
