"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";

const inter = Inter({ subsets: ["latin"] });

const initialState = {
  email: "",
};

const Page = () => {
  const [data, setData] = useState(initialState);
  const [isLinkSent, setIsLinkSent] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLinkSent(true);
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
        {!isLinkSent && (
          <div className="text-gray-400 font-normal text-xl">
            Please enter your email address below to reset your RaptorIQ
            password.
          </div>
        )}
        {isLinkSent ? (
          <div className="text-sm text-slate-700s pt-24">
            We&apos;ve sent a password reset link to your email address. Please
            follow the instructions in the email to reset your password.
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 text-slate-700 text-sm">
              <div className="font-medium">Email Address</div>
              <input
                type="email"
                className="bg-white rounded border border-slate-200 font-normal py-[14px] px-3"
                value={data.email}
                name="email"
                required
                onChange={handleChange}
              />
            </div>
            <button className="bg-blue-600 text-white rounded py-2 border border-slate-200 font-medium">
              Reset password
            </button>
          </form>
        )}
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
