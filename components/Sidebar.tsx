"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/dashboard/home",
    active: "/assets/home-active.svg",
    image: "/assets/home.svg",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    active: "/assets/reports-active.svg",
    image: "/assets/reports.svg",
  },
  {
    name: "Data",
    href: "/dashboard/data",
    active: "/assets/data-icon-active.svg",
    image: "/assets/data-icon.svg",
  },
  {
    name: "ChatIQ",
    href: "/dashboard/chatIQ",
    active: "/assets/chatIQ-icon-active.svg",
    image: "/assets/chatIQ-icon.svg",
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-16 bg-gray-900 h-screen fixed">
      <div className="w-16 h-16 flex items-center justify-center">
        <Image
          src="/assets/sidebar-logo.svg"
          alt="logo"
          width={24}
          height={24}
        />
      </div>
      <ul className="absolute top-[104px] text-gray-400">
        {navLinks.map((link, index) => (
          <li key={index}>
            {pathname.includes(link.href) ? (
              <Link
                href={link.href}
                className="w-16 h-16 flex flex-col gap-[2px] px-[15px] py-[10px] bg-gray-700 text-white items-center justify-center"
              >
                <Image
                  src={link.active}
                  alt="home-icon"
                  width={24}
                  height={24}
                />
                <div className="text-xs">{link.name}</div>
              </Link>
            ) : (
              <Link
                href={link.href}
                className="w-16 h-16 flex flex-col gap-[2px] px-[15px] py-[10px] items-center justify-center"
              >
                <Image
                  src={link.image}
                  alt="home-icon"
                  width={24}
                  height={24}
                />
                <div className="text-xs">{link.name}</div>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0">
        <Link
          href="/dashboard/help"
          className={`w-16 h-16 flex items-center justify-center ${
            pathname == "/dashboard/help" && "bg-gray-700"
          }`}
        >
          <Image
            src="/assets/help-icon.svg"
            alt="help icon"
            width={24}
            height={24}
          />
        </Link>
        <Link href="/dashboard/profile">
          {pathname == "/dashboard/profile" ? (
            <Image
              src="/assets/avatar-active.svg"
              alt="help icon"
              width={64}
              height={64}
            />
          ) : (
            <Image
              src="/assets/avatar.svg"
              alt="help icon"
              width={64}
              height={64}
            />
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
