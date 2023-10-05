"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import ChangePasswordModal from "@/components/ChangePasswordModal";

const Page = () => {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <section className="bg-[#F6F8FA] min-h-screen">
      <div className="flex items-center bg-[#DEE8FA] py-3 px-7">
        <h1 className="font-semibold text-lg">My Profile</h1>
      </div>
      <div className="px-7 py-10 flex items-start gap-[60px]">
        <div className="flex flex-col gap-6 justify-end items-end w-[500px] flex-shrink-0">
          <div className="flex gap-4 items-center self-stretch">
            <label className="text-sm font-medium w-[120px]">First Name</label>
            <input
              type="text"
              className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
            />
          </div>
          <div className="flex gap-4 items-center self-stretch">
            <label className="text-sm font-medium w-[120px]">Last Name</label>
            <input
              type="text"
              className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
            />
          </div>
          <div className="flex gap-4 items-center self-stretch">
            <label className="text-sm font-medium w-[120px]">Email</label>
            <input
              type="email"
              className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
            />
          </div>
          <div className="flex justify-between items-center w-[364px]">
            <button
              onClick={() => setOpen(true)}
              className="py-2 px-4 flex items-center justify-center gap-[10px] rounded bg-[#DEE8FA]"
            >
              Change Password
            </button>
            <button className="py-2 px-4 flex items-center justify-center gap-[10px] rounded bg-primary text-white">
              Edit
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-6 flex-shrink-0 w-[500px]">
          <div className="flex items-center self-stretch gap-4">
            <label className="text-sm font-medium w-[120px]">Time Zone</label>
            <Popover>
              <PopoverTrigger className="flex py-[14px] px-3 justify-between flex-[1_0_0] items-center border border-[#EAEDF2] bg-white">
                <span className="flex-[1_0_0] text-start">UTC+00:00</span>
                <Image
                  src="/assets/chevron-down.svg"
                  alt="chevron down icon"
                  width={16}
                  height={16}
                />
              </PopoverTrigger>
              <PopoverContent className="w-[364px] bg-white">
                <ul className="">
                  <li className="flex gap-2 items-center py-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                    UTC+05:00
                  </li>
                  <li className="flex gap-2 items-center py-2 cursor-pointer hover:bg-[#F8FAFC] rounded">
                    UTC+05:30
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center self-stretch gap-4">
            <label className="w-[120px] text-sm font-medium">
              Email Notification
            </label>
            <Switch />
          </div>
        </div>
      </div>
      <div className="fixed right-0 left-16 bottom-0 h-10 px-7 py-2 bg-white flex justify-center items-center gap-[10px] text-sm text-[#17212F]">
        <span>License: Enterprise free trial</span>
        <span>|</span>
        <span>Joined on 29-September-2023</span>
      </div>
      <ChangePasswordModal open={open} onClose={handleCloseModal} />
    </section>
  );
};

export default Page;
