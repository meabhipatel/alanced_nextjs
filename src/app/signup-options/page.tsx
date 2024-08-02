"use client";
import React, { useState } from "react";
import chooseoption from "../../assets/images/chooseoption.png";
import client from "../../assets/images/client.png";
import freelancer from "../../assets/images/freelancer.png";
import logo from "../../assets/images/alanced.png";
import Image from "next/image";
import Link from "next/link";

const SignupOptions = () => {
  type OptionType = "client" | "freelancer";
  const [selectedOption, setSelectedOption] = useState<OptionType>("client");

  return (
    <div
      className="relative flex h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${chooseoption.src})`,
        backgroundSize: "850px 550px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Link
        href="/"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <div className="absolute left-1/2 top-[50px] flex -translate-x-1/2 transform items-center space-x-2 bg-[#E2F9EE] p-3 sm:left-1/4 md:left-[331.2px] lg:rounded-bl-none lg:rounded-br lg:rounded-tl-none lg:rounded-tr lg:bg-white">
          <Image
            src={logo}
            alt="Logo"
            className="h-5 w-5 md:h-6 md:w-6"
          />
          <span className="font-poppins ml-2 text-[15px] font-semibold tracking-widest text-[#031136] md:text-[16px]">
            ALANCED
          </span>
        </div>
      </Link>
      <div className="flex h-[460px] w-[350px] max-w-2xl flex-col items-center border border-blue-300 bg-white p-10 pt-8 shadow-lg lg:h-[340px] lg:w-[550px]">
        <h3 className="font-cardo mb-8 text-center text-xl">Join As A Client or Freelancer</h3>

        <div className="mb-8 flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            className={`flex w-full items-center border-2 p-6 sm:block sm:flex-1 ${selectedOption === "client" ? "border-blue-600" : ""} h-[120px] cursor-pointer hover:border-blue-600 hover:shadow-md sm:h-auto`}
            onClick={() => setSelectedOption("client")}
          >
            <Image
              src={client}
              alt="client"
              className="mr-4 h-[50px] sm:-mt-3 sm:mr-0"
            />
            <h5 className="font-cardo text-left text-[16px] lg:py-1">
              I’m A Client, Hiring For A Project
            </h5>
          </button>

          <button
            className={`flex w-full items-center border-2 p-6 sm:block sm:flex-1 ${selectedOption === "freelancer" ? "border-blue-600" : ""} h-[120px] cursor-pointer hover:border-blue-600 hover:shadow-md sm:h-auto`}
            onClick={() => setSelectedOption("freelancer")}
          >
            <Image
              src={freelancer}
              alt="freelancer"
              className="mr-4 h-[50px] sm:-mt-3 sm:mr-0"
            />
            <h5 className="font-cardo text-left text-[16px] lg:py-1">
              I’m A Freelancer, Looking For Work
            </h5>
          </button>
        </div>

        {selectedOption === "freelancer" ? (
          <Link href="/signup/freelancer">
            <button className="focus:shadow-outline-blue -mt-2 block w-[320px] rounded-lg border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-center text-sm font-semibold leading-5 text-white transition-colors duration-150 focus:outline-none">
              Join as a Freelancer
            </button>
          </Link>
        ) : (
          <Link href="/signup/hirer">
            <button className="focus:shadow-outline-blue -mt-2 block w-[320px] rounded-lg border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-center text-sm font-semibold leading-5 text-white transition-colors duration-150 focus:outline-none">
              Join as a Client
            </button>
          </Link>
        )}
        <p className="font-inter pt-2.5 text-xs">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-yellow-400">Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupOptions;
