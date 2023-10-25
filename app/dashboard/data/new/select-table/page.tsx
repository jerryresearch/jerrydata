"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TableSelection from "@/components/TableSelection";
import React from "react";

const Page = () => {
  const currentStep = 3;
  return (
    <div className="flex flex-col min-h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      <div className="flex-1">
        <TableSelection />
      </div>
      <Footer
        step={currentStep}
        nextHref="edit-fields"
        backHref="upload-file"
        nextDisabled={false}
      />
    </div>
  );
};

export default Page;
