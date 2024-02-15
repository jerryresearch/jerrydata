"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 bg-[#FAFAFA] inset-x-0 grid grid-cols-4">
      <div>
        <Link
          href={"/home"}
          className={`px-[10px] py-2 flex flex-col h-full gap-[10px] items-center ${
            pathname == "/home"
              ? "text-[#080D19] border-t-2 border-primary"
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
            width={24}
            height={24}
          />
          <p>Stories</p>
        </Link>
      </div>
      <div>
        <Link
          href={"/home/connectors"}
          className={`px-[10px] py-2 flex flex-col h-full gap-[10px] items-center ${
            pathname.startsWith("/home/connectors")
              ? "text-[#080D19] border-t-2 border-primary"
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
            width={24}
            height={24}
          />
          <p>Connectors</p>
        </Link>
      </div>
      <div>
        <Link
          href={"/home/dashboards"}
          className={`px-[10px] py-2 flex flex-col h-full gap-[10px] items-center ${
            pathname.startsWith("/home/dashboards")
              ? "text-[#080D19] border-t-2 border-primary"
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
            width={24}
            height={24}
          />
          <p>Dashboards</p>
        </Link>
      </div>
      <div>
        <Link
          href={"/home/ask-jerry"}
          className={`px-[10px] py-2 flex flex-col h-full gap-[10px] items-center ${
            pathname.startsWith("/home/ask-jerry")
              ? "text-[#080D19] border-t-2 border-primary"
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
            width={24}
            height={24}
          />
          <p>Ask Jerry</p>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
