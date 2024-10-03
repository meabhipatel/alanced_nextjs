"use client";
import React, { FC, useEffect, useState } from "react";
import Badge from "@/assets/images/protectionbadge.png";
import { FaSuitcase, FaMoneyBillWave, FaClock, FaCalendarAlt } from "react-icons/fa";
import Image from "next/image";
import { errorLog } from "@/utils/errorLog";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { IProject } from "@/app/(public-routes)/search-job/SearchJob";
import { timeAgo } from "@/utils/timeFunction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { AxiosError } from "axios";

interface IProjectDetils extends IProject {
  is_applied: boolean;
  total_bid_count: number;
}

interface IProps {
  params: {
    projectId: number;
  };
}

// eslint-disable-next-line
const SendProposal: FC<IProps> = ({ params: { projectId } }) => {
  const router = useRouter();
  const [projectDetails, setProjectDetails] = useState<IProjectDetils | null>(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [bidType, setBidType] = useState("Hourly");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const serviceFeePercentage = 0.1;
  const serviceFee = bidAmount * serviceFeePercentage;
  const amountReceive = bidAmount - serviceFee;

  /** ---> Fetching project details on load. */
  useEffect(() => {
    handleFetchProjectDetails();
  }, []);

  const handleFetchProjectDetails = async () => {
    try {
      const res = await axiosWithAuth.get(`/freelance/View/project-detail/${projectId}`);
      setProjectDetails(res.data.data[0]);
    } catch (error) {
      errorLog(error);
    }
  };

  const handleSendProposal = async () => {
    setIsLoading(true);
    const proposalData = {
      project_id: projectId,
      description: coverLetter,
      bid_amount: bidAmount,
      bid_type: bidType,
    };
    try {
      await axiosWithAuth.post(`/freelance/Add/bid/${projectId}`, proposalData);
      toast.success("Your proposal has been sent successfully.");
      router.replace(`/freelancer/view-proposal/${projectId}`);
    } catch (error) {
      errorLog(error);
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message);
      }
      toast.error("Something went wrong, Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="my-2 px-4 py-5 text-left lg:px-8">
        <div className="flex w-full flex-col justify-between rounded-md bg-white p-4 shadow-md lg:flex-row lg:p-6">
          {/* Left section - Job details */}
          <div className="mb-6 flex flex-col lg:mb-0 lg:w-2/3">
            <h1 className="text-2xl font-bold">Job Details</h1>
            <h2 className="mt-2 text-xl">{projectDetails?.title}</h2>

            {/* Category and Posted Date */}
            <div className="mt-4 flex flex-col items-start gap-4 lg:flex-row lg:items-center">
              <span className="rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                {projectDetails?.category}
              </span>
              <div className="text-gray-400">
                Posted {timeAgo(projectDetails?.project_creation_date ?? "")}
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-500">{projectDetails?.description}</p>

            {/* Skills & Expertise */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">Skills & Expertise</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {JSON.parse(projectDetails?.skills_required?.replace(/'/g, '"') ?? "[]").map(
                  (value: string) => {
                    return (
                      <span
                        key={value}
                        className="rounded-full bg-slate-200 px-3 py-1 text-sm text-blue-600"
                      >
                        {value}
                      </span>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* Right section - Job details summary */}
          <div className="mt-6 flex flex-col space-y-4 lg:mt-0 lg:w-1/3">
            {/* Experience Level */}
            <div className="flex flex-col items-start justify-between">
              <div className="flex items-start">
                <FaSuitcase className="mr-2 text-gray-500" />
                <p className="font-semibold">Experience Level</p>
              </div>
              <p className="text-gray-500">{projectDetails?.experience_level}</p>
            </div>

            {/* Project Budget */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <FaMoneyBillWave className="mr-2 text-gray-500" />
                <p className="font-semibold">Project Budget</p>
              </div>
              <p className="text-gray-500">{projectDetails?.fixed_budget}</p>
            </div>

            {/* Budget Type */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <FaClock className="mr-2 text-gray-500" />
                <p className="font-semibold">Budget Type</p>
              </div>
              <p className="text-gray-500">{projectDetails?.rate}</p>
            </div>

            {/* Project Deadline */}
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-500" />
                <p className="font-semibold">Project Deadline</p>
              </div>
              <p className="text-gray-500">{projectDetails?.deadline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col justify-between space-y-6 rounded-md bg-white p-4 shadow-md lg:flex-row lg:space-x-8 lg:space-y-0 lg:p-6">
        {/* Left Section - Add Bid Form */}
        <div className="flex w-full flex-col justify-between rounded-md bg-white p-4 shadow-md lg:flex-row lg:p-6">
          <div className="flex w-full flex-col lg:w-2/3">
            <div className="text-2xl font-bold">Add Bid</div>
            <div className="mt-4 text-xl">
              What is the rate you&apos;d like to bid for this job?
            </div>

            {/* Rate Type and Select */}
            <div className="mt-6 flex items-center justify-between">
              <label
                htmlFor="rateType"
                className="text-base font-medium"
              >
                Rate Type <span className="text-red-500">*</span>
              </label>
              <select
                id="rateType"
                className="w-1/3 rounded-md border border-gray-300 px-3 py-2"
                onChange={(e) => setBidType(e.target.value)}
                value={bidType}
              >
                <option value="Hourly">Hourly</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            {/* Bid Amount */}
            <div className="mt-4 flex items-center justify-between">
              <label
                htmlFor="bidAmount"
                className="text-base font-medium"
              >
                Bid Amount<span className="text-red-500">*</span>
              </label>
              <input
                id="bidAmount"
                type="number"
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                className="w-1/3 rounded-md border border-gray-300 px-3 py-2 text-right text-gray-500"
                placeholder="$0.00"
              />
            </div>

            {/* Alanced Service Fee */}
            <div className="mt-4 flex items-center justify-between">
              <label
                htmlFor="serviceFee"
                className="text-base font-medium"
              >
                10% Alanced Service Fee
              </label>
              <input
                id="serviceFee"
                type="text"
                value={`-$${serviceFee.toFixed(2)}`}
                className="w-1/3 rounded-md border border-gray-300 px-3 py-2 text-right text-gray-500"
                readOnly
                aria-label="Alanced Service Fee"
              />
            </div>

            {/* You’ll Receive */}
            <div className="mt-4 flex items-center justify-between">
              <label
                htmlFor="amountReceive"
                className="text-base font-medium"
              >
                You&apos;ll Receive
              </label>
              <input
                id="amountReceive"
                type="text"
                value={`$${amountReceive.toFixed(2)}`}
                className="w-1/3 rounded-md border border-gray-300 px-3 py-2 text-right text-gray-500"
                readOnly
              />
            </div>
          </div>

          {/* Right Section - Alanced Protection Badge */}
          <div className="flex items-center justify-center lg:w-1/3">
            <Image
              src={Badge}
              alt="Protection Badge"
              className="ml-4 h-20 w-20 lg:h-32 lg:w-32"
            />
            <p className="ml-4 text-gray-500">Includes Alanced Hourly Protection.</p>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between space-y-6 rounded-md bg-white p-4 shadow-md lg:flex-row lg:space-x-8 lg:space-y-0 lg:p-6">
        {/* Left Section - Add Bid Form */}
        <div className="flex w-full flex-col justify-between rounded-md bg-white p-4 shadow-md lg:flex-row lg:p-6">
          <div className="flex w-full flex-col lg:w-2/3">
            <div className="text-2xl font-bold">Additional details</div>
            <div className="mt-4 text-xl">
              Cover Letter <span className="text-red-500">*</span>
            </div>
            <textarea
              onChange={(e) => setCoverLetter(e.target.value)}
              className="mt-4 h-60 w-full rounded-md border border-gray-400 px-2 py-2"
              placeholder="Write your cover here..."
            ></textarea>
          </div>
        </div>
      </div>
      {/* Existing component code */}

      {/* Add buttons at the end */}
      <div className="mt-6 flex justify-between">
        <button className="ml-4 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 px-4 py-2 text-white">
          Cancel
        </button>
        <button
          onClick={handleSendProposal}
          className={`${
            bidAmount > 0 && coverLetter
              ? "bg-gradient-to-r from-blue-500 to-blue-700"
              : "bg-gray-300"
          } mr-4 flex gap-2 rounded-md px-4 py-2 text-white`}
          disabled={bidAmount <= 0 || isLoading}
        >
          {isLoading && <Loader />} Send Proposal
        </button>
      </div>
    </>
  );
};

export default SendProposal;
