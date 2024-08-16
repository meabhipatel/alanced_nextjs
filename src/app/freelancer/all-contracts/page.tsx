"use client"
import React from 'react';
import { IoIosSearch } from "react-icons/io";
// import 'react-loading-skeleton/dist/skeleton.css';
import { formatDateInput } from '@/app/freelancer/time-functions';
import axios from 'axios';
//import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import contractimg from '@/assets/images/Frame.png';
import Image from 'next/image';


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
  const [searchQuery, setSearchQuery] = useState('');
  const [viewallfreecontracts, setViewAllfreecontracts] = useState<Contract[]>([]);

  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join('&');

    axios
      .get(`https://www.api.alanced.com/freelance/View-all/freelancer-contracts?${queryString}`, {
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTY3NjY0LCJpYXQiOjE3MjM2MzE2NjQsImp0aSI6ImRiNzE2NGM3NzdmZTQ1ZTRiNjYzOTVhZTc5NDkxZDVjIiwidXNlcl9pZCI6NH0.YxoAhsxO4E9uIYVHgJk5JVkEIJjoccn6ppIFgZTukYc`
        }
      })
      .then((response) => {
        setViewAllfreecontracts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching filtered data:', error);
      });
  }, [currentPage, searchQuery]);

  const prev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const isJobOpen = (deadline: string): boolean => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return now < deadlineDate;

  };

  function highlightText(text: string | number, query: string) {
    if (!query || (typeof text !== 'string' && typeof text !== 'number')) {
      return text;
    }

    const textString = String(text);
    const regex = new RegExp(`(${query})`, 'gi');

    return textString.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return <span key={index} style={{ backgroundColor: '#73cbfa' }}>{part}</span>;
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }

  return (
    <>
    <div className='mt-5 container px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40'>
      <h1 className='font-cardo font-normal text-2xl text-left'>All Contracts</h1>
      <section className='flex items-center p-1 rounded-lg border border-[#E7E8F2] mt-4'>
        <div className='flex items-center mr-1 space-x-1 w-full'>
          <IoIosSearch className="h-5 w-5 text-gray-500" />
          <input className='w-full h-7 font-normal lg:text-sm border-0 outline-none font-inter text-sm' placeholder='Search contracts' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <button className='rounded h-8 w-8 p-2 text-xs lg:text-sm font-semibold text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]'>
          <IoIosSearch className="h-5 w-5 text-white" />
        </button>
      </section>
      <div className='my-8 border border-[#E7E8F2] py-5 px-4 sm:px-6 md:px-8 rounded'>
        {viewallfreecontracts.length > 0 ? (
          viewallfreecontracts.map((contract, index) => (
            <div key={index} className='my-5 bg-[#FFFFFF] border-b border-[#E7E8F2]'>
              <div className='flex flex-col sm:flex-row'>
                <div className='flex-1'>
                  <h1 className='font-cardo text-lg font-normal text-left'>{highlightText(contract.project_title, searchQuery)}</h1>
                  <p className='font-inter text-[14px] text-[#031136] mt-3 text-left font-normal'>Budget: <span className='opacity-50'>${highlightText(contract.hiring_budget, searchQuery)} {highlightText(contract.hiring_budget_type, searchQuery)}</span></p>
                </div>
                <div className='flex-none'>
                  <div className={isJobOpen(contract.project_deadline) ? 'text-blue-600 mt-1 font-semibold' : 'text-yellow-600 mt-1 font-semibold'}>
                    {isJobOpen(contract.project_deadline) ? 'Active' : 'Completed'}
                  </div>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row'>
                <div className='flex-1'>
                  <p className='font-inter text-[14px] text-[#031136] py-2 font-normal text-left'>Hired by: <span className='opacity-50'>{highlightText(contract.hired_by, searchQuery)}</span></p>
                </div>
                <div className='flex-1'>
                  <p className='font-inter text-[14px] text-[#031136] font-normal text-left'>
                    Received: <span className='text-[#0365c0]'>{formatDateInput(contract.Received_time)}</span>
                  </p>
                </div>
                <div className='flex-none'>
                  <p className='font-inter text-[14px] text-[#031136] font-normal text-left'>
                    Deadline: <span className='text-[#0365c0]'>{formatDateInput(contract.project_deadline)}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <Image src={contractimg} alt="No Contracts Found" className='mx-auto' width={500} height={300} />
            <div className='px-4 md:px-8 py-5 text-center text-2xl opacity-50'>
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
        <div className="flex justify-center md:justify-end items-center gap-6 m-4">
          <button
            className={`flex items-center justify-center w-8 h-8 rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-gradient-to-r from-[#0909E9] to-[#00D4FF]'} text-white`}
            onClick={prev}
            disabled={currentPage === 1}
            style={{ border: 'none' }}
          >
            <FaArrowLeft className="h-4 w-4" />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`px-2 py-1 ${currentPage === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold font-inter text-[14px]' : 'text-[#0A142F] font-bold font-inter text-[14px]'}`}
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
            className={`flex items-center justify-center w-8 h-8 rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gradient-to-r from-[#0909E9] to-[#00D4FF]'} text-white`}
            onClick={next}
            disabled={currentPage === totalPages}
            style={{ border: 'none' }}
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
