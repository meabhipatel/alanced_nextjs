"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import referral from '@/assets/images/referral.png';

const MyProposalReferrals = () => {
  const [selectedButton, setSelectedButton] = useState('Referrals');
  const commonStyle = "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  return (
    <>
      <div className='mt-2 px-4 sm:px-6 md:px-12 lg:px-40'>
        <h1 className='font-cardo text-[21px] text-[#031136] font-normal pt-4 text-left'>My proposals</h1>
        <div className='my-3 flex flex-wrap'>
          <Link href='/freelancer/my-proposals'>
            <button
              className={`flex-grow md:flex-none p-1 ${commonStyle} px-3 my-3 md:px-8 ${selectedButton === 'Active' ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white font-inter text-sm font-normal border-none" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-3`}
              onClick={() => setSelectedButton('Active')}
              aria-pressed={selectedButton === 'Active'}
            >
              Active
            </button>
          </Link>
          <Link href='/my-proposals/my-referrals'>
            <button
              className={`flex-grow md:flex-none p-1 ${commonStyle} px-3 md:px-8 ${selectedButton === 'Referrals' ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white font-inter text-sm font-normal border-none" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-3`}
              onClick={() => setSelectedButton('Referrals')}
              aria-pressed={selectedButton === 'Referrals'}
            >
              Referrals
            </button>
          </Link>
        </div>
        <div className='border border-[#E7E8F2] py-12 mt-8 text-center'>
          <Image src={referral} alt="Referral Image" className='mx-auto max-w-full h-auto' />
          <h1 className='font-inter font-semibold text-base mt-3'>You haven’t referred anyone yet</h1>
          <p className='font-inter font-normal text-base opacity-[50%] mt-2'>
            When declining an invitation, you can make a referral to help other freelancers
          </p>
          <p className='font-inter font-normal text-base opacity-[50%] mt-1'>
            succeed and help clients fill their job
          </p>
          <h1 className='font-cardo font-normal text-lg mt-2'>
            Learn more about referring freelancers
          </h1>
        </div>
      </div>
    </>
  );
}

export default MyProposalReferrals;
