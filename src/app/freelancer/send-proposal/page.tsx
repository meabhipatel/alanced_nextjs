import React from "react";
import { FaSuitcase, FaMoneyBillWave, FaClock, FaCalendarAlt } from "react-icons/fa"; // Import icons

const SendProposal = () => {
  const freelancer = {
    experience_level: "Entry Level",
    project_budget: "$500",
    budget_type: "Fixed",
    project_deadline: "2024-06-30",
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between bg-white p-6 rounded-md shadow-md w-full">
      {/* Left section - Job details */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold font-serif">Job Details</h1>
        <h2 className="text-xl font-serif mt-2">test</h2>

        {/* Category and Posted Date */}
        <div className="flex flex-row items-center gap-4 mt-4">
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
      <div className="flex flex-col space-y-4 mt-6 lg:mt-0">
        {/* Experience Level */}
        <div className="flex items-start justify-between flex-col">
          <div className="flex items-start">
            <FaSuitcase className="text-gray-500 mr-2 " />
            <p className="font-semibold">Experience Level</p>
          </div>
          <p className="text-gray-500">{freelancer.experience_level}</p>
        </div>

        {/* Project Budget */}
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center">
            <FaMoneyBillWave className="text-gray-500 mr-2" />
            <p className="font-semibold">Project Budget</p>
          </div>
          <p className="text-gray-500">{freelancer.project_budget}</p>
        </div>

        {/* Budget Type */}
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center">
            <FaClock className="text-gray-500 mr-2" />
            <p className="font-semibold">Budget Type</p>
          </div>
          <p className="text-gray-500">{freelancer.budget_type}</p>
        </div>

        {/* Project Deadline */}
        <div className="flex items-center flex-col justify-between">
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <p className="font-semibold">Project Deadline</p>
          </div>
          <p className="text-gray-500">{freelancer.project_deadline}</p>
        </div>
      </div>
    </div>
  );
};

export default SendProposal;
