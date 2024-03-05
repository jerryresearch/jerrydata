import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <section className="pb-8 md:pb-0 px-5 md:px-0 max-w-[968px] mx-auto mt-10">
      <div className="flex w-full rounded-[6px] items-center justify-between h-[144px] border border-[#EEEEFF]">
        <div className="p-5 md:p-0 md:pl-8 flex flex-col gap-1 max-w-[519px] -tracking-[1%]">
          <p className="animate-pulse w-[166px] h-[38px] bg-slate-200 rounded"></p>
          <p className="animate-pulse w-[519px] h-[24px] bg-slate-200 rounded"></p>
          <p className="animate-pulse w-[519px] h-[24px] bg-slate-200 rounded"></p>
        </div>
        <Image
          src="/assets/nav-icon.svg"
          alt="icon"
          width={138}
          height={144}
          className="hidden md:block"
        />
      </div>

      <section className="text-[#080D19] flex flex-col gap-6 mt-6">
        {/* <Carousel
        className="flex flex-col gap-6"
        opts={{
          align(viewSize, snapSize, index) {
            return 1;
          },
        }}
      >
        <div className="flex justify-between">
          <h1 className="font-medium text-xl">KPI Stories</h1>
          <div className="flex gap-[20px]">
            <CarouselPrevious variant="ghost" />
            <CarouselNext variant="ghost" />
          </div>
        </div>
        <CarouselContent>
          {kpis.map((kpi, index) => (
            <CarouselItem key={index} className="lg:basis-1/4">
              <KPIStory type={kpi} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel> */}
        {/* <div className="bg-[#EEEEFF] h-px"></div> */}
        <section className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div className="w-full md:w-[298px] h-[42px] py-2 px-3 rounded border border-[#EEEEFF]">
            <p className="animate-pulse w-full h-full bg-slate-200 rounded"></p>
          </div>
          <div className="flex gap-4">
            <button className="flex h-[42px] rounded-[6px] gap-[6px] items-center px-5 bg-[#F1F1F1] font-medium">
              <Image
                src="/assets/refresh.svg"
                alt="chevron down icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <span className="text-[#61656C] font-medium text-sm md:text-base">
                Refresh
              </span>
            </button>
            <button className="flex bg-primary text-white rounded items-center px-4 py-2 h-[42px] gap-2">
              <Image
                src="/assets/story-book.svg"
                alt="chevron down icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <span className="text-sm md:text-base">Download Storybook</span>
            </button>
          </div>
        </section>
        <section id="stories-container">
          <div>
            <div className="font-medium text-xl h-[28px] w-[156px]">
              <p className="animate-pulse w-full h-full bg-slate-200 rounded"></p>
            </div>
            <div className="flex flex-col gap-6 my-6">
              <div className="w-full h-[344px] flex flex-col md:flex-row gap-4 md:gap-10 border border-[#EEEEFF] rounded-[6px] px-8 text-[#080D19]">
                <div className="md:w-1/2 flex flex-col gap-5 justify-center py-6">
                  <div className="text-[#A9AAAE] text-sm h-5">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded"></p>
                  </div>
                  <div className="text-[#61656C] flex-1">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded"></p>
                  </div>
                  <div className="flex gap-2 items-center w-full rounded h-[36px]">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded"></p>
                  </div>

                  <div className="flex gap-4 underline w-[208px]">
                    <span className="cursor-pointer animate-pulse flex-1"></span>
                    <span className="animate-pulse flex-1"></span>
                  </div>
                </div>
                <div className="hidden md:block w-px bg-[#EEEEFF]"></div>
                <div className="md:w-1/2 py-6 h-full">
                  <p className="animate-pulse w-full h-full bg-slate-200 rounded"></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Loading;
