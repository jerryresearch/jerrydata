import deleteChat from "@/lib/chats/deleteChat";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
  userId: string;
  title: string;
};

const DeleteChatModal = ({ open, onClose, id, userId, title }: Props) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteChat(userId, id);
      location.replace("/u/ask-jerry");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error.message}.`,
        description:
          "There was an issue deleting the chat. Please try again later.",
      });
      // console.log(error);
    }
    onClose();
    setIsLoading(false);
  };

  return (
    <section
      className={`${
        open
          ? "fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-[#1A1B5826]"
          : "hidden"
      }`}
    >
      <div className="bg-white flex w-[640px] min-h-[340px] rounded-[6px] flex-col gap-6 flex-shrink-0 items-center text-[#080D19] pb-6">
        <div className="h-[90px] w-full py-4 px-8 flex items-center rounded-[6px] justify-between flex-shrink-0 border-b border-[#EEEEFF] bg-[#FAFAFA]">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-semibold">Are you sure?</p>
            <span className="text-base">
              This will delete the selected dataset.
            </span>
          </div>
          <Image
            src="/assets/dismiss.svg"
            alt="close modal"
            width={24}
            height={24}
            onClick={onClose}
            className={`cursor-pointer ${
              isLoading && "pointer-events-none opacity-50"
            }`}
          />
        </div>
        <div className="flex flex-col gap-3 w-[576px] text-lg">
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold underline underline-offset-2">
              {title}?
            </span>{" "}
            and its contents?
          </p>
          <p>Note: You can&apos;t undo this action.</p>
        </div>
        <div className="flex flex-col gap-4 w-[576px] text-lg">
          <button
            onClick={onClose}
            className={`rounded-[6px] border border-[#EAEDF2] px-6 py-2 bg-[#F1F1F1] h-[48px] flex items-center justify-center gap-[10px] flex-shrink-0 ${
              isLoading && "pointer-events-none opacity-50"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className={`rounded-[6px] border border-[#EAEDF2] px-6 py-2 bg-[#D30A0A] text-white h-[48px] flex items-center justify-center gap-[10px] flex-shrink-0 ${
              isLoading && "pointer-events-none opacity-50"
            }`}
          >
            Delete Chat
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteChatModal;
