"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { usePathname, useRouter } from "next/navigation";
import validateToken from "@/lib/profile/validateToken";
import Link from "next/link";
import resetPassword from "@/lib/profile/resetPassword";
import { useToast } from "../ui/use-toast";

const CreateNewPassword = () => {
  const { toast } = useToast();
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
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description: "Please try again later.",
      });
      // console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = pathname.split("/");
        const token = items[items.length - 1];
        const res = await validateToken(token);
      } catch (error) {
        // console.log("error");
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
      <main className=" flex flex-col w-screen h-screen items-center justify-center text-lg">
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
    <main className="lg:flex bg-[#F6F8FA]">
      <div
        className={`lg:w-[540px] h-screen px-8 py-10 lg:p-[60px] relative flex flex-col md:justify-center gap-6 overflow-y-auto ${styles.scrollbar}`}
      >
        <Image
          src="/assets/logo.svg"
          alt="RaptorIQ logo"
          width={155}
          height={28}
        />
        <div className="lg:w-[420px] text-[#080D19] font-semibold text-lg md:text-2xl">
          Reset your password
        </div>
        <div className="lg:w-[420px] text-[#A9AAAE] font-normal text-base md:text-lg leading-[25.2px]">
          Please enter a new password below to reset your Jerrydata account
          password.
        </div>
        <form
          className="flex flex-col gap-6 text-[#080D19]"
          onSubmit={handleSubmit}
        >
          <div className="lg:w-[420px] h-[80px] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">New password</div>
            <input
              type="password"
              className="bg-white rounded-[6px] border w-full border-[#EEEEFF] font-normal h-[42px] px-3 py-[14px] focus:outline-none"
              value={password}
              placeholder="Must be atleast 8 characters"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="lg:w-[420px] h-[80px] text-sm flex flex-col gap-3">
            <div className="font-medium w-full">Confirm new password</div>
            <input
              type="password"
              className="bg-white rounded-[6px] border w-full border-[#EEEEFF] font-normal h-[42px] px-3 py-[14px] focus:outline-none"
              placeholder="Must be atleast 8 characters"
              value={confirmPassword}
              name="confirmPassword"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div
            className={`lg:w-[420px] h-12 ${
              password !== confirmPassword && "opacity-50 pointer-events-none"
            }`}
          >
            <Button isLoading={isLoading}>Reset password</Button>
          </div>
        </form>
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

export default CreateNewPassword;
