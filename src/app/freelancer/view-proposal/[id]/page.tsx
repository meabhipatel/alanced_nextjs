import React from 'react';
import { FaUserShield, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';
import { MdLocationOn, MdVerified } from 'react-icons/md';

const ViewProposal = () => {
  return (
    <div className="flex flex-col p-4 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-2xl font-serif font-bold mb-6 text-center lg:text-left text-gray-800">
        Proposal Details
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-lg p-6 lg:flex lg:space-x-8 transition-all duration-300 hover:shadow-xl">
        {/* Job Details Section */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-bold text-gray-800">Job Details</h2>
          <h3 className="text-lg font-semibold mt-2 text-gray-700">Fitness Tracking App</h3>
          <div className="flex items-center space-x-2 mt-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">
              Web Development
            </span>
            <span className="text-sm text-gray-500">Posted 8 months ago</span>
          </div>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Developed a fitness tracking application with React for the frontend
            and Django Rest Framework for the backend. Implemented workout logs,
            progress charts, and goal-setting features.
          </p>

          {/* Skills Section */}
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-3 mt-3">
              {['PHP', 'WordPress', 'Shopify', 'CSS', 'HTML', 'Figma'].map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Proposed Terms Section */}
          <div className="mt-6 bg-white shadow-lg rounded-lg p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-4">
              <div className="text-base font-semibold text-gray-800">
                Your Proposed Terms
              </div>
              <div className="text-sm text-gray-600 mt-2 lg:mt-0">
                Client&apos;s budget: <span className="font-bold text-blue-600">$4/hr - $8/hr</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-base font-semibold text-gray-800 mb-4">
                How do you want to be paid?
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-300">
                  <span className="block text-gray-800 font-medium">By Project</span>
                  <span className="block text-gray-500 text-sm mt-4">
                    Total price of project
                  </span>
                  <span className="block text-gray-500 text-sm mt-1">
                    This includes all milestones and is the amount your client will see.
                  </span>
                </div>

                <div className="bg-gray-50 p-4 rounded-md shadow-sm hover:bg-gray-100 transition duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-medium">Total Project Price:</span>
                    <span className="text-blue-600 font-semibold">$11.00</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-700 font-medium">You&apos;ll Receive:</span>
                    <span className="text-green-500 font-semibold">$9.90</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    The estimated payment after service fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Details Section */}
        <div className="w-full lg:w-1/3 mt-8 lg:mt-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0">
          <h4 className="text-md font-semibold mb-4 text-gray-700">About the client</h4>
          <ul className="space-y-4">
            <li className="flex items-center text-sm text-gray-500">
              <MdVerified className="mr-2 text-gray-400" />
              <span className="font-medium">Payment method not verified</span>
            </li>
            <li className="flex items-center">
              <FaUserShield className="mr-2 text-blue-500" />
              <span className="font-medium text-gray-600">Owner Name:</span> 
              <span className="ml-2 text-gray-800">Pihu</span>
            </li>
            <li className="flex items-center">
              <MdLocationOn className="mr-2 text-red-500" />
              <span className="font-medium text-gray-600">Location:</span> 
              <span className="ml-2 text-gray-800">Gujarat</span>
            </li>
            <li className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-600" />
              <span className="font-medium text-gray-600">History:</span> 
              <span className="ml-2 text-gray-800">Member since 2023-12-30</span>
            </li>
          </ul>

          {/* Project Details Section */}
          <div className="mt-8">
            <h4 className="text-md font-semibold text-gray-700 mb-4">Project Details</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaUserShield className="mr-2 text-blue-500" />
                <div>
                  <span className="font-bold text-gray-800">Intermediate</span>
                  <p className="text-sm text-gray-500">Experience level</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaDollarSign className="mr-2 text-green-500" />
                <div>
                  <span className="font-bold text-gray-800">Propose your terms</span>
                  <p className="text-sm text-gray-500">Hourly price</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-600" />
                <div>
                  <span className="font-bold text-gray-800">Project Deadline</span>
                  <p className="text-sm text-gray-500">2024-01-03</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProposal;
