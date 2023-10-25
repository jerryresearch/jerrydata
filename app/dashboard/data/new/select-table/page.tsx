"use client";

import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import getDataset from "@/lib/getDataset";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const currentStep = 3;
  const searchParams = useSearchParams();

  const { data: session } = useSession();
  // @ts-ignore
  const userId = session?.user?._id || session?.user?.id;

  const id = searchParams.get("id") || "";
  const [dataset, setDataset] = useState<any>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const ds = await getDataset(userId, id);
      setDataset(ds);
      setHeaders(ds?.headers);
    };

    setIsLoading(true);
    fetchData();
    setIsLoading(false);
  }, [id, userId]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <div className="flex-1">
        <section className="px-7 py-10 flex items-start gap-[60px]">
          <div className="flex flex-col items-start gap-6">
            <div className="flex justify-center items-center gap-[10px]">
              <p className="font-medium text-[15px] leading-[21px]">
                Available Tables
              </p>
              <div className="px-2 w-[380px] flex flex-col items-start gap-[10px] self-stretch rounded border border-[#EAEDF2] bg-white">
                <div className="flex py-[10px] px-2 items-center gap-2 self-stretch">
                  <Image
                    src="/assets/search-icon.svg"
                    alt="search"
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    placeholder="Search by name"
                    className="text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex px-[10px] py-[14px] w-[506px] max-h-80 overflow-y-auto justify-between items-start self-stretch rounded border border-[#EAEDF2] bg-white">
              <div className="flex flex-col items-start w-[382px]">
                {/* {Object.keys(tables).map((table, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start w-[382px] gap-[14px]"
                  > */}
                <div className="flex px-2 flex-col items-start">
                  <div className="py-2 flex justify-center items-center gap-[10px] self-stretch">
                    <Image
                      src="/assets/chevron-down.svg"
                      alt="down icon"
                      width={20}
                      height={20}
                      onClick={() => setExpanded(!expanded)}
                      className={`cursor-pointer transition duration-500 ${
                        expanded ? "rotate-0" : "-rotate-90"
                      }`}
                    />
                    <div className="flex items-center justify-center gap-[10px]">
                      <input type="checkbox" checked name="name" id="name" />
                      <label htmlFor="name" className="text-sm">
                        {dataset?.name}
                      </label>
                    </div>
                  </div>
                </div>
                <ul
                  className={`flex flex-col items-start gap-[10px] px-[54px] list-none  transition-all duration-500 ease-in-out overflow-y-hidden max-h-0 ${
                    expanded && "max-h-screen"
                  }`}
                >
                  {headers?.map((header, index) => (
                    <li
                      key={index}
                      className="py-2 flex items-center justify-center gap-[10px]"
                    >
                      <input
                        type="checkbox"
                        checked
                        name="Worksheet"
                        id={header}
                      />
                      <label htmlFor={header} className="text-sm">
                        {header}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              {/* ))} */}
              {/* </div> */}
            </div>
          </div>
        </section>
      </div>
      <Footer
        step={currentStep}
        nextHref={`edit-fields?id=${id}`}
        backHref={`upload-file?id=${id}&type=${dataset?.datatype}`}
        nextDisabled={false}
      />
    </div>
  );
};

export default Page;
