"use client";
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const ContractCard: React.FC<{
  title: string;
  budget: string;
  freelancer: string;
  sentDate: string;
  status: string;
  deadline: string;
}> = ({ title, budget, freelancer, sentDate, status, deadline }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between border border-gray-300 rounded-lg p-4 mb-4 w-full bg-white shadow-sm">
      <div className="flex flex-col items-start flex-grow">
        <span className="font-semibold py-2 text-lg">{title}</span>
        <span className="text-sm">Budget: <span className="text-gray-500">{budget}</span></span>
        <span className="text-sm">Hired Freelancer: <span className="text-gray-500">{freelancer}</span></span>
      </div>

      <div className="flex flex-col text-gray-500 flex-grow mt-4 sm:mt-0">
        <span className="text-sm">Sent: {sentDate}</span>
      </div>

      <div className="flex flex-col items-end flex-grow mt-4 sm:mt-0">
        <div className="flex items-center space-x-4 mb-2">
          <span className={`text-yellow-600 ${status === 'Completed' ? 'bg-yellow-100' : 'bg-green-300'} rounded-lg px-4 py-2`}>
            {status}
          </span>
          <button className="px-3 py-2 rounded-md bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white">Add Review</button>
        </div>
        <span className="text-sm">Deadline: <span className="text-gray-500">{deadline}</span></span>
      </div>
    </div>
  );
};

const AllContractsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto max-w-screen-xl">
      <h1 className="font-cardo text-2xl sm:text-3xl md:text-4xl text-[#031136] font-normal mb-6">
        All Contracts
      </h1>

      <div className="flex items-center border border-gray-300 rounded-lg p-2 shadow-sm mb-6 w-full max-w-3xl">
        <IoIosSearch className="w-5 h-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search contracts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 py-2 border-none focus:outline-none"
        />
        <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-2 ml-2">
          <IoIosSearch className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <ContractCard
          title="CRM Application"
          budget="$1000 Fixed"
          freelancer="Sachin Sharma"
          sentDate="Feb 16, 2024"
          status="Completed"
          deadline="Apr 1, 2024"
        />
        <ContractCard
          title="Real Estate CRM App"
          budget="$10 Hourly"
          freelancer="Sachin Sharma"
          sentDate="Aug 3, 2024"
          status="Active"
          deadline="Dec 31, 2024"
        />
      </div>
    </div>
  );
};

export default AllContractsPage;
