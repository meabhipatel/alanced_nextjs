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
  // Array of slides with titles and subtitles
  const slideContents: { title: string; subtitle: string }[] = [
    {
      title: "Unlock Access<br /> to Premier Experts<br /> and Talent with Alanced",
      subtitle: "With Alanced, easily connect with top freelancers ready to <br/>tackle any project you need, exactly when you need it."
    },
    {
      title: "Quality Work, Anywhere, Anytime With Top Freelance Website",
      subtitle: "Kickstart your freelance career with Alanced – where your next big opportunity is just one step away."
    }
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
        className="flex h-[110vh] justify-center bg-cover px-5"
        style={{ backgroundImage: `url(${heroBackground.src})` }}
      >
        {/* Container for Titles and Static Content */}
        <div className="pt-28 text-left sm:pt-40 lg:pt-28 lg:text-2xl relative overflow-hidden">
          {/* Animated Titles and Subtitles */}
          <div className={`absolute ${animateClass}`} key={currentIndex}>
            <h6
              className="mt-10 text-[35px] sm:text-[45px] md:text-[50px] font-semibold leading-[40px] sm:leading-[50px] md:leading-[55px] text-[#031136]"
              dangerouslySetInnerHTML={{ __html: slideContents[currentIndex].title }}
            />
            <p
              className="mb-3.5 mt-10 text-[16px] font-normal leading-[26px] text-[#797979]"
              dangerouslySetInnerHTML={{ __html: slideContents[currentIndex].subtitle }}
            />
          </div>
          {/* CTA Button */}
          <Link href={"/signup-options"}>
            <span className="mr-2 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
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
