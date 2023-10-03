"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";

const inter = Inter({ subsets: ["latin"] });

const initialState = {
  email: "",
  password: "",
};

const Page = () => {
  const [data, setData] = useState(initialState);

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
          Welcome back to RaptorIQ
        </div>
        <div className="text-gray-400 font-normal text-xl">
          Sign in to your account below.
        </div>
        <button className="bg-white rounded-md border border-slate-200 py-2 text-slate-700 font-normal flex items-center justify-center gap-2">
          <span>
            <Image
              src="/assets/google.svg"
              alt="google logo"
              width={24}
              height={24}
            />
          </span>
          <span>Continue with Google</span>
        </button>
        <div className="w-[438.50px] justify-center items-center gap-[13.93px] inline-flex">
          <div className="w-[195.32px] h-px relative bg-slate-200" />
          <div className="text-center text-slate-200 text-sm font-normal leading-snug">
            OR
          </div>
          <div className="w-[195.32px] h-px relative bg-slate-200" />
        </div>
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
          <div className="flex flex-col gap-3 text-slate-700 text-sm">
            <div className="font-medium">Password</div>
            <input
              type="password"
              className="bg-white rounded border border-slate-200 font-normal py-[14px] px-3"
              placeholder="Must be atleast 8 characters"
              value={data.password}
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 text-slate-700 text-sm">
            <input type="checkbox" name="terms" id="terms" />
            <div className="font-medium w-full flex justify-between">
              <span className="text-slate-700">Remember me</span>{" "}
              <span className="text-blue-500 underline">Forgot password?</span>
            </div>
          </div>
          <Button>Sign In</Button>
        </form>
        <div className="text-sm">
          <span className="text-slate-700">Don&apos;t have a account ? </span>
          <span className="text-blue-500 underline">Sign up</span>
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
