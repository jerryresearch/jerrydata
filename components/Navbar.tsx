"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { signOut } from "next-auth/react";

type Props = {
  name: string;
  image?: string;
};

const Navbar = ({ name, image }: Props) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed w-full z-40 items-center justify-between px-[30px] h-14 flex bg-[#FAFAFA] border-b border-[#EEEEFF]">
      <Image
        src="/assets/logo.svg"
        alt="RaptorIQ logo"
        width={133}
        height={24}
      />
      <ul className="hidden md:flex gap-[20px] h-full flex-1 justify-center">
        <li>
          <Link
            href={"/u/stories"}
            className={`px-[10px] flex h-full gap-[10px] items-center ${
              pathname.startsWith("/u/stories")
                ? "text-[#080D19] border-b-2 border-primary"
                : "text-[#61656C]"
            } `}
          >
            <Image
              src={`${
                pathname.startsWith("/u/stories")
                  ? "/assets/stories-active.svg"
                  : "/assets/stories.svg"
              }`}
              alt="nav-icon"
              width={20}
              height={20}
            />
            <p>Stories</p>
            <span className="text-white rounded-full bg-primary w-6 h-6 text-sm flex justify-center items-center">
              0
            </span>
          </Link>
        </li>
        <li>
          <Link
            href={"/u/connectors"}
            className={`px-[10px] flex h-full gap-[10px] items-center ${
              pathname.startsWith("/u/connectors")
                ? "text-[#080D19] border-b-2 border-primary"
                : "text-[#61656C]"
            } `}
          >
            <Image
              src={`${
                pathname.startsWith("/u/connectors")
                  ? "/assets/connectors-active.svg"
                  : "/assets/connectors.svg"
              }`}
              alt="nav-icon"
              width={20}
              height={20}
            />
            <p>Connectors</p>
          </Link>
        </li>
        <li>
          <Link
            href={"/u/dashboards"}
            className={`px-[10px] flex h-full gap-[10px] items-center ${
              pathname.startsWith("/u/dashboards")
                ? "text-[#080D19] border-b-2 border-primary"
                : "text-[#61656C]"
            } `}
          >
            <Image
              src={`${
                pathname.startsWith("/u/dashboards")
                  ? "/assets/dashboards-active.svg"
                  : "/assets/dashboards.svg"
              }`}
              alt="nav-icon"
              width={20}
              height={20}
            />
            <p>Dashboards</p>
          </Link>
        </li>
        <li>
          <Link
            href={"/u/ask-jerry"}
            className={`px-[10px] flex h-full gap-[10px] items-center ${
              pathname.startsWith("/u/ask-jerry")
                ? "text-[#080D19] border-b-2 border-primary"
                : "text-[#61656C]"
            } `}
          >
            <Image
              src={`${
                pathname.startsWith("/u/ask-jerry")
                  ? "/assets/jerry-active.svg"
                  : "/assets/jerry.svg"
              }`}
              alt="nav-icon"
              width={20}
              height={20}
            />
            <p>Ask Jerry</p>
          </Link>
        </li>
      </ul>
      {/* pop over */}
      <Popover open={isOpen} onOpenChange={handleChange}>
        <PopoverTrigger asChild className="cursor-pointer">
          <div className="flex items-center gap-2 h-full">
            <div className="w-[34px] h-[34px] relative rounded-full object-cover flex items-center justify-center">
              <Image
                src={`${image || "/assets/avatar.svg"}`}
                alt="avatar"
                fill={true}
                className="rounded-full object-cover"
              />
            </div>
            <p className="hidden md:block">{name}</p>
            <Image
              src="/assets/chevron-down.svg"
              alt="options"
              width={20}
              height={20}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-52 flex flex-col gap-[10px] bg-white">
          <Link href="/u/profile" onClick={() => setIsOpen(false)}>
            Profile
          </Link>
          <div
            className="cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              signOut({ redirect: true, callbackUrl: "/" });
            }}
          >
            Sign out
          </div>
        </PopoverContent>
      </Popover>
    </nav>
  );
};

export default Navbar;
