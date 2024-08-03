import React from "react";
import { IoIosSearch } from "react-icons/io";

const AllContracts = () => {
  return (
    <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto max-w-screen-xl">
      <h1 className="font-cardo text-2xl sm:text-3xl md:text-4xl text-[#031136] font-normal mb-6">
        All Contracts
      </h1>
      <div className="flex items-center border border-gray-300 rounded-lg p-2 shadow-sm w-full max-w-7xl mb-6">
        <div className="flex items-center pl-3">
          <IoIosSearch className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search contracts"
          className="w-full pl-4 py-2 border-none focus:outline-none"
        />
        <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-2 ml-2 hover:from-blue-500 hover:to-blue-700 transition-colors">
          <IoIosSearch className="w-5 h-5" />
        </button>
      </div>
      <div className="my-4 bg-white border border-gray-200 border-opacity-30 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <div className="font-serif font-semibold text-black text-lg mb-2">CRM Application</div>
            <div className="text-gray-700 mb-1">Budget: <span className="text-gray-500">$1000 Fixed</span></div>
            <div className="text-gray-700">Hired by: <span className="text-gray-500">Sachin Sharma</span></div>
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <div className="text-gray-700">Received: <span className="text-blue-600">Feb 16, 2024</span></div>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <div className="text-yellow-600 font-semibold">Completed</div>
            <div className="text-gray-700">Deadline: <span className="text-blue-600">Apr 1, 2024</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllContracts;
