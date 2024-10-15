"use client";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import React, { FC, useState } from "react";
import SendFreeLancerHireRequestPopup from "./SendFreeLancerHireRequestPopup";
import { IFreelancer } from "@/interfaces";

interface IProps {
  freelancer: IFreelancer;
}

const HireNowButtonAndPopup: FC<IProps> = ({ freelancer }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <button
          onClick={() => setIsPopupOpen(true)}
          className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0"
        >
          Hire Now
        </button>
      ) : (
        <Link href="/login">
          <span className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
            Hire Now
          </span>
        </Link>
      )}
      {isPopupOpen && (
        <SendFreeLancerHireRequestPopup
          closePopup={handleClosePopup}
          freelancerId={freelancer.id}
        />
      )}
    </div>
  );
};

export default HireNowButtonAndPopup;
