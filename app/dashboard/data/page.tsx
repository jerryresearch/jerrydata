import Button from "@/components/Button";
import ActionsMenu from "@/components/ActionsMenu";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <section className="h-screen bg-[#F6F8FA] text-sm">
      <div className="px-7 py-5 border-b border-[#EAEDF2] flex justify-between items-center">
        <div className="flex items-center justify-between w-[423px] text-sm">
          <div className="w-[180px] flex px-[5px] py-1 rounded bg-white border border-[#EAEDF2]">
            <div className="px-[12px] py-[6px]">All</div>
            <div className="px-[12px] py-[6px]">Mine</div>
            <div className="px-[12px] py-[6px] bg-blue-500 text-white rounded border border-[#EAEDF2] font-medium">
              Shared
            </div>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="scheduled" id="scheduled" />{" "}
            <span>Scheduled</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="scheduled" id="scheduled" />{" "}
            <span>Has Load Errors</span>
          </div>
        </div>
        <div className="flex gap-3 rounded">
          <div className="flex gap-2 w-[380px] border border-[#EAEDF2] bg-white rounded pr-[100px] pl-2">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              placeholder="Search Data"
              className="px-2 py-[10px]"
            />
          </div>
          <div className="">
            <Button>
              <div className="flex gap-[10px] w-[184px] h-10 py-2 px-4 items-center justify-center">
                <Image
                  src="/assets/plus-icon.svg"
                  width={24}
                  height={24}
                  alt="plus icon"
                />
                <span>Add New Dataset</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
      <section className="px-7 py-4">
        <div className="p-5 flex flex-col bg-white rounded border border-[#EAEDF2] text-sm text-[#17212F]">
          {/* row */}
          <div className="flex self-stretch items-start rounded bg-[#F8FAFC]">
            <div className="w-[70px] py-5 flex items-center justify-center">
              Type
            </div>
            <div className="w-[240px] p-5 flex items-center">Name</div>
            <div className="w-[150px] p-5 flex items-center">Datatype</div>
            <div className="w-[150px] p-5 flex items-center">Size</div>
            <div className="w-[150px] p-5 flex items-center">Rows</div>
            <div className="w-[150px] p-5 flex items-center">Columns</div>
            <div className="w-[150px] p-5 flex items-center justify-between">
              <span>Last Load</span>
              <Image
                src="/assets/chevron-down.svg"
                alt="down icon"
                width={20}
                height={20}
              />
            </div>
            <div className="w-[220px] p-5 flex items-center justify-center">
              Action
            </div>
          </div>
          {/* row */}
          <div className="flex self-stretch items-start rounded">
            <div className="w-[70px] py-5 flex items-center justify-center">
              <Image
                src="/assets/csv.svg"
                alt="csv file"
                width={26}
                height={26}
              />
            </div>
            <div className="w-[240px] p-5 flex items-center text-blue-500">
              Sample - Retail Orders
            </div>
            <div className="w-[150px] p-5 flex items-center">CSV</div>
            <div className="w-[150px] p-5 flex items-center">12 mb</div>
            <div className="w-[150px] p-5 flex items-center">11.7 k</div>
            <div className="w-[150px] p-5 flex items-center">21</div>
            <div className="w-[150px] p-5 flex items-center">8 hours ago</div>
            <div className="w-[220px] p-5 flex items-center justify-center">
              <ActionsMenu />
            </div>
          </div>
          {/* row */}
          <div className="flex self-stretch items-start rounded">
            <div className="w-[70px] py-5 flex items-center justify-center">
              <Image
                src="/assets/xls.svg"
                alt="xls file"
                width={26}
                height={26}
              />
            </div>
            <div className="w-[240px] p-5 flex items-center text-blue-500">
              Sample - Retail Orders
            </div>
            <div className="w-[150px] p-5 flex items-center">CSV</div>
            <div className="w-[150px] p-5 flex items-center">12 mb</div>
            <div className="w-[150px] p-5 flex items-center">11.7 k</div>
            <div className="w-[150px] p-5 flex items-center">21</div>
            <div className="w-[150px] p-5 flex items-center">8 hours ago</div>
            <div className="w-[220px] p-5 flex items-center justify-center">
              <ActionsMenu />
            </div>
          </div>
        </div>
      </section>
      <div className="flex justify-between items-center px-7 py-2">
        <div>Showing 1-2 of 2</div>
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
    </section>
  );
};

export default Page;
