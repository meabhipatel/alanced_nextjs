import React from "react";
import { MdVerified } from "react-icons/md";
import { IoLocationOutline, IoHeartCircleOutline } from "react-icons/io5";

const SavedJobs = () => {
  return (
    <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto max-w-screen-xl">
      <h1 className="font-cardo text-2xl sm:text-3xl md:text-4xl text-[#031136] font-normal mb-6">
        Saved Jobs
      </h1>
      <div className="my-4 bg-white border border-gray-200 border-opacity-30 p-6 w-full rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <div className="text-base text-gray-500 mb-2 sm:mb-0">
            Hourly - Intermediate - Est. Budget: $4/hr - $8/hr - Posted 7 months ago
          </div>
          <div className="text-blue-700 flex-shrink-0">
            <IoHeartCircleOutline size={30} />
          </div>
        </div>
        <div className="text-lg text-[#031136] font-cardo font-thin mb-2">
          Fitness Tracking App
        </div>
        <div className="text-base text-gray-500 leading-relaxed mb-4">
          Developed a fitness tracking application with React for the frontend and Django Rest Framework for the backend. Implemented workout logs, progress charts, and goal-setting features.
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center text-lg text-gray-500">
            <MdVerified className="mr-2 text-green-600" />
            <span>Payment Verified</span>
          </div>
          <div className="flex items-center text-yellow-400 text-lg">
            <span>★★★★★</span>
          </div>
          <div className="flex items-center text-gray-500 text-lg">
            <IoLocationOutline className="mr-2" />
            <span>Gujarat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
