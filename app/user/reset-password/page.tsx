"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import styles from "../styles.module.css";

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
    <main className={`${inter.className} lg:flex`}>
      <div
        className={`lg:w-[540px] h-screen p-4 lg:p-[60px] relative flex flex-col justify-center gap-6 overflow-y-auto ${styles.scrollbar}`}
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
          Reset your password
        </div>
        {!isLinkSent && (
          <div className="w-[420px] h-[50px] text-[#ADB3BB] font-normal text-lg leading-[25.2px]">
            Please enter your email address below to reset your RaptorIQ
            password.
          </div>
        )}
        {isLinkSent ? (
          <div className="text-sm text-slate-700">
            We&apos;ve sent a password reset link to your email address. Please
            follow the instructions in the email to reset your password.
          </div>
        ) : (
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
              <div className="font-medium">Email Address</div>
              <input
                type="email"
                className="bg-white rounded border w-full border-[#EAEDF2] font-normal h-[48px] px-3 py-[14px]"
                value={data.email}
                name="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="w-[420px] h-14">
              <Button>Reset password</Button>
            </div>
          </form>
        )}
        <div className="w-[420px] text-sm">
          <span className="text-slate-700">
            Need help in resetting your password? Get in touch at {""}
          </span>
          <span className="text-blue-500 underline">support@raptoriq.com</span>
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
