"use client";
import React, { useState } from "react";
import chooseoption from "@/assets/images/chooseoption.png";
import client from "@/assets/images/client.png";
import freelancer from "@/assets/images/freelancer.png";
import logo from "@/assets/images/alanced.png";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

const SignupOptions = () => {
  const router = useRouter();
  type OptionType = "client" | "freelancer";
  const [selectedOption, setSelectedOption] = useState<OptionType>("client");
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  /** ---> If user already Logged in navigating to previous screen. */
  if (isLoggedIn) {
    return router.back();
  }

  return (
    <div
      className="relative flex h-screen bg-cover bg-center px-5"
      style={{ backgroundImage: `url(${chooseoption.src})` }}
    >
      <Link href="/">
        <div className="absolute left-7 top-7 flex items-center md:left-9 md:top-9">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
          />
          <span className="font-poppins ml-2 text-[20px] font-semibold tracking-widest text-[#031136] md:text-[23px]">
            ALANCED
          </span>
        </div>
      </Link>

      <div className="flex h-full w-full items-center justify-center">
        <div className="mx-auto w-full max-w-md border border-blue-300 bg-white p-6 shadow-lg md:max-w-xl md:p-8">
          <h3 className="font-cardo mb-8 text-center text-xl">Join As A Client or Freelancer</h3>
          <div className="mb-8 flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <button
              className={`flex w-full items-center border-2 p-6 sm:block sm:flex-1 ${
                selectedOption === "client" ? "border-blue-600" : ""
              } h-[120px] cursor-pointer hover:border-blue-600 hover:shadow-md sm:h-auto`}
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
              className={`flex w-full items-center border-2 p-6 sm:block sm:flex-1 ${
                selectedOption === "freelancer" ? "border-blue-600" : ""
              } h-[120px] cursor-pointer hover:border-blue-600 hover:shadow-md sm:h-auto`}
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

          <div className="flex flex-col items-center">
            {selectedOption === "freelancer" ? (
              <Link href="/signup/freelancer">
                <button className="focus:shadow-outline-blue -mt-2 block w-[320px] rounded-lg border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-center text-sm font-semibold leading-5 text-white transition-colors duration-150 hover:from-[#00D4FF] hover:to-[#0909E9] focus:outline-none">
                  Join as a Freelancer
                </button>
              </Link>
            ) : (
              <Link href="/signup/hirer">
                <button className="focus:shadow-outline-blue -mt-2 block w-[320px] rounded-lg border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-center text-sm font-semibold leading-5 text-white transition-colors duration-150 hover:from-[#00D4FF] hover:to-[#0909E9] focus:outline-none">
                  Join as a Client
                </button>
              </Link>
            )}
            <p className="font-inter pt-2.5 text-center text-xs">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-yellow-400">Log In</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupOptions;
