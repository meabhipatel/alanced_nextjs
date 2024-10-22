"use client";
import { useState } from "react";
import happyclient from "@/assets/images/happyclient.png";
import client1 from "@/assets/images/client1.png";
import client2 from "@/assets/images/client2.png";
import Image from "next/image";
import { LuCheckCircle } from "react-icons/lu";

const HomeSection1 = () => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="container sm:px-5 md:px-10 lg:px-20">
      <hr className="my-9 mb-3 md:mb-9" />
      <div className="flex flex-col gap-4 md:mt-6 md:flex-row">
        <div className="relative w-full p-10 pt-0 md:w-[50%] md:pt-10 lg:w-[40%]">
          <div className="hidden h-[300px] w-[250px] rounded shadow-lg md:absolute md:left-0 md:top-0 md:block md:h-[210px] md:w-[190px]">
            <Image
              src={client2}
              alt="client"
            />
          </div>
          <div className="mt-4 h-auto w-full rounded shadow-lg md:absolute md:left-[170px] md:top-[65px] md:h-[295px] md:w-[220px]">
            <Image
              src={client1}
              alt="client"
              className="h-auto w-full md:h-[295px] md:w-[222px]"
            />
          </div>
          <div className="z-20 mt-4 h-[83px] w-[170px] rounded bg-white p-6 shadow-lg md:absolute md:left-[30px] md:top-[276.5px]">
            <Image
              src={happyclient}
              alt=""
            />
          </div>
        </div>
        <div className="w-full md:w-[50%] lg:w-[70%]">
          <h1 className="mt-5 font-serif text-4xl font-semibold text-[#0A142F] md:text-2xl">
            Best Freelance Websites for Beginners & Experts!
          </h1>
          <p className="mt-3 text-justify text-sm leading-6 text-gray-600 md:text-base">
            Welcome to Alanced, the best freelance platform, where your journey to success in the
            digital realm begins! Our Freelance Job Portal is designed to help beginners and
            seasoned professionals alike navigate the complex web of professional connections with
            ease. Offering a reliable and user-friendly interface, Alanced makes it simple to find
            freelance jobs online, even for those just starting out. Here, you can effortlessly
            curate your portfolio, showcasing your diverse skills and expertise, from graphic design
            to web development. Every project you take on will resonate with clarity and purpose,
            leaving a lasting impression on potential clients. Join us in navigating the dynamic
            landscape of freelancing with confidence, Knowing that your portfolio is more than just
            a collection of works it&apos;s a compelling narrative of your professional journey and
            achievements.
          </p>

          {showFullText && (
            <p className="mt-4 text-justify text-sm leading-6 text-gray-600 md:text-base">
              Alanced is your go-to platform for all things freelancing, offering a comprehensive
              solution for those seeking freelance job sites that cater to both beginners and
              experienced professionals. Whether you&apos;re looking to boost your freelancer
              earning potential or find part-time freelance jobs that fit your schedule, Alanced has
              you covered. Our platform features a variety of freelance job boards, making it easy
              to discover new opportunities and expand your client base. Additionally, if
              you&apos;re a business looking for top talent, Alanced simplifies the freelancer
              hiring process, connecting you with skilled professionals who can deliver exceptional
              results.
            </p>
          )}

          <button
            onClick={toggleText}
            className="mt-4 font-semibold text-blue-600 hover:text-blue-800"
          >
            {showFullText ? "Read Less" : "Read More"}
          </button>
          <div className="mt-4 flex flex-wrap items-center justify-start gap-4">
            <div className="flex items-center space-x-2">
              <LuCheckCircle className="text-green-500" />
              <span className="text-sm md:text-base">User-Friendly Interface</span>
            </div>
            <div className="flex items-center space-x-2">
              <LuCheckCircle className="text-green-500" />
              <span className="text-sm md:text-base">Advanced Security Protocols</span>
            </div>
            <div className="flex items-center space-x-2">
              <LuCheckCircle className="text-green-500" />
              <span className="text-sm md:text-base">Trusted by Professionals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection1;
