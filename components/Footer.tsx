import Link from "next/link";

type Props = {
  step: number;
  nextDisabled: boolean;
  handleBack: () => void;
  handleNext: () => void;
};

const Footer = ({ step, nextDisabled, handleBack, handleNext }: Props) => {
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
              <button
                onClick={() => handleBack()}
                className="px-4 py-2 rounded bg-[#DEE8FA]"
              >
                Back
              </button>
            )}
            <button
              onClick={() => handleNext()}
              className={`px-4 py-2 rounded bg-primary text-white ${
                nextDisabled && "opacity-50 pointer-events-none"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
