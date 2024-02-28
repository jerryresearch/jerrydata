"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const { toast } = useToast();
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!terms) {
      alert("Check the terms");
      return;
    }
    setIsLoading(true);
    // setData(initialState);

    try {
      const res = await fetch("/api/auth/user", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const user = await res.json();
      if (!res.ok) {
        setIsLoading(false);
        throw new Error(user.message);
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/u/stories",
      });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description: "Please try again.",
      });
      // console.log(error);
    }
  };

  return (
    <main className="lg:flex">
      <div
        className={`lg:w-[540px] lg:h-screen px-8 py-10 lg:p-[60px] relative flex flex-col gap-3 md:gap-6 overflow-y-auto ${styles.scrollbar}`}
      >
        <Image
          src="/assets/logo.svg"
          alt="RaptorIQ logo"
          width={155}
          height={28}
        />
        <div className="lg:w-[420px] text-[#080D19] font-semibold text-lg md:text-2xl">
          Create your Jerrydata account
        </div>
        <div className="lg:w-[420px] text-[#A9AAAE] font-normal text-base md:text-lg leading-[25.2px]">
          Let&apos;s get started! Fill in the form below to create your free
          Jerrydata account.
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/u/stories" })}
          className="lg:w-[420px] h-[42px] bg-white rounded-[6px] border border-[#EEEEFF] py-2 text-[#080D19] font-medium flex items-center justify-center gap-2"
        >
          <span>
            <Image
              src="/assets/google.svg"
              alt="google logo"
              width={24}
              height={24}
            />
          </span>
          <span className="text-sm text-[#080D19] font-medium">
            Continue with Google
          </span>
        </button>
        <div className="lg:w-[420px] h-[20px] justify-center items-center gap-[13.93px] inline-flex">
          <div className="w-[186px] h-px bg-[#EEEEFF]" />
          <div className="text-center w-[20px] h-[20px] text-[#A9AAAE] text-sm font-normal leading-snug">
            OR
          </div>
          <div className="w-[186px] h-px bg-[#EEEEFF]" />
        </div>
        <form
          className="flex flex-col gap-6 text-[#080D19]"
          onSubmit={handleSubmit}
        >
          <div className="lg:w-[420px] h-[80px] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">Full Name</div>
            <input
              type="text"
              className="bg-white rounded-[6px] border w-full border-[#EEEEFF] font-normal h-[42px] px-3 py-[14px] focus:outline-none"
              value={data.name}
              name="name"
              required
              onChange={handleChange}
            />
          </div>
          <div className="lg:w-[420px] h-[80px] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">Email Address</div>
            <input
              type="email"
              className="bg-white rounded-[6px] border w-full border-[#EEEEFF] font-normal h-[42px] px-3 py-[14px] focus:outline-none"
              value={data.email}
              name="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className="lg:w-[420px] h-[80px] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">Password</div>
            <input
              type="password"
              className="bg-white rounded-[6px] border w-full border-[#EEEEFF] font-normal h-[42px] px-3 py-[14px] focus:outline-none"
              placeholder="Must be atleast 6 characters"
              value={data.password}
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div className="lg:w-[420px] h-5 text-sm flex gap-[10px]">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={terms}
              onChange={() => setTerms(!terms)}
            />
            <div className="font-medium">
              <span className="text-[#080D19]">
                By signing up, I agree to the
              </span>{" "}
              <span className="text-primary underline">Terms & conditions</span>
            </div>
          </div>
          <div className="lg:w-[420px] h-12">
            <Button isLoading={isLoading}>Sign Up</Button>
          </div>
        </form>
        <div className="lg:w-[420px] h-5 text-sm">
          <span className="text-slate-700">Already have a account ? </span>
          <Link href="login" className="text-primary underline">
            Sign In
          </Link>
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

export default Register;
