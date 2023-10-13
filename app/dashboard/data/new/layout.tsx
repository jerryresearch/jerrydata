"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="flex flex-col h-screen bg-[#F6F8FA]">
      <Header currentStep={currentStep} />
      {children}
      <Footer step={currentStep} onNext={handleNext} onBack={handleBack} />
    </section>
  );
};

export default Layout;
