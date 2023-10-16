"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "../styles.module.css";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const initialState = {
  email: "",
  password: "",
};

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // sign in with credentials
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.error) {
        alert("Invalid credentials");
        return;
      }
      router.replace(searchParams.get("callbackUrl") || "/dashboard/home");
    } catch (error) {
      alert("Error!!!");
      console.log(error);
    }
  };

  return (
    <main className={`${inter.className} lg:flex bg-[#F6F8FA]`}>
      <div
        className={`w-full lg:w-[540px] h-screen px-8 lg:px-[60px] py-10 relative flex flex-col 2xl:justify-center gap-3 md:gap-6 overflow-y-auto ${styles.scrollbar}`}
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
          Welcome back to RaptorIQ
        </div>
        <div className="lg:w-[420px] text-[#ADB3BB] font-normal text-base md:text-lg leading-[25.2px]">
          Sign in to your account below.
        </div>
        <button className="lg:w-[420px] h-[48px] bg-white rounded-md border border-slate-200 py-2 text-slate-700 font-normal flex items-center justify-center gap-2">
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
        <div className="lg:w-[420px] h-[20px] justify-center items-center gap-[13.93px] inline-flex">
          <div className="w-[186px] h-px bg-slate-200" />
          <div className="text-center w-[20px] h-[20px] text-[#ADB3BB] text-sm font-normal leading-snug">
            OR
          </div>
          <div className="w-[186px] h-px bg-slate-200" />
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="lg:w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
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
          <div className="lg:w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
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
          <div className="lg:w-[420px] h-5 text-[#17212F] text-sm flex gap-[10px]">
            <input type="checkbox" />
            <div className="font-medium">
              <span className="text-slate-700">Remember me</span>{" "}
              <Link href="reset-password" className="text-blue-500 underline">
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="lg:w-[420px] h-14">
            <Button isLoading={isLoading}>Sign In</Button>
          </div>
        </form>
        <div className="lg:w-[420px] h-5 text-sm">
          <span className="text-slate-700">Don&apos;t have a account ? </span>
          <Link href="register" className="text-blue-500 underline">
            Sign up
          </Link>
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
