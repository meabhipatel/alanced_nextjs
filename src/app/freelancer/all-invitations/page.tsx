"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
//import { useSelector } from 'react-redux';
//import Skeleton from 'react-loading-skeleton';
import { timeAgo } from '@/app/freelancer/time-functions';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import file from '@/assets/icons/file.png';

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
<>
  <div className="mt-2 mx-4 md:mx-16 lg:mx-[10rem]">
    <h1 className="font-cardo text-[18px] md:text-[21px] text-[#031136] font-normal pt-4 text-left">All Invitations</h1>
    <div className="my-4 bg-[#FFFFFF] border border-[#E7E8F2] text-left">
      {viewAllInvites !== null ? (
        viewAllInvites.length > 0 ? (
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
                <div key={index} className="px-4 md:px-8 py-4 border-b border-gray-200 border-opacity-30 flex flex-col md:flex-row items-start md:items-center">
                  <div className="w-full md:w-2/4 p-2">
                    <h1 className="font-cardo text-[16px] md:text-[18px] text-[#031136]">Received {formattedDate}</h1>
                    <p className="font-inter text-[12px] md:text-[14px] text-[#031136] opacity-50">{timeAgo(inv.Received_time)}</p>
                  </div>
                  <div className="w-full md:w-2/4 p-2">
                    <h1 className="font-cardo text-[16px] md:text-[18px] text-blue-600">{inv.project_title}</h1>
                  </div>
                  <div className="w-full md:w-2/4 p-2">
                    <p className="font-inter text-[14px] md:text-[16px] text-[#031136] opacity-50">{inv.hired_by}</p>
                  </div>
                  <div className="w-full md:w-1/4 p-2">
                    {inv.freelancer_accepted ? (
                      <h1 className="font-cardo text-[16px] md:text-[18px] text-blue-600">Accepted</h1>
                    ) : inv.freelancer_rejected ? (
                      <h1 className="font-cardo text-[16px] md:text-[18px] text-red-600">Rejected</h1>
                    ) : (
                      <h1 className="font-cardo text-[16px] md:text-[18px] text-yellow-600">Pending</h1>
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
              className="h-[10%] mt-10 mx-auto" 
              width={100} 
              height={100} 
            />
            <p className="mt-5 font-cardo text-lg md:text-xl opacity-70">No Invitations Found</p>
          </div>
        )
      ) : (
        // <div>
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
        null
      )}
      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 md:gap-6 m-4">
          <button
            onClick={prev}
            disabled={currentPage === 1}
            style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
            className="p-2 rounded-md"
          >
            <FaArrowLeft className="text-white" />
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`px-0 py-1 ${currentPage === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold font-inter text-[14px] cursor-pointer' : 'text-[#0A142F] font-bold font-inter text-[14px] cursor-pointer'}`}
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
            style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
            className="p-2 rounded-md"
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
