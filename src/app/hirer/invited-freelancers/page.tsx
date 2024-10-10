"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { timeAgo } from "@/utils/timeFunction";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import file from "@/assets/icons/file.png";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { IInvitationDetails } from "@/interfaces/invitationDetails";
import { errorLog } from "@/utils/errorLog";
import InvitationStatus from "@/components/attoms/InvitationStatus";

const AllInvitations: React.FC = () => {
  const [allInvitations, setAllInvitations] = useState<IInvitationDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const queryParameters: string[] = [];
    queryParameters.push(`page=${currentPage}`);
    const queryString = queryParameters.join("&");

    axiosWithAuth
      .get(`/freelance/View-all/invited-freelancers?${queryString}`)
      .then((response) => {
        setAllInvitations(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        errorLog(error);
      });
  }, [currentPage]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="container mt-2 sm:px-5 md:px-10 lg:px-20">
      <h1 className="font-cardo pt-4 text-left text-lg font-normal text-[#031136] md:text-xl lg:text-2xl">
        All Invitations
      </h1>
      <div className="my-4 rounded-lg border border-[#E7E8F2] bg-white text-left shadow-md">
        {allInvitations.length > 0 ? (
          <div>
            {allInvitations.map((invitation, index) => {
              const inviteTime = new Date(invitation.hired_at);
              const dateFormatOptions: Intl.DateTimeFormatOptions = {
                day: "numeric",
                month: "short",
                year: "numeric",
              };
              const formattedDate = inviteTime.toLocaleDateString(undefined, dateFormatOptions);
              return (
                <div
                  key={index}
                  className="flex flex-col items-start border-b border-gray-200 px-4 py-4 md:flex-row md:items-center"
                >
                  <div className="w-full p-2 md:w-1/3">
                    <div className="font-cardo text-sm text-[#031136] md:text-base lg:text-lg">
                      Received {formattedDate}
                    </div>
                    <p className="font-inter text-xs text-[#031136] opacity-50 md:text-sm">
                      {timeAgo(invitation.hired_at)}
                    </p>
                  </div>
                  <div className="w-full p-2 md:w-1/3">
                    <Link href={`/hirer/invited-freelancers/details/${invitation.hire_id}`}>
                      <div className="font-cardo cursor-pointer text-sm text-blue-600 hover:underline hover:decoration-2 md:text-base lg:text-lg">
                        {invitation.project_title}
                      </div>
                    </Link>
                  </div>
                  <div className="w-full p-2 md:w-1/3">
                    <p className="font-inter text-sm text-[#031136] opacity-50 md:text-base lg:text-lg">
                      {invitation.hire_by}
                    </p>
                  </div>
                  <div className="w-full p-2 text-right md:w-1/3">
                    {invitation.freelancer_accepted ? (
                      <InvitationStatus className="w-24">Accepted</InvitationStatus>
                    ) : invitation.freelancer_rejected ? (
                      <InvitationStatus
                        status="rejected"
                        className="w-24"
                      >
                        Rejected
                      </InvitationStatus>
                    ) : (
                      <InvitationStatus
                        status="pending"
                        className="w-24"
                      >
                        Pending
                      </InvitationStatus>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto py-10 text-center">
            <Image
              src={file}
              alt="No Invitations"
              className="mx-auto h-24"
              width={100}
              height={100}
            />
            <p className="font-cardo mt-5 text-lg opacity-70 md:text-xl">No Invitations Found</p>
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-4 md:gap-4">
            <button
              onClick={prev}
              disabled={currentPage === 1}
              className="rounded-full border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-1 text-white"
            >
              <FaArrowLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`px-3 py-1 ${currentPage === pageNumber ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-sm font-bold text-transparent" : "text-sm font-bold text-[#0A142F]"}`}
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
              className="rounded-full border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-2 text-white"
            >
              <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllInvitations;
