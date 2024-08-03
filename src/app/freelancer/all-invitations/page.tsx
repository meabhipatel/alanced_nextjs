import React from "react";

const AllInvitations = () => {
  return (
    <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto max-w-screen-xl">
      <h1 className="font-cardo text-2xl sm:text-3xl md:text-4xl text-[#031136] font-normal mb-6">
        All Invitations
      </h1>
      <div className="my-4 bg-white border border-gray-200 border-opacity-30 p-4 sm:p-6 w-full rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-black font-semibold text-lg">
            Received Feb 16, 2024
            <br />
            <span className="text-base text-gray-600">5 months ago</span>
          </div>
          <div className="text-blue-600 text-base">CRM application</div>
          <div className="text-gray-600 text-base">Sachin Sharma</div>
          <div className="text-blue-600 text-base">Accepted</div>
        </div>
      </div>
    </div>
  );
};

export default AllInvitations;
