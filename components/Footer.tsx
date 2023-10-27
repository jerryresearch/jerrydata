import updateDataset from "@/lib/datasets/updateDataset";
import Link from "next/link";

type Props = {
  step: number;
  nextHref: string;
  backHref: string;
  nextDisabled: boolean;
  updates?: any;
  userId?: string;
  id: string;
};

const Footer = ({
  updates,
  step,
  nextHref,
  backHref,
  nextDisabled,
  userId,
  id,
}: Props) => {
  const handleUpdate = async () => {
    if (userId && updates) {
      const res = await updateDataset(userId, id, updates);
      if (!res?.ok) {
        alert("error updating");
        return;
      }
    }
  };
  return (
    <div className="flex px-7 flex-col items-start gap-6 mb-[54px]">
      <div className="flex p-3 justify-between items-center self-stretch rounded border border-[#EAEDF2] bg-white">
        <div className="flex justify-between items-center flex-[1_0_0]">
          <Link href="/dashboard/data">
            <button className="px-4 py-2 rounded border border-[#DEE8FA]">
              Cancel
            </button>
          </Link>
          <div className="flex items-center gap-3">
            {step > 1 && (
              <Link href={backHref} className="px-4 py-2 rounded bg-[#DEE8FA]">
                Back
              </Link>
            )}
            <Link
              href={nextHref}
              onClick={() => handleUpdate()}
              className={`px-4 py-2 rounded bg-primary text-white ${
                nextDisabled && "opacity-50 pointer-events-none"
              }`}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
