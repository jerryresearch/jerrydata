"use client";

import Image from "next/image";
import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/navigation";
import updateDataset from "@/lib/datasets/updateDataset";

type Props = {
  name: string;
  headers: [
    {
      name: string;
      datatype: string;
      isDisabled: boolean;
    }
  ];
  datatype: string;
  id: string;
  userId: string;
};

const TableSelection = ({ userId, id, datatype, name, headers }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  const currentStep = 3;

  const router = useRouter();

  const [expanded, setExpanded] = useState(false);
  const [myHeaders, setMyHeaders] = useState(headers);
  const [isUpdated, setIsUpdated] = useState(false);

  const filteredHeaders = headers.filter((row) =>
    row.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleHeaderChange = (name: string) => {
    setIsUpdated(true);
    const len = myHeaders.filter((header) => header.isDisabled != true).length;
    const currValue = myHeaders.find(
      (header) => header.name == name
    )?.isDisabled;
    if (len <= 1 && !currValue) return;
    const h = myHeaders.map((header) => {
      if (header.name == name) {
        header.isDisabled = !header.isDisabled;
      }
      return header;
    });
    // @ts-ignore
    setMyHeaders(h);
  };

  const handleBack = () => {
    router.push(`upload-file?id=${id}&type=${datatype}`);
  };

  const handleNext = async () => {
    if (isUpdated) {
      try {
        const res = await updateDataset(userId, id, { headers: myHeaders });
        router.push(`edit-fields?id=${id}`);
      } catch (error) {
        console.log("error in updating dataset");
        alert("error updating");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <div className="flex-1">
        <section className="px-7 py-10 flex items-start gap-[60px]">
          <div className="flex flex-col items-start gap-6">
            <div className="flex justify-center items-center gap-[10px]">
              <p className="font-medium text-[15px] leading-[21px]">
                Available Tables
              </p>
              <div className="px-2 w-[380px] flex flex-col items-start gap-[10px] self-stretch rounded border border-[#EAEDF2] bg-white">
                <div className="flex py-[10px] px-2 items-center gap-2 self-stretch">
                  <Image
                    src="/assets/search-icon.svg"
                    alt="search"
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="text-sm focus:outline-none"
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex px-[10px] py-[14px] w-[506px] max-h-80 overflow-y-auto justify-between items-start self-stretch rounded border border-[#EAEDF2] bg-white">
              <div className="flex flex-col items-start w-[382px]">
                {/* {Object.keys(tables).map((table, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start w-[382px] gap-[14px]"
                  > */}
                <div className="flex px-2 flex-col items-start">
                  <div className="py-2 flex justify-center items-center gap-[10px] self-stretch">
                    <Image
                      src="/assets/chevron-down.svg"
                      alt="down icon"
                      width={20}
                      height={20}
                      onClick={() => setExpanded(!expanded)}
                      className={`cursor-pointer transition duration-500 ${
                        expanded ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                    <div className="flex items-center justify-center gap-[10px]">
                      <input
                        type="checkbox"
                        checked
                        readOnly
                        name="name"
                        id="name"
                      />
                      <label htmlFor="name" className="text-sm">
                        {name}
                      </label>
                    </div>
                  </div>
                </div>
                <ul
                  className={`flex flex-col items-start gap-[10px] px-[54px] list-none  transition-all duration-500 ease-in-out overflow-y-hidden max-h-0 ${
                    expanded && "max-h-screen"
                  }`}
                >
                  {filteredHeaders?.map((header, index) => (
                    <li
                      key={index}
                      className="py-2 flex items-center justify-center gap-[10px]"
                    >
                      <input
                        type="checkbox"
                        checked={!header.isDisabled}
                        onChange={() => {
                          handleHeaderChange(header.name);
                        }}
                        name={header.name}
                        id={header.name}
                      />
                      <label htmlFor={header.name} className="text-sm">
                        {header.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* ))} */}
              {/* </div> */}
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

export default TableSelection;
