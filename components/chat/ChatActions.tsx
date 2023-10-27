"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import DeleteModal from "../DeleteModal";
import ShareChatModal from "./ShareModal";

const ChatActions = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleCloseShareModal = () => {
    setOpenShareModal(false);
  };

  return (
    <Popover open={popUpOpen} onOpenChange={setPopUpOpen}>
      <PopoverTrigger>
        <Image src="/assets/ellipsis.svg" alt="more" width={24} height={20} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        alignOffset={-20}
        className="flex flex-col p-2 rounded bg-white w-[151px] text-sm shadow-custom"
      >
        <span
          onClick={() => {
            setPopUpOpen(false);
            setOpenShareModal(true);
          }}
          className="px-3 py-[6px] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Share chat
        </span>
        <span
          onClick={() => {
            setPopUpOpen(false);
            setOpenDeleteModal(true);
          }}
          className="px-3 py-[12px] text-[#D30A0A] flex gap-2 items-center rounded hover:bg-[#F8FAFC] cursor-pointer"
        >
          Delete chat
        </span>
      </PopoverContent>
      {/* <DeleteModal open={openDeleteModal} onClose={handleCloseDeleteModal} /> */}
      <ShareChatModal open={openShareModal} onClose={handleCloseShareModal} />
    </Popover>
  );
};

export default ChatActions;
