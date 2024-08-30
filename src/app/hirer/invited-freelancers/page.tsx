"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { timeAgo } from '@/components/time-functions';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import file from '@/assets/icons/file.png';

interface Invite {
  Received_time: string;
  project_title: string;
  hired_by: string;
  freelancer_accepted: boolean;
  freelancer_rejected: boolean;
}

const AllInvitations: React.FC = () => {
  const [viewAllInvites, setViewAllInvites] = useState<Invite[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const queryParameters: string[] = [];
    queryParameters.push(`page=${currentPage}`);
    const queryString = queryParameters.join('&');

    axios
      .get(`https://www.api.alanced.com/freelance/View-all/hire-request?${queryString}`, {
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTY3NjY0LCJpYXQiOjE3MjM2MzE2NjQsImp0aSI6ImRiNzE2NGM3NzdmZTQ1ZTRiNjYzOTVhZTc5NDkxZDVjIiwidXNlcl9pZCI6NH0.YxoAhsxO4E9uIYVHgJk5JVkEIJjoccn6ppIFgZTukYc`,
        },
      })
      .then((response) => {
        setViewAllInvites(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching filtered data:', error);
      });
      
  }, [currentPage]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="mt-2 mx-4 sm:mx-8 md:mx-16 lg:mx-24">
      <h1 className="font-cardo text-lg md:text-xl lg:text-2xl text-[#031136] font-normal pt-4 text-left">All Invitations</h1>
      <div className="my-4 bg-white border border-[#E7E8F2] text-left rounded-lg shadow-md">
        {viewAllInvites.length > 0 ? (
          <div>
            {viewAllInvites.map((inv, index) => {
              const inviteTime = new Date(inv.Received_time);
              const dateFormatOptions: Intl.DateTimeFormatOptions = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              };
              const formattedDate = inviteTime.toLocaleDateString(undefined, dateFormatOptions);
              return (
                <div key={index} className="px-4 py-4 border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center">
                  <div className="w-full md:w-1/3 p-2">
                    <h1 className="font-cardo text-sm md:text-base lg:text-lg text-[#031136]">Received {formattedDate}</h1>
                    <p className="font-inter text-xs md:text-sm text-[#031136] opacity-50">{timeAgo(inv.Received_time)}</p>
                  </div>
                  <div className="w-full md:w-1/3 p-2">
                    <Link href={`/projects/${inv.project_title.replace(/\s+/g, '-').toLowerCase()}`}>
                      <h1 className="font-cardo text-sm md:text-base lg:text-lg text-blue-600 cursor-pointer hover:underline hover:decoration-2">
                        {inv.project_title}
                      </h1>
                    </Link>
                  </div>
                  <div className="w-full md:w-1/3 p-2">
                    <p className="font-inter text-sm md:text-base lg:text-lg text-[#031136] opacity-50">{inv.hired_by}</p>
                  </div>
                  <div className="w-full md:w-1/3 p-2 text-right">
                    {inv.freelancer_accepted ? (
                      <h1 className="font-cardo text-sm md:text-base lg:text-lg text-blue-600">Accepted</h1>
                    ) : inv.freelancer_rejected ? (
                      <h1 className="font-cardo text-sm md:text-base lg:text-lg text-red-600">Rejected</h1>
                    ) : (
                      <h1 className="font-cardo text-sm md:text-base lg:text-lg text-yellow-600">Pending</h1>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto text-center py-10">
            <Image 
              src={file} 
              alt="No Invitations" 
              className="h-24 mx-auto" 
              width={100} 
              height={100} 
            />
            <p className="mt-5 font-cardo text-lg md:text-xl opacity-70">No Invitations Found</p>
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 md:gap-4 py-4">
            <button
              onClick={prev}
              disabled={currentPage === 1}
              className="p-1 rounded-full bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
            >
              <FaArrowLeft />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`px-3 py-1 ${currentPage === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold text-sm' : 'text-[#0A142F] font-bold text-sm'}`}
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
              className="p-2 rounded-full bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none"
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
