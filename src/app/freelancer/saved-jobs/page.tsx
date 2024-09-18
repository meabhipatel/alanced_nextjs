"use client";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { timeAgo } from "@/utils/timeFunction";
import fileIcon from "@/assets/icons/file.png";
import { errorLog } from "@/utils/errorLog";
import Image from "next/image";
import { IoIosHeart } from "react-icons/io";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface IProject {
  Project_id: number;
  Project_Name: string;
  Project_Description: string;
  deadline: string;
  Project_Rate: string;
  Project_Fixed_Budget: number | null;
  Project_Min_Hourly_Rate: number | null;
  Project_Max_Hourly_Rate: number | null;
  Project_skills: string[];
  Project_Created: string;
  Project_Experience_level: string;
  Project_Hirer_Location: string;
  is_hired: boolean;
}

const SavedJobs = () => {
  const params = useSearchParams();
  const [savedJobs, setSavedJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  /** ---> Fetching saved jobs data onload. */
  useEffect(() => {
    fetchSavedJobs();
  }, [params]);

  const fetchSavedJobs = async () => {
    try {
      const res = await axiosWithAuth.get(
        `/freelance/View-all/SavedProjects?page=${params.get("page") ?? 1}`
      );
      setSavedJobs(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 8));
    } catch (error) {
      errorLog(error);
    }
  };

  const [expandedProjects, setExpandedProjects] = useState<boolean[]>([]);

  const handleToggleDescription = (index: number) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };

  const toggleJobSaveStatus = async (jobId: number) => {
    try {
      const res = await axiosWithAuth.post(`/freelance/saved-projects/${jobId}`);
      if (res.data.isSaved === false) {
        toast.success("Job unsaved successfully!");
        const updatedJobs = savedJobs.filter((job: IProject) => job.Project_id !== jobId);
        setSavedJobs(updatedJobs);
        fetchSavedJobs();
      }
    } catch (error) {
      errorLog(error);
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-xl flex-col items-start p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h1 className="font-cardo mb-6 text-2xl font-normal text-[#031136] sm:text-3xl md:text-4xl">
        Saved Jobs
      </h1>
      <div className="my-4 w-full rounded-lg border border-gray-200 border-opacity-30 bg-white p-6 shadow-md">
        {savedJobs && savedJobs.length > 0 ? (
          <>
            {savedJobs && (
              <>
                {savedJobs.map((job: IProject, index) => {
                  const words = job.Project_Description.split(" ");
                  const displayWords =
                    expandedProjects[index] || words.length <= 50 ? words : words.slice(0, 50);
                  return (
                    <div
                      key={index}
                      className="border-b border-gray-200 border-opacity-30 px-4 py-5 md:px-8"
                    >
                      {job.is_hired ? (
                        <p className="font-inter py-3 text-[16px] font-normal text-[#FFC107] opacity-50">
                          Job is no longer available
                        </p>
                      ) : (
                        ""
                      )}

                      <div className="flex items-center justify-between">
                        <Link href={`/view-project/details/${job.Project_id}`}>
                          <p className="font-inter text-[16px] font-semibold text-gray-800 hover:text-blue-600 hover:underline">
                            {job.Project_Name}
                          </p>
                        </Link>
                        <div className="flex items-center justify-center">
                          <button
                            className="cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                            onClick={() => toggleJobSaveStatus(job.Project_id)}
                          >
                            <IoIosHeart className="text-blue-500" />
                          </button>
                        </div>
                      </div>
                      <p className="font-inter py-3 text-[14px] font-normal text-[#0A142F] opacity-50">
                        {job.Project_Rate} - {job.Project_Experience_level.replace(/_/g, " ")} -
                        Est. Budget: $
                        {job.Project_Rate === "Hourly"
                          ? job.Project_Min_Hourly_Rate +
                            "/hr" +
                            " - " +
                            "$" +
                            job.Project_Max_Hourly_Rate +
                            "/hr"
                          : job.Project_Fixed_Budget}{" "}
                        - Posted {timeAgo(job.Project_Created)}
                      </p>
                      <p className="font-inter py-3 text-[16px] font-normal text-[#0A142F] text-opacity-50">
                        {displayWords.join(" ")}
                        {words.length > 50 && (
                          <button
                            className="font-cardo cursor-pointer pl-2 text-[18px] font-semibold text-[#031136]"
                            onClick={() => handleToggleDescription(index)}
                          >
                            {expandedProjects[index] ? "Less" : "More"}
                          </button>
                        )}
                      </p>
                      <div className="flex items-center gap-1">
                        <IoLocationOutline />
                        <p className="font-inter inline-block text-[16px] font-normal text-[#0A142F] opacity-50">
                          {job.Project_Hirer_Location ? job.Project_Hirer_Location : "N/A"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </>
        ) : (
          <div className="my-8">
            <Image
              src={fileIcon}
              alt=""
              className="mx-auto mt-2"
            />
            <div className="px-4 py-5 text-center text-2xl opacity-50 md:px-8">
              No Saved Jobs Found
            </div>
          </div>
        )}

        {totalPages > 1 && <Pagination totalPages={totalPages} />}
      </div>
    </div>
  );
};

export default SavedJobs;
