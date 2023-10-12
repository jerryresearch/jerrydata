import Image from "next/image";
import React, { useState } from "react";

const tables = {
  worksheet: [
    "Region",
    "Country",
    "Item type",
    "Sales channel",
    "Order prority",
    "Order date",
  ],
  demo: [
    "Region",
    "Country",
    "Item type",
    "Sales channel",
    "Order prority",
    "Order date",
  ],
};

const TableSelection = () => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleExpand = (name: string) => {
    if (expanded.includes(name)) {
      setExpanded(expanded.filter((value) => value !== name));
    } else {
      setExpanded([...expanded, name]);
    }
  };

  return (
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
              />
            </div>
          </div>
        </div>
        <div className="flex px-[10px] py-[14px] w-[506px] max-h-[316px] overflow-y-auto justify-between items-start self-stretch rounded border border-[#EAEDF2] bg-white">
          <div className="flex flex-col items-start w-[382px] gap-[14px] ">
            {Object.keys(tables).map((table, index) => (
              <div
                key={index}
                className="flex flex-col items-start w-[382px] gap-[14px]"
              >
                <div className="flex px-2 flex-col items-start">
                  <div className="py-2 flex justify-center items-center gap-[10px] self-stretch">
                    <Image
                      src="/assets/chevron-down.svg"
                      alt="down icon"
                      width={20}
                      height={20}
                      onClick={() => handleExpand(table)}
                      className="cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-[10px]">
                      <input type="checkbox" name="name" id="name" />
                      <label htmlFor="name" className="text-sm">
                        {table}
                      </label>
                    </div>
                  </div>
                </div>
                <ul
                  className={`flex flex-col items-start gap-[10px] px-[54px] list-none  transition-all duration-500 ease-in-out overflow-y-hidden h-0 ${
                    expanded.includes(table) && "h-auto"
                  }`}
                >
                  {/* @ts-ignore */}
                  {tables[table].map((item, index) => (
                    <li
                      key={index}
                      className="py-2 flex items-center justify-center gap-[10px]"
                    >
                      <input type="checkbox" name="Worksheet" id={item} />
                      <label htmlFor={item} className="text-sm">
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableSelection;
