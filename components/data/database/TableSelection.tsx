"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import setTable from "@/lib/datasets/postgresql/setTable";

type Props = {
  tables: string[];
  id: string;
  userId: string;
};

const TableSelection = ({ userId, id, tables }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

  const filteredTables = tables.filter((table) =>
    table.toLowerCase().includes(searchInput.toLowerCase())
  );

  const currentStep = 3;

  const router = useRouter();

  const handleBack = () => {
    router.push(`add-connection?id=${id}`);
  };

  const handleNext = async () => {
    try {
      const res = await setTable(userId, id, { table: selectedTable });
      router.push(`edit-fields?id=${id}`);
    } catch (error) {
      console.log("error in updating dataset");
      alert("error updating");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      {/* <Header currentStep={currentStep} /> */}
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
                {filteredTables.map((table, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start w-[382px] gap-[14px]"
                  >
                    <div className="flex px-2 flex-col items-start">
                      <div className="py-2 flex justify-center items-center gap-[10px] self-stretch">
                        <div className="flex items-center justify-center gap-[10px]">
                          <input
                            type="checkbox"
                            onChange={() => {
                              if (selectedTable == table) {
                                setSelectedTable("");
                              } else {
                                setSelectedTable(table);
                              }
                            }}
                            name="name"
                            id="name"
                          />
                          <label htmlFor="name" className="text-sm">
                            {table}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer
        step={currentStep}
        nextDisabled={selectedTable == ""}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default TableSelection;
