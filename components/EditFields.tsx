import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const rows = [
  { number: 1, image: "/assets/globe.svg", name: "Region" },
  { number: 2, image: "/assets/globe.svg", name: "Country" },
  { number: 3, image: "/assets/calendar.svg", name: "Order date" },
  { number: 4, image: "/assets/text-type.svg", name: "Sales channel" },
  { number: 5, image: "/assets/digit-type.svg", name: "Unit Cost" },
];

const fields = {
  "Column Type": ["Attribute", "Measure"],
  "Default Aggregate": [
    "No Aggregate",
    "Average",
    "Count",
    "Max",
    "Median",
    "Min",
    "Standard Deviation",
    "Sum",
    "Unique Count",
    "Variance",
  ],
  "Date Field Type": ["None", "Year", "Date"],
  "Geo Field Type": [
    "None",
    "Street address",
    "Country code (3 letters)",
    "Country code (2 letters)",
    "Country name",
    "City code",
    "City name",
    "GPS",
    "Metro Code",
    "Metro Name",
    "Sub continent code",
    "Sub continent name",
    "State code",
    "Zip code",
  ],
};

const EditFields = () => {
  const disabled = false;
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
        <thead>
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
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="flex items-start self-stretch text-sm text-[#17212F] font-medium"
            >
              <td className="flex items-center justify-center gap-2 w-[50px] py-5">
                {row.number}
              </td>
              <td className="flex items-center gap-[11px] w-[240px] p-5">
                <Image src={row.image} width={20} height={20} alt={row.name} />
                {row.name}
              </td>
              {Object.keys(fields).map((field, ind) => (
                <td key={ind}>
                  <Popover>
                    <div className="flex items-center justify-between w-[220px] p-5">
                      <span className={`${disabled && "text-[#ADB3BB]"}`}>
                        {/* @ts-ignore */}
                        {fields[field][0]}
                      </span>
                      <PopoverTrigger>
                        {disabled ? (
                          <Image
                            src="/assets/chevron-down-disabled.svg"
                            alt="chevron down icon"
                            width={16}
                            height={16}
                          />
                        ) : (
                          <Image
                            src="/assets/chevron-down.svg"
                            alt="chevron down icon"
                            width={16}
                            height={16}
                          />
                        )}
                      </PopoverTrigger>
                    </div>
                    <PopoverContent className="w-fit min-w-[122px] p-0 shadow-[0px_2px_4px_-2px_rgba(0, 0, 0, 0.06)_0px_4px_8px_-2px_rgba(0, 0, 0, 0.10)] bg-white rounded">
                      <ul className="text-sm font-normal p-2 flex flex-col items-start">
                        {/* @ts-ignore */}
                        {fields[field].map((val, index) => (
                          <li
                            key={index}
                            className="flex gap-2 items-center w-fit px-3 py-[6px] cursor-pointer hover:bg-[#F8FAFC] rounded"
                          >
                            {val}
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                </td>
              ))}
              <td className="flex items-center gap-2 w-[120px] p-5">
                <Switch />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-between items-center pl-1 py-2">
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

export default EditFields;
