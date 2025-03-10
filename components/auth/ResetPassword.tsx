"use client";

import styles from "./styles.module.css";
import { useState, FormEvent } from "react";
import Button from "@/components/Button";
import Image from "next/image";
import requestPasswordChange from "@/lib/profile/requestPasswordChange";
import { useToast } from "../ui/use-toast";

const ResetPassword = () => {
  const { toast } = useToast();
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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description: "Please try again later.",
      });
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="lg:flex">
      <div
        className={`lg:w-[540px] h-screen px-8 py-10 lg:p-[60px] relative flex flex-col md:justify-center gap-4 md:gap-6 overflow-y-auto ${styles.scrollbar}`}
      >
        <Image
          src="/assets/logo.svg"
          alt="RaptorIQ logo"
          width={155}
          height={28}
        />
        <div className="lg:w-[420px] text-#080D19 font-semibold text-lg md:text-2xl">
          Reset your password
        </div>
        {!isLinkSent && (
          <div className="lg:w-[420px] h-[50px] text-[#A9AAAE] font-normal md:text-lg leading-[25.2px]">
            Please enter your email address below to reset your Jerrydata
            password.
          </div>
        )}
        {isLinkSent ? (
          <div className="text-sm text-[#080D19]">
            We&apos;ve sent a password reset link to your email address. Please
            follow the instructions in the email to reset your password.
          </div>
        ) : (
          <form
            className="flex flex-col gap-6 text-[#080D19]"
            onSubmit={handleSubmit}
          >
            <div className="lg:w-[420px] h-[80px] text-sm flex flex-col gap-3">
              <div className="font-medium">Email Address</div>
              <input
                type="email"
                className="bg-white rounded-[6px] border w-full border-[#EEEEFF] font-normal h-[42px] px-3 py-[14px] focus:outline-none"
                value={email}
                name="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="lg:w-[420px] h-12">
              <Button isLoading={isLoading}>Reset password</Button>
            </div>
          </form>
        )}
        <div className="lg:w-[420px] text-sm">
          <span className="text-[#080D19]">
            Need help in resetting your password? Get in touch at {""}
          </span>
          <span className="text-primary underline">support@jerrydata.com</span>
        </div>
      </div>
      {/* <div className="hidden lg:block flex-1 h-screen"> */}
      <div className="hidden lg:block flex-1 h-screen bg-[#EEEEFF]">
        {/* <Image
          src={"/assets/square.svg"}
          alt="sqaure"
          width={900}
          height={900}
          className="w-full object-cover object-center h-full"
        /> */}
      </div>
    </main>
  );
};

export default ResetPassword;
