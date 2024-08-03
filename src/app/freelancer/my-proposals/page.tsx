"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaRegFolder } from "react-icons/fa";
import referral from "@/assets/images/referral.png";

const MyProposals: React.FC = () => {
  const [clickedButton, setClickedButton] = useState<number>(1);

  const handleButtonClick = (buttonId: number) => {
    setClickedButton(buttonId);
  };

  const getButtonClass = (buttonId: number) => {
    return `px-8 py-3 rounded-lg border ${
      clickedButton === buttonId
        ? "text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"
        : "text-gray-500 bg-gray-100 border-gray-300"
    }`;
  };

  return (
    <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto max-w-screen-xl">
      <h1 className="font-cardo text-2xl sm:text-3xl md:text-4xl text-[#031136] font-normal mb-6">
        My Proposals
      </h1>
      <div className="flex gap-4 mb-4">
        <button
          className={getButtonClass(1)}
          onClick={() => handleButtonClick(1)}
        >
          Active
        </button>
        <button
          className={getButtonClass(2)}
          onClick={() => handleButtonClick(2)}
        >
          Referrals
        </button>
      </div>
      {clickedButton === 1 && (
        <>
          <div className="my-4 bg-white border border-gray-200 border-opacity-30 p-6 w-full rounded-lg shadow-md">
            <div className="text-[#0A142F] font-bold text-lg mb-4">
              Submitted Proposals (1)
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col items-start">
                <div className="text-[#0A142F] text-base">
                  Initiated Feb 16, 2024
                </div>
                <div className="text-sm text-[#5b5d61] mt-1">
                  5 Months Ago
                </div>
              </div>
              <button
                className="text-[#0A142F] text-sm text-center flex-grow md:flex-none md:w-auto hover:underline bg-transparent border-none cursor-pointer"
                onClick={() => handleButtonClick(1)}
              >
                Fitness Tracking App
              </button>
              <div className="text-[#0A142F] text-sm text-right">
                Web Development
              </div>
            </div>
          </div>

          <div className="my-4 bg-white border border-gray-200 border-opacity-30 p-6 w-full rounded-lg shadow-md">
            <div className="text-[#0A142F] font-bold text-lg mb-4">
              Pending Invitation (0)
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-3 rounded-full">
                <FaRegFolder className="text-white text-2xl" />
              </div>
              <div className="text-[#0A142F] mt-2">No Invitation</div>
            </div>
          </div>
        </>
      )}
      {clickedButton === 2 && (
        <div className="my-4 bg-white border border-gray-200 border-opacity-30 p-6 w-full rounded-lg shadow-md">
          <div className="flex flex-col items-center gap-4">
            <Image
              src={referral}
              alt="Referrals"
              className="w-full max-w-[450px] h-auto"
            />
            <div className="text-[#09090a] text-extrabold text-lg text-center">
              You haven’t referred anyone yet
            </div>
            <div className="text-[#5b5d61] text-center text-base">
              When declining an invitation, you can make a referral to help
              other freelancers <br /> succeed and help clients fill their job
            </div>
            <div className="text-[#0A142F] text-base text-center">
              Learn more about referring freelancers
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProposals;
