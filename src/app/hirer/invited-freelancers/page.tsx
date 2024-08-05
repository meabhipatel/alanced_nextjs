import React from 'react';
import Link from 'next/link';

function InvitedFreelancerPage() {
  return (
    <div className="flex flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 mx-auto max-w-screen-xl">
      <h1 className="font-cardo text-2xl sm:text-3xl md:text-4xl text-[#031136] font-normal mb-6">
        All Invited Freelancers
      </h1>
      <div className="my-4 bg-white border border-gray-200 border-opacity-30 p-4 sm:p-6 w-full rounded-lg shadow-md">
        <h1 className="font-cardo text-lg sm:text-xl md:text-2xl text-[#031136] font-normal mb-6">
          All Invitations (2)
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex-1">
              Sent Feb 16, 2024
              <br />
              <span className="text-gray-500">5 months ago</span>
            </div>
            <div className="flex-1">
              <Link href="/crm-application" className="text-blue-600">
                crm application
              </Link>
            </div>
            <div className="flex-1 text-gray-500">sachin sharma</div>
            <div className="flex-1 text-blue-600">Accepted</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex-1">
              Sent Aug 3, 2024
              <br />
              <span className="text-gray-500">1 day ago</span>
            </div>
            <div className="flex-1">
              <Link href="/real-estate-crm-app" className="text-blue-600">
                Real Estate Crm App
              </Link>
            </div>
            <div className="flex-1 text-gray-500">sachin sharma</div>
            <div className="flex-1 text-blue-600">Accepted</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitedFreelancerPage;
