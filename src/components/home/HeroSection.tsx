"use client";

import React, { useState, useEffect } from "react";
import heroBackground from "@/assets/images/hero_background.svg";
import heroImage from "@/assets/images/hero1.png";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animateClass, setAnimateClass] = useState("slide-enter");

  // Array of slide titles with HTML line breaks
  const slideContents: string[] = [
    "Unlock Access <br/> to Premier Experts <br/> and Talent with <br/> Alanced",
    "Quality Work, <br/> Anywhere, Anytime <br/> With Top Freelance <br/> Website",
  ];

  useEffect(() => {
    // Automatically change slides every 3 seconds
    const interval = setInterval(() => {
      // Trigger exit animation
      setAnimateClass("slide-exit");

      setTimeout(() => {
        // Change slide after exit animation is done
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideContents.length);
        // Trigger enter animation
        setAnimateClass("slide-enter");
      }, 1000); // Match the duration of your slide-exit animation (1s)
    }, 4000); // Total time for slide + animation (3s slide + 1s animation)

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(interval);
  }, [slideContents.length]);

  return (
    <>
      <div
        className="flex h-[35rem] items-start justify-center px-5 sm:h-[40rem] sm:px-14 lg:h-[45rem] lg:items-center"
        style={{ backgroundImage: `url(${heroBackground.src})` }}
      >
        {/* Container for Titles and Static Content */}
        <div className="w-full overflow-hidden pt-28 text-left sm:pt-40 lg:w-[50%] lg:pt-6 lg:text-2xl">
          {/* Animated Titles */}

          <div
            className={`${animateClass} `}
            key={currentIndex}
          >
            <h2
              className={`text-[30px] font-semibold leading-[40px] text-[#031136] sm:mt-3 sm:text-[40px] sm:leading-[50px] md:mt-3 md:text-[50px] md:leading-[55px]`}
              dangerouslySetInnerHTML={{ __html: slideContents[currentIndex] }}
            />
          </div>

          {/* Static Subtitle */}
          <h1 className="mb-8 mt-10 text-[16px] font-normal leading-[26px] text-[#797979] md:hidden md:pt-6">
            With Alanced, easily connect with <br /> top freelancers ready to tackle any <br />
            project you need, exactly when you need it.
          </h1>
          <h1 className="mb-5 mt-10 hidden text-xl font-normal leading-[26px] text-[#797979] md:block md:pt-6">
            With Alanced, easily connect with top freelancers ready to <br />
            tackle any project you need, exactly when you need it..
          </h1>

          {/* CTA Button */}
          <Link href={"/signup-options"}>
            <span className="mb-2 mr-2 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
              Get Started
            </span>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="hidden h-[42rem] w-[50%] pt-16 lg:block">
          <Image
            src={heroImage}
            alt="hero-image"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
