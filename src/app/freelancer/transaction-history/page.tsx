import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoFolderOpenOutline } from "react-icons/io5";

const TransactionHistory = () => {
  return (
    <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto max-w-screen-xl">
      <h1 className="font-cardo text-2xl sm:text-3xl md:text-4xl text-[#031136] font-normal mb-6">
        My Payments
      </h1>
      <div className="my-4 bg-white border border-gray-200 border-opacity-30 p-4 sm:p-6 w-full rounded-lg shadow-md">
        <div className="flex flex-col gap-4">
          {/* First Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="font-medium text-base sm:text-xl md:text-xl">Weekly Summary</div>
              <div className="flex items-center text-gray-500 gap-2 mt-1">
                <FaRegCalendarAlt className="text-gray-500 text-base sm:text-lg md:text-xl" />
                <span className="text-sm sm:text-base">Current week</span>
              </div>
            </div>
            <IoFolderOpenOutline className="text-gray-600 text-lg sm:text-xl md:text-2xl" />
          </div>

          {/* Second Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="font-medium text-base sm:text-xl md:text-xl">Weekly Summary</div>
              <div className="flex items-center text-gray-500 gap-2 mt-1">
                <FaRegCalendarAlt className="text-gray-500 text-base sm:text-lg md:text-xl" />
                <span className="text-sm sm:text-base">Current week</span>
              </div>
            </div>
            <IoFolderOpenOutline className="text-gray-600 text-lg sm:text-xl md:text-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
