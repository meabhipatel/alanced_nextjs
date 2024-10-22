"use client";
import { IProject } from "@/app/(public-routes)/search-job/SearchJob";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { errorLog } from "@/utils/errorLog";
import { timeAgo } from "@/utils/timeFunction";
import React, { FC, useEffect, useState } from "react";
import { FaUserShield, FaDollarSign, FaCalendarAlt } from "react-icons/fa";
import { MdLocationOn, MdVerified } from "react-icons/md";

interface IProposalData {
  id: number;
  bid_amount: number;
  description: string;
  bid_type: string;
  bid_time: string;
  freelancer_id: number;
  project_id: number;
  project: IProject;
}

interface IProps {
  params: {
    projectId: number;
  };
}

const ViewProposal: FC<IProps> = ({ params: { projectId } }) => {
  const [proposalData, setProposalData] = useState<IProposalData | null>(null);

  /** ---> Fetching proposal data onload. */
  useEffect(() => {
    handleFetchProposalData();
  }, []);

  const handleFetchProposalData = async () => {
    try {
      const res = await axiosWithAuth.get(
        `/freelance/view/freelancer-self/project-bid/${projectId}`
      );
      setProposalData(res.data.data[0]);
    } catch (error) {
      errorLog(error);
    }
  };

  return (
    <div className="container sm:px-5 md:px-10 lg:px-20">
      <div className="mb-6 text-center text-2xl font-bold text-gray-800 lg:text-left">
        Proposal Details
      </div>

      <div className="rounded-lg bg-gray-50 p-6 shadow-lg transition-all duration-300 hover:shadow-xl lg:flex lg:space-x-8">
        <div className="w-full lg:w-2/3">
          <h2 className="text-xl font-bold text-gray-800">Job Details</h2>
          <h3 className="mt-2 text-lg font-semibold text-gray-700">
            {proposalData?.project.title}
          </h3>
          <div className="mt-2 flex items-center space-x-2">
            <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
              {proposalData?.project.category}
            </span>
            <span className="text-sm text-gray-500">
              Posted {timeAgo(proposalData?.bid_time ?? "")}
            </span>
          </div>
          <p className="mt-4 leading-relaxed text-gray-600">{proposalData?.project.description}</p>

          {/* Skills Section */}
          <div className="mt-6">
            <h4 className="text-md font-semibold text-gray-700">Skills & Expertise</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              {JSON.parse(proposalData?.project?.skills_required?.replace(/'/g, '"') ?? "[]").map(
                (value: string) => {
                  return (
                    <span
                      key={value}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-blue-600 shadow-sm"
                    >
                      {value}
                    </span>
                  );
                }
              )}
            </div>
          </div>

          {/* Proposed Terms Section */}
          <div className="mt-6 rounded-lg bg-white p-6 shadow-sm transition-all duration-300">
            <div className="flex flex-col items-center justify-between lg:flex-row lg:space-x-4">
              <div className="text-base font-semibold text-gray-800">Your Proposed Terms</div>
              <div className="mt-2 text-sm text-gray-600 lg:mt-0">
                Client&apos;s budget:{" "}
                <span className="font-bold text-blue-600">
                  ${" "}
                  {proposalData?.project.rate === "Hourly"
                    ? proposalData.project.min_hourly_rate +
                      "/hr" +
                      " - " +
                      "$" +
                      proposalData.project.max_hourly_rate +
                      "/hr"
                    : proposalData?.project.fixed_budget}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="ml-4">
                  <div className="mb-1 text-base font-semibold text-gray-800">
                    How do you want to be paid?
                  </div>
                  <span className="mb-4 block text-sm text-gray-500">By Project</span>
                  <span className="mb-4 mt-4 text-base font-semibold text-gray-800">
                    Total price of project
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    This includes all milestones, and is the amount your client will see.
                  </span>
                  <div className="mt-4">
                    <div className="block text-sm font-semibold text-gray-800">
                      ${proposalData?.bid_amount}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-base font-semibold text-gray-800">
                      You&apos;ll Receive:
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    The estimated payment, after service fees.
                  </p>
                  <div className="mt-2 font-semibold text-green-500">
                    ${Number(proposalData?.bid_amount) - Number(proposalData?.bid_amount) / 10}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div className="col-span-1 rounded-md bg-gray-100 p-4 shadow-sm transition duration-300 lg:col-span-2">
                    <div className="text-base font-semibold text-gray-800">Cover Letter</div>
                    <div className="text-sm text-gray-500">{proposalData?.description}</div>
                  </div>
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
              <span className="ml-2 text-gray-800">{proposalData?.project.project_owner_name}</span>
            </li>
            <li className="flex items-center">
              <MdLocationOn className="mr-2 text-red-500" />
              <span className="font-medium text-gray-600">Location:</span>
              <span className="ml-2 text-gray-800">
                {proposalData?.project.project_owner_location}
              </span>
            </li>
            <li className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-600" />
              <span className="font-medium text-gray-600">History:</span>
              <span className="ml-2 text-gray-800">
                Member since {proposalData?.project.project_owner_date_of_creation}
              </span>
            </li>
          </ul>

          {/* Project Details Section */}
          <div className="mt-8">
            <h4 className="text-md mb-4 font-semibold text-gray-700">Project Details</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaUserShield className="mr-2 text-blue-500" />
                <div>
                  <span className="font-bold text-gray-800">Experience level</span>
                  <p className="text-sm text-gray-500"> {proposalData?.project.experience_level}</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaDollarSign className="mr-2 text-green-500" />
                <div>
                  <span className="font-bold text-gray-800">Propose your terms</span>
                  <p className="text-sm text-gray-500"> {proposalData?.project.rate} Price</p>
                </div>
              </li>
              <li className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-600" />
                <div>
                  <span className="font-bold text-gray-800">Project Deadline</span>
                  <p className="text-sm text-gray-500"> {proposalData?.project.deadline}</p>
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
