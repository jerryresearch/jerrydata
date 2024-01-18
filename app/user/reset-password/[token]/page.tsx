"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, FormEvent, useEffect } from "react";
import Button from "@/components/Button";
import styles from "../../styles.module.css";
import Loading from "@/components/Loading";
import { usePathname, useRouter } from "next/navigation";
import validateToken from "@/lib/profile/validateToken";
import Link from "next/link";
import resetPassword from "@/lib/profile/resetPassword";

const inter = Inter({ subsets: ["latin"] });

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }
    try {
      const items = pathname.split("/");
      const token = items[items.length - 1];
      const res = await resetPassword(token, password);
      console.log(res);
      router.replace("/user/login");
    } catch (error) {
      console.log("error updating password");
      alert(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = pathname.split("/");
        const token = items[items.length - 1];
        const res = await validateToken(token);
      } catch (error) {
        console.log("error");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pathname]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main
        className={`${inter.className} flex flex-col w-screen h-screen items-center justify-center bg-[#F6F8FA] text-lg`}
      >
        <div>Password reset token is invalid or has expired.</div>
        <div>
          Click{" "}
          <Link
            href={"/user/reset-password"}
            className="text-primary underline"
          >
            here
          </Link>{" "}
          to go back
        </div>
      </main>
    );
  }

  return (
    <main className={`${inter.className} lg:flex  bg-[#F6F8FA]`}>
      <div
        className={`lg:w-[540px] h-screen px-8 py-10 lg:p-[60px] relative flex flex-col md:justify-center gap-6 overflow-y-auto ${styles.scrollbar}`}
      >
        <div className="flex gap-[10px]">
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
        <div className="lg:w-[420px] text-[#ADB3BB] font-normal text-base md:text-lg leading-[25.2px]">
          Please enter a new password below to reset your RaptorIQ account
          password.
        </div>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="lg:w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">New password</div>
            <input
              type="password"
              className="bg-white rounded border w-full border-[#EAEDF2] font-normal h-[48px] px-3 py-[14px]"
              value={password}
              placeholder="Must be atleast 8 characters"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="lg:w-[420px] h-[80px] text-[#17212F] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">Confirm new password</div>
            <input
              type="password"
              className="bg-white rounded border w-full border-[#EAEDF2] font-normal h-[48px] px-3 py-[14px]"
              placeholder="Must be atleast 8 characters"
              value={confirmPassword}
              name="confirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div
            className={`lg:w-[420px] h-14 ${
              password !== confirmPassword && "opacity-50 pointer-events-none"
            }`}
          >
            <Button isLoading={isLoading}>Reset password</Button>
          </div>
        </form>
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
