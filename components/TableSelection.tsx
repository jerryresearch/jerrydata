"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import updateDataset from "@/lib/datasets/updateDataset";
import Header from "./data/Header";
import { useToast } from "./ui/use-toast";

type Props = {
  name: string;
  headers: [
    {
      name: string;
      datatype: string;
      isDisabled: boolean;
    }
  ];
  type: string;
  id: string;
  userId: string;
};

const TableSelection = ({ userId, id, type, name, headers }: Props) => {
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState("");

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
    router.push(`upload-file?id=${id}&type=${type}`);
  };

  const handleNext = async () => {
    if (isUpdated) {
      try {
        const res = await updateDataset(userId, id, { headers: myHeaders });
        router.push(`edit-fields?id=${id}&type=${type}`);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: `Uh oh! ${error.message}.`,
          description:
            "There was an issue updating the object. Please try again later.",
        });
        // console.log(error);
      }
    } else {
      router.push(`edit-fields?id=${id}`);
    }
  };

  return (
    <section>
      <Header
        step={3}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
        id={id}
      />
      <section className="md:px-[60px] md:pt-32 py-8 px-5 md:pb-6 flex flex-col gap-6 text-[#080D19]">
        <h1 className="font-medium text-2xl">Select Table</h1>
        <div className="flex flex-col gap-6 w-[405px]">
          <div className="flex flex-col gap-4">
            <p className="font-medium">Available Tables</p>
            <div className="px-2 w-full rounded-[6px] border border-[#EEEEFF]">
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
                  className="focus:outline-none"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex px-[10px] py-[14px] w-full max-h-80 overflow-y-auto justify-between items-start self-stretch rounded border border-[#EAEDF2] bg-white">
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
                      className="accent-primary"
                    />
                    <label htmlFor="name" className="">
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
                      className="accent-primary"
                    />
                    <label htmlFor={header.name} className="">
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
      {/* <Footer
        step={currentStep}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      /> */}
    </section>
  );
};

export default TableSelection;
