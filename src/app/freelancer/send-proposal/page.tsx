"use client";
import React, { useState } from 'react';
import Badge from "@/assets/images/protectionbadge.png";
import { FaSuitcase, FaMoneyBillWave, FaClock, FaCalendarAlt } from "react-icons/fa";
import Image from 'next/image';

const SendProposal = () => {
  const [bidAmount, setBidAmount] = useState(0); // Initial bid amount
  const serviceFeePercentage = 0.1; // 10% service fee
  const serviceFee = bidAmount * serviceFeePercentage; // Calculated service fee
  const amountReceive = bidAmount - serviceFee; // Calculated amount you'll receive
  const freelancer = {
    experience_level: "Entry Level",
    project_budget: "$500",
    budget_type: "Fixed",
    project_deadline: "2024-06-30",
  };

  return (
    <>
      <div className="my-2 px-4 lg:px-8 py-5 text-left">
        <div className="flex flex-col lg:flex-row justify-between bg-white p-4 lg:p-6 rounded-md shadow-md w-full">
          {/* Left section - Job details */}
          <div className="flex flex-col lg:w-2/3 mb-6 lg:mb-0">
            <h1 className="text-2xl font-bold font-serif">Job Details</h1>
            <h2 className="text-xl font-serif mt-2">test</h2>

            {/* Category and Posted Date */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mt-4">
              <div className="px-3 py-1 bg-slate-200 text-blue-600 rounded-full">QA & Testing</div>
              <div className="text-gray-400">Posted 2 months ago</div>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-500">
              testtesttesttesttest
            </p>

            {/* Skills & Expertise */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-slate-200 px-3 py-1 rounded-full text-sm text-blue-600">AWS</span>
                <span className="bg-slate-200 px-3 py-1 rounded-full text-sm text-blue-600">CodeIgniter</span>
                <span className="bg-slate-200 px-3 py-1 rounded-full text-sm text-blue-600">Cloud Migration</span>
              </div>
            </div>
          </div>

          {/* Right section - Job details summary */}
          <div className="flex flex-col space-y-4 mt-6 lg:mt-0 lg:w-1/3">
            {/* Experience Level */}
            <div className="flex items-start justify-between flex-col">
              <div className="flex items-start">
                <FaSuitcase className="text-gray-500 mr-2" />
                <p className="font-semibold">Experience Level</p>
              </div>
              <p className="text-gray-500">{freelancer.experience_level}</p>
            </div>

            {/* Project Budget */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <FaMoneyBillWave className="text-gray-500 mr-2" />
                <p className="font-semibold">Project Budget</p>
              </div>
              <p className="text-gray-500">{freelancer.project_budget}</p>
            </div>

            {/* Budget Type */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <FaClock className="text-gray-500 mr-2" />
                <p className="font-semibold">Budget Type</p>
              </div>
              <p className="text-gray-500">{freelancer.budget_type}</p>
            </div>

            {/* Project Deadline */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-500 mr-2" />
                <p className="font-semibold">Project Deadline</p>
              </div>
              <p className="text-gray-500">{freelancer.project_deadline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row bg-white p-4 lg:p-6 rounded-md shadow-md w-full space-y-6 lg:space-y-0 lg:space-x-8 justify-between">
        {/* Left Section - Add Bid Form */}
        <div className="flex flex-col lg:flex-row justify-between bg-white p-4 lg:p-6 rounded-md shadow-md w-full">

        <div className="flex flex-col w-full lg:w-2/3">
          <div className="text-2xl font-serif font-bold">Add Bid</div>
          <div className="text-xl font-serif mt-4">
            What is the rate you&apos;d like to bid for this job?
          </div>

          {/* Rate Type and Select */}
          <div className="flex justify-between items-center mt-6">
            <label htmlFor="rateType" className="text-base font-medium">Rate Type</label>
              <select id="rateType" className="border border-gray-300 rounded-md px-3 py-2 w-1/3">
                <option value="hourly">Hourly</option>
                <option value="fixed">Fixed</option>
              </select>
          </div>


          {/* Bid Amount */}
          <div className="flex justify-between items-center mt-4">
            <label htmlFor="bidAmount" className="text-base font-medium">Bid Amount</label>
              <input
                id="bidAmount"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 w-1/3 text-right text-gray-500"
                placeholder="$0.00"
            />
          </div>


          {/* Alanced Service Fee */}
          <div className="flex justify-between items-center mt-4">
            <label htmlFor="serviceFee" className="text-base font-medium">10% Alanced Service Fee</label>
              <input
                id="serviceFee"
                type="text"
                value={`-$${serviceFee.toFixed(2)}`}
              className="border border-gray-300 rounded-md px-3 py-2 w-1/3 text-right text-gray-500"
              readOnly
              aria-label="Alanced Service Fee"
          />
          </div>


          {/* You’ll Receive */}
          <div className="flex justify-between items-center mt-4">
          <label htmlFor="amountReceive" className="text-base font-medium">You&apos;ll Receive</label>
            <input
              id="amountReceive"
              type="text"
              value={`$${amountReceive.toFixed(2)}`}
            className="border border-gray-300 rounded-md px-3 py-2 w-1/3 text-right text-gray-500"
            readOnly
/>

          </div>
        </div>

        {/* Right Section - Alanced Protection Badge */}
        <div className="flex items-center justify-center lg:w-1/3">
          <Image 
            src={Badge} 
            alt="Protection Badge" 
            className="ml-4 w-20 h-20 lg:w-32 lg:h-32" 
          />
          <p className="ml-4 text-gray-500">Includes Alanced Hourly Protection.</p>
        </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row bg-white p-4 lg:p-6 rounded-md shadow-md w-full space-y-6 lg:space-y-0 lg:space-x-8 justify-between">
        {/* Left Section - Add Bid Form */}
        <div className="flex flex-col lg:flex-row justify-between bg-white p-4 lg:p-6 rounded-md shadow-md w-full">
          <div className="flex flex-col w-full lg:w-2/3">
          <div className="text-2xl font-serif font-bold">Additional details</div>
          <div className="text-xl font-serif mt-4">Cover Letter</div>
          <textarea 
          className="border border-gray-400 rounded-md px-2 py-2 mt-4 h-60 w-full"
          placeholder="Write your cover here..."          
          >
          </textarea>
          </div>
          </div>
          </div>
      {/* Existing component code */}
      
      {/* Add buttons at the end */}
      <div className="flex justify-between mt-6">
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-4 ml-4 rounded-md">
          Cancel
        </button>
        <button 
          className={`${
            bidAmount > 0 ? "bg-gray-500" : "bg-gray-300"
          } text-white py-2 px-4 rounded-md mr-4`} 
          disabled={bidAmount <= 0}
        >
          Send
        </button>
      </div>
    </>
  );
};

export default SendProposal;
