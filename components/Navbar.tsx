"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Stories",
    href: "/home",
    active: "/assets/stories-active.svg",
    image: "/assets/stories.svg",
  },
  {
    name: "Connectors",
    href: "/home/connectors",
    active: "/assets/connectors-active.svg",
    image: "/assets/connectors.svg",
  },
  {
    name: "Dashboards",
    href: "/home/dashboards",
    active: "/assets/dashboards-active.svg",
    image: "/assets/dashboards.svg",
  },
  {
    name: "Ask Jerry",
    href: "/home/ask-jerry",
    active: "/assets/jerry-active.svg",
    image: "/assets/jerry.svg",
  },
];

type Props = {
  name: string;
};

const Navbar = ({ name }: Props) => {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-0 items-center px-[30px] h-14 flex bg-[#FAFAFA] border-b border-[#EEEEFF]">
      <Image
        src="/assets/logo.svg"
        alt="RaptorIQ logo"
        width={133}
        height={24}
      />
      <ul className="flex gap-[20px] h-full flex-1 justify-center">
        <li>
          <Link
            href={"/home"}
            className={`px-[10px] flex h-full gap-[10px] items-center ${
              pathname == "/home"
                ? "text-[#080D19] border-b-2 border-primary"
                : "text-[#61656C]"
            } `}
          >
            <Image
              src={`${
                pathname == "/home"
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
            href={"/home/connectors"}
            className={`px-[10px] flex h-full gap-[10px] items-center ${
              pathname.startsWith("/home/connectors")
                ? "text-[#080D19] border-b-2 border-primary"
                : "text-[#61656C]"
            } `}
          >
            <Image
              src={`${
                pathname.startsWith("/home/connectors")
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
            href={"/home/dashboards"}
            className={`px-[10px] flex h-full gap-[10px] items-center ${
              pathname.startsWith("/home/dashboards")
                ? "text-[#080D19] border-b-2 border-primary"
                : "text-[#61656C]"
            } `}
          >
            <Image
              src={`${
                pathname.startsWith("/home/dashboards")
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
            href={"/home/ask-jerry"}
            className={`px-[10px] flex h-full gap-[10px] items-center ${
              pathname.startsWith("/home/ask-jerry")
                ? "text-[#080D19] border-b-2 border-primary"
                : "text-[#61656C]"
            } `}
          >
            <Image
              src={`${
                pathname.startsWith("/home/ask-jerry")
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
      <div className="flex items-center gap-2 h-full">
        <Image src="/assets/avatar.svg" alt="avatar" width={34} height={34} />
        <p>{name}</p>
        <Image
          src="/assets/chevron-down.svg"
          alt="options"
          width={20}
          height={20}
        />
      </div>
    </nav>
  );
};

export default Navbar;
