import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import DeleteModal from "./DeleteModal";
import Link from "next/link";

type Props = {
  name: string;
};

const Actions = ({ name }: Props) => {
  const [open, setOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Image src="/assets/ellipsis.svg" alt="more" width={24} height={20} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-2 rounded bg-white w-[122px] text-sm shadow-custom">
        <span className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer">
          Explore
        </span>
        <Link
          href={`data/${name}/edit/info`}
          className="px-3 py-[12px] flex gap-2 items-center rounded cursor-pointer"
        >
          Edit
        </Link>
        <span
          onClick={() => setOpen(true)}
          className="px-3 py-[12px] flex gap-2 items-center rounded cursor-pointer"
        >
          Delete
        </span>
      </PopoverContent>
      <DeleteModal open={open} onClose={handleCloseModal} />
    </Popover>
  );
};

export default Actions;
