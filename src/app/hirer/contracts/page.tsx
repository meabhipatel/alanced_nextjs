"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import AddReviewPopup from "@/components/pop-up";
import { formatDateInput } from "@/utils/timeFunction";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import contractimg from "@/assets/images/Frame.png";

interface Contract {
  hire_id: number;
  project_id: number;
  freelancer_id: number;
  project_title: string;
  hiring_budget: number;
  hiring_budget_type: string;
  project_deadline: string;
  hired_freelancer_name: string;
  Sent_time: string;
}

const AllHirerContracts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewallhirercontracts, setViewAllhirercontracts] = useState<Contract[]>([]);
  const [isReviewOpen, setIsReviewOpen] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);
    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/freelance/View-all/hirer-contracts?${queryString}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1Nzc5NDQ1LCJpYXQiOjE3MjQyNDM0NDUsImp0aSI6ImY1YWI4ZjgzYzdlZjQ2Y2Y5YjZjYTY0N2NhODFlZTBlIiwidXNlcl9pZCI6NX0.gHOhD42TJxQoRKt34wdwBN3cBp04_Ugj5zZoGQgDOag`,
        },
      })
      .then((response) => {
        setViewAllhirercontracts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        //eslint-disable-next-line
        console.error("Error fetching filtered data:", error);
      });
  }, [currentPage, searchQuery]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const isJobOpen = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return now < deadlineDate;
  };

  const highlightText = (text: string, query: string) => {
    if (!query || (typeof text !== "string" && typeof text !== "number")) {
      return text;
    }

    const textString = String(text);
    const regex = new RegExp(`(${query})`, "gi");

    return textString.split(regex).map((part, index) => (
      <span
        key={index}
        style={{ backgroundColor: index % 2 === 1 ? "#73cbfa" : "inherit" }}
      >
        {part}
      </span>
    ));
  };

  const openReview = (hireId: number) => {
    setIsReviewOpen((prevState) => ({
      ...prevState,
      [hireId]: true,
    }));
  };

  const closeReview = (hireId: number) => {
    setIsReviewOpen((prevState) => ({
      ...prevState,
      [hireId]: false,
    }));
  };

  return (
    <>
      <div className="mt-5 px-4 md:px-10 lg:px-40">
        <h1 className="font-cardo text-left text-xl font-normal md:text-2xl">All Contracts</h1>
        <section className="mt-4 flex items-center rounded-lg border border-[#E7E8F2] p-2">
          <div className="mr-2 flex w-full items-center space-x-2">
            <IoIosSearch className="h-5 w-5" />
            <input
              className="font-inter h-8 w-full border-0 text-sm font-normal outline-none lg:text-sm"
              placeholder="Search contracts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="h-8 w-8 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-2 text-xs font-semibold text-white lg:text-sm">
            <IoIosSearch />
          </button>
        </section>
        <div className="my-8 rounded border border-[#E7E8F2] px-4 py-5 md:px-8">
          {viewallhirercontracts.length > 0 ? (
            viewallhirercontracts.map((contract) => (
              <div
                key={contract.hire_id}
                className="my-5 border-b border-[#E7E8F2] bg-[#FFFFFF]"
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:basis-8/12">
                    <div className="font-cardo text-left text-lg font-normal">
                      {highlightText(contract.project_title, searchQuery)}
                    </div>
                    <p className="font-inter mt-3 text-left text-[14px] font-normal text-[#031136]">
                      Budget:{" "}
                      <span className="opacity-50">
                        ${highlightText(String(contract.hiring_budget), searchQuery)}{" "}
                        {highlightText(contract.hiring_budget_type, searchQuery)}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 lg:mt-0 lg:basis-1/12"></div>
                  <div className="lg:basis-1/12">
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
                  <div className="mt-4 lg:mt-0 lg:basis-2/12">
                    <button
                      className="inline-block cursor-pointer rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-2 text-sm font-semibold text-white lg:px-6 lg:py-[10px]"
                      onClick={() => openReview(contract.hire_id)}
                    >
                      Add Review
                    </button>
                    {isReviewOpen[contract.hire_id] && (
                      <AddReviewPopup
                        closeReview={() => closeReview(contract.hire_id)}
                        contract={contract}
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row">
                  <div className="md:basis-5/12">
                    <p className="font-inter py-2 text-left text-[14px] font-normal text-[#031136]">
                      Hired Freelancer:{" "}
                      <span className="opacity-50">
                        {highlightText(contract.hired_freelancer_name, searchQuery)}
                      </span>
                    </p>
                  </div>
                  <div className="md:basis-5/12">
                    <p className="font-inter text-left text-[14px] font-normal text-[#031136]">
                      Sent:{" "}
                      <span className="text-[#0365c0]">{formatDateInput(contract.Sent_time)}</span>
                    </p>
                  </div>
                  <div className="md:basis-2/12">
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
                alt="No Contracts"
                className="mx-auto"
              />
              <div className="px-4 py-5 text-center text-2xl opacity-50 md:px-8">
                No Contracts Found
              </div>
            </>
          )}
        </div>
        {totalPages > 1 && (
          <div className="m-4 flex items-center justify-center gap-4 md:gap-6">
            <button
              className="rounded-full p-2"
              onClick={prev}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <FaChevronLeft />
            </button>
            <span className="text-center">
              {currentPage}/{totalPages}
            </span>
            <button
              className="rounded-full p-2"
              onClick={next}
              disabled={currentPage === totalPages}
              aria-label="Next Page"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllHirerContracts;
