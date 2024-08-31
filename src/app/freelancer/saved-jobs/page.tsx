"use client";
import React, { useCallback, useEffect, useState } from "react";
// import { MdVerified } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { timeAgo } from "@/utils/timeFunction";
import fileIcon from "@/assets/icons/file.png";
import { errorLog } from "@/utils/errorLog";
import Image from "next/image";
import { RxArrowRight, RxArrowLeft } from "react-icons/rx";
import { IoIosHeart } from "react-icons/io";

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
  const accessToken = localStorage.getItem("@accessToken");
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSavedJobs = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://www.api.alanced.com/freelance/View-all/SavedProjects?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2NTQ1NjU0LCJpYXQiOjE3MjUwMDk2NTQsImp0aSI6ImU2NjQ3YTg1MDJkMDRiMjk5Mjg0ODg0MjQxMDM2NTNjIiwidXNlcl9pZCI6NH0.d57YPt1OBtK7AVoCZ1JsPYsfuz2e42ACBQcpoApO-Lk
`,
          },
        }
      );

      if (response.status === 200) {
        setSavedJobs(response.data.results);
        // setSavedJobs(response.data.data);
        setTotalPages(Math.ceil(response.data.count / 8));
      } else {
        errorLog(response.data);
      }
    } catch (error: unknown) {
      // errorLog(error.message);
      if (error instanceof Error) {
        errorLog(error.message);
      } else {
        errorLog("An unknown error occurred");
      }
    }
  }, [accessToken, currentPage]);

  const [expandedProjects, setExpandedProjects] = useState<boolean[]>([]);

  const handleToggleDescription = (index: number) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };

  const toggleJobSaveStatus = async (jobId: number) => {
    try {
      const response = await axios.post(
        `https://www.api.alanced.com/freelance/saved-projects/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2NTQ1NjU0LCJpYXQiOjE3MjUwMDk2NTQsImp0aSI6ImU2NjQ3YTg1MDJkMDRiMjk5Mjg0ODg0MjQxMDM2NTNjIiwidXNlcl9pZCI6NH0.d57YPt1OBtK7AVoCZ1JsPYsfuz2e42ACBQcpoApO-Lk
`,
          },
        }
      );

      const isSaved = response.data.isSaved;

      // Update localStorage
      localStorage.setItem(`isSaved_${jobId}`, JSON.stringify(isSaved));

      if (response.status === 200) {
        if (response.data.isSaved === false) {
          toast.success("Job unsaved successfully!");
          const updatedJobs = savedJobs.filter((job: IProject) => job.Project_id !== jobId);
          setSavedJobs(updatedJobs);
          fetchSavedJobs();
        }
      }
    } catch (error) {
      errorLog(error);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, [accessToken, currentPage, fetchSavedJobs]);

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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

                  // const currentDate = new Date();
                  // const jobDeadline = new Date(job.deadline);
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
                        <p className="font-inter text-[16px] font-medium text-[#0A142F]">
                          {" "}
                          {job.Project_Name}
                        </p>
                        <div className="flex items-center justify-center">
                          <button
                            className="cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                            onClick={() => toggleJobSaveStatus(job.Project_id)}
                          >
                            {/* <i
                              className="fa fa-heart p-1 text-blue-600"
                              aria-hidden="true"
                            ></i> */}
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
                      {/* <Image
                        src={verify}
                        alt=""
                        className="mr-1 inline-block h-5 w-5"
                      /> */}
                      <div className="flex items-center gap-1">
                        {/* <MdVerified className="text-green-500" />
                        <p className="font-inter inline-block text-[16px] font-normal text-[#0A142F] opacity-50">
                          Payment verified
                        </p>
                        <div className="mx-3 inline-block text-[16px] text-[#FFC107]">★★★★★</div> */}
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
        {totalPages > 1 && (
          <div className="m-4 flex items-center justify-end gap-6">
            <button
              // size="sm"
              // variant="outlined"
              onClick={prev}
              disabled={currentPage === 1}
              style={{
                backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                border: "none",
              }}
            >
              <RxArrowLeft
                // strokeWidth={2}
                className="text-2xl text-white"
              />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`px-0 py-1 ${currentPage === pageNumber ? "font-inter cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent" : "font-inter cursor-pointer text-[14px] font-bold text-[#0A142F]"}`}
                  // onClick={() => setCurrentPage(pageNumber)}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setCurrentPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              // size="sm"
              // variant="outlined"
              onClick={next}
              disabled={currentPage === totalPages}
              style={{
                backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                border: "none",
              }}
            >
              <RxArrowRight
                // strokeWidth={2}
                className="text-2xl text-white"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
