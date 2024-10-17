"use client";
import React, { FC } from "react";
import { FaLocationDot, FaGraduationCap, FaPencil } from "react-icons/fa6";
import { CiDollar } from "react-icons/ci";

import { FaCalendarMinus } from "react-icons/fa";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { timeAgo } from "@/utils/timeFunction";

interface IProps {
  params: {
    projectId: string;
  };
}

const JobPostDetails: FC<IProps> = ({ params: { projectId } }) => {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.hirer.hirerSelfProjects);
  const project = data.results.find((item) => item.id === +projectId);

  if (data.results.length === 0) {
    router.replace("/hirer/all-jobs");
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <Loader
          size="lg"
          color="primary"
        />
      </div>
    );
  }

  return (
    <div className="container mt-5 sm:px-5 md:px-10 lg:px-20">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="font-cardo text-left text-2xl font-normal">{project?.title}</div>
          <div className="my-8 rounded-lg border border-[#E7E8F2] bg-white px-8 py-8">
            <div className="flex flex-col space-y-2">
              <div className="text-lg font-medium text-blue-600">{project?.category}</div>
              <div className="text-sm text-gray-400">
                Posted {timeAgo(project?.Project_created_at ?? "")}
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <FaLocationDot className="text-blue-600" />
                <span>Worldwide</span>
              </div>
            </div>

            <div className="pt-4 text-sm text-gray-500">{project?.description}</div>

            <div className="mt-6 grid grid-cols-3 gap-6">
              <div className="flex items-center space-x-2">
                <CiDollar className="text-2xl text-gray-600" />
                <div>
                  <div className="text-lg font-semibold">
                    ${" "}
                    {project?.Project_Rate === "Hourly"
                      ? project.Project_Min_Hourly_Rate +
                        "/hr" +
                        " - " +
                        "$" +
                        project.Project_Max_Hourly_Rate +
                        "/hr"
                      : project?.Project_Fixed_Budget}
                  </div>
                  <div className="text-sm text-gray-400">{project?.Project_Rate}</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FaGraduationCap className="text-2xl text-gray-600" />
                <div>
                  <div className="text-lg font-semibold">
                    {project?.experience_level === "Entry_Level"
                      ? "Entry Level"
                      : project?.experience_level}
                  </div>
                  <div className="text-sm text-gray-400">Experience Level</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FaCalendarMinus className="text-2xl text-gray-600" />
                <div>
                  <div className="text-lg font-semibold">{project?.deadline}</div>
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
                {JSON.parse(project?.skills_required?.replace(/'/g, '"') ?? "[]").map(
                  (skill: string) => (
                    <div
                      key={skill}
                      className="my-2 mr-3 inline-block rounded-full bg-[#b4d3c3] bg-opacity-[60%] px-4 py-1 text-sm font-semibold text-blue-800 duration-500 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee]"
                    >
                      <p className="text-center">{skill}</p>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-lg font-semibold">Activity on this job</div>
              <div className="mt-2 space-y-1 text-sm">
                <div>Proposals : 0</div>
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
                <p className="font-semibold">{project?.project_owner_name}</p>
                <p>{project?.project_owner_address}</p>

                <p>{data.count} jobs posted</p>
                <p className="text-gray-400">
                  Member since {new Date(project?.Project_created_at ?? "").toLocaleDateString()}
                </p>
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

export default JobPostDetails;
