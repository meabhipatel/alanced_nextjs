import React from "react";
import { FaLocationDot, FaGraduationCap, FaPencil } from "react-icons/fa6";
import { CiDollar } from "react-icons/ci";

import { FaCalendarMinus } from "react-icons/fa";

const Page = () => {
  return (
    <div className="container mt-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-40">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="font-cardo text-left text-2xl font-normal">CRM Application</div>
          <div className="my-8 rounded-lg border border-[#E7E8F2] bg-white px-8 py-8">
            <div className="flex flex-col space-y-2">
              <div className="text-lg font-medium text-blue-600">Web Development</div>
              <div className="text-sm text-gray-400">Posted 8 months ago</div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <FaLocationDot className="text-blue-600" />
                <span>Worldwide</span>
              </div>
            </div>

            <div className="pt-4 text-sm text-gray-500">CRM application for real estate deals.</div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <CiDollar className="text-2xl text-gray-600" />
                <div>
                  <div className="text-lg font-semibold">$1000</div>
                  <div className="text-sm text-gray-400">Fixed</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FaGraduationCap className="text-2xl text-gray-600" />
                <div>
                  <div className="text-lg font-semibold">Entry Level</div>
                  <div className="text-sm text-gray-400">Experience Level</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FaCalendarMinus className="text-2xl text-gray-600" />
                <div>
                  <div className="text-lg font-semibold">01-04-2024</div>
                  <div className="text-sm text-gray-400">Project Deadline</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-lg font-semibold">Contract-to-hire opportunity</div>
            <div className="text-sm text-gray-500">
              This lets talent know that this job could become full-time.
            </div>

            <div className="mt-6">
              <div className="text-lg font-semibold">Skills and Expertise</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Python", "Django", "React", "React Native"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-lg font-semibold">Activity on this job</div>
              <div className="mt-2 space-y-1 text-sm">
                <div>Proposals : 0</div>
                <div>Messaged : 1</div>
                <div>Invitations : 1</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex flex-col space-y-3">
              <div className="flex cursor-pointer items-center space-x-2 text-blue-500">
                <FaPencil />
                <span>Edit Job Post</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-lg font-semibold">About the client</div>
              <div className="flex items-center text-sm text-gray-500">
                Payment method not verified
                <span className="ml-2 cursor-pointer text-blue-500">?</span>
              </div>
              <div className="mt-4 text-sm">
                <p className="font-semibold">Sachin Sharma</p>
                <p>Chennai</p>
                <p>3:12 PM</p>
                <p>45 jobs posted</p>
                <p className="text-gray-400">Member since Dec 30, 2023</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-lg font-semibold">Job link</div>
              <div className="text-sm text-blue-500">https://www.alanced.com/jobs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
