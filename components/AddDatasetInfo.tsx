"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import updateDataset from "@/lib/datasets/updateDataset";
import Loading from "./Loading";
import Header from "./data/Header";

type Props = {
  dataset: Dataset;
  id: string;
  userId: string;
  type?: string;
};

const AddDatasetInfo = ({ id, userId, dataset, type }: Props) => {
  const [name, setName] = useState(dataset.name);
  const [description, setDescription] = useState(dataset.description);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleBack = () => {
    router.push(`edit-fields?id=${id}`);
  };

  const handleNext = async () => {
    if (isUpdated) {
      try {
        setIsLoading(true);
        const res = await updateDataset(userId, id, {
          name,
          description,
        });
        router.push(`auto-generate?id=${id}`);
        // const response = await autogenerateQuestions(userId, id);
        // console.log(response.message);
        // console.log(response.responseMessage);
      } catch (error) {
        console.log("error in updating dataset");
        alert("error updating");
      } finally {
        setIsLoading(false);
      }
    } else {
      router.push(`auto-generate?id=${id}`);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <Header
        step={5}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <section className="px-[60px] py-6 flex flex-col gap-6 text-[#080D19]">
        <h1 className="font-medium text-2xl">Add Info</h1>
        <div className="flex flex-col gap-6 items-start w-[420px] flex-shrink-0">
          <div className="flex flex-col gap-4 self-stretch">
            <label className="font-medium">
              <span className="text-[#D30A0A]">* </span>Connection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setIsUpdated(true);
                setName(e.target.value);
              }}
              className="h-[42px] py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 self-stretch">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => {
                setIsUpdated(true);
                setDescription(e.target.value);
              }}
              className="h-[120px] py-[14px] px-3 rounded-[6px] border border-[#EEEEFF] bg-white focus:outline-none"
            ></textarea>
          </div>
        </div>
      </section>
      {/* <Footer
        step={currentStep}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      /> */}
    </section>
  );
};

export default AddDatasetInfo;
