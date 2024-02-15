"use client";

import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Header from "./data/Header";

type Props = {
  id: string;
  type: string;
  dataset: Dataset;
  handleDelete: () => void;
};

const UploadFile = ({ id, type, dataset, handleDelete }: Props) => {
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
    router.push(`select-table?id=${id}&type=${type}`);
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
    <section>
      <Header
        step={2}
        handleBack={handleBack}
        handleNext={handleNext}
        nextDisabled={id == ""}
      />
      <form className="px-[60px] py-6 flex flex-col gap-6 text-[#080D19]">
        <h1 className="font-medium text-2xl">Make Connection</h1>
        <div className="flex flex-col w-[384px] gap-4">
          <div className="flex gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <p>
                <span className="text-[#D30A0A]">* </span>Upload a new file
              </p>
            </div>
            <p className="text-[#A9AAAE] underline">File Guideline</p>
          </div>
          <div className="flex w-full gap-[10px] h-[42px]">
            <div className="flex flex-col gap-[6px] flex-[1_0_0] items-start rounded">
              <div
                className={`flex px-3 py-2 items-center self-stretch rounded-[6px] border ${
                  uploadMessage.isError
                    ? "border-[#D30A0A]"
                    : "border-[#EEEEFF]"
                } bg-white`}
              >
                <p className="text-[#A9AAAE]">{`${dataset.name}`}</p>
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
                className={`flex justify-center h-full items-center gap-[10px] rounded px-4 py-2 text-sm bg-primary text-white cursor-pointer ${
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
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${progessValue}%` }}
              ></div>
            </div>
          )}
          {dataset._id != "string" && (
            <div className="flex p-2 bg-gray-300 w-fit gap-2">
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
        </div>
      </form>
    </section>
  );
};

export default UploadFile;
