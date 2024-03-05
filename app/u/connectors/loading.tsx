import Image from "next/image";

const Loading = () => {
  return (
    <section className="text-sm py-6 px-[60px] text-[#080D19]">
      <h1 className="font-medium text-2xl">Connectors</h1>
      <div className="h-[90px] py-6">
        <div className="flex w-full justify-between">
          <div className="flex gap-2 border border-[#EEEEFF] rounded-[6px] h-[42px] w-[380px] px-2 py-[10px]">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input
              type="text"
              placeholder="Search Data"
              className="focus:outline-none flex-1"
            />
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
              <span className="text-[#61656C] font-medium">Refresh</span>
            </button>
            <button className="flex bg-primary text-white rounded items-center px-4 py-2 h-[42px] gap-2">
              <Image
                src="/assets/plus-icon.svg"
                alt="add connection icon"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <span className="font-medium">New Connection</span>
            </button>
          </div>
        </div>
      </div>
      <div className="rounded border border-[#EEEEFF]">
        <table className="w-full table-auto min-w-max text-left rounded text-[#080D19]">
          {/* row */}
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-[#EEEEFF] font-medium">
              <th className="p-5 font-medium">Name</th>
              <th className="p-5 font-medium">Datatype</th>
              <th className="p-5 font-medium">Size</th>
              <th className="p-5 font-medium">Rows</th>
              <th className="p-5 font-medium">Columns</th>
              <th className="flex justify-between p-5 font-medium">
                <span>Last Load</span>
                <Image
                  src="/assets/chevron-down.svg"
                  alt="down icon"
                  width={20}
                  height={20}
                />
              </th>
              <th className="p-5 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array(4)
              .fill(0)
              .map((row, index) => (
                <tr
                  key={index}
                  className="rounded border-b border-[#EEEEFF] font-medium"
                >
                  <td className="p-5">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-5">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-5">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-5">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-5">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-5">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                  <td className="p-5">
                    <p className="animate-pulse w-full h-full bg-slate-200 rounded text-slate-200">
                      h
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Loading;
