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
    <nav className="fixed w-full items-center px-[30px] h-14 flex bg-[#FAFAFA] border-b border-[#EEEEFF]">
      <Image
        src="/assets/logo.svg"
        alt="RaptorIQ logo"
        width={133}
        height={24}
      />
      <ul className="flex gap-[20px] h-full flex-1 justify-center">
        {navLinks.map((navLink, index) => (
          <li key={index}>
            {pathname.includes(navLink.href) ? (
              <Link
                href={navLink.href}
                className="flex h-full gap-[10px] text-[#080D19] items-center border-b-2 border-primary"
              >
                <Image
                  src={navLink.active}
                  alt="nav-icon"
                  width={20}
                  height={20}
                />
                <p>{navLink.name}</p>
                {navLink.name == "Stories" && (
                  <span className="text-white rounded-full bg-primary w-6 h-6 text-sm flex justify-center items-center">
                    0
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href={navLink.href}
                className="flex h-full gap-[10px] items-center text-[#61656C]"
              >
                <Image
                  src={navLink.image}
                  alt="nav-icon"
                  width={20}
                  height={20}
                />
                <div>{navLink.name}</div>
              </Link>
            )}
          </li>
        ))}
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
