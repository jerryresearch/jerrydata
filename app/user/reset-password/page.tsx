"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import styles from "../styles.module.css";
import requestPasswordChange from "@/lib/profile/requestPasswordChange";

const inter = Inter({ subsets: ["latin"] });

const Page = () => {
  const [email, setEmail] = useState("");
  const [isLinkSent, setIsLinkSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await requestPasswordChange(email);
      console.log(res);
      setIsLinkSent(true);
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={`${inter.className} lg:flex bg-[#F6F8FA]`}>
      <div
        className={`lg:w-[540px] h-screen px-8 py-10 lg:p-[60px] relative flex flex-col md:justify-center gap-4 md:gap-6 overflow-y-auto ${styles.scrollbar}`}
      >
        <div>
          <Image
            src="/assets/logo.svg"
            alt="RaptorIQ logo"
            width={220}
            height={48}
            className="w-36 h-10 md:h-12 md:w-[220px]"
          />
        </div>
        <div className="lg:w-[420px] text-slate-700 font-semibold text-lg md:text-2xl">
          Reset your password
        </div>
        {!isLinkSent && (
          <div className="lg:w-[420px] h-[50px] text-[#ADB3BB] font-normal md:text-lg leading-[25.2px]">
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
            <div className="lg:w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
              <div className="font-medium">Email Address</div>
              <input
                type="email"
                className="bg-white rounded border w-full border-[#EAEDF2] font-normal h-[48px] px-3 py-[14px]"
                value={email}
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="lg:w-[420px] h-14">
              <Button isLoading={isLoading}>Reset password</Button>
            </div>
          </form>
        )}
        <div className="lg:w-[420px] text-sm">
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
