import React from "react";
import { FaUserShield, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { MdLocationOn, MdVerified } from "react-icons/md";

const ViewProposal = () => {
  return (
    <div className="flex min-h-screen flex-col p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6 text-center font-serif text-2xl font-bold text-gray-800 lg:text-left">
        Proposal Details
      </div>

      {/* Main Content */}
      <div className="rounded-lg bg-gray-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl lg:flex lg:space-x-8">
        {/* Job Details Section */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-bold text-gray-800">Job Details</h2>
          <h3 className="mt-2 text-lg font-semibold text-gray-700">Fitness Tracking App</h3>
          <div className="mt-2 flex items-center space-x-2">
            <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              Web Development
            </span>
            <span className="text-sm text-gray-500">Posted 8 months ago</span>
          </div>
          <p className="mt-4 leading-relaxed text-gray-600">
            Developed a fitness tracking application with React for the frontend and Django Rest
            Framework for the backend. Implemented workout logs, progress charts, and goal-setting
            features.
          </p>

          {/* Skills Section */}
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700">Skills & Expertise</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              {["PHP", "WordPress", "Shopify", "CSS", "HTML", "Figma"].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-blue-600 shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Proposed Terms Section */}
          <div className="mt-6 rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex flex-col items-center justify-between lg:flex-row lg:space-x-4">
              <div className="text-base font-semibold text-gray-800">Your Proposed Terms</div>
              <div className="mt-2 text-sm text-gray-600 lg:mt-0">
                Client&apos;s budget: <span className="font-bold text-blue-600">$4/hr - $8/hr</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-4 text-base font-semibold text-gray-800">
                How do you want to be paid?
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-md bg-gray-50 p-4 shadow-sm transition duration-300 hover:bg-gray-100">
                  <span className="block font-medium text-gray-800">By Project</span>
                  <span className="mt-4 block text-sm text-gray-500">Total price of project</span>
                  <span className="mt-1 block text-sm text-gray-500">
                    This includes all milestones and is the amount your client will see.
                  </span>
                </div>

                <div className="rounded-md bg-gray-50 p-4 shadow-sm transition duration-300 hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Total Project Price:</span>
                    <span className="font-semibold text-blue-600">$11.00</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-medium text-gray-700">You&apos;ll Receive:</span>
                    <span className="font-semibold text-green-500">$9.90</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    The estimated payment after service fees.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Details Section */}
        <div className="mt-8 w-full border-t border-gray-200 pt-6 lg:mt-0 lg:w-1/3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h4 className="text-md mb-4 font-semibold text-gray-700">About the client</h4>
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
            <h4 className="text-md mb-4 font-semibold text-gray-700">Project Details</h4>
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
