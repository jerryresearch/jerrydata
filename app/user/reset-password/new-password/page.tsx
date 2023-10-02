"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";

const inter = Inter({ subsets: ["latin"] });

const initialState = {
  password: "",
  confirmPassword: "",
};

const Page = () => {
  const [data, setData] = useState(initialState);
  const [isLinkSent, setIsLinkSent] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    setData(initialState);
  };

  return (
    <main className={`${inter.className} min-h-screen`}>
      <div className="w-[540px] min-h-screen p-[56px] flex flex-col justify-center gap-6">
        <div>
          <div className="flex gap-[10px]">
            <Image
              src="/assets/logo.svg"
              alt="RaptorIQ logo"
              width={40}
              height={40}
            />
            <div className="text-4xl">
              <span className="text-slate-700 font-bold">Raptor</span>
              <span className="text-blue-500 font-bold">IQ</span>
            </div>
          </div>
        </div>
        <div className="text-slate-700 font-semibold text-[28px]">
          Reset your password
        </div>
        <div className="text-gray-400 font-normal text-xl">
          Please enter a new password below to reset your RaptorIQ account
          password.
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 text-slate-700 text-sm">
            <div className="font-medium">New password</div>
            <input
              type="password"
              className="bg-white rounded border border-slate-200 font-normal py-[14px] px-3"
              value={data.password}
              placeholder="Must be atleast 8 characters"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-3 text-slate-700 text-sm">
            <div className="font-medium">Confirm new password</div>
            <input
              type="password"
              className="bg-white rounded border border-slate-200 font-normal py-[14px] px-3"
              placeholder="Must be atleast 8 characters"
              value={data.confirmPassword}
              name="confirmPassword"
              required
              onChange={handleChange}
            />
          </div>
          <button className="bg-blue-600 text-white rounded py-2 border border-slate-200 font-medium">
            Reset password
          </button>
        </form>
        <div className="text-sm">
          <span className="text-slate-700">
            Need help in resetting your password? Get in touch at {""}
          </span>
          <span className="text-blue-500 underline">support@spellmint.com</span>
        </div>
      </div>
      <div className="fixed left-[540px] top-0 min-h-screen">
        <Image
          src={"/assets/square.svg"}
          alt="sqaure"
          width={900}
          height={900}
          className=""
        />
      </div>
    </main>
  );
};

export default Page;
