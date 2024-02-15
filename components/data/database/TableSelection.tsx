"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import setTable from "@/lib/datasets/postgresql/setTable";
import Header from "../Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  tables: any;
  id: string;
  userId: string;
  type: string;
};

const TableSelection = ({ userId, id, tables, type }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [selectedHeaders, setSelectedHeaders] = useState([]);

  const filteredTables = Object.keys(tables).filter((table) =>
    table.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleHeaderChange = (name: string) => {
    // @ts-ignore
    if (!selectedHeaders.includes(name)) {
      // @ts-ignore
      setSelectedHeaders([...selectedHeaders, name]);
      return;
    }
    const len = selectedHeaders.length;
    if (len <= 1) return;
    const h = selectedHeaders.filter((header) => header != name);
    setSelectedHeaders(h);
  };

  const router = useRouter();

  const handleBack = () => {
    router.push(`add-connection?id=${id}`);
  };

  const handleNext = async () => {
    try {
      const headers = tables[selectedTable].map((header: string) => {
        // @ts-ignore
        if (selectedHeaders.includes(header)) {
          return { name: header, isDisabled: false };
        } else {
          return { name: header, isDisabled: true };
        }
      });
      const res = await setTable(userId, id, type, {
        table: selectedTable,
        headers,
      });
      router.push(`edit-fields?id=${id}&type=${type}`);
    } catch (error) {
      console.log("error in updating dataset");
      alert("error updating");
    }
  };

  return (
    <section>
      <Header
        step={3}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <section className="md:px-[60px] md:pt-32 py-8 px-5 md:pb-6 flex flex-col gap-6 text-[#080D19]">
        <h1 className="font-medium text-2xl">Select Table</h1>
        <div className="flex flex-col gap-6 w-[405px]">
          <div className="flex flex-col gap-4">
            <p className="font-medium">Available Tables</p>
            <div className="px-2 w-full rounded-[6px] border border-[#EEEEF]">
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
                  className="focus:outline-none w-full"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex px-[10px] py-[14px] w-full max-h-80 overflow-y-auto justify-between items-start self-stretch rounded-[6px] border border-[#EEEEFF] bg-white">
            <Accordion
              type="single"
              collapsible
              className="flex flex-col items-start w-full"
            >
              {filteredTables.map((table, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="w-full"
                >
                  <div className="px-2 flex items-center gap-[10px] text-base">
                    <AccordionTrigger></AccordionTrigger>
                    <input
                      type="checkbox"
                      onChange={() => {
                        if (selectedTable == table) {
                          setSelectedTable("");
                          setSelectedHeaders([]);
                        } else {
                          setSelectedTable(table);
                          setSelectedHeaders(tables[table]);
                        }
                      }}
                      name={table}
                      id={table}
                      className="accent-primary"
                    />
                    <label htmlFor={table}>{table}</label>
                  </div>
                  <AccordionContent className="flex flex-col gap-[10px] text-base px-[54px]">
                    {/* @ts-ignore */}
                    {tables[table].map((header, index) => (
                      <p key={index} className="flex w-full gap-[10px] py-2">
                        <input
                          type="checkbox"
                          onChange={() => {
                            if (selectedTable == table) {
                              handleHeaderChange(header);
                            }
                          }}
                          checked={
                            selectedTable == table &&
                            // @ts-ignore
                            selectedHeaders.includes(header)
                          }
                          name={header}
                          id={header}
                          className="accent-primary"
                        />
                        <label htmlFor={header}>{header}</label>
                      </p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </section>
  );
};

export default TableSelection;
