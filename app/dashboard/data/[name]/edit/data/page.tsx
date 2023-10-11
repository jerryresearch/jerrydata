import Image from "next/image";
import React from "react";

const page = () => {
  const rows = [
    {
      orderId: "CA-2016-152156",
      orderDate: "2020-11-08",
      shipDate: "2020-11-09",
      shipMode: "Second Class",
      customerId: "CG-12520",
      customerName: "Claire Gute",
      segment: "Claire Gute",
      city: "Henderson",
      state: "Kentucky",
    },
    {
      orderId: "CA-2016-152156",
      orderDate: "2020-11-08",
      shipDate: "2020-11-09",
      shipMode: "Second Class",
      customerId: "CG-12520",
      customerName: "Claire Gute",
      segment: "Claire Gute",
      city: "Henderson",
      state: "Kentucky",
    },
    {
      orderId: "CA-2016-152156",
      orderDate: "2020-11-08",
      shipDate: "2020-11-09",
      shipMode: "Second Class",
      customerId: "CG-12520",
      customerName: "Claire Gute",
      segment: "Claire Gute",
      city: "Henderson",
      state: "Kentucky",
    },
    {
      orderId: "CA-2016-152156",
      orderDate: "2020-11-08",
      shipDate: "2020-11-09",
      shipMode: "Second Class",
      customerId: "CG-12520",
      customerName: "Claire Gute",
      segment: "Claire Gute",
      city: "Henderson",
      state: "Kentucky",
    },
    {
      orderId: "CA-2016-152156",
      orderDate: "2020-11-08",
      shipDate: "2020-11-09",
      shipMode: "Second Class",
      customerId: "CG-12520",
      customerName: "Claire Gute",
      segment: "Claire Gute",
      city: "Henderson",
      state: "Kentucky",
    },
  ];
  return (
    <section>
      <section className="flex px-7 py-5 items-center gap-[10px] bg-[#F6F8FA]">
        <section className="w-full overflow-x-auto p-5 rounded border border-[#EAEDF2] bg-white">
          <table className="w-full table-auto min-w-max text-left">
            <thead>
              <tr className="bg-[#F6F8FA]">
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  Order ID
                </th>
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  Order Date
                </th>
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  Ship Date
                </th>
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  Ship Mode
                </th>
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  Customer ID
                </th>
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  Customer Name
                </th>
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  Segment
                </th>
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  City
                </th>
                <th className="text-[#17212F] rounded bg-[F8FAFC] font-medium px-[10px] py-5 gap-2">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.orderId}
                  </td>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.orderDate}
                  </td>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.shipDate}
                  </td>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.shipMode}
                  </td>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.customerId}
                  </td>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.customerName}
                  </td>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.segment}
                  </td>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.city}
                  </td>
                  <td className="text-[#17212F]  px-[10px] py-5 gap-2 font-medium border-b border-b-[#EAEDF2]">
                    {row.state}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
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

export default page;
