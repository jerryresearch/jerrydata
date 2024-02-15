"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import { signIn } from "next-auth/react";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
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
        setIsLoading(false);
        return;
      }
      router.replace(searchParams.get("callbackUrl") || "/home");
    } catch (error) {
      alert("Error!!!");
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <main className="lg:flex">
      <div
        className={`w-full lg:w-[540px] h-screen px-8 lg:px-[60px] py-10 relative flex flex-col 2xl:justify-center gap-3 md:gap-6 overflow-y-auto ${styles.scrollbar}`}
      >
        <Image
          src="/assets/logo.svg"
          alt="RaptorIQ logo"
          width={155}
          height={28}
        />
        <div className="lg:w-[420px] text-[#080D19] font-semibold text-lg md:text-2xl">
          Welcome back to Jerrydata
        </div>
        <div className="lg:w-[420px] text-[#A9AAAE] font-normal text-base md:text-lg leading-[25.2px]">
          Sign in to your account below.
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard/home" })}
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
          <span className="text-sm text-[#080D19]">Continue with Google</span>
        </button>
        <div className="lg:w-[420px] h-[20px] justify-center items-center gap-[13.93px] inline-flex">
          <div className="w-[186px] h-px bg-slate-200" />
          <div className="text-center w-[20px] h-[20px] text-[#A9AAAE] text-sm font-normal leading-snug">
            OR
          </div>
          <div className="w-[186px] h-px bg-slate-200" />
        </div>
        <form
          className="flex flex-col gap-6 text-[#080D19]"
          onSubmit={handleSubmit}
        >
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
            <div className="font-medium">
              <Link href="reset-password" className="text-primary underline">
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="lg:w-[420px] h-12">
            <Button isLoading={isLoading}>Sign In</Button>
          </div>
        </form>
        <div className="lg:w-[420px] h-5 text-sm">
          <span className="text-[#080D19]">Don&apos;t have a account? </span>
          <Link href="register" className="text-primary underline">
            Sign up
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

export default Login;
