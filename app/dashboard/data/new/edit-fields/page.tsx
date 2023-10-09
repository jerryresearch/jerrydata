"use client";

import EditFields from "@/components/EditFields";
import React from "react";

const Page = () => {
  const currentStep = 4;
  return (
    <div className="bg-[#F6F8FA] min-h-screen">
      <EditFields />
    </div>
  );
};

export default Page;
