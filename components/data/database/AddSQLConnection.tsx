"use client";

import createDataset from "@/lib/datasets/postgresql/createDataset";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Footer from "../../Footer";

type Props = {
  dataset?: Dataset;
  id?: string;
  userId: string;
  type: string;
};

const AddSQLConnection = ({ dataset, id, userId, type }: Props) => {
  const currentStep = 2;

  const [connString, setConnString] = useState(dataset?.sql?.connString || "");
  const [host, setHost] = useState(dataset?.sql?.host || "");
  const [port, setPort] = useState(dataset?.sql?.port || "");
  const [database, setDatabase] = useState(dataset?.sql?.database || "");
  const [user, setUser] = useState(dataset?.sql?.user || "");
  const [password, setPassword] = useState(dataset?.sql?.password || "");

  const router = useRouter();

  const handleBack = () => {
    if (id) {
      router.push(`connection-type?id=${id}`);
    } else {
      router.push(`connection-type`);
    }
  };

  const handleNext = async () => {
    try {
      const res = await createDataset(userId, {
        datatype: type,
        host,
        port,
        database,
        user,
        password,
        connString,
      });
      console.log(res);
      console.log(res.message);
      router.push(`select-table?id=${res.dataset._id}`);
    } catch (error) {
      console.log("error in updating dataset");
      alert("error updating");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      {/* <Header currentStep={currentStep} /> */}
      <div className="flex-1">
        <div className="flex gap-4 items-center self-stretch py-10 px-7 text-[#17212F]">
          <label className="text-sm font-medium min-w-[120px]">
            Connection String
          </label>
          <input
            type="text"
            value={connString}
            onChange={(e) => {
              setConnString(e.target.value);
            }}
            className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
          />
        </div>
        <div className="flex items-center">
          <div className="h-px mx-7 border border-gray-300 flex-1"></div>
          <span className="text-gray-300">OR</span>
          <div className="h-px mx-7 border border-gray-300 flex-1"></div>
        </div>
        <section className="flex items-start gap-[60px] py-10 px-7 text-[#17212F]">
          <div className="flex flex-col gap-6 items-start w-[500px] flex-shrink-0">
            <div className="flex items-center self-stretch gap-4">
              <label className="text-sm font-medium w-[120px]">Host</label>
              <input
                type="text"
                value={host}
                onChange={(e) => {
                  setHost(e.target.value);
                }}
                className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
              />
            </div>
            <div className="flex items-center gap-4 self-stretch">
              <label className="text-sm font-medium w-[120px]">Port</label>
              <input
                type="text"
                value={port}
                onChange={(e) => {
                  setPort(e.target.value);
                }}
                className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
              />
            </div>
            <div className="flex items-center gap-4 self-stretch">
              <label className="text-sm font-medium w-[120px]">Database</label>
              <input
                type="text"
                value={database}
                onChange={(e) => {
                  setDatabase(e.target.value);
                }}
                className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
              />
            </div>

            <div className="flex items-center self-stretch gap-4">
              <label className="text-sm font-medium w-[120px]">Username</label>
              <input
                type="text"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
              />
            </div>
            <div className="flex items-center gap-4 self-stretch">
              <label className="text-sm font-medium w-[120px]">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="flex flex-[1_0_0] items-center py-[14px] px-3 rounded border border-[#EAEDF2] bg-white"
              />
            </div>
          </div>
        </section>
      </div>
      <Footer
        step={currentStep}
        nextDisabled={
          !connString && (!host || !port || !database || !user || !password)
        }
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default AddSQLConnection;
