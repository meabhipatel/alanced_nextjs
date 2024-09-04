"use client";
import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import credibilityIcon from "@/assets/icons/credibility.png";
import flexibilityIcon from "@/assets/icons/flexibity.png";
import valueIcon from "@/assets/icons/value.png";
import womanwithtabImage from "@/assets/images/womanwithtab.png";
import { BsArrowRight } from "react-icons/bs";

const HomeSection3 = () => {
  // State to track which dropdown is open
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    if (openDropdown === index) {
      setOpenDropdown(null); 
    } else {
      setOpenDropdown(index); 
    }
  };

  return (
    <div>
      {/* "Why Over 3 Million People Choose Us" section */}
      <div className="mt-10 bg-[#F6FAFD] pb-7">
        <h1 className="pt-6 text-center text-xl font-semibold text-[#0A142F] md:text-[26px]">
        Why Over 3 Million People Choose Us for Freelance Jobs Online
        </h1>
        <div className="mx-auto mt-3.5 w-1/4 border-b-2 border-gray-300 sm:w-1/6"></div>
        <div className="mt-8 grid grid-cols-1 gap-4 px-4 text-center md:grid-cols-3 lg:px-32">
          <div className="flex flex-col items-center p-4">
            <Image src={credibilityIcon} alt="" className="mx-auto" />
            <p className="opacity-50">01</p>
            <h5 className="py-4 font-semibold text-[#0A142F]">Credibility</h5>
            <p className="opacity-50">
              We verify Freelancers, publish their feedback scores and All-Time Transaction Data to help you identify time-tested professionals across the globe.
            </p>
            <div className="mt-3 flex h-8 w-14 items-center justify-center rounded-md border border-black">
              <BsArrowRight className="text-xl" />
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <Image src={flexibilityIcon} alt="" className="mx-auto" />
            <p className="opacity-50">02</p>
            <h5 className="py-4 font-semibold text-[#0A142F]">Flexibility</h5>
            <p className="opacity-50">
              We provide multiple Payment terms and flexible Agreements to enable you to work the way you want.
            </p>
            <div className="mt-3 flex h-8 w-14 items-center justify-center rounded-md border border-black">
              <BsArrowRight className="text-xl" />
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <Image src={valueIcon} alt="" className="mx-auto" />
            <p className="opacity-50">03</p>
            <h5 className="py-4 font-semibold text-[#0A142F]">Value</h5>
            <p className="opacity-50">
              We have the lowest fees in the industry, providing you with maximum value at minimum cost.
            </p>
            <div className="mt-3 flex h-8 w-14 items-center justify-center rounded-md border border-black">
              <BsArrowRight className="text-xl" />
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          <Link href="/why-alanced">
            <span className="rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
              Why Choose Alanced
            </span>
          </Link>
        </div>
      </div>

      {/* ---> Work Your Way section*/}
      <div>
        <h1 className="pt-16 text-center text-xl font-semibold text-[#0A142F] md:text-[26px] font-serif">
          Flexible Payment Options for Your Freelance Work.
        </h1>
        <div className="mx-auto mt-3.5 w-20 border-b-2 border-gray-300"></div>
        <div className="my-12 md:my-0" />
        <div className="mt-6 flex flex-col space-y-4 px-4 md:flex-row md:space-y-0 lg:px-32">
          <div className="flex justify-end p-4 pb-0">
            <Image src={womanwithtabImage} alt="" className="-mt-20 h-[440px] w-80" />
          </div>
          <div className="flex-1 p-4 text-left">
            <div
              className="mt-4 flex items-center space-x-3 cursor-pointer"
              onClick={() => toggleDropdown(0)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleDropdown(0);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {openDropdown === 0 ? (
                <IoIosArrowDropup className="text-xl" />
              ) : (
                <IoIosArrowDropdown className="text-xl" />
              )}
              <span className="text-[18px] font-[700px] text-[#0A142F]">Fixed Price</span>
            </div>
            {openDropdown === 0 && (
              <p className="pl-8 pt-2 text-[16px] opacity-60">
                Set a total fixed cost for your job and create milestones to ensure you&apos;re satisfied every step of the way. Set a due date and the amount to be paid for each milestone.
              </p>
            )}
            
            <div
              className="mt-4 flex items-center space-x-3 cursor-pointer"
              onClick={() => toggleDropdown(1)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleDropdown(1);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {openDropdown === 1 ? (
                <IoIosArrowDropup className="text-xl" />
              ) : (
                <IoIosArrowDropdown className="text-xl" />
              )}
              <span className="text-[18px] font-[700px] text-[#0A142F]">Hourly</span>
            </div>
            {openDropdown === 1 && (
              <p className="pl-8 pt-2 text-[16px] opacity-60">
                Balance your life and work with hourly jobs. Choose projects that fit your schedule and earn as you go. Our platform allows you to set your own hours and work on projects that interest you.
              </p>
            )}

            <div
              className="mt-4 flex items-center space-x-3 cursor-pointer"
              onClick={() => toggleDropdown(2)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleDropdown(2);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {openDropdown === 2 ? (
                <IoIosArrowDropup className="text-xl" />
              ) : (
                <IoIosArrowDropdown className="text-xl" />
              )}
              <span className="text-[18px] font-[700px] text-[#0A142F]">Task-Based</span>
            </div>
            {openDropdown === 2 && (
              <p className="pl-8 pt-2 text-[16px] opacity-60">
                Get paid fairly and promptly on Alanced. Our Freelance job portal prioritizes timely payments for freelancers. Benefit from a secure payment system that protects your earnings and fosters trust within the freelance community.
              </p>
            )}

            <div
              className="mt-4 flex items-center space-x-3 cursor-pointer"
              onClick={() => toggleDropdown(3)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  toggleDropdown(3);
                }
              }}
              role="button"
              tabIndex={0}
            >
              {openDropdown === 3 ? (
                <IoIosArrowDropup className="text-xl" />
              ) : (
                <IoIosArrowDropdown className="text-xl" />
              )}
              <span className="text-[18px] font-[700px] text-[#0A142F]">Recurring Payment</span>
            </div>
            {openDropdown === 3 && (
              <p className="pl-8 pt-2 text-[16px] opacity-60">
                Enjoy the convenience of recurring payments on our job portal. Automatically renew your subscription and never miss out on new job postings, career advice, and networking opportunities.
              </p>
            )}

            <div className="mt-8">
              <Link href="/terms">
                <span className="rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                  Learn About Agreements
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;
