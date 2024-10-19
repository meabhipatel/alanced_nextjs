"use client";
import React, { useState, useEffect } from "react"; // Consolidated imports
import { IoIosSearch } from "react-icons/io";
// import 'react-loading-skeleton/dist/skeleton.css';
import { formatDateInput } from "@/utils/timeFunction";
//import { useSelector } from 'react-redux';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import contractimg from "@/assets/images/Frame.png";
import Image from "next/image";
import { axiosWithAuth } from "@/utils/axiosWithAuth";

interface Contract {
  project_title: string;
  project_deadline: string;
  hiring_budget: number;
  Received_time: string;
  hiring_budget_type: string;
  hired_by: string;
}

const AllContracts = () => {
  //const accessToken = useSelector((state: any) => state.login.accessToken) || localStorage.getItem('jwtToken');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewallfreecontracts, setViewAllfreecontracts] = useState<Contract[]>([]);

  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axiosWithAuth
      .get(`/freelance/View-all/freelancer-contracts?${queryString}`)
      .then((response) => {
        setViewAllfreecontracts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error fetching filtered data:", error);
      });
  }, [currentPage, searchQuery]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const isJobOpen = (deadline: string): boolean => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return now < deadlineDate;
  };

  function highlightText(text: string | number, query: string) {
    if (!query || (typeof text !== "string" && typeof text !== "number")) {
      return text;
    }

    const textString = String(text);
    const regex = new RegExp(`(${query})`, "gi");

    return textString.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            style={{ backgroundColor: "#73cbfa" }}
          >
            {part}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }

  return (
    <>
      <div className="container mt-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40">
        <h1 className="text-left text-2xl font-semibold">All Contracts</h1>
        <section className="mt-4 flex items-center rounded-lg border border-[#E7E8F2] p-1">
          <div className="mr-1 flex w-full items-center space-x-1">
            <IoIosSearch className="h-5 w-5 text-gray-500" />
            <input
              className="font-inter h-7 w-full border-0 text-sm font-normal outline-none lg:text-sm"
              placeholder="Search contracts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="h-8 w-8 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-2 text-xs font-semibold text-white lg:text-sm">
            <IoIosSearch className="h-5 w-5 text-white" />
          </button>
        </section>
        <div className="my-8 rounded border border-[#E7E8F2] px-4 py-5 sm:px-6 md:px-8">
          {viewallfreecontracts.length > 0 ? (
            viewallfreecontracts.map((contract, index) => (
              <div
                key={index}
                className="my-5 border-b border-[#E7E8F2] bg-[#FFFFFF]"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1">
                    <div className="text-left text-lg font-semibold">
                      {highlightText(contract.project_title, searchQuery)}
                    </div>
                    <p className="font-inter mt-3 text-left text-[14px] font-normal text-[#031136]">
                      Budget:{" "}
                      <span className="opacity-50">
                        ${highlightText(contract.hiring_budget, searchQuery)}{" "}
                        {highlightText(contract.hiring_budget_type, searchQuery)}
                      </span>
                    </p>
                  </div>
                  <div className="flex-none">
                    <div
                      className={
                        isJobOpen(contract.project_deadline)
                          ? "mt-1 font-semibold text-blue-600"
                          : "mt-1 font-semibold text-yellow-600"
                      }
                    >
                      {isJobOpen(contract.project_deadline) ? "Active" : "Completed"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1">
                    <p className="font-inter py-2 text-left text-[14px] font-normal text-[#031136]">
                      Hired by:{" "}
                      <span className="opacity-50">
                        {highlightText(contract.hired_by, searchQuery)}
                      </span>
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-inter text-left text-[14px] font-normal text-[#031136]">
                      Received:{" "}
                      <span className="text-[#0365c0]">
                        {formatDateInput(contract.Received_time)}
                      </span>
                    </p>
                  </div>
                  <div className="flex-none">
                    <p className="font-inter text-left text-[14px] font-normal text-[#031136]">
                      Deadline:{" "}
                      <span className="text-[#0365c0]">
                        {formatDateInput(contract.project_deadline)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <Image
                src={contractimg}
                alt="No Contracts Found"
                className="mx-auto"
                width={500}
                height={300}
              />
              <div className="px-4 py-5 text-center text-2xl opacity-50 md:px-8">
                No Contracts Found
              </div>
            </>
          )}
        </div>
        {/* Skeleton Loader Section */}
        {/* {viewallfreecontracts.length === 0 && (
          <div>{[...Array(8)].map((_, index) => (
              <div key={index} className='flex mt-4'>
                  <div className='ml-10 mr-60'>
                      <Skeleton height={20} width={200} />
                      <Skeleton height={20} width={100} style={{ marginTop: 10 }} />
                  </div>
                  <Skeleton height={20} width={300} />
                  <Skeleton height={20} width={200} style={{ marginLeft: 180 }} />
              </div>
          ))}</div>
      )} */}
        {totalPages > 1 && (
          <div className="m-4 flex items-center justify-center gap-6 md:justify-end">
            <button
              className={`flex h-8 w-8 items-center justify-center rounded-full ${currentPage === 1 ? "bg-gray-300" : "bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"} text-white`}
              onClick={prev}
              disabled={currentPage === 1}
              style={{ border: "none" }}
            >
              <FaArrowLeft className="h-4 w-4" />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`px-2 py-1 ${currentPage === pageNumber ? "font-inter bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent" : "font-inter text-[14px] font-bold text-[#0A142F]"}`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setCurrentPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              className={`flex h-8 w-8 items-center justify-center rounded-full ${currentPage === totalPages ? "bg-gray-300" : "bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"} text-white`}
              onClick={next}
              disabled={currentPage === totalPages}
              style={{ border: "none" }}
            >
              <FaArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllContracts;
