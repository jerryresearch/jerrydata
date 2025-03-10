"use client";

import updatePassword from "@/lib/profile/updatePassword";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  userId: string;
};

const ChangePasswordModal = ({ open, onClose, userId }: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  // const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      console.log("fill all details");
    }
    if (newPassword !== confirmPassword) {
      console.log("password does not match");
    }
    try {
      setIsLoading(true);
      const res = await updatePassword(userId, { newPassword });
      location.reload();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue updating the password. Please try again later.",
      });
      // console.log(error);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <section
      className={`${
        open
          ? "fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-[#1A1B5826]"
          : "hidden"
      }`}
    >
      <div className="bg-white flex w-[640px] min-h-[340px] rounded-[6px] flex-col gap-6 flex-shrink-0 items-center text-[#080D19] pb-6">
        <div className="h-20 w-full rounded-[6px] py-6 px-8 flex items-center justify-between flex-shrink-0 border-b border-[#EEEEFF] bg-[#FAFAFA]">
          <p className="text-xl font-medium">Change Password</p>
          <Image
            src="/assets/dismiss.svg"
            alt="close modal"
            width={24}
            height={24}
            onClick={onClose}
            className="cursor-pointer"
          />
        </div>
        {/* <div className="w-[576px] flex flex-col items-start justify-center  gap-3 text-sm font-medium">
          <label htmlFor="old password" className="self-stretch">
            Old password
          </label>
          <input
            type="password"
            name="old password"
            id="old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="border border-[#EAEDF2] bg-white rounded py-[14px] px-3 flex items-center self-stretch"
          />
        </div> */}
        <div className="w-[576px] flex flex-col items-start justify-center gap-4 font-medium">
          <label htmlFor="new password" className="self-stretch">
            New password
          </label>
          <input
            type="password"
            name="new password"
            id="new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border border-[#EAEDF2] bg-white rounded py-[14px] px-3 flex items-center self-stretch focus:outline-none"
          />
        </div>
        <div className="w-[576px] flex flex-col items-start justify-center gap-4 font-medium">
          <label htmlFor="confirm password" className="self-stretch">
            Confirm new password
          </label>
          <input
            type="password"
            name="confirm password"
            id="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-[#EAEDF2] bg-white rounded py-[14px] px-3 flex items-center self-stretch focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-[10px] w-[576px] text-lg">
          <button
            onClick={() => {
              handleSubmit();
            }}
            className={`rounded border border-[#EAEDF2] px-6 py-2 bg-primary text-white h-[56px] flex items-center justify-center gap-[10px] flex-shrink-0 ${
              (isLoading ||
                // !oldPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword) &&
              "opacity-50 pointer-events-none"
            }`}
          >
            Save password
          </button>
        </div>
        {/* <div className="flex w-[576px] items-start flex-[1_0_0] gap-2 text-sm">
          Need help in resetting your password? Get in touch at
          <span className="text-primary underline">support@raptoriq.com</span>
        </div> */}
      </div>
    </section>
  );
};

export default ChangePasswordModal;
