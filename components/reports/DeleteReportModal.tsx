import deleteReport from "@/lib/reports/deleteReport";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  id: string;
  userId: string;
};

const DeleteReportModal = ({ open, onClose, id, userId }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteReport(userId, id);
      router.refresh();
    } catch (error) {
      console.log("error");
    }
    onClose();
    setIsLoading(false);
  };

  return (
    <section
      className={`${
        open
          ? "fixed inset-0 h-screen w-screen flex items-center justify-center bg-[#334155]/20"
          : "hidden"
      }`}
    >
      <div className="bg-white flex w-[640px] h-[394px] flex-col gap-6 flex-shrink-0 items-center pb-[34px] text-xl text-[#17212F]">
        <div className="h-[120px] w-full p-8 flex items-center justify-center gap-[254px] flex-shrink-0 border-b border-[#EAEDF2] bg-[#F8FAFC]">
          <div>
            <p className="text-xl font-semibold">Are you sure?</p>
            <span className="text-base">
              This will delete the selected report.
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
        <div className="flex flex-col gap-4 w-[576px] text-lg">
          <p>
            Are you sure you want to delete{" "}
            <span className="font-semibold underline underline-offset-2">
              Report?
            </span>{" "}
            and its contents?
          </p>
          <p>Note: You can&apos;t undo this action.</p>
        </div>
        <div className="flex flex-col gap-4 w-[576px] text-lg">
          <button
            onClick={onClose}
            className={`rounded border border-[#EAEDF2] px-6 py-2 bg-[#F8FAFC] h-[56px] flex items-center justify-center gap-[10px] flex-shrink-0 ${
              isLoading && "pointer-events-none opacity-50"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            className={`rounded border border-[#EAEDF2] px-6 py-2 bg-[#D30A0A] text-white h-[56px] flex items-center justify-center gap-[10px] flex-shrink-0 ${
              isLoading && "pointer-events-none opacity-50"
            }`}
          >
            Delete Report
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeleteReportModal;
