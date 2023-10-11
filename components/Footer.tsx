import Link from "next/link";

type Props = {
  step: number;
  onNext: () => void;
  onBack: () => void;
};

const links = [
  { next: "upload-file", back: "/dashboard/data" },
  { next: "select-table", back: "connection-type" },
  { next: "edit-fields", back: "upload-file" },
  { next: "add-dataset-info", back: "select-table" },
  { next: "/dashboard/data", back: "edit-fields" },
];

const Footer = ({ step, onNext, onBack }: Props) => {
  return (
    <div className="fixed bottom-[12px] left-16 right-7 flex px-7 flex-col items-start gap-6 pb-[54px]">
      <div className="flex p-3 justify-between items-center self-stretch rounded border border-[#EAEDF2] bg-white">
        <div className="flex justify-between items-center flex-[1_0_0]">
          <Link href="/dashboard/data">
            <button className="px-4 py-2 rounded border border-[#DEE8FA]">
              Cancel
            </button>
          </Link>
          <div className="flex items-center gap-3">
            {step > 1 && (
              <Link
                href={links[step - 1].back}
                onClick={onBack}
                className="px-4 py-2 rounded bg-[#DEE8FA]"
              >
                Back
              </Link>
            )}
            <Link
              href={links[step - 1].next}
              onClick={onNext}
              className="px-4 py-2 rounded bg-primary text-white"
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
