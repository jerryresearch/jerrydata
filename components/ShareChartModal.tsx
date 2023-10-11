import Image from "next/image";
import React from "react";
import { Switch } from "./ui/switch";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ShareChartModal = ({ open, onClose }: Props) => {
  const copyToClipboard = () => {
    const input = document.getElementById("link") as HTMLInputElement;
    const url = input.value;
    console.log(url);
    navigator.clipboard.writeText(url);
  };

  return (
    <section
      className={`${
        open
          ? "fixed inset-0 h-screen w-screen flex items-center justify-center bg-[#334155]/20"
          : "hidden"
      }`}
    >
      <div className="bg-white flex w-[640px] h-[446px] flex-col gap-6 flex-shrink-0 items-center pb-[34px] text-xl text-[#17212F]">
        <div className="h-[120px] w-full p-8 flex items-center justify-center gap-[240px] flex-shrink-0 border-b border-[#EAEDF2] bg-[#F8FAFC]">
          <div>
            <p className="text-xl font-semibold">Share Report</p>
            <span className="text-sm">
              Share <span className="underline">Sample - Retail Orders</span>{" "}
              with other people
            </span>
          </div>
          <Image
            src="/assets/dismiss.svg"
            alt="close modal"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-3 justify-center items-start w-[576px] text-lg">
          <p className="text-sm text-[#17212F font-medium]">General access</p>
          <div className="flex self-stretch items-center justify-between py-[14px]">
            <div className="flex items-center gap-[10px]">
              <div className="bg-primary rounded-full w-[30px] h-[30px] flex items-center justify-center">
                <Image
                  src="/assets/globe-blue.svg"
                  alt="globe icon"
                  width={20}
                  height={20}
                />
              </div>
              <div className="text-sm">
                <p className="text-[#17212F]">Public</p>
                <p className="text-[#ADB3BB]">
                  Everyone with the link can view
                </p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-start w-[576px] text-lg">
          <p className="text-sm text-[#17212F font-medium]">Report Link</p>
          <div className="flex self-stretch items-start justify-center pt-[9px] px-3 pb-[10px] gap-[30px] h-10 rounded border border-[#EAEDF2] bg-white">
            <input
              type="text"
              id="link"
              readOnly
              value="https://docs.google.com/documentd/11CbmG2reSyeai7MwzdOg9899cpeIM"
              className="text-sm w-full text-[#ADB3BB]"
            />
            <Image
              src="/assets/copy-icon.svg"
              alt="copy text"
              width={20}
              height={20}
              onClick={copyToClipboard}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-end items-center gap-[10px] w-[576px] text-sm">
          <button
            onClick={onClose}
            className="rounded border border-[#DEE8FA] px-4 py-2 h-[36px] flex items-center justify-center gap-[10px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShareChartModal;
