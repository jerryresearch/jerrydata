"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import styles from "../styles.module.css";

const inter = Inter({ subsets: ["latin"] });

const initialState = {
  name: "",
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
    <main className={`${inter.className} lg:flex`}>
      <div
        className={`lg:w-[540px] h-screen p-4 lg:p-[60px] relative flex flex-col gap-6 overflow-y-auto ${styles.scrollbar}`}
      >
        <div>
          <Image
            src="/assets/logo.svg"
            alt="RaptorIQ logo"
            width={220}
            height={48}
          />
        </div>
        <div className="w-[420px] h-[34px] text-slate-700 font-semibold text-2xl">
          Create your RaptorIQ account
        </div>
        <div className="w-[420px] h-[50px] text-[#ADB3BB] font-normal text-lg leading-[25.2px]">
          Let&apos;s get started! Fill in the form below to create your free
          RaptorIQ account.
        </div>
        <button className="w-[420px] h-[48px] bg-white rounded-md border border-slate-200 py-2 text-slate-700 font-normal flex items-center justify-center gap-2">
          <span>
            <Image
              src="/assets/google.svg"
              alt="google logo"
              width={24}
              height={24}
            />
          </span>
          <span className="text-sm">Continue with Google</span>
        </button>
        <div className="w-[420px] h-[20px] justify-center items-center gap-[13.93px] inline-flex">
          <div className="w-[186px] h-px bg-slate-200" />
          <div className="text-center w-[20px] h-[20px] text-[#ADB3BB] text-sm font-normal leading-snug">
            OR
          </div>
          <div className="w-[186px] h-px bg-slate-200" />
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">Full Name</div>
            <input
              type="text"
              className="bg-white rounded border w-full border-[#EAEDF2] font-normal h-[48px] px-3 py-[14px]"
              value={data.name}
              name="name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">Email Address</div>
            <input
              type="email"
              className="bg-white rounded border w-full border-[#EAEDF2] font-normal h-[48px] px-3 py-[14px]"
              value={data.email}
              name="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">Password</div>
            <input
              type="password"
              className="bg-white rounded border w-full border-[#EAEDF2] font-normal h-[48px] px-3 py-[14px]"
              placeholder="Must be atleast 8 characters"
              value={data.password}
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="w-[420px] h-5 text-[#17212F] text-sm flex gap-[10px]">
            <input type="checkbox" name="terms" id="terms" />
            <div className="font-medium">
              <span className="text-slate-700">
                By signing up, I agree to the
              </span>{" "}
              <span className="text-blue-500 underline">
                Terms & conditions
              </span>
            </div>
          </div>
          <div className="w-[420px] h-14">
            <Button>Sign Up</Button>
          </div>
        </form>
        <div className="w-[420px] h-5 text-sm">
          <span className="text-slate-700">Already have a account ? </span>
          <span className="text-blue-500 underline">Sign In</span>
        </div>
      </div>
      <div className="hidden lg:block flex-1 h-screen">
        <Image
          src={"/assets/square.svg"}
          alt="sqaure"
          width={900}
          height={900}
          className="w-full object-cover object-center h-full"
        />
      </div>
    </main>
  );
};

export default Page;
