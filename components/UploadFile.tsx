"use client";

import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

type Props = {
  id: string;
  type: string;
  dataset: Dataset;
  handleDelete: () => void;
};

const UploadFile = ({ id, type, dataset, handleDelete }: Props) => {
  const currentStep = 2;

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [showProgress, setShowProgress] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState({
    message: "",
    isError: false,
  });
  const [progessValue, setProgressValue] = useState(0);

  const handleNext = () => {
    router.push(`select-table?id=${id}`);
  };

  const handleBack = () => {
    if (id) {
      router.push(`connection-type?type=${type}&id=${id}`);
    } else {
      router.push(`connection-type?type=${type}`);
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    // @ts-ignore
    const userId = session?.user?._id || session?.user?.id;
    setIsLoading(true);
    console.log("hello");
    try {
      if (file) {
        setFile(file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("datatype", type);
        setShowProgress(true);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/${userId}`,
          formData,
          {
            onUploadProgress: (progressEvent) => {
              if (progressEvent && progressEvent.total) {
                setProgressValue(
                  Math.round((progressEvent.loaded / progressEvent.total) * 100)
                );
              }
            },
          }
        );

        if (response.status !== 200) {
          alert(response.data.message);
          setIsLoading(false);
          return;
        }

        setUploadMessage({
          message: "File upload successful!",
          isError: false,
        });

        const { _id } = response.data;
        router.replace(`${pathName}?type=${type}&id=${_id}`);
        setShowProgress(false);
        setProgressValue(0);
      } else {
        setUploadMessage({ message: "Error in file", isError: true });
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("An error occurred during file upload.");
      setIsLoading(false);
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
                checked={true}
                readOnly
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
                <p className="text-[#ADB3BB]">{`${dataset.name}`}</p>
              </div>
            </div>
            <div>
              <input
                type="file"
                onChange={(event) => {
                  handleFileUpload(event);
                  // @ts-ignore
                  event.target.value = null; // This line resets the input field
                }}
                className="hidden"
                id="fileInput"
                name="fileInput"
              />
              <label
                htmlFor="fileInput"
                className={`flex justify-center items-center gap-[10px] rounded px-4 py-2 text-sm bg-primary text-white cursor-pointer ${
                  (isLoading || file) && "opacity-50 pointer-events-none"
                }`}
              >
                Browse
              </label>
            </div>
          </div>
          {showProgress && (
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                style={{ width: `${progessValue}%` }}
              ></div>
            </div>
          )}
          {dataset._id != "string" && (
            <div className="flex p-2 bg-gray-300 gap-2">
              <p>{dataset.name}</p>
              <Image
                src="/assets/trash.svg"
                alt="delete file"
                width={16}
                height={16}
                className="cursor-pointer"
                onClick={() => {
                  handleDelete();
                  setFile(null);
                  router.replace(`${pathName}?type=${type}`);
                  setUploadMessage({ message: "", isError: false });
                }}
              />
            </div>
          )}
          <p
            className={`${
              uploadMessage.isError ? "text-[#D30A0A]" : "text-[#1CB87E]"
            } text-sm font-medium`}
          >
            {uploadMessage.message}
          </p>
          <div className="flex w-[334px] items-start gap-[10px] pointer-events-none text-[#ADB3BB]">
            <div className="flex items-center gap-[10px] text-[#ADB3BB]">
              <input
                type="radio"
                // name="file-radio"
                id="new"
                className="accent-black"
              />
              <span className="text-sm">Select a previously uploaded file</span>
            </div>
            <p className="text-[#ADB3BB] underline">Manage File</p>
          </div>
          <Popover>
            <PopoverTrigger className="pointer-events-none text-[#ADB3BB] flex items-center gap-[10px] px-3 py-2 w-[204px] rounded bg-white border border-[#EAEDF2]">
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
        <div className="flex flex-col gap-6 pointer-events-none text-[#ADB3BB]">
          <div className="flex items-start gap-[10px] text-sm font-medium">
            <div className="flex items-center gap-2 text-[#ADB3BB]">
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
            <div className="flex items-center gap-2 text-[#ADB3BB]">
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
        nextDisabled={id == ""}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default UploadFile;
