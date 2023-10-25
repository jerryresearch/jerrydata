"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSession } from "next-auth/react";

const Page = () => {
  const currentStep = 2;
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [id, setId] = useState(searchParams.get("id") || "");
  const [uploadMessage, setUploadMessage] = useState({
    message: "",
    isError: false,
  });

  useEffect(() => {
    if (id != "") {
      // get the file details
      // setIsLoading(true);
    }
  }, []);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    setIsLoading(true);
    try {
      if (file && id == "") {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("datatype", searchParams.get("type") || "");
        const res = await fetch(
          // @ts-ignore
          `http://localhost:3000/api/upload/${session?.user?._id}`,
          {
            method: "POST",
            body: formData,
          }
        );
        const response = await res.json();
        if (!res.ok) {
          alert(response.message);
          console.log("error");
          setIsLoading(false);
          return;
        }
        console.log("response", response);
        setFileName(file.name);
        setUploadMessage({
          message: "File upload successful!",
          isError: false,
        });
        setId(response._id);
      } else {
        setUploadMessage({ message: "Error in file", isError: true });
      }
      setIsLoading(false);
    } catch (error) {
      console.log("catch");
      alert(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <form className="flex-1 px-7 py-10 flex gap-[40px] flex-shrink-0">
        <div className="flex flex-col w-[384px] gap-6 items-start text-sm font-medium">
          <div className="flex gap-[10px]">
            <div className="flex items-center gap-[10px] text-[#17212F]">
              <input
                type="radio"
                name="file-radio"
                id="new"
                className="accent-black"
              />
              <span>Upload a new file</span>
            </div>
            <p className="text-[#ADB3BB] underline">File Guideline</p>
          </div>
          <div className="flex w-full gap-2 items-start">
            <div className="flex flex-col gap-[6px] flex-[1_0_0] items-start rounded">
              <div
                className={`flex px-3 py-2 items-center self-stretch rounded-[6px] border ${
                  uploadMessage.isError
                    ? "border-[#D30A0A]"
                    : "border-[#EAEDF2]"
                } bg-white`}
              >
                <p className="text-[#ADB3BB]">{`${
                  fileName != "" ? fileName : "File name"
                }`}</p>
              </div>
            </div>
            <div>
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                id="fileInput"
                name="fileInput"
              />
              <label
                htmlFor="fileInput"
                className={`flex justify-center items-center gap-[10px] rounded px-4 py-2 text-sm bg-primary text-white cursor-pointer ${
                  isLoading && "opacity-50 pointer-events-none"
                }`}
              >
                Browse
              </label>
            </div>
          </div>
          <p
            className={`${
              uploadMessage.isError ? "text-[#D30A0A]" : "text-[#1CB87E]"
            } text-sm font-medium`}
          >
            {uploadMessage.message}
          </p>
          <div className="flex w-[334px] items-start gap-[10px]">
            <div className="flex items-center gap-[10px] text-[#17212F]">
              <input
                type="radio"
                name="file-radio"
                id="new"
                className="accent-black"
              />
              <span className="text-sm">Select a previously uploaded file</span>
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
              <input
                type="radio"
                name="radio-option"
                id="new"
                className="accent-black"
              />
              <span>Create new dataset</span>
            </div>
          </div>
          <div className="flex items-start gap-[10px] text-sm font-medium">
            <div className="flex items-center gap-2 text-[#17212F]">
              <input
                type="radio"
                name="radio-option"
                id="new"
                className="accent-black"
              />
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
      </form>
      <Footer
        step={currentStep}
        nextHref={`select-table?id=${id}`}
        backHref={`connection-type?type=${searchParams.get("type")}`}
        nextDisabled={id == ""}
      />
    </div>
  );
};

export default Page;
