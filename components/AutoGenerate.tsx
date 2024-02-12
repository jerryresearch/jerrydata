"use client";

import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRouter } from "next/navigation";
import autogenerateQuestions from "@/lib/datasets/autogenerateQuestions";
import Loading from "./Loading";
import generateStories from "@/lib/datasets/generateStories";

type Props = {
  dataset: Dataset;
  id: string;
  userId: string;
};

const AutoGenerate = ({ id, userId, dataset }: Props) => {
  const currentStep = 6;
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
      // router.push("/dashboard/data");
      // router.refresh();
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
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <div className="flex-1">
        <section className="flex flex-col items-start gap-6 py-10 px-7 text-[#17212F]">
          <div className="flex gap-4 items-center py-5">
            <input
              type="checkbox"
              name="questions"
              id="questions"
              checked={generateReport}
              onChange={() => setGenerateReport(!generateReport)}
            />
            <label className="text-sm font-medium pb-1" htmlFor="questions">
              Do you want to generate Dashboard with this dataset?
            </label>
          </div>
          <div className="flex items-center self-stretch gap-4">
            <input
              type="checkbox"
              name="stories"
              id="stories"
              checked={generateStory}
              onChange={() => setGenerateStory(!generateStory)}
            />
            <label className="text-sm font-medium pb-1" htmlFor="stories">
              Do you want to generate Stories with this dataset?
            </label>
          </div>
        </section>
      </div>
      <Footer
        step={currentStep}
        nextDisabled={false}
        handleBack={handleBack}
        handleNext={handleNext}
      />
    </div>
  );
};

export default AutoGenerate;
