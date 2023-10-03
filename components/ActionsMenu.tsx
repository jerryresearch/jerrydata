import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

const ActionsMenu = () => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Image src="/assets/ellipsis.svg" alt="more" width={24} height={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="px-3 py-[6px]">
          <DropdownMenuItem>Explore</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="w-[640px]">
        <DialogHeader>
          <div className="h-[120px] p-8 text-[#17212F] flex flex-col gap-1">
            <p className="text-xl font-semibold">Are you sure?</p>
            <span className="font-normal text-base">
              This will delete the selected dataset
            </span>
          </div>
        </DialogHeader>
        <div className="py-6 flex flex-col gap-2">
          <p>Are you sure you want to delete DataSheet and its contents?</p>
          <p>Note: You can&apos;t undo this action.</p>
        </div>
        <div className="flex flex-col gap-2">
          <DialogTrigger asChild>
            <button className="px-6 py-2 border border-[#EAEDF2] bg-[#F8FAFC] rounded">
              Cancel
            </button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <button
              type="submit"
              className="px-6 py-2 border border-[#EAEDF2] bg-[#F8FAFC] rounded"
            >
              Delete
            </button>
          </DialogTrigger>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionsMenu;
