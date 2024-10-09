"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
//import { useSelector } from 'react-redux';
//import Skeleton from 'react-loading-skeleton';
import { timeAgo } from "@/utils/timeFunction";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import file from "@/assets/icons/file.png";
import { axiosWithAuth } from "@/utils/axiosWithAuth";

interface Invite {
  Received_time: string;
  project_title: string;
  hired_by: string;
  freelancer_accepted: boolean;
  freelancer_rejected: boolean;
}

//interface RootState {
// login: {
// accessToken: string;
// };
//}

const AllInvitations: React.FC = () => {
  //const accessToken = useSelector((state: RootState) => state.login.accessToken) || localStorage.getItem('jwtToken');
  const [viewAllInvites, setViewAllInvites] = useState<Invite[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const queryParameters: string[] = [];
    queryParameters.push(`page=${currentPage}`);
    const queryString = queryParameters.join("&");

    axiosWithAuth
      .get(`/freelance/View-all/hire-request?${queryString}`)
      .then((response) => {
        setViewAllInvites(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Error fetching filtered data:", error);
      });
  }, [currentPage]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="container mt-2 sm:px-5 md:px-10 lg:px-20">
        <h1 className="font-cardo pt-4 text-left text-[18px] font-normal text-[#031136] md:text-[21px]">
          All Invitations
        </h1>
        <div className="my-4 border border-[#E7E8F2] bg-[#FFFFFF] text-left">
          {viewAllInvites !== null ? (
            viewAllInvites.length > 0 ? (
              <div>
                {viewAllInvites.map((inv, index) => {
                  const inviteTime = new Date(inv.Received_time);
                  const dateFormatOptions: Intl.DateTimeFormatOptions = {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  };
                  const formattedDate = inviteTime.toLocaleDateString(undefined, dateFormatOptions);
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-start border-b border-gray-200 border-opacity-30 px-4 py-4 md:flex-row md:items-center md:px-8"
                    >
                      <div className="w-full p-2 md:w-2/4">
                        <div className="font-cardo text-[16px] text-[#031136] md:text-[18px]">
                          Received {formattedDate}
                        </div>
                        <p className="font-inter text-[12px] text-[#031136] opacity-50 md:text-[14px]">
                          {timeAgo(inv.Received_time)}
                        </p>
                      </div>
                      <div className="w-full p-2 md:w-2/4">
                        <div className="font-cardo text-[16px] text-blue-600 md:text-[18px]">
                          {inv.project_title}
                        </div>
                      </div>
                      <div className="w-full p-2 md:w-2/4">
                        <p className="font-inter text-[14px] text-[#031136] opacity-50 md:text-[16px]">
                          {inv.hired_by}
                        </p>
                      </div>
                      <div className="w-full p-2 md:w-1/4">
                        {inv.freelancer_accepted ? (
                          <div className="font-cardo text-[16px] text-blue-600 md:text-[18px]">
                            Accepted
                          </div>
                        ) : inv.freelancer_rejected ? (
                          <div className="font-cardo text-[16px] text-red-600 md:text-[18px]">
                            Rejected
                          </div>
                        ) : (
                          <div className="font-cardo text-[16px] text-yellow-600 md:text-[18px]">
                            Pending
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="mx-auto text-center">
                <Image
                  src={file}
                  alt="No Invitations"
                  className="mx-auto mt-10 h-[10%]"
                  width={100}
                  height={100}
                />
                <p className="font-cardo mt-5 text-lg opacity-70 md:text-xl">
                  No Invitations Found
                </p>
              </div>
            )
          ) : // <div>
          //   {[...Array(8)].map((_, index) => (
          //     <div key={index} className="flex mt-4">
          //       <div className="ml-10 mr-60">
          //         <Skeleton height={20} width={200} />
          //         <Skeleton height={20} width={100} style={{ marginTop: 10 }} />
          //       </div>
          //       <Skeleton height={20} width={300} />
          //       <Skeleton height={20} width={200} style={{ marginLeft: 180 }} />
          //     </div>
          //   ))}
          // </div>
          null}
          {totalPages > 1 && (
            <div className="m-4 flex items-center justify-end gap-2 md:gap-6">
              <button
                onClick={prev}
                disabled={currentPage === 1}
                style={{
                  backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                  border: "none",
                }}
                className="rounded-md p-2"
              >
                <FaArrowLeft className="text-white" />
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    className={`px-0 py-1 ${currentPage === pageNumber ? "font-inter cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent" : "font-inter cursor-pointer text-[14px] font-bold text-[#0A142F]"}`}
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
                onClick={next}
                disabled={currentPage === totalPages}
                style={{
                  backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                  border: "none",
                }}
                className="rounded-md p-2"
              >
                <FaArrowRight className="text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllInvitations;
