"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { useDispatch} from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { MdArrowForward, MdArrowBack } from 'react-icons/md';
import Bag from '@/assets/icons/file.png';
import { timeAgo } from '@/app/freelancer/time-functions';

interface Bid {
  bid_time: string;
  project: {
    title: string;
    category: string;
  };
}

interface Hiring {
  hire_time: string;
  project: {
    title: string;
    category: string;
  };
}

interface ApiResponse<T> {
  results: T[];
  count: number;
}

const MyProposals = () => {
  //const dispatch = useDispatch();
  //const accessToken = useSelector((state: any) => state.login.accessToken) || localStorage.getItem('jwtToken');
  const [currentBidPage, setCurrentBidPage] = useState<number>(1);
  const [totalBidPages, setTotalBidPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hiringCount, setHiringCount] = useState<number>(0);
  const [viewFreeBid, setViewFreeBid] = useState<Bid[]>([]);
  const [viewAllHiring, setViewAllHiring] = useState<Hiring[]>([]);
  const [selectedButton, setSelectedButton] = useState<string>('Active');
  const commonStyle = "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  useEffect(() => {
    axios
      .get<ApiResponse<Bid>>(`https://www.api.alanced.com/freelance/view/freelancer-self/bid?page=${currentBidPage}`, {
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTY3NjY0LCJpYXQiOjE3MjM2MzE2NjQsImp0aSI6ImRiNzE2NGM3NzdmZTQ1ZTRiNjYzOTVhZTc5NDkxZDVjIiwidXNlcl9pZCI6NH0.YxoAhsxO4E9uIYVHgJk5JVkEIJjoccn6ppIFgZTukYc`,
        },
      })
      .then((response) => {
        setViewFreeBid(response.data.results);
        setTotalBidPages(Math.ceil(response.data.count / 6));
      })
      .catch((error) => {
          // eslint-disable-next-line no-console
        console.error('Error fetching bids:', error);
      });
  }, [currentBidPage]);

  useEffect(() => {
    axios
      .get<ApiResponse<Hiring>>(`https://www.api.alanced.com/freelance/View-all/pending-hire-request?page=${currentPage}`, {
        headers: {
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU1MTY3NjY0LCJpYXQiOjE3MjM2MzE2NjQsImp0aSI6ImRiNzE2NGM3NzdmZTQ1ZTRiNjYzOTVhZTc5NDkxZDVjIiwidXNlcl9pZCI6NH0.YxoAhsxO4E9uIYVHgJk5JVkEIJjoccn6ppIFgZTukYc`,
        },
      })
      .then((response) => {
        setViewAllHiring(response.data.results);
        setHiringCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / 6));
      })
      .catch((error) => {
      // eslint-disable-next-line no-console
        console.error('Error fetching hiring requests:', error);
      });
  }, [currentPage]);

  const Bidprev = () => {
    setCurrentBidPage(prev => Math.max(prev - 1, 1));
  };

  const Bidnext = () => {
    setCurrentBidPage(prev => Math.min(prev + 1, totalBidPages));
  };

  const prev = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  //const isHiring = (data: any): data is Hiring => {
    //return data && data.project && typeof data.project.title === 'string';
  //};
  
  

  return (
<>
  <div className='mt-2 mx-4 md:mx-[10rem]'>
    <h1 className='font-cardo text-[18px] md:text-[21px] text-[#031136] font-normal pt-4 text-left'>My proposals</h1>
    <div className='my-3 flex flex-wrap'>
      <Link href='/freelancer/my-proposals' className="flex-grow md:flex-none p-1">
        <button 
          className={`${commonStyle} px-2 md:px-3 my-2 md:my-3 ${selectedButton === 'Active' ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white font-inter text-sm font-normal border-none" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-2 md:mr-3`}
          onClick={() => setSelectedButton('Active')}>
          Active
        </button>
      </Link>  
      <Link href='/freelancer/my-proposals/my-referrals' className="flex-grow md:flex-none p-1">
        <button className={`${commonStyle} px-2 md:px-3 my-2 md:my-3 ${selectedButton === 'Referrals' ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white border-none" : "border border-gray-300 text-[#0A142F] opacity-50"} mr-2 md:mr-3`}
          onClick={() => setSelectedButton('Referrals')}>
          Referrals
        </button>
      </Link>
    </div>
    <div className="flex-1 border-t-2 border-gray-200 opacity-30 my-4"></div>
    <div className='my-4 bg-[#FFFFFF] border border-[#E7E8F2] text-left'>
      <h1 className='font-inter text-[14px] md:text-[16px] font-bold text-[#031136] p-3'>Submitted Proposals ({totalBidPages})</h1>
      {viewFreeBid.length > 0 ? (
        <div>
          {viewFreeBid.map((bid, index) => {
            const bidTime = new Date(bid.bid_time);
            const dateFormatOptions: Intl.DateTimeFormatOptions = {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            };
            const formattedDate = bidTime.toLocaleDateString(undefined, dateFormatOptions);

            return (
              <div className='px-2 md:px-4 py-3 md:py-4 border-b border-gray-200 border-opacity-30 flex flex-col md:flex-row items-center' key={index}>
                <div className='flex flex-col w-full md:w-1/4'>
                  <h1 className='font-cardo text-[16px] md:text-[18px] text-[#031136]'>Initiated {formattedDate}</h1>
                  <p className='font-inter text-[12px] md:text-[14px] text-[#031136] opacity-50'>{timeAgo(bid.bid_time)}</p>
                </div>
                <div className='flex-grow md:ml-[100px]'>
                  <Link href={{ pathname: '/View/freelancer/proposal', query: { bid: JSON.stringify(bid) } }}>
                    <h1 className='font-cardo text-[16px] md:text-[18px] text-blue-600 hover:underline'>{bid.project.title}</h1>
                  </Link>
                </div>
                <div className='flex flex-col w-full md:w-1/4 items-end pr-4'>
                  <p className='font-inter text-[14px] md:text-[16px] text-[#031136] opacity-50'>{bid.project.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='mx-auto'>
          <Image src={Bag} alt="No Proposals Found" className='h-[20%] md:h-[10%] mx-auto' />
          <p className='mt-5 font-cardo text-[16px] md:text-[20px] text-center text-[#031136]'>You have not submitted any proposals.</p>
        </div>
      )}
      <div className='flex justify-center py-4'>
        <button onClick={Bidprev} disabled={currentBidPage === 1} className='p-2 rounded-md text-[#FFFFFF] bg-[#0909E9] hover:bg-blue-700'>
          <MdArrowBack />
        </button>
        <span className='p-2'>
          {currentBidPage} of {totalBidPages}
        </span>
        <button onClick={Bidnext} disabled={currentBidPage === totalBidPages} className='p-2 rounded-md text-[#FFFFFF] bg-[#0909E9] hover:bg-blue-700'>
          <MdArrowForward />
        </button>
      </div>
    </div>
    <div className='my-4 bg-[#FFFFFF] border border-[#E7E8F2] text-left'>
      <h1 className='font-inter text-[14px] md:text-[16px] font-bold text-[#031136] p-3'>Hiring Requests ({hiringCount})</h1>
      {viewAllHiring.length > 0 ? (
        <div>
          {viewAllHiring.map((hiring, index) => {
            const hireTime = new Date(hiring.hire_time);
            const dateFormatOptions: Intl.DateTimeFormatOptions = {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            };
            const formattedDate = hireTime.toLocaleDateString(undefined, dateFormatOptions);

            return (
              <div className='px-2 md:px-4 py-3 md:py-4 border-b border-gray-200 border-opacity-30 flex flex-col md:flex-row items-center' key={index}>
                <div className='flex flex-col w-full md:w-1/4'>
                  <h1 className='font-cardo text-[16px] md:text-[18px] text-[#031136]'>Received {formattedDate}</h1>
                  <p className='font-inter text-[12px] md:text-[14px] text-[#031136] opacity-50'>{timeAgo(hiring.hire_time)}</p>
                </div>
                <div className='flex-grow md:ml-[100px]'>
                  <Link href={{ pathname: '/View/freelancer/hiring', query: { hiring: JSON.stringify(hiring) } }}>
                    <h1 className='font-cardo text-[16px] md:text-[18px] text-blue-600 hover:underline'>
                      {hiring?.project?.title || 'No Title'}
                    </h1>
                  </Link>
                </div>
                <div className='flex flex-col w-full md:w-1/4 items-end pr-4'>
                  <p className='font-inter text-[14px] md:text-[16px] text-[#031136] opacity-50'>
                    {hiring?.project?.category || 'No Category'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className='mx-auto'>
          <Image src={Bag} alt="No Hiring Requests Found" className='h-[20%] md:h-[10%] mx-auto' />
          <p className='mt-5 font-cardo text-[16px] md:text-[20px] text-center text-[#031136]'>You have no hiring requests.</p>
        </div>
      )}
      <div className='flex justify-center py-4'>
        <button onClick={prev} disabled={currentPage === 1} className='p-2 rounded-md text-[#FFFFFF] bg-[#0909E9] hover:bg-blue-700'>
          <MdArrowBack />
        </button>
        <span className='p-2'>
          {currentPage} of {totalPages}
        </span>
        <button onClick={next} disabled={currentPage === totalPages} className='p-2 rounded-md text-[#FFFFFF] bg-[#0909E9] hover:bg-blue-700'>
          <MdArrowForward />
        </button>
      </div>
    </div>
  </div>
</>

  );
};

export default MyProposals;
