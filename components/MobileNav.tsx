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
          href={"/u/stories"}
          className={`py-2 flex flex-col h-full gap-[6px] items-center justify-center border-t ${
            pathname.startsWith("/u/stories")
              ? "text-[#080D19] border-primary"
              : "text-[#61656C] border-transparent"
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
        </Link>
      </div>
      <div>
        <Link
          href={"/u/connectors"}
          className={`py-2 flex flex-col h-full gap-[6px] items-center justify-center border-t ${
            pathname.startsWith("/u/connectors")
              ? "text-[#080D19] border-primary"
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
      </div>
      <div>
        <Link
          href={"/u/dashboards"}
          className={`py-2 flex flex-col h-full gap-[6px] items-center justify-center border-t ${
            pathname.startsWith("/u/dashboards")
              ? "text-[#080D19] border-primary"
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
      </div>
      <div>
        <Link
          href={"/u/ask-jerry"}
          className={`py-2 flex flex-col h-full gap-[6px] items-center justify-center border-t ${
            pathname.startsWith("/u/ask-jerry")
              ? "text-[#080D19] border-primary"
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
      </div>
    </nav>
  );
};

export default MobileNav;
