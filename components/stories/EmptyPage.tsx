"use client";

import Image from "next/image";
import Link from "next/link";
import lottie from "lottie-web";
import { useEffect, useRef } from "react";

type Props = {
  generatingStories: boolean;
};

const EmptyPage = ({ generatingStories }: Props) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      // @ts-ignore
      container: animationContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: generatingStories
        ? "/assets/stories_loader.json"
        : "/assets/connect_loader.json",
    });
  }, [generatingStories]);

  if (generatingStories) {
    return (
      <div className="flex flex-col items-center gap-6 p-8 rounded-[6px] bg-white border border-[#EEEEFF]">
        <div className="md:w-[519px] flex flex-col items-center text-center text-[#080D19] gap-2">
          <div className="w-12 h-12 rounded-full bg-[#fafafa] flex items-center justify-center">
            <div ref={animationContainer} className="w-6 h-6 opacity-50"></div>
          </div>
          <p className="font-medium text-2xl">
            Sit Tight! Your Stories Are Brewing.
          </p>
          <p className="text-[#61656C]">
            Feel free to carry on with your tasks for now! Check back after a
            while, and your stories will be ready for you to dive right into.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-8 rounded-[6px] bg-white border border-[#EEEEFF]">
      <div className="md:w-[519px] flex flex-col items-center text-center text-[#080D19] gap-2">
        <div className="w-12 h-12 rounded-full bg-[#fafafa] flex items-center justify-center">
          <div ref={animationContainer} className="w-6 h-6 opacity-50"></div>
        </div>
        <p className="font-medium text-2xl">
          Connect a Source for Fresh Stories
        </p>
        <p className="text-[#61656C]">
          We&apos;re gearing up to generate new stories for you! Connect a
          source now to unlock a stream of fresh insights.
        </p>
      </div>

      <Link
        href={"/u/connectors/new/connection-type"}
        className="flex items-center gap-2 bg-primary px-4 py-2 rounded w-[203px] text-white"
      >
        <Image
          src="/assets/connectors-white.svg"
          alt="connectors icon"
          width={20}
          height={20}
        />
        <span>Connect Your Data</span>
      </Link>
    </div>
  );
};

export default EmptyPage;
