import Image from "next/image";

const Loading = () => {
  return (
    <section>
      <div className=" py-5 px-[60px] flex items-center justify-between border-b border-[#EEEEFF]">
        <h1 className="font-medium text-2xl">Dashboards</h1>
        <div className="flex gap-4">
          <div className="flex px-2 gap-2 items-center border border-[#EEEEFF] w-[340px] h-[42px] rounded-[6px]">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              name="search"
              placeholder="Search Data"
              className="focus:outline-none"
            />
          </div>
          <button className="flex gap-[6px] items-center bg-[#F1F1F1] py-1 px-[14px] h-[42px] rounded-[6px]">
            <Image
              src="/assets/magic-dashboard.svg"
              alt="magic dashboard"
              width={20}
              height={20}
            />
            <span className="font-medium text-[#61656C]">Magic Dashboard</span>
          </button>
          <button className="flex gap-[6px] items-center bg-primary py-1 px-[14px] h-[42px] rounded-[6px]">
            <Image
              src="/assets/plus-icon.svg"
              alt="add report"
              width={20}
              height={20}
            />
            <span className="font-medium text-white">New Dashboard</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 py-5 px-[60px] items-center gap-5 justify-between">
        {Array(4)
          .fill(0)
          .map((report, index) => (
            <div
              key={index}
              className="flex shadow-custom p-6 rounded-[6px] items-start justify-between gap-1 h-full"
            >
              <div className="flex flex-col gap-[10px] justify-start w-4/5">
                <div className="text-xl font-medium">
                  <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                    h
                  </p>
                </div>
                <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                  h
                </p>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Loading;
