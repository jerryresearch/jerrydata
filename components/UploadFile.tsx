"use client";

import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import Header from "./data/Header";
import createDataset from "@/lib/datasets/createDataset";
import getSignedUrl from "@/lib/datasets/getSignedUrl";
import { useToast } from "./ui/use-toast";

type Props = {
  id: string;
  type: string;
  dataset: Dataset;
  handleDelete: () => void;
};

const UploadFile = ({ id, type, dataset, handleDelete }: Props) => {
  const { toast } = useToast();
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
    try {
      if (file) {
        setFile(file);
        setShowProgress(true);

        const { url } = await getSignedUrl(userId);
        const response = await axios.put(url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent && progressEvent.total) {
              setProgressValue(
                Math.round((progressEvent.loaded / progressEvent.total) * 100)
              );
            }
          },
        });

        if (response.status !== 200) {
          alert(response.data.message);
          setIsLoading(false);
          return;
        }

        const path = url.split("?")[0].split("/");
        const key = path[path.length - 1];

        const data = { name: file.name, key, size: file.size, datatype: type };
        const res = await createDataset(userId, data);
        router.replace(`${pathName}?type=${type}&id=${res.dataset._id}`);

        setUploadMessage({
          message: "File upload successful!",
          isError: false,
        });
        setShowProgress(false);
        setProgressValue(0);
      } else {
        setUploadMessage({ message: "Error in file", isError: true });
      }
      setIsLoading(false);
    } catch (error: any) {
      setUploadMessage({ message: "Error in file", isError: true });
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue uploading the file. Please try again later.",
      });
      // console.log(error);
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
        id={id}
      />
      <form className="md:px-[60px] md:pt-32 py-8 px-5 md:pb-6 flex flex-col gap-6 text-[#080D19]">
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
          <p
            className={`${
              uploadMessage.isError ? "text-[#D30A0A]" : "text-[#1CB87E]"
            } text-sm font-medium`}
          >
            {uploadMessage.message}
          </p>
          {dataset._id != "string" && (
            <div className="flex p-2 bg-[#F1F1F1] rounded-[6px] text-[#61656C] font-medium w-fit gap-2">
              <Image
                src="/assets/delete.svg"
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
              <p>{dataset.name}</p>
            </div>
          )}
        </div>
      </form>
    </section>
  );
};

export default UploadFile;
