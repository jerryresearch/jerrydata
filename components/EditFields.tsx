import Image from "next/image";

const EditFields = () => {
  return (
    <section className="flex flex-col items-start gap-7 py-4 px-7">
      {/* search */}
      <div className="w-[380px] h-[40px]">
        <div className="flex flex-col items-start gap-[10px] w-full pr-[100px] pl-2 rounded border border-[#EAEDF2] bg-white">
          <div className="flex items-center self-stretch gap-2 py-[10px] px-2">
            <Image
              src="/assets/search-icon.svg"
              alt="search icon"
              width={16}
              height={16}
            />
            <input type="text" placeholder="Search Data" className="text-sm" />
          </div>
        </div>
      </div>
      {/* table */}
      <table className="flex flex-col items-start self-stretch p-5 rounded border border-[#EAEDF2] bg-white">
        {/* row */}
        <tr className="flex items-start self-stretch rounded bg-[#F8FAFC]">
          <th className="flex items-center justify-center gap-2 w-[50px] py-5 text-sm text-[#17212F]">
            NP
          </th>
          <th className="flex items-center gap-2 w-[240px] p-5 text-sm text-[#17212F]">
            Name
          </th>
          <th className="flex items-center justify-between w-[220px] p-5 text-sm text-[#17212F]">
            <span>Column Type</span>
            <Image
              src="/assets/info-icon.svg"
              alt="info"
              width={20}
              height={20}
            />
          </th>
          <th className="flex items-center justify-between w-[220px] p-5 text-sm text-[#17212F]">
            <span>Default Aggregate</span>
            <Image
              src="/assets/info-icon.svg"
              alt="info"
              width={20}
              height={20}
            />
          </th>
          <th className="flex items-center justify-between w-[220px] p-5 text-sm text-[#17212F]">
            <span>Default Field Type</span>
            <Image
              src="/assets/info-icon.svg"
              alt="info"
              width={20}
              height={20}
            />
          </th>
          <th className="flex items-center justify-between w-[220px] p-5 text-sm text-[#17212F]">
            <span>Default Geo Type</span>
            <Image
              src="/assets/info-icon.svg"
              alt="info"
              width={20}
              height={20}
            />
          </th>
          <th className="flex items-center gap-2 w-[120px] p-5 text-sm text-[#17212F]">
            Hidden
          </th>
        </tr>
      </table>
    </section>
  );
};

export default EditFields;
