import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const UploadFile = () => {
  return (
    <section className="px-7 py-10 flex gap-[40px]">
      <div className="flex flex-col gap-6 items-start text-sm font-medium">
        <div className="flex gap-[10px]">
          <div className="flex items-center gap-[10px] text-[#17212F]">
            <input type="radio" name="new" id="new" className="accent-black" />
            <span>Upload a new file</span>
          </div>
          <p className="text-[#ADB3BB] underline">File Guideline</p>
        </div>
        <div className="flex w-[384px] gap-2 items-start">
          <div className="flex flex-col gap-[6px] flex-[1_0_0] items-start rounded">
            <div className="flex px-3 py-2 items-center self-stretch rounded-[6px] border border-[#EAEDF2] bg-white">
              <p className="text-[#ADB3BB]">File name</p>
            </div>
          </div>
          <div>
            <input type="file" className="hidden" id="fileInput" />
            <label
              htmlFor="fileInput"
              className="flex justify-center items-center gap-[10px] rounded px-4 py-2 text-sm bg-blue-500 text-white cursor-pointer"
            >
              Browse
            </label>
          </div>
        </div>
        <div className="flex items-start gap-[10px]">
          <div className="flex items-center gap-[10px] text-[#17212F]">
            <input type="radio" name="new" id="new" className="accent-black" />
            <span>Select a previously uploaded file</span>
          </div>
          <p className="text-[#ADB3BB] underline">Manage File</p>
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center gap-[10px] px-3 py-2 w-[204px] rounded bg-white border border-[#EAEDF2]">
            <span className="flex-[1_0_0] text-start">Select a file</span>
            <Image
              src="/assets/chevron-down.svg"
              alt="chevron down icon"
              width={16}
              height={16}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[204px] bg-white">
            <ul className="text-sm">
              <li className="flex gap-2 items-center px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                Data set
              </li>
              <li className="flex gap-2 items-center px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                Data set
              </li>
              <li className="flex gap-2 items-center px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                Data set
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-px h-[200px] rounded-[10px] bg-[#DEE8FA]"></div>
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-[10px] text-sm font-medium">
          <div className="flex items-center gap-2 text-[#17212F]">
            <input type="radio" name="new" id="new" className="accent-black" />
            <span>Create new dataset</span>
          </div>
        </div>
        <div className="flex items-start gap-[10px] text-sm font-medium">
          <div className="flex items-center gap-2 text-[#17212F]">
            <input type="radio" name="new" id="new" className="accent-black" />
            <span>Add to an existing dataset</span>
          </div>
        </div>
        <Popover>
          <PopoverTrigger className="flex items-center gap-[10px] px-3 py-2 w-[204px] rounded bg-white border border-[#EAEDF2]">
            <span className="flex-[1_0_0] text-start text-sm">
              Select a file
            </span>
            <Image
              src="/assets/chevron-down.svg"
              alt="chevron down icon"
              width={16}
              height={16}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[204px] bg-white">
            <ul className="text-sm">
              <li className="flex gap-2 items-center px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                {true ? (
                  <Image
                    src="/assets/check-icon-black.svg"
                    alt="down icon"
                    width={16}
                    height={16}
                  />
                ) : (
                  <p className="w-4"></p>
                )}
                Data set
              </li>
              <li className="flex gap-2 items-center px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                {false ? (
                  <Image
                    src="/assets/check-icon-black.svg"
                    alt="down icon"
                    width={16}
                    height={16}
                  />
                ) : (
                  <p className="w-4"></p>
                )}
                Data set
              </li>
              <li className="flex gap-2 items-center px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded">
                {false ? (
                  <Image
                    src="/assets/check-icon-black.svg"
                    alt="down icon"
                    width={16}
                    height={16}
                  />
                ) : (
                  <p className="w-4"></p>
                )}
                Data set
              </li>
            </ul>
          </PopoverContent>
        </Popover>
        <div className="flex items-start gap-[10px] text-sm font-medium text-[#ADB3BB]">
          <p>Uploaded file has to have same schema as the existing data</p>
        </div>
      </div>
    </section>
  );
};

export default UploadFile;
