"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import DeleteChatModal from "./DeleteChatModal";
import ShareChatModal from "./ShareModal";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

const ChatActions = () => {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;
  const chatId = searchParams.get("id") || "";

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
      <DeleteChatModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        id={chatId}
        userId={userId}
      />
      <ShareChatModal open={openShareModal} onClose={handleCloseShareModal} />
    </Popover>
  );
};

export default ChatActions;
