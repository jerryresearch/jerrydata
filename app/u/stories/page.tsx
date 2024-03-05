import EmptyPage from "@/components/stories/EmptyPage";
import Stories from "@/components/stories/Stories";
import getDatasets from "@/lib/getDatasets";
import getStories from "@/lib/stories/getStories";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const session: any = await getServerSession(authOptions);
  const userId = session?.user?._id || session?.user?.id;
  const name = session?.user?.name;
  const generatingStories = session?.user?.generatingStories;

  const datasetsData: Promise<Dataset[]> = getDatasets(userId);
  const storiesData: Promise<Story[]> = getStories(userId);

  const stories = await storiesData;
  const datasets = await datasetsData;

  return (
    <section className="pb-8 md:pb-0 px-5 md:px-0 max-w-[968px] mx-auto mt-10">
      <div className="flex w-full rounded-[6px] items-center justify-between h-[144px] border border-[#EEEEFF]">
        <div className="p-5 md:p-0 md:pl-8 flex flex-col gap-1 max-w-[519px] -tracking-[1%]">
          <h1 className="font-medium text-2xl">Hello, {name.split(" ")[0]}.</h1>
          <p className="text-[#61656C] leading-6">
            Electronics sales spiked in November and December across all
            regions, likely driven by holiday shopping.
          </p>
        </div>
        <Image
          src="/assets/nav-icon.svg"
          alt="icon"
          width={138}
          height={144}
          className="hidden md:block"
        />
      </div>

      {/* Stories */}
      <section className="mt-6">
        {/* {stories.length == 0 ? (
          <EmptyPage generatingStories={generatingStories} />
        ) : (
          <Stories datasets={datasets} stories={stories} />
        )} */}
        <EmptyPage generatingStories={false} />
      </section>
    </section>
  );
};

export default Page;
