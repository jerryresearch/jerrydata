"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="2xl:flex justify-center items-center overflow-hidden tracking-tighter">
      {/* nav */}
      <div className="min-h-[4rem] flex items-center justify-center bg-white border-b border-[#d2d2ff80] fixed px-4 xs:px-16 top-0 w-full z-[1000]">
        <div className="flex items-center justify-between mx-auto max-w-7xl w-full h-full">
          <div onClick={scrollToTop} className="cursor-pointer">
            <Image src="/assets/logo.svg" width={140} height={26} alt="logo" />
          </div>
          <nav className="hidden lg:flex items-center gap-4">
            <a
              href="https://jerrydata.canny.io/"
              target="_blank"
              className="mr-4"
            >
              Roadmap
            </a>
            <a
              href="https://calendly.com/jerrydata/demo"
              target="_blank"
              className="border border-primary rounded-[8px] px-5 py-2 text-primary font-medium"
            >
              Book a Demo
            </a>
            <Link
              href="/user/register"
              className="bg-primary text-white font-medium rounded-[8px] px-5 py-2"
            >
              Get Started for Free
            </Link>
          </nav>
          {/* Mobile nav pending */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
            className="w-nav-button relative float-right text-lg lg:hidden cursor-pointer focus:outline-none"
          >
            <div
              className={`${
                isOpen ? "gap-0" : "gap-[6px]"
              } w-12 h-12 flex flex-col  justify-center items-center mr-[-0.5rem] pb-0 pr-0 transition-all duration-500`}
            >
              <div
                className={`${
                  isOpen ? "-rotate-45 translate-y-0.5" : ""
                } w-6 h-0.5 bg-primary transition-all duration-500`}
              ></div>
              <div
                className={`${
                  isOpen ? "w-0 h-0" : "w-6 h-0.5"
                } bg-primary transition-all duration-500`}
              ></div>
              <div
                className={`${
                  isOpen ? "rotate-45" : ""
                } w-6 h-0.5 bg-primary transition-all duration-500`}
              ></div>
            </div>
          </div>
          <div
            className={`${
              isOpen && "h-screen"
            } absolute overflow-hidden lg:hidden bg-white z-[100] top-16 bottom-16 h-0 w-screen left-0 px-6 pt-4 transition-all duration-500`}
          >
            <div className="py-[12px] text-lg">
              <a href="https://jerrydata.canny.io/" target="_blank">
                Roadmap
              </a>
            </div>
            <div className="flex flex-col mt-6 gap-4">
              <a
                href="https://calendly.com/jerrydata/demo"
                target="_blank"
                className="border border-primary rounded-[8px] px-5 py-2 text-primary font-medium text-center"
              >
                Book a Demo
              </a>
              <Link
                href="/user/register"
                className="bg-primary border border-primary text-white font-medium rounded-[8px] px-5 py-2 text-center"
              >
                Get Started for Free
              </Link>
            </div>
          </div>
        </div>
      </div>
      <main className="border-x border-[#d2d2ff80] max-w-7xl mx-4 xs:mx-8 lg:mx-16">
        <header className="bg-gradient-to-b from-white to-[#eeeeff] border-b border-[#d2d2ff80] relative overflow-hidden">
          <div className="flex flex-col items-center px-[5%] w-full max-w-7xl mx-auto mb-[-1.5rem] xs:mb-[-5rem] 2xl:mb-[-6rem] pt-28 md:pt-36">
            <div className="mb-12 md:mb-[4.5rem] lg:mb-20 text-center">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl w-full relative"
              >
                <div className="mb-3 md:mb-4">
                  <div className="bg-[#2d313b] rounded-[1rem] inline-block px-4 py-1 text-white">
                    <div className="text-sm">
                      We&apos;re in Public Free Beta 😍
                    </div>
                  </div>
                </div>
                <div className="mb-5 md:mb-6">
                  <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-[-2px] leading-[1.2]">
                    Uncover business insights through
                    <span className="protest text-primary font-normal tracking-[-3px] text-[2.7rem] md:text-[3.6rem]">
                      {"  "} stories.
                    </span>
                  </h1>
                </div>
                <p className="text-base md:text-lg tracking-tight">
                  Are you tired of drowning in data and struggling to find the
                  insights that matter? Say goodbye to endless visualizations
                  and hello to actionable stories that drive real results.
                </p>
                <div className="mt-6 md:mt-8">
                  <div className="flex justify-center flex-wrap items-center gap-4">
                    <Link
                      href="/user/register"
                      className="border border-primary bg-primary text-center text-white font-medium rounded-[0.5rem] px-6 py-3"
                    >
                      Get Started for Free
                    </Link>
                    <a
                      href="https://calendly.com/jerrydata/demo"
                      target="_blank"
                      className="border border-primary rounded-[0.5rem] px-6 py-3 text-primary font-medium"
                    >
                      Book a Demo
                    </a>
                  </div>
                </div>
                <Image
                  src="/static/images/underline.svg"
                  loading="eager"
                  width="162"
                  height="0"
                  style={{ height: "auto" }}
                  alt="underline"
                  className="hidden md:block underline absolute top-[11rem] right-[12.4rem]"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="z-[1] w-full h-full relative"
            >
              <Image
                src="/static/images/hero-mockup-1.webp"
                loading="eager"
                width="78"
                height={0}
                style={{ height: "auto" }}
                sizes="(max-width: 479px) 78vw, (max-width: 991px) 82vw, (max-width: 1439px) 81vw, 1150.5750732421875px"
                alt="app-mockup"
                className="w-full h-full overflow-clip"
              />
            </motion.div>
            <Image
              src="/static/images/bg-pattern-1.svg"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              loading="eager"
              alt="bg pattern"
              className="z-0 opacity-40 absolute bottom-4 xs:bottom-8 md:bottom-16 left-[0%] right-[0%] scale-110"
            />
          </div>
        </header>
        <section className="bg-white">
          <div className="border-b border-[rgba(210, 210, 255, 0.5)] px-[5%] py-16 md:py-24 lg:py-28 max-w-7xl w-full mx-auto">
            <div className="flex flex-col lg:grid grid-cols-2 auto-cols-[1fr] gap-x-12 lg:gap-x-16 gap-y-12 md:gap-y-20 items-center">
              <div className="">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-2"
                >
                  <div className="text-base text-primary font-medium">
                    Narrative Stories: Data That Speaks
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-5 md:mb-6"
                >
                  <h2 className="text-4xl md:text-[2.75rem] lg:text-5xl font-bold leading-[1.2] tracking-[-2px]">
                    Crafting
                    <span className="protest text-primary font-normal tracking-[-3px] text-[2.4rem] md:text-[3.4rem]">
                      {" "}
                      Stories{" "}
                    </span>
                    from Numbers
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-5 md:mb-6"
                >
                  <p className="text-base md:text-lg tracking-tight">
                    Uncover hidden trends and patterns effortlessly as Jerrydata
                    guides you through the story of your data. Say goodbye to
                    data overload and hello to actionable insights presented in
                    a clear and concise manner.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 py-2 auto-cols-[1fr] gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex"
                  >
                    <div className="flex-none self-start mr-4">
                      <div className="w-6 h-6 text-primary flex flex-col items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="6"
                            fill="#7371EE"
                          ></rect>
                          <path
                            d="M9.42535 15.5736L6.45106 12.5993C6.2908 12.439 6.07343 12.349 5.84678 12.349C5.62013 12.349 5.40276 12.439 5.24249 12.5993C5.08222 12.7596 4.99219 12.9769 4.99219 13.2036C4.99219 13.3158 5.01429 13.4269 5.05724 13.5306C5.10019 13.6343 5.16313 13.7285 5.24249 13.8079L8.82535 17.3907C9.15963 17.725 9.69963 17.725 10.0339 17.3907L19.1025 8.32216C19.2628 8.16189 19.3528 7.94452 19.3528 7.71787C19.3528 7.49122 19.2628 7.27385 19.1025 7.11358C18.9422 6.95332 18.7249 6.86328 18.4982 6.86328C18.2716 6.86328 18.0542 6.95332 17.8939 7.11358L9.42535 15.5736Z"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p>
                        Dive deep into your data without drowning in complexity.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex"
                  >
                    <div className="flex-none self-start mr-4">
                      <div className="w-6 h-6 text-primary flex flex-col items-center justify-center">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="24"
                            height="24"
                            rx="6"
                            fill="#7371EE"
                          ></rect>
                          <path
                            d="M9.42535 15.5736L6.45106 12.5993C6.2908 12.439 6.07343 12.349 5.84678 12.349C5.62013 12.349 5.40276 12.439 5.24249 12.5993C5.08222 12.7596 4.99219 12.9769 4.99219 13.2036C4.99219 13.3158 5.01429 13.4269 5.05724 13.5306C5.10019 13.6343 5.16313 13.7285 5.24249 13.8079L8.82535 17.3907C9.15963 17.725 9.69963 17.725 10.0339 17.3907L19.1025 8.32216C19.2628 8.16189 19.3528 7.94452 19.3528 7.71787C19.3528 7.49122 19.2628 7.27385 19.1025 7.11358C18.9422 6.95332 18.7249 6.86328 18.4982 6.86328C18.2716 6.86328 18.0542 6.95332 17.8939 7.11358L9.42535 15.5736Z"
                            fill="white"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p>
                        Gain valuable insights that drive meaningful decisions.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-[1rem] border border-[#eef]"
              >
                <Image
                  src="/static/images/story-1.webp"
                  width={700}
                  height={800}
                  loading="lazy"
                  alt="story"
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="border-b border-[rgba(210, 210, 255, 0.5)]">
          <div className="px-[5%] py-16 md:py-24 lg:py-28 w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="mb-12 md:mb-[4.5rem] lg:mb-20">
                <div className="text-center">
                  <div className="max-w-3xl relative w-full flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 md:mb-6"
                    >
                      <Image
                        src="/static/images/automagic-icon.webp"
                        loading="lazy"
                        width={80}
                        height={80}
                        alt="auto dashboard"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-3 md:mb-4"
                    >
                      <div className="text-base text-primary font-medium">
                        Instant Insights, Zero Effort
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 md:mb-6"
                    >
                      <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-[-2px] leading-[1.2]">
                        <span className="protest text-primary font-normal tracking-[-3px] text-[2.7rem] md:text-[3.6rem]">
                          Automagic{" "}
                        </span>
                        dashboards.
                      </h1>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-base md:text-lg tracking-tight"
                    >
                      Transform your data into dynamic visualizations with a
                      click. Jerrydata&#x27;s automagic dashboards deliver
                      instant insights without the hassle. Simplify your
                      analytics and make informed decisions effortlessly.
                      <br />
                    </motion.p>
                    <div className="mt-6 md:mt-8">
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center flex-wrap items-center gap-4"
                      >
                        <Link
                          href="/user/register"
                          className="border border-primary bg-primary text-center text-white font-medium rounded-[0.5rem] px-6 py-3"
                        >
                          Get Started for Free
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-[1rem] border border-[#eef]"
              >
                <Image
                  src="/static/images/auto-dashboard-1.webp"
                  width={0}
                  height={0}
                  loading="lazy"
                  sizes="(max-width: 479px) 77vw, (max-width: 991px) 82vw, (max-width: 1439px) 81vw, 1148.9749755859375px"
                  alt="auto-dashboard"
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="border-b border-[rgba(210, 210, 255, 0.5)]">
          <div className="px-[5%] py-16 md:py-24 lg:py-28 w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 auto-cols-[1fr] gap-6 md:gap-8">
              <div className="items-stretch flex flex-col lg:grid grid-cols-2 auto-cols-[1fr] gap-8 xs:gap-6 md:gap-8">
                <div className="flex overflow-hidden items-stretch flex-col rounded-[1rem] border border-[rgba(210, 210, 255, 0.5)]">
                  <div className="flex flex-col p-6 md:p-8 lg:p-12 flex-1 justify-start">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-2"
                      >
                        <div className="text-primary font-medium text-base">
                          Explainable AI
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-5 md:mb-6"
                      >
                        <h3 className="text-[2rem] md:text-4xl lg:text-[2.5rem] font-bold leading-[1.2] tracking-[-2px]">
                          Decode Insights with
                          <span className="protest text-primary font-normal tracking-[-3px] text-[2.2rem] md:text-[2.6rem]">
                            {" "}
                            Clarity
                          </span>
                        </h3>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        No more confusion. With Jerrydata&#x27;s XAI, your data
                        becomes easy to understand. Get clear explanations for
                        better insights and confident decision-making.
                        <br />
                      </motion.p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col relative items-center justify-center"
                  >
                    <Image
                      className="w-full h-full"
                      src="/static/images/explainable-ai.webp"
                      width={100}
                      height={100}
                      alt="xai"
                      style={{ height: "auto" }}
                      sizes="(max-width: 479px) 77vw, (max-width: 991px) 82vw, (max-width: 1439px) 39vw, 557.6875px"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
                <div className="flex overflow-hidden items-stretch flex-col rounded-[1rem] border border-[rgba(210, 210, 255, 0.5)]">
                  <div className="flex flex-col p-6 md:p-8 lg:p-12 flex-1 justify-start">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-2"
                      >
                        <div className="text-primary font-medium text-base">
                          Custom Visualization
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-5 md:mb-6"
                      >
                        <h3 className="text-[2rem] md:text-4xl lg:text-[2.5rem] font-bold leading-[1.2] tracking-[-2px]">
                          Your Data, Your
                          <span className="protest text-primary font-normal tracking-[-2px] text-[2.2rem] md:text-[2.6rem]">
                            {" "}
                            Design
                          </span>
                        </h3>
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        Tailor your visuals your way. With Jerrydata&#x27;s
                        custom visualization, you&#x27;re in control. Design
                        charts and graphs that speak your data&#x27;s language.{" "}
                        <br />
                      </motion.p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col relative items-center justify-center"
                  >
                    <Image
                      className="w-full h-full"
                      src="/static/images/custom-visualizations.webp"
                      width={100}
                      height={100}
                      alt="custom-vis"
                      style={{
                        height: "auto",
                      }}
                      sizes="(max-width: 479px) 77vw, (max-width: 991px) 82vw, (max-width: 1439px) 39vw, 557.6875px"
                      loading="lazy"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <header className="overflow-hidden border-b border-[rgba(210, 210, 255, 0.5)]">
          <div className="px-[5%] py-16 md:py-24 lg:py-28 w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="mb-12 md:mb-[4.5rem] lg:mb-20">
                <div className="text-center">
                  <div className="max-w-3xl relative w-full flex flex-col items-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 md:mb-6"
                    >
                      <Image
                        src="/static/images/connectors-icon.webp"
                        width={80}
                        height={80}
                        loading="lazy"
                        alt="connectors"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-3 md:mb-4"
                    >
                      <div className="text-base text-primary font-medium">
                        Connect with Ease
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 md:mb-6"
                    >
                      <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-[-2px] leading-[1.2]">
                        Seamless
                        <span className="protest text-primary font-normal tracking-[-3px] text-[2.7rem] md:text-[3.6rem]">
                          {" "}
                          integrations.
                        </span>
                      </h1>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-base md:text-lg tracking-tighter"
                    >
                      No more barriers. Jerrydata&#x27;s seamless integrations
                      ensure effortless connections to all your data sources.
                      Whether it&#x27;s static files, databases, or cloud
                      storage, we&#x27;ve got you covered. Say hello to
                      hassle-free data access and unlock the full potential of
                      your insights.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mt-6 md:mt-8"
                    >
                      <div className="flex justify-center flex-wrap items-center gap-4">
                        <Link
                          href="/user/register"
                          className="border border-primary bg-primary text-center text-white font-medium rounded-[0.5rem] px-6 py-3"
                        >
                          Get Started for Free
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              {/* <div className="header78_content-bottom flex overflow-hidden justify-start w-screen"> */}
              {/* <div className="header78_images-layout grid grid-cols-1 gap-y-4 auto-cols-[1fr]"> */}
              {/* <div className="header78_image-list-bottom w-full grid ml-[-62.7%] grid-cols-2 auto-cols-[1fr] gap-4">
                    <div className="header78_image-list grid grid-cols-[auto] gap-4 w-full grid-flow-col auto-cols-auto">
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db7.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="sql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db6.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="exl"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db5.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="redis"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db4.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="ga"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db3.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="oracle"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db2.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="postgre"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </div>
                    <div className="header78_image-list grid grid-cols-[auto] gap-4 w-full grid-flow-col auto-cols-auto">
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db7.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="sql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db6.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="exl"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db5.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="redis"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db4.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="ga"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db3.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="oracle"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                      <div className="header78_image-wrapper w-[26rem] h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db2.webp"
                          width={100}
                          height={100}
                          style={{ height: "auto" }}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="postgre"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </div>
                  </div> */}
              {/* </div> */}
              {/* </div> */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 gap-y-4"
              >
                <div className="w-full inline-flex flex-nowrap">
                  <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll">
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db1.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db2.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db3.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db4.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db5.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db6.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                  </ul>
                  <ul
                    className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll"
                    aria-hidden="true"
                  >
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db1.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db2.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db3.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db4.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db5.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db6.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="w-full inline-flex flex-nowrap">
                  <ul className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll-reverse">
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db7.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db6.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db5.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db4.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db3.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db2.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                  </ul>
                  <ul
                    className="flex items-center justify-center md:justify-start [&_li]:mx-2 [&_img]:max-w-none animate-infinite-scroll-reverse"
                    aria-hidden="true"
                  >
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db7.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db6.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db5.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db4.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db3.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                    <li>
                      <div className="w-[18rem] md:w-[26rem] h-[128px] md:h-[208px] border border-[rgba(210, 210, 255, 0.5)] relative pt-[50%]">
                        <Image
                          src="/static/images/db2.webp"
                          width={100}
                          height={100}
                          loading="eager"
                          sizes="(max-width: 767px) 60vw, 414.3999938964844px"
                          alt="mysql"
                          className="header78_image w-full h-full object-cover absolute top-0 bottom-0 left-0 right-0"
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </header>
        <header className="relative border-b border-[rgba(210, 210, 255, 0.5)]">
          <div className="px-[5%] max-w-7xl w-full mx-auto py-16 md:py-24 lg:py-28">
            <div className="grid grid-cols-1 auto-cols-[1fr] gap-6 md:gap-8 overflow-hidden rounded-[1.5rem] bg-[#eef]">
              <div className="min-h-[32rem] px-4 py-8 xs:p-8 md:min-h-[40rem] flex flex-col relative md:px-16 justify-center items-center md:pt-28">
                <div className="max-w-3xl relative w-full">
                  <div className="text-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 md:mb-6 flex flex-col items-center"
                    >
                      <Image
                        src="/static/images/jerry-icon.webp"
                        width={80}
                        height={80}
                        loading="lazy"
                        alt="jerry section"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-3 md:mb-4"
                    >
                      <div className="text-base text-primary font-medium">
                        Your Data Companion
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 md:mb-6"
                    >
                      <h1 className="text-[2.5rem] md:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-[-2px] leading-[1.2]">
                        Meet
                        <span className="protest text-primary font-normal tracking-[-3px] text-[2.7rem] md:text-[3.6rem]">
                          {" "}
                          jerry!
                        </span>
                      </h1>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-base md:text-lg tracking-tighter"
                    >
                      Introducing Jerry, your friendly data companion. Just like
                      chatting with a friend, Jerry simplifies data exploration
                      with ease. Ask questions, explore insights, and unlock
                      valuable information effortlessly. Say hello to intuitive
                      data conversations with Jerry by your side.
                      <br />
                    </motion.p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mt-6 md:mt-8"
                >
                  <div className="flex justify-center flex-wrap items-center gap-4">
                    <Link
                      href="/user/register"
                      className="border border-primary bg-primary text-center text-white font-medium rounded-[0.5rem] px-6 py-3"
                    >
                      Get Started for Free
                    </Link>
                  </div>
                </motion.div>
                <div className="margin-top margin-xlarge mt-10 md:mt-14 lg:mt-16">
                  <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="border border-[#eef] rounded-[1rem] overflow-hidden mb-[-5.7rem] lg:mb-[-9rem] 2xl:mb-[-11rem] relative z-[1]"
                  >
                    <Image
                      src="/static/images/ask-jerry-1.webp"
                      width={100}
                      height={100}
                      loading="lazy"
                      sizes="(max-width: 479px) 64vw, (max-width: 991px) 65vw, (max-width: 1439px) 71vw, 1020.9750366210938px"
                      alt="ask-jerry"
                      className="w-full h-full"
                    />
                  </motion.div>
                </div>
                <Image
                  src="/static/images/bg-pattern-1.svg"
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                  loading="lazy"
                  alt="bg pattern"
                  className="z-0 opacity-40 absolute bottom-4 xs:bottom-8 md:bottom-16 left-0 right-0 scale-110"
                />
              </div>
            </div>
          </div>
        </header>
        {/* cards */}
        <section className="sticky top-[4rem]">
          <div className="w-full max-w-7xl mx-auto">
            <div className="layout418_component min-h-[auto] h-[70vh] xs:h-screen border-b border-[rgba(210, 210, 255, 0.5)] relative overflow-hidden grid-cols-1 md:grid-cols-2 auto-cols-[1fr] gap-x-12 lg:gap-x-0 grid-flow-row">
              <div className="layout418_content px-[5%] xs:px-0 grid-cols-1 h-[100svh] lg:h-screen grid xs:grid-cols-[30rem] content-center md:flex sticky top-0 items-center justify-center md:grid-cols-2 auto-cols-[1fr]">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="layout418_title-wrapper pt-20 md:pt-0 top-0 md:top-[auto] bottom-[auto] left-0 right-0 w-full flex justify-center overflow-hidden absolute"
                >
                  <h2 className="layout418_title text-[2rem] xs:text-[3rem] md:text-[7.5rem] lg:text-[6rem] whitespace-nowrap">
                    Stories on
                    <span className="protest text-primary font-normal tracking-[-3px] text-[2.2rem] xs:text-[3.3rem] md:text-[6.5rem]">
                      {" "}
                      Jerrydata!
                    </span>
                    <br />
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="layout418_list min-h-[24.5rem] mt-[-5rem] xs:mt-[6rem] md:mt-0 sticky top-0 w-full max-w-[30rem] flex flex-col items-center justify-center md:relative"
                >
                  <div className="layout418_card mx-6 xs:mx-0 card-1 z-[2] absolute overflow-hidden flex flex-col justify-between rounded-[1rem] bg-white border border-[rgba(210, 210, 255, 0.5)]">
                    <Image
                      src="/static/images/insight-1.svg"
                      width={100}
                      height={100}
                      style={{ width: "auto", height: "auto" }}
                      loading="eager"
                      alt="insight-1"
                    />
                  </div>
                  <div className="layout418_card mx-6 xs:mx-0 card-2 z-[1] rotate-3 absolute overflow-hidden flex flex-col justify-between rounded-[1rem] bg-white border border-[rgba(210, 210, 255, 0.5)]">
                    <Image
                      src="/static/images/insight-2.svg"
                      width={100}
                      height={100}
                      style={{ width: "auto", height: "auto" }}
                      loading="eager"
                      alt="insight-2"
                    />
                  </div>
                  <div className="layout418_card mx-6 xs:mx-0 card-3 rotate-6 absolute overflow-hidden flex flex-col justify-between rounded-[1rem] bg-white border border-[rgba(210, 210, 255, 0.5)]">
                    <Image
                      src="/static/images/insight-3.svg"
                      width={100}
                      height={100}
                      style={{ width: "auto", height: "auto" }}
                      loading="eager"
                      alt="insight-3"
                    />
                  </div>
                </motion.div>
              </div>
              <div className="layout418_ix-trigger z-[-1] mt-[100vh] absolute inset-0"></div>
            </div>
          </div>
        </section>
        <header className="border-b border-[rgba(210, 210, 255, 0.5)] bg-gradient-to-b from-white to-[#eef]">
          <div className="px-[5%] w-full max-w-7xl mx-auto py-16 md:py-24 lg:py-28">
            <div className="flex flex-col items-center">
              <div className="mb-12 md:mb-[4.5rem] lg:mb-20">
                <div className="text-center">
                  <div className="max-w-3xl w-full relative">
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-3 md:mb-4"
                    >
                      <div className="text-base text-primary font-medium">
                        Dive Into Data, No Cost Attached
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-5 md:mb-6"
                    >
                      <h2 className="text-4xl md:text-[2.75rem] lg:text-5xl font-bold leading-[1.2] tracking-[-2px]">
                        Get Your Hands Dirty with Our{" "}
                        <span className="protest text-primary font-normal tracking-[-3px] text-[2.7rem] md:text-[3.6rem]">
                          free public beta
                        </span>
                      </h2>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-base md:text-lg tracking-tighter"
                    >
                      Join our public beta and immerse yourself in the world of
                      data storytelling, all for free. With Jerrydata,
                      there&#x27;s no barrier to getting your hands dirty and
                      exploring the depths of your data.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mt-6 md:mt-8"
                    >
                      <div className="flex justify-center flex-wrap items-center gap-4">
                        <Link
                          href="/user/register"
                          className="border border-primary bg-primary text-center text-white font-medium rounded-[0.5rem] px-6 py-3"
                        >
                          Get Started for Free
                        </Link>
                        <a
                          href="https://calendly.com/jerrydata/demo"
                          target="_blank"
                          className="border border-primary rounded-[0.5rem] px-6 py-3 text-primary font-medium"
                        >
                          Book a Demo
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              {/* work here */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden rounded-[1rem] border border-[#eef]"
              >
                <Image
                  src="/static/images/phone-mockup.webp"
                  width={100}
                  height={100}
                  loading="eager"
                  sizes="(max-width: 479px) 78vw, (max-width: 991px) 82vw, (max-width: 1439px) 81vw, 1150.5750732421875px"
                  alt="phone-mockup"
                  className="w-full h-full"
                />
              </motion.div>
            </div>
          </div>
        </header>
        <footer>
          <div className="px-[5%] max-w-7xl w-full mx-auto">
            <div className="py-12 md:py-[4.5rem] lg:py-20">
              <div className="pb-12 md:pb-[4.5rem] lg:pb-20">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 lg:grid-cols-[0.25fr_1fr_0.25fr] auto-cols-[1fr] gap-x-[4vw] gap-y-12 lg:gap-y-0 justify-center justify-items-center lg:justify-between items-center"
                >
                  <div
                    onClick={scrollToTop}
                    className="cursor-pointer relative"
                  >
                    <Image
                      src="/static/images/jerrydata_logo.svg"
                      height={100}
                      style={{ height: "auto" }}
                      loading="eager"
                      width="140"
                      alt="jerrydata-logo"
                    />
                  </div>
                  <div className="grid grid-cols-[max-content] md:grid-cols-[max-content_max-content_max-content] justify-center justify-items-center md:justify-items-start grid-flow-row md:grid-flow-col md:gap-y-0 gap-y-[1.5rem] gap-x-0 md:gap-x-[1.5rem] auto-cols-[1fr]">
                    <a
                      href="https://jerrydata.canny.io/"
                      target="_blank"
                      className="text-center"
                    >
                      Roadmap
                    </a>
                    <a
                      href="https://calendly.com/jerrydata/demo"
                      target="_blank"
                      className="text-center"
                    >
                      Book a Demo
                    </a>
                    <Link href="/user/register" className="text-center">
                      Signup
                    </Link>
                  </div>
                  <div className="grid grid-cols-[max-content_max-content] gap-4 auto-cols-[1fr] justify-end items-start grid-flow-col gap-x-[0.75rem]">
                    <a
                      href="#"
                      className="text-sm items-center inline-block max-w-[100%]"
                    >
                      <div className="w-6 h-6 text-primary flex items-center justify-center flex-col">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
                            fill="CurrentColor"
                          ></path>
                        </svg>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/jerrydata"
                      target="_blank"
                      className="text-sm items-center inline-block max-w-[100%]"
                    >
                      <div className="w-6 h-6 text-primary flex items-center justify-center flex-col">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.5 3C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3H4.5ZM8.52076 7.00272C8.52639 7.95897 7.81061 8.54819 6.96123 8.54397C6.16107 8.53975 5.46357 7.90272 5.46779 7.00413C5.47201 6.15897 6.13998 5.47975 7.00764 5.49944C7.88795 5.51913 8.52639 6.1646 8.52076 7.00272ZM12.2797 9.76176H9.75971H9.7583V18.3216H12.4217V18.1219C12.4217 17.742 12.4214 17.362 12.4211 16.9819V16.9818V16.9816V16.9815V16.9812C12.4203 15.9674 12.4194 14.9532 12.4246 13.9397C12.426 13.6936 12.4372 13.4377 12.5005 13.2028C12.7381 12.3253 13.5271 11.7586 14.4074 11.8979C14.9727 11.9864 15.3467 12.3141 15.5042 12.8471C15.6013 13.1803 15.6449 13.5389 15.6491 13.8863C15.6605 14.9339 15.6589 15.9815 15.6573 17.0292V17.0294C15.6567 17.3992 15.6561 17.769 15.6561 18.1388V18.3202H18.328V18.1149C18.328 17.6629 18.3278 17.211 18.3275 16.7591V16.759V16.7588C18.327 15.6293 18.3264 14.5001 18.3294 13.3702C18.3308 12.8597 18.276 12.3563 18.1508 11.8627C17.9638 11.1286 17.5771 10.5211 16.9485 10.0824C16.5027 9.77019 16.0133 9.5691 15.4663 9.5466C15.404 9.54401 15.3412 9.54062 15.2781 9.53721L15.2781 9.53721L15.2781 9.53721C14.9984 9.52209 14.7141 9.50673 14.4467 9.56066C13.6817 9.71394 13.0096 10.0641 12.5019 10.6814C12.4429 10.7522 12.3852 10.8241 12.2991 10.9314L12.2991 10.9315L12.2797 10.9557V9.76176ZM5.68164 18.3244H8.33242V9.76733H5.68164V18.3244Z"
                            fill="CurrentColor"
                          ></path>
                        </svg>
                      </div>
                    </a>
                  </div>
                </motion.div>
              </div>
              <div className="line-divider w-full h-px border-t border-[rgba(210, 210, 255, 0.5)]"></div>
              <div className="pt-6 md:pt-8">
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="pb-4 grid grid-cols-[max-content] gap-y-4 md:gap-y-0 gap-x-0 md:gap-x-[1.5rem] whitespace-normal auto-cols-[1fr] grid-flow-row md:grid-flow-col justify-center"
                >
                  <div className="mt-4 md:mt-0 text-sm">
                    © 2024 Jerrydata. All rights reserved.
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
