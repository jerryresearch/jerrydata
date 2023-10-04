import Button from "./Button";

const Footer = () => {
  return (
    <div className="flex px-7 flex-col items-start gap-6 pb-4">
      <div className="flex p-3 justify-between items-center self-stretch rounded border border-[#EAEDF2] bg-white">
        <div className="flex justify-between items-center flex-[1_0_0]">
          <button className="px-4 py-2 rounded border border-[#DEE8FA]">
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded bg-[#DEE8FA]">Back</button>
            <button className="px-4 py-2 rounded bg-blue-500 text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
