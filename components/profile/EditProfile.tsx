"use client";

import React, { useState } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import updateProfile from "@/lib/profile/updateProfile";
import Image from "next/image";

type Props = {
  name: string;
  email: string;
  userId: string;
};

const EditProfile = ({ name, email, userId }: Props) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [firstName, setFirstName] = useState(name.split(" ")[0]);
  const [lastName, setLastName] = useState(name.split(" ")[1] || "");
  const [updatedEmail, setEmail] = useState(email);

  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = {
      name: `${firstName} ${lastName}`,
      email: email,
    };
    try {
      const res = await updateProfile(userId, data);
      location.reload();
    } catch (error) {
      console.log("error updating profile");
      alert(error);
    }
  };

  return (
    <section className="text-[#080D19]">
      <div className="px-[60px] py-6 flex items-center justify-between border-b border-[#EEEEFF]">
        <h1 className="text-2xl font-medium">My Profile</h1>
        <button
          onClick={handleSubmit}
          className={`py-1 px-[14px] flex items-center justify-center rounded-[6px] h-[42px] bg-primary text-white ${
            !isUpdated && "bg-primary/50 pointer-events-none"
          }`}
        >
          Save Changes
        </button>
      </div>
      <div className="px-[60px] py-6 flex flex-col items-start gap-[24px]">
        <div className="flex gap-4 items-center">
          <Image
            src="/assets/avatar.svg"
            alt="no reports"
            width={143}
            height={143}
          />
          <button className="h-[42px] rounded-[6px] px-[14px] bg-[#F1F1F1] text-[#61656C] font-medium">
            Upload Photo
          </button>
          <button className="text-[#D30A0A] underline font-medium">
            Remove Photo
          </button>
        </div>
        <div className="flex flex-col gap-6 w-[420px]">
          <div className="flex flex-col gap-4">
            <label className="font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setIsUpdated(true);
              }}
              className="h-[42px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setIsUpdated(true);
              }}
              className="h-[42px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={updatedEmail}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsUpdated(true);
              }}
              className="h-[42px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white focus:outline-none"
            />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="h-[42px] w-fit px-[14px] rounded-[6px] font-medium bg-[#F1F1F1] text-[#61656C]"
          >
            Change Password
          </button>
        </div>
      </div>
      {/* <div className="fixed right-0 left-16 bottom-0 h-10 px-7 py-2 bg-white flex justify-center items-center gap-[10px] text-sm text-[#17212F]">
        <span>License: Enterprise free trial</span>
        <span>|</span>
        <span>Joined on 29-September-2023</span>
      </div> */}
      <ChangePasswordModal
        userId={userId}
        open={open}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default EditProfile;
