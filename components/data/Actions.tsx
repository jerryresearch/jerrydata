"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import DeleteModal from "../DeleteModal";
import Link from "next/link";

type Props = {
  name: string;
  id: string;
  userId: string;
};

const Actions = ({ name, id, userId }: Props) => {
  const [open, setOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Popover open={popUpOpen} onOpenChange={setPopUpOpen}>
      <PopoverTrigger>
        <Image src="/assets/ellipsis.svg" alt="more" width={24} height={20} />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col p-2 rounded bg-white w-[122px] text-sm shadow-custom">
        <Link
          href={`data/${name}/edit/data?id=${id}`}
          onClick={() => setPopUpOpen(false)}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Explore
        </Link>
        <Link
          href={`data/${name}/edit/info?id=${id}`}
          className="px-3 py-[12px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Edit
        </Link>
        <span
          onClick={() => {
            setPopUpOpen(false);
            setOpen(true);
          }}
          className="px-3 py-[12px] text-[#D30A0A] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Delete
        </span>
      </PopoverContent>
      <DeleteModal
        userId={userId}
        id={id}
        open={open}
        name={name}
        onClose={handleCloseModal}
      />
    </Popover>
  );
};

export default Actions;
