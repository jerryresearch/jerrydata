"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import autogenerateQuestions from "@/lib/datasets/autogenerateQuestions";
import Loading from "./Loading";
import generateStories from "@/lib/datasets/generateStories";
import Header from "./data/Header";

type Props = {
  dataset: Dataset;
  id: string;
  userId: string;
};

const AutoGenerate = ({ id, userId, dataset }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);
  const [generateStory, setGenerateStory] = useState(false);

  const router = useRouter();

  const handleBack = () => {
    router.push(`add-dataset-info?id=${id}`);
  };

  const handleNext = async () => {
    try {
      setIsLoading(true);
      if (generateReport) {
        const response = await autogenerateQuestions(userId, id);
        console.log(response.message);
        console.log(response.responseMessage);
      }
      if (generateStory) {
        const response = await generateStories(userId, id);
        console.log(response.stories);
        console.log(response.messages);
      }
      router.push("/home/connectors");
      router.refresh();
    } catch (error) {
      console.log("error in updating dataset");
      alert("error updating");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <Header
        step={6}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      />
      <section className="md:px-[60px] md:pt-32 py-8 px-5 md:pb-6 flex flex-col gap-6 text-[#080D19]">
        <h1 className="font-medium text-2xl">Make Connection</h1>
        <div className="flex gap-6 items-center">
          <div className="flex gap-[10px] border border-[#EEEEFF] items-center py-4 px-5 rounded-[6px]">
            <input
              type="checkbox"
              name="questions"
              id="questions"
              checked={generateReport}
              onChange={() => setGenerateReport(!generateReport)}
              className="mb-1 accent-primary"
            />
            <label className="pb-1" htmlFor="questions">
              Do you want to generate dashboard with this datasheet ?
            </label>
          </div>
          <div className="flex gap-[10px] border border-[#EEEEFF] items-center py-4 px-5 rounded-[6px]">
            <input
              type="checkbox"
              name="stories"
              id="stories"
              checked={generateStory}
              onChange={() => setGenerateStory(!generateStory)}
              className="mb-1 accent-primary"
            />
            <label className="pb-1" htmlFor="stories">
              Do you want to generate stories with this datasheet ?
            </label>
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

export default AutoGenerate;
