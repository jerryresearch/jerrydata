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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import updateDataset from "@/lib/datasets/updateDataset";

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
      columnType: "Attribute",
      defaultAggregate: "No Aggregate",
      dateFieldType: "None",
      geoFieldType: "None",
    }))
  );

  const [filteredHeaders, setFilteredHeaders] = useState(
    headers.filter((row) =>
      row.name.toLowerCase().includes(searchInput.toLowerCase())
    )
  );

  useEffect(() => {
    setFilteredHeaders(
      headers.filter((row) =>
        row.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    );
  }, [searchInput, headers]);

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
      if (!res?.ok) {
        alert("error updating");
        return;
      }
      router.push(`add-dataset-info?id=${id}`);
    } catch (error) {
      console.error(error);
      alert("An error occured! Try Again.");
    }
  };

  const handleOnClickSwitch = (index: number) => {
    setFilteredHeaders((prevFilteredHeaders) => {
      const updatedFilteredHeaders = [...prevFilteredHeaders];
      updatedFilteredHeaders[index] = {
        ...updatedFilteredHeaders[index],
        isDisabled: !updatedFilteredHeaders[index].isDisabled,
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
                  className="text-sm focus:outline-0"
                  onChange={(e) => setSearchInput(e.target.value)}
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
                {filteredHeaders?.map((row, index) => {
                  // if (!row.isDisabled)
                  return (
                    <tr
                      key={index}
                      className={`text-sm ${
                        row.isDisabled ? "text-[#ADB3BB]" : "text-[#17212F]"
                      } font-medium border-b border-b-[#EAEDF2]`}
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
                      {Object.keys(fields).map((field, ind) => (
                        <td key={ind}>
                          <Popover modal={true}>
                            <div className="flex items-center justify-between p-5">
                              <span
                                className={`${disabled && "text-[#ADB3BB]"} ${
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
                                  ) && !row.isDisabled
                                    ? "text-[#17212F]"
                                    : "text-[#ADB3BB]"
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
                              !row.isDisabled ? (
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
                          checked={row.isDisabled}
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

export default EditFields;
