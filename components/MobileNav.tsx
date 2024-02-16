"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 bg-[#FAFAFA] inset-x-0 grid grid-cols-4 text-xs items-center justify-center">
      <div>
        <Link
          href={"/stories"}
          className={`py-2 flex flex-col h-full gap-[6px] items-center justify-center border-t ${
            pathname.startsWith("/stories")
              ? "text-[#080D19] border-primary"
              : "text-[#61656C] border-transparent"
          } `}
        >
          <Image
            src={`${
              pathname.startsWith("/stories")
                ? "/assets/stories-active.svg"
                : "/assets/stories.svg"
            }`}
            alt="nav-icon"
            width={20}
            height={20}
          />
          <p>Stories</p>
        </Link>
      </div>
      <div>
        <Link
          href={"/connectors"}
          className={`py-2 flex flex-col h-full gap-[6px] items-center justify-center border-t ${
            pathname.startsWith("/connectors")
              ? "text-[#080D19] border-primary"
              : "text-[#61656C]"
          } `}
        >
          <Image
            src={`${
              pathname.startsWith("/connectors")
                ? "/assets/connectors-active.svg"
                : "/assets/connectors.svg"
            }`}
            alt="nav-icon"
            width={20}
            height={20}
          />
          <p>Connectors</p>
        </Link>
      </div>
      <div>
        <Link
          href={"/dashboards"}
          className={`py-2 flex flex-col h-full gap-[6px] items-center justify-center border-t ${
            pathname.startsWith("/dashboards")
              ? "text-[#080D19] border-primary"
              : "text-[#61656C]"
          } `}
        >
          <Image
            src={`${
              pathname.startsWith("/dashboards")
                ? "/assets/dashboards-active.svg"
                : "/assets/dashboards.svg"
            }`}
            alt="nav-icon"
            width={20}
            height={20}
          />
          <p>Dashboards</p>
        </Link>
      </div>
      <div>
        <Link
          href={"/ask-jerry"}
          className={`py-2 flex flex-col h-full gap-[6px] items-center justify-center border-t ${
            pathname.startsWith("/ask-jerry")
              ? "text-[#080D19] border-primary"
              : "text-[#61656C]"
          } `}
        >
          <Image
            src={`${
              pathname.startsWith("/ask-jerry")
                ? "/assets/jerry-active.svg"
                : "/assets/jerry.svg"
            }`}
            alt="nav-icon"
            width={20}
            height={20}
          />
          <p>Ask Jerry</p>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
