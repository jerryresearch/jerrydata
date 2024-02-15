import Image from "next/image";

type Props = {
  currentStep: number;
};

const Header = ({ currentStep }: Props) => {
  const steps = [
    { number: 1, title: "Connection Type" },
    { number: 2, title: "Upload File" },
    { number: 3, title: "Select Table" },
    { number: 4, title: "Edit fields" },
    { number: 5, title: "Add Dataset Info" },
    { number: 6, title: "Auto Generate" },
  ];
  return (
    <div className="sticky top-0 z-10 h-[49px] px-7 py-3 flex justify-between items-center bg-[#DEE8FA]">
      <p className="text-[#17212F] text-lg font-semibold">Add New Dataset</p>
      <div className="flex gap-6 items-center justify-center">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex items-start gap-[10px] text-[#17212F] text-sm font-medium"
          >
            <span
              className={`w-5 flex items-center justify-center self-stretch rounded ${
                step.number <= currentStep
                  ? "bg-[#2770EF] text-white"
                  : "bg-white"
              }`}
            >
              {step.number < currentStep ? (
                <Image
                  src="/assets/check-icon.svg"
                  alt="checked"
                  width={16}
                  height={16}
                />
              ) : (
                step.number
              )}
            </span>
            <span>{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
