import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import Filters from "@/components/data/Filters";
import Datasets from "@/components/data/Datasets";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import getDatasets from "@/lib/getDatasets";

const Page = async () => {
  const session: any = await getServerSession(authOptions);

  const datasetsData: Promise<Dataset[]> = getDatasets(
    session?.user?._id || session?.user?.id
  );

  const datasets = await datasetsData;
  const rows = [
    {
      image: "/assets/csv.svg",
      name: "Sample - Retail Orders",
      datatype: "CSV",
      size: "12 mb",
      rows: "11.7 k",
      columns: 21,
      lastLoad: "8 hours ago",
    },
    {
      image: "/assets/xls.svg",
      name: "Sample - Retail Orders",
      datatype: "CSV",
      size: "12 mb",
      rows: "11.7 k",
      columns: 21,
      lastLoad: "8 hours ago",
    },
  ];
  return (
    <section className="h-screen bg-[#F6F8FA] text-sm">
      <div className="px-7 py-5 border-b border-[#EAEDF2] flex justify-between items-center">
        <div className="flex items-center justify-between w-[423px] text-sm">
          <Filters />
          <div className="flex gap-2">
            <input type="checkbox" name="scheduled" id="scheduled" />{" "}
            <span>Scheduled</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" name="scheduled" id="scheduled" />{" "}
            <span>Has Load Errors</span>
          </div>
        </div>
        <div className="flex gap-3 rounded">
          <div className="flex gap-2 w-[380px] border border-[#EAEDF2] bg-white rounded pr-[100px] pl-2">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              placeholder="Search Data"
              className="px-2 py-[10px]"
            />
          </div>
          <Link href="data/new/connection-type" className="">
            <Button isLoading={false}>
              <div className="flex gap-[10px] w-[184px] h-10 py-2 px-4 items-center justify-center">
                <Image
                  src="/assets/plus-icon.svg"
                  width={24}
                  height={24}
                  alt="plus icon"
                />
                <span>Add New Dataset</span>
              </div>
            </Button>
          </Link>
        </div>
      </div>
      <section className="w-full px-7 py-4">
        <Datasets datasets={datasets} />
      </section>
      <div className="flex justify-between items-center px-7 py-2">
        <div className="text-[#ADB3BB]">Showing 1-2 of 2</div>
        <div className="p-[10px] flex justify-center items-center gap-[5px] rounded border border-[#EAEDF2] bg-white">
          <div className="py-[6px] px-3 bg-[#DEE8FA] cursor-pointer">1</div>
          <div className="py-[6px] px-3 cursor-pointer">2</div>
          <div className="py-[6px] px-3 cursor-pointer">
            <Image
              src="/assets/chevron-right.svg"
              alt="more"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
