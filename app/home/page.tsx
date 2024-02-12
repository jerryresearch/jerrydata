import EmptyPage from "@/components/stories/EmptyPage";
import Stories from "@/components/stories/Stories";
import getDatasets from "@/lib/getDatasets";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const name = session?.user?.name;

  const datasetsData: Promise<Dataset[]> = getDatasets(userId);
  const datasets = await datasetsData;
  const stories = ["hello"];

  return (
    <section className="max-w-[968px] h-10 mx-auto mt-10">
      <div className="flex w-full rounded-[6px] items-center justify-between h-[144px] border border-[#EEEEFF]">
        <div className="pl-8 flex flex-col gap-1 max-w-[519px] -tracking-[1%]">
          <h1 className="font-medium text-2xl">Hello, {name.split(" ")[0]}.</h1>
          <p className="text-[#61656C] leading-6">
            Electronics sales spiked in November and December across all
            regions, likely driven by holiday shopping.
          </p>
        </div>
        <Image src="/assets/nav-icon.svg" alt="icon" width={138} height={144} />
      </div>

      {/* Stories */}
      <section className="mt-6">
        {stories.length == 0 ? <EmptyPage /> : <Stories datasets={datasets} />}
      </section>
    </section>
  );
};

export default Page;
