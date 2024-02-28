import Image from "next/image";
import Link from "next/link";

const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-[6px] bg-white border border-[#EEEEFF]">
      <div className="md:w-[519px] flex flex-col text-center text-[#080D19] gap-2">
        <p className="font-medium text-2xl">Fetching your data...</p>
        <p className="text-[#61656C]">
          We&apos;re analyzing your data from the source you&apos;ve just
          connected. New narratives will be added to the feed soon.
        </p>
      </div>

      <Link
        href={"/u/connectors/new/connection-type"}
        className="flex items-center gap-2 bg-primary px-4 py-2 rounded w-[203px] text-white"
      >
        <Image
          src="/assets/connectors-white.svg"
          alt="connectors icon"
          width={20}
          height={20}
        />
        <span>Connect Your Data</span>
      </Link>
    </div>
  );
};

export default EmptyPage;
