"use client";

import createDataset from "@/lib/datasets/postgresql/createDataset";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Header from "../Header";

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
      router.push(`connection-type?id=${id}&type=${type}`);
    } else {
      router.push(`connection-type?type=${type}`);
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
      router.push(`select-table?id=${res.dataset._id}&type=${type}`);
    } catch (error) {
      console.log("error in updating dataset");
      alert("error updating");
    }
  };

  return (
    <section>
      <Header
        step={currentStep}
        nextDisabled={
          !connString && (!host || !port || !database || !user || !password)
        }
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <section className="md:px-[60px] md:pt-32 py-8 px-5 md:pb-6 flex flex-col gap-6 text-[#080D19]">
        <h1 className="font-medium text-2xl">Make Connection</h1>
        <p className="text-[#61656C] font-medium">
          Whitelist www.jerrydata.com before connecting to your database
        </p>
        <div className="w-[864px] flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <label className="font-medium">Connection String</label>
            <input
              type="text"
              value={connString}
              onChange={(e) => {
                setConnString(e.target.value);
              }}
              className="py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white focus:outline-none h-[42px]"
            />
          </div>
          <div className="flex items-center w-full gap-1">
            <div className="h-px bg-[#EEEEFF] flex-1"></div>
            <span className="text-[#A9AAAE] text-sm">OR</span>
            <div className="h-px bg-[#EEEEFF] flex-1"></div>
          </div>
          <section className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <label className="font-medium">Host</label>
              <input
                type="text"
                value={host}
                onChange={(e) => {
                  setHost(e.target.value);
                }}
                className="py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white h-[42px] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="font-medium">Username</label>
              <input
                type="text"
                value={user}
                onChange={(e) => {
                  setUser(e.target.value);
                }}
                className="py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white h-[42px] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="font-medium">Database</label>
              <input
                type="text"
                value={database}
                onChange={(e) => {
                  setDatabase(e.target.value);
                }}
                className="py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white h-[42px] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white h-[42px] focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-4">
              <label className="font-medium">Port</label>
              <input
                type="text"
                value={port}
                onChange={(e) => {
                  setPort(e.target.value);
                }}
                className="py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white h-[42px] focus:outline-none"
              />
            </div>
          </section>
        </div>
      </section>
    </section>
  );
};

export default AddSQLConnection;
