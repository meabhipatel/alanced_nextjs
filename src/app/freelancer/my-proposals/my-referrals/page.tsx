"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import referral from "@/assets/images/referral.png";

const MyProposalReferrals = () => {
  const [selectedButton, setSelectedButton] = useState("Referrals");
  const commonStyle = "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  return (
    <>
      <div className="mt-2 px-4 sm:px-6 md:px-12 lg:px-40">
        <h1 className="font-cardo pt-4 text-left text-[21px] font-normal text-[#031136]">
          My proposals
        </h1>
        <div className="my-3 flex flex-wrap">
          <Link href="/freelancer/my-proposals">
            <button
              className={`flex-grow p-1 md:flex-none ${commonStyle} my-3 px-3 md:px-8 ${selectedButton === "Active" ? "font-inter border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-sm font-normal text-white" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-3`}
              onClick={() => setSelectedButton("Active")}
              aria-pressed={selectedButton === "Active"}
            >
              Active
            </button>
          </Link>
          <Link href="/freelancer/my-proposals/my-referrals">
            <button
              className={`flex-grow p-1 md:flex-none ${commonStyle} px-3 md:px-8 ${selectedButton === "Referrals" ? "font-inter border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-sm font-normal text-white" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-3`}
              onClick={() => setSelectedButton("Referrals")}
              aria-pressed={selectedButton === "Referrals"}
            >
              Referrals
            </button>
          </Link>
        </div>
        <div className="mt-8 border border-[#E7E8F2] py-12 text-center">
          <Image
            src={referral}
            alt="Referral Image"
            className="mx-auto h-auto max-w-full"
          />
          <h1 className="font-inter mt-3 text-base font-semibold">
            You haven’t referred anyone yet
          </h1>
          <p className="font-inter mt-2 text-base font-normal opacity-[50%]">
            When declining an invitation, you can make a referral to help other freelancers
          </p>
          <p className="font-inter mt-1 text-base font-normal opacity-[50%]">
            succeed and help clients fill their job
          </p>
          <h1 className="font-cardo mt-2 text-lg font-normal">
            Learn more about referring freelancers
          </h1>
        </div>
      </div>
    </>
  );
};

export default MyProposalReferrals;
