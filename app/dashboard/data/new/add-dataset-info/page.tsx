"use client";

import AddDatasetInfo from "@/components/AddDatasetInfo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Page = () => {
  const currentStep = 5;
  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <div className="flex-1">
        <AddDatasetInfo />
      </div>
      <Footer
        step={currentStep}
        nextHref="/dashboard/data"
        backHref="edit-fields"
        nextDisabled={false}
      />
    </div>
  );
};

export default Page;
