import Pagination from "@/components/Pagination";
import Data from "@/components/data/Data";
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
      <Data records={rows} />
      <Pagination />
    </section>
  );
};

export default page;
