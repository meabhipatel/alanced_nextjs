"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image'; 
import AddReviewPopup from './review-popup/page'; 
import { formatDateInput } from '@/app/freelancer/time-functions';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import { IoIosSearch } from "react-icons/io";
import contractimg from '@/assets/images/Frame.png'; 

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
  const [searchQuery, setSearchQuery] = useState('');
  const [viewallhirercontracts, setViewAllhirercontracts] = useState<Contract[]>([]);
  const [isReviewOpen, setIsReviewOpen] = useState<{ [key: number]: boolean }>({});
  
  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);
    const queryString = queryParameters.join('&');

    axios
      .get(`https://www.api.alanced.com/freelance/View-all/hirer-contracts?${queryString}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1Nzc5NDQ1LCJpYXQiOjE3MjQyNDM0NDUsImp0aSI6ImY1YWI4ZjgzYzdlZjQ2Y2Y5YjZjYTY0N2NhODFlZTBlIiwidXNlcl9pZCI6NX0.gHOhD42TJxQoRKt34wdwBN3cBp04_Ugj5zZoGQgDOag` 
        }
      })
      .then(response => {
        setViewAllhirercontracts(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch(error => {
        //eslint-disable-next-line
        console.error('Error fetching filtered data:', error);
      });
  }, [currentPage, searchQuery]);

  const prev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const isJobOpen = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    return now < deadlineDate;
  };

  const highlightText = (text: string, query: string) => {
    if (!query || (typeof text !== 'string' && typeof text !== 'number')) {
      return text;
    }

    const textString = String(text);
    const regex = new RegExp(`(${query})`, 'gi');

    return textString.split(regex).map((part, index) => (
      <span key={index} style={{ backgroundColor: index % 2 === 1 ? '#73cbfa' : 'inherit' }}>
        {part}
      </span>
    ));
  };

  const openReview = (hireId: number) => {
    setIsReviewOpen(prevState => ({
      ...prevState,
      [hireId]: true,
    }));
  };

  const closeReview = (hireId: number) => {
    setIsReviewOpen(prevState => ({
      ...prevState,
      [hireId]: false,
    }));
  };

  return (
    <>
      <div className='mt-5 px-4 md:px-10 lg:px-40'>
        <h1 className='font-cardo font-normal text-xl md:text-2xl text-left'>All Contracts</h1>
        <section className='flex items-center p-2 rounded-lg border border-[#E7E8F2] mt-4'>
          <div className='flex items-center mr-2 space-x-2 w-full'>
            <IoIosSearch className="h-5 w-5" /> 
            <input
              className='w-full h-8 font-normal lg:text-sm border-0 outline-none font-inter text-sm'
              placeholder='Search contracts'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className='rounded h-8 w-8 p-2 text-xs lg:text-sm font-semibold text-white bg-gradient-to-r from-[#0909E9] to-[#00D4FF]'>
            <IoIosSearch />
          </button>
        </section>
        <div className='my-8 border border-[#E7E8F2] py-5 px-4 md:px-8 rounded'>
          {viewallhirercontracts.length > 0 ? (
            viewallhirercontracts.map((contract) => (
              <div key={contract.hire_id} className='my-5 bg-[#FFFFFF] border-b border-[#E7E8F2]'>
                <div className='flex flex-col lg:flex-row'>
                  <div className='lg:basis-8/12'>
                    <h1 className='font-cardo text-lg font-normal text-left'>
                      {highlightText(contract.project_title, searchQuery)}
                    </h1>
                    <p className='font-inter text-[14px] text-[#031136] mt-3 text-left font-normal'>
                      Budget: <span className='opacity-50'>
                        ${highlightText(String(contract.hiring_budget), searchQuery)} {highlightText(contract.hiring_budget_type, searchQuery)}
                      </span>
                    </p>
                  </div>
                  <div className='lg:basis-1/12 mt-4 lg:mt-0'></div>
                  <div className='lg:basis-1/12'>
                    <div className={isJobOpen(contract.project_deadline) ? 'text-blue-600 mt-1 font-semibold' : 'text-yellow-600 mt-1 font-semibold'}>
                      {isJobOpen(contract.project_deadline) ? 'Active' : 'Completed'}
                    </div>
                  </div>
                  <div className='lg:basis-2/12 mt-4 lg:mt-0'>
                    <button
                      className="inline-block text-sm px-4 py-2 lg:px-6 lg:py-[10px] bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white font-semibold cursor-pointer"
                      onClick={() => openReview(contract.hire_id)}
                    >
                      Add Review
                    </button>
                    {isReviewOpen[contract.hire_id] && <AddReviewPopup closeReview={() => closeReview(contract.hire_id)} contract={contract} />}
                  </div>
                </div>
                <div className='flex flex-col md:flex-row'>
                  <div className='md:basis-5/12'>
                    <p className='font-inter text-[14px] text-[#031136] py-2 font-normal text-left'>
                      Hired Freelancer: <span className='opacity-50'>{highlightText(contract.hired_freelancer_name, searchQuery)}</span>
                    </p>
                  </div>
                  <div className='md:basis-5/12'>
                    <p className='font-inter text-[14px] text-[#031136] font-normal text-left'>
                      Sent: <span className='text-[#0365c0]'>{formatDateInput(contract.Sent_time)}</span>
                    </p>
                  </div>
                  <div className='md:basis-2/12'>
                    <p className='font-inter text-[14px] text-[#031136] font-normal text-left'>
                      Deadline: <span className='text-[#0365c0]'>{formatDateInput(contract.project_deadline)}</span>
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
                className='mx-auto'
              />
              <div className='px-4 md:px-8 py-5 text-center text-2xl opacity-50'>
                No Contracts Found
              </div>
            </>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 md:gap-6 m-4">
            <button
              className="p-2 rounded-full"
              onClick={prev}
              disabled={currentPage === 1}
              aria-label="Previous Page"
            >
              <FaChevronLeft />
            </button>
            <span className="text-center">{currentPage}/{totalPages}</span>
            <button
              className="p-2 rounded-full"
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
