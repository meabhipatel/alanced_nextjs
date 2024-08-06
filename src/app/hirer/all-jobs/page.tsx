"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

const AllJobsPage: React.FC = () => {
  const [clickedButton, setClickedButton] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<number | null>(null); 
  const router = useRouter();

  const handleButtonClick = (buttonId: number) => {
    setClickedButton(buttonId);
    if (buttonId === 2) {
      router.push("/hirer/contracts"); 
    }
  };

  const handleJobClick = (index: number) => {
    setSelectedJob(index); 
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      handleJobClick(index);
    }
  };

  const getButtonClass = (buttonId: number) => {
    return `px-8 py-3 rounded-lg border ${
      clickedButton === buttonId
        ? "text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"
        : "text-gray-500 bg-gray-100 border-gray-300"
    }`;
  };

  const jobPosts = [
    {
      title: "CRM Application",
      details: "Fixed Rate - Entry Level - Posted 5 months ago",
      proposals: 0,
      messaged: 1,
      invitations: 1,
      status: "Closed",
      statusColor: "bg-[#F7C52E]",
    },
    {
      title: "Real Estate CRM App",
      details: "Fixed Rate - Intermediate - Posted 2 months ago",
      proposals: 0,
      messaged: 1,
      invitations: 1,
      status: "Closed",
      statusColor: "bg-[#F7C52E]",
    },
    {
      title: "Desi Akhada App",
      details: "Fixed Rate - Intermediate - Posted 2 months ago",
      proposals: 0,
      messaged: 0,
      invitations: 0,
      status: "Open",
      statusColor: "bg-[#0070F2]",
    },
  ];

  return (
    <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto max-w-screen-xl">
      <div className="flex gap-4 mb-4">
        <button
          className={getButtonClass(1)}
          onClick={() => handleButtonClick(1)}
        >
          All Job Posts
        </button>
        <Link href="/hirer/contracts" className={getButtonClass(2)}>
          All Contracts
        </Link>
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg p-2 shadow-sm mb-6 w-full max-w-3xl">
        <IoIosSearch className="w-5 h-5 text-gray-400 ml-3" />
        <input
          type="text"
          placeholder="Search job posts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 py-2 border-none focus:outline-none"
        />
        <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-2 ml-2">
          <IoIosSearch className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-4 w-full max-w-screen-xl">
        {jobPosts.map((job, index) => (
          <div
            key={index}
            className={`flex justify-between items-center border-b border-gray-300 py-4 rounded-lg transition-transform transform hover:scale-105 cursor-pointer hover:bg-gray-50 ${
              selectedJob === index ? "bg-gray-100" : ""
            }`}
            onClick={() => handleJobClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="button"
            tabIndex={0}
          >
            <div className="flex flex-col w-full">
              <span className="font-medium text-gray-800">{job.title}</span>
              <span className="text-sm text-gray-500">{job.details}</span>
            </div>
            <div className="flex flex-wrap items-center space-x-4 sm:space-x-8">
              <div className="text-center">
                <span className="font-medium text-gray-800">{job.proposals}</span>
                <div className="text-sm text-gray-500">Proposals</div>
              </div>
              <div className="text-center">
                <span className="font-medium text-gray-800">{job.messaged}</span>
                <div className="text-sm text-gray-500">Messaged</div>
              </div>
              <div className="text-center">
                <span className="font-medium text-gray-800">{job.invitations}</span>
                <div className="text-sm text-gray-500">Invitations</div>
              </div>
              <button className="text-[#0070F2] border border-[#0070F2] rounded-lg px-4 py-1">
                View Proposals
              </button>
              <span className={`${job.statusColor} text-white rounded-lg px-3 py-1`}>
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllJobsPage;
