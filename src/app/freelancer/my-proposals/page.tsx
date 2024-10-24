"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import Bag from "@/assets/icons/file.png";
import { timeAgo } from "@/utils/timeFunction";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { errorLog } from "@/utils/errorLog";
import Loader from "@/components/Loader";
import { handleFetchPendingHireRequestAsync } from "@/store/features/freelancer/freelancerApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

interface IBidDetails {
  id: number;
  bid_amount: number;
  description: string;
  bid_type: string;
  bid_time: string;
  freelancer_id: number;
  project_id: number;
  project: {
    title: string;
    category: string;
    description: string;
    skills_required: string;
    Project_rate: string;
    Project_budget: number | null;
    Project_min_hourly_rate: number;
    Project_max_hourly_rate: number;
    Project_experience_level: string;
    deadline: string;
    created_at: string;
    project_owner_Name: string;
    project_owner_location: string;
    project_owner_date_of_creation: string;
  };
}

const MyProposals = () => {
  const dispatch = useAppDispatch();
  const {
    data: { count, results: pendingHireRequest },
  } = useAppSelector((state) => state.freelancer.pendingHireRequest);
  const [currentBidPage, setCurrentBidPage] = useState(1);
  const [totalBidPages, setTotalBidPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalHiringReqPages, setTotalHiringReqPages] = useState(0);
  const [viewFreeBid, setViewFreeBid] = useState<IBidDetails[]>([]);
  const [selectedButton, setSelectedButton] = useState("Active");
  const [isLoading, setIsLoading] = useState(true);

  const commonStyle = "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  /** ---> Fetching freelancer self bid  */
  useEffect(() => {
    handleFetchFreelancerSelfBid();
  }, [currentBidPage]);

  const handleFetchFreelancerSelfBid = async () => {
    setIsLoading(true);
    try {
      const res = await axiosWithAuth.get(
        `/freelance/view/freelancer-self/bid?page=${currentBidPage}`
      );
      setViewFreeBid(res.data.results);
      setTotalBidPages(Math.ceil(res.data.count / 6));
    } catch (error) {
      errorLog(error);
    } finally {
      setIsLoading(false);
    }
  };

  /** ---> Fetching pending hire request  */
  useEffect(() => {
    dispatch(handleFetchPendingHireRequestAsync({ page: currentPage }));
  }, [currentPage]);

  /** ---> Setting the page no. after getting total hire request cound */
  useEffect(() => {
    if (count > 0) {
      setTotalHiringReqPages(Math.ceil(count / 6));
    }
  }, [count]);

  const Bidprev = () => {
    setCurrentBidPage((prev) => Math.max(prev - 1, 1));
  };

  const Bidnext = () => {
    setCurrentBidPage((prev) => Math.min(prev + 1, totalBidPages));
  };

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalHiringReqPages));
  };

  return (
    <>
      <div className="container mt-2 sm:px-5 md:px-10 lg:px-20">
        <h1 className="font-cardo pt-4 text-left text-[18px] font-normal text-[#031136] md:text-[21px]">
          My proposals
        </h1>
        <div className="my-3 flex flex-wrap">
          <Link href="/freelancer/my-proposals">
            <button
              className={`flex-grow p-1 md:flex-none ${commonStyle} my-3 px-3 md:px-8 ${selectedButton === "Active" ? "font-inter border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-sm font-normal text-white" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-3`}
              onClick={() => setSelectedButton("Active")}
              aria-pressed={selectedButton === "Active"}
            >
              Active
            </button>
          </Link>
          <Link href="/freelancer/my-proposals/my-referrals">
            <button
              className={`flex-grow p-1 md:flex-none ${commonStyle} px-3 md:px-8 ${selectedButton === "Referrals" ? "font-inter border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-sm font-normal text-white" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-3`}
              onClick={() => setSelectedButton("Referrals")}
              aria-pressed={selectedButton === "Referrals"}
            >
              Referrals
            </button>
          </Link>
        </div>

        {/*-----> Body  */}
        {isLoading ? (
          <div className="flex h-[60vh] w-full items-center justify-center">
            <Loader
              size="lg"
              color="primary"
            />
          </div>
        ) : (
          <>
            <div className="my-8 border border-[#E7E8F2] bg-[#FFFFFF] text-left">
              <div className="font-inter p-3 text-[14px] font-bold text-[#031136] md:text-[16px]">
                Submitted Proposals ({viewFreeBid.length})
              </div>
              {viewFreeBid.length > 0 ? (
                <div>
                  {viewFreeBid.map((bid, index) => {
                    const bidTime = new Date(bid.bid_time);
                    const dateFormatOptions: Intl.DateTimeFormatOptions = {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    };
                    const formattedDate = bidTime.toLocaleDateString(undefined, dateFormatOptions);

                    return (
                      <div
                        className="flex flex-col items-center border-b border-gray-200 border-opacity-30 px-2 py-3 md:flex-row md:px-4 md:py-4"
                        key={index}
                      >
                        <div className="flex w-full flex-col md:w-1/4">
                          <div className="font-cardo text-[16px] text-[#031136] md:text-[18px]">
                            Initiated {formattedDate}
                          </div>
                          <p className="font-inter text-[12px] text-[#031136] opacity-50 md:text-[14px]">
                            {timeAgo(bid.bid_time)}
                          </p>
                        </div>
                        <div className="flex-grow md:ml-[100px]">
                          <Link href={`/freelancer/view-proposal/${bid.project_id}`}>
                            <p className="font-cardo text-[16px] text-blue-600 hover:underline md:text-[18px]">
                              {bid.project.title}
                            </p>
                          </Link>
                        </div>
                        <div className="flex w-full flex-col items-end pr-4 md:w-1/4">
                          <p className="font-inter text-[14px] text-[#031136] opacity-50 md:text-[16px]">
                            {bid.project.category}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mx-auto">
                  <Image
                    src={Bag}
                    alt="No Proposals Found"
                    className="mx-auto h-[20%] md:h-[10%]"
                  />
                  <p className="font-cardo my-5 text-center text-[16px] text-[#031136] md:text-[20px]">
                    You have not submitted any proposals yet.
                  </p>
                </div>
              )}
              {totalBidPages > 6 && (
                <div className="flex justify-center py-4">
                  <button
                    onClick={Bidprev}
                    disabled={currentBidPage === 1}
                    className="rounded-md bg-[#0909E9] p-2 text-[#FFFFFF] hover:bg-blue-700"
                  >
                    <MdArrowBack />
                  </button>
                  <span className="p-2">
                    {currentBidPage} of {totalBidPages}
                  </span>
                  <button
                    onClick={Bidnext}
                    disabled={currentBidPage === totalBidPages}
                    className="rounded-md bg-[#0909E9] p-2 text-[#FFFFFF] hover:bg-blue-700"
                  >
                    <MdArrowForward />
                  </button>
                </div>
              )}
            </div>
            <div className="my-4 border border-[#E7E8F2] bg-[#FFFFFF] text-left">
              <div className="font-inter p-3 text-[14px] font-bold text-[#031136] md:text-[16px]">
                Hiring Requests ({count})
              </div>
              {pendingHireRequest.length > 0 ? (
                <div>
                  {pendingHireRequest.map((hireRequest, index) => {
                    const hireTime = new Date(hireRequest.Received_time);
                    const dateFormatOptions: Intl.DateTimeFormatOptions = {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    };
                    const formattedDate = hireTime.toLocaleDateString(undefined, dateFormatOptions);

                    return (
                      <div
                        className="flex flex-col items-center border-b border-gray-200 border-opacity-30 px-2 py-3 md:flex-row md:px-4 md:py-4"
                        key={index}
                      >
                        <div className="flex w-full flex-col md:w-1/4">
                          <div className="font-cardo text-[16px] text-[#031136] md:text-[18px]">
                            Received {formattedDate}
                          </div>
                          <p className="font-inter text-[12px] text-[#031136] opacity-50 md:text-[14px]">
                            {timeAgo(hireRequest.Received_time)}
                          </p>
                        </div>
                        <div className="flex-grow md:ml-[100px]">
                          <Link href={`/freelancer/hirer-request/${hireRequest.hire_id}`}>
                            <div className="font-cardo text-[16px] text-blue-600 hover:underline md:text-[18px]">
                              {hireRequest?.project_title}
                            </div>
                          </Link>
                        </div>
                        <div className="flex w-full flex-col items-end pr-4 md:w-1/4">
                          <p className="font-inter text-[14px] text-[#031136] opacity-50 md:text-[16px]">
                            {hireRequest?.project_category}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="mx-auto">
                  <Image
                    src={Bag}
                    alt="No Hiring Requests Found"
                    className="mx-auto h-[20%] md:h-[10%]"
                  />
                  <p className="font-cardo my-5 text-center text-[16px] text-[#031136] md:text-[20px]">
                    You have no hiring requests.
                  </p>
                </div>
              )}

              {totalHiringReqPages > 6 && (
                <div className="flex justify-center py-4">
                  <button
                    onClick={prev}
                    disabled={currentPage === 1}
                    className="rounded-md bg-[#0909E9] p-2 text-[#FFFFFF] hover:bg-blue-700"
                  >
                    <MdArrowBack />
                  </button>
                  <span className="p-2">
                    {currentPage} of {totalHiringReqPages}
                  </span>
                  <button
                    onClick={next}
                    disabled={currentPage === totalHiringReqPages}
                    className="rounded-md bg-[#0909E9] p-2 text-[#FFFFFF] hover:bg-blue-700"
                  >
                    <MdArrowForward />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyProposals;
