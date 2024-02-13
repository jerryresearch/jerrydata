"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  id: string;
  selected: string;
};

const MenuBar = ({ id, selected }: Props) => {
  const pathname = usePathname();

  const items = ["info", "field", "data"];
  return (
    <div className="w-full flex px-[5px] py-1 bg-white border-b border-[#EEEEFF]">
      {items.map((item) => (
        <Link
          href={`${pathname}?type=${item.toLowerCase()}&id=${id}`}
          key={item}
          className={`px-[12px] py-[6px] transition-all duration-300 ease-in-out capitalize ${
            selected === item
              ? "text-primary border-b-2 border-primary"
              : "text-[#61656C]"
          }`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default MenuBar;
