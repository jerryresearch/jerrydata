"use client";

import React from "react";

const Story = () => {
  return (
    <div className="border border-gray-200 w-full py-4 px-6 flex flex-col gap-4">
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-4">
          <span>Date | Time</span>
          <p>
            Electronics sales spiked in November and December across all
            regions, likely driven by holiday shopping. The increase was
            particularly notable in North America, with sales volume in December
            being 75% higher than the monthly average for the year.
          </p>
          <span>Positive | Negative</span>
        </div>
        <div className="flex">
          <div className="flex-1">Chart</div>
          <div className="self-start">
            <input type="checkbox" name="" id="" />
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div>Download as PNG | Social Share as PNG | Comments</div>
        <div>Ask Jerry</div>
        <div>Good Story | Bad Story</div>
      </div>
    </div>
  );
};

export default Story;
