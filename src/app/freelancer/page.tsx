"use client";
import React, { useState, useEffect } from "react";
import search from "@/assets/icons/SearchOutlined.png";
import ladder from "@/assets/images/ladder.png";
import bag from "@/assets/images/bag.png";
import Link from "next/link";
import fileIcon from "@/assets/icons/file.png";
import hero2Image from "@/assets/images/hero2.png";
import Image from "next/image";
import { errorLog } from "@/utils/errorLog";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsCoin, BsSendCheck } from "react-icons/bs";
import { useAppSelector } from "@/store/hooks";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { IProject } from "../(public-routes)/search-job/SearchJob";
import ProjectCard from "@/components/ProjectCard";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

export interface IFreelanceProject extends IProject {
  is_applied: boolean;
  is_saved: boolean;
  total_bid_count: number;
}

const FreelancerAfterLogin = () => {
  const searchParams = useSearchParams();
  const { userProfile } = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page") ?? 1));
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewProject, setViewProject] = useState<IFreelanceProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // /** ---> Setting current page from url */
  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page") ?? 1));
  }, [searchParams]);

  /** ---> Fetching projects data on load. */
  useEffect(() => {
    handleFetchAllProject();
  }, [searchQuery, currentPage]);

  const handleFetchAllProject = async () => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }
    queryParameters.push(`page=${currentPage}`);
    const queryString = queryParameters.join("&");

    try {
      setIsLoading(true);
      const res = await axiosWithAuth.get(`/freelance/view-all/Project/?${queryString}`);
      setViewProject(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 8));
    } catch (error) {
      errorLog(error);
    } finally {
      setIsLoading(false);
    }
  };

  function getCurrentDateAndGreeting() {
    const current = new Date();
    const hours = current.getHours();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let greeting;
    if (hours < 12) {
      greeting = "Morning";
    } else if (hours < 17) {
      greeting = "Afternoon";
    } else {
      greeting = "Evening";
    }

    const dateOfMonth = current.getDate();
    function getOrdinalSuffix(date: number) {
      if (date > 3 && date < 21) return "th";
      switch (date % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    }

    const formattedDate = `${months[current.getMonth()]} ${dateOfMonth}${getOrdinalSuffix(dateOfMonth)}`;
    return {
      day: days[current.getDay()],
      formattedDate,
      greeting,
    };
  }

  const { day, formattedDate, greeting } = getCurrentDateAndGreeting();

  return (
    <>
      <div className="container sm:px-5 md:px-10 lg:px-20">
        {/* --- > Page Header */}
        <div className="flex h-40 w-full bg-[#F6FAFD] md:h-52">
          <div className="flex w-full flex-col items-start justify-center p-2 md:w-[60%] md:pl-10">
            <div className="text-xl font-normal text-[#031136]">
              {day}, {formattedDate}
            </div>
            <div className="py-1 text-start text-3xl font-medium text-[#031136]">
              Good {greeting},{" "}
              <span className="font-semibold capitalize">{userProfile.first_Name}</span>
            </div>
          </div>
          <div className="hidden h-full w-[40%] md:block">
            <Image
              src={hero2Image}
              alt="hero-2"
              className="h-full w-full bg-contain"
            />
          </div>
        </div>

        {/* --- > Body */}
        <div className="mb-5 flex flex-col md:flex-row">
          {/* --- > Side container */}
          <div className="w-full border-b border-l border-gray-200 border-opacity-30 bg-[#FFFFFF] py-8 pt-3 text-left md:w-[30%]">
            <Link href="/freelancer/saved-jobs">
              <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
                <div className="mr-1 text-xl font-normal text-[#031136]">Saved Jobs</div>
                <div className="mr-5 flex items-center space-x-2 text-blue-600">
                  <IoIosHeartEmpty className="text-2xl" />
                </div>
              </div>
            </Link>
            <Link href="/freelancer/my-proposals">
              <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
                <div className="mr-1 text-xl font-normal text-[#031136]">Proposals</div>
                <div className="mr-5 flex items-center space-x-2 text-blue-600">
                  <BsSendCheck className="text-2xl" />
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
              <div className="mr-1 text-xl font-normal text-[#031136]">Get Paid</div>
              <div className="mr-5 flex items-center space-x-2 text-blue-600">
                <BsCoin className="text-2xl" />
              </div>
            </div>
            <Link href="/search-job">
              <div className="mx-4 my-3 grid grid-cols-[2fr,1fr] gap-2 rounded-lg bg-[#e2f1f9] p-4 shadow-sm">
                <div>
                  <div className="text-left text-lg text-[#031136]">Get Tips To Find Work</div>
                  <p className="py-2 text-left text-sm text-[#0A142F] opacity-50">
                    Learn to optimize search, use Connects, and land your first job.
                  </p>
                </div>
                <div className="text-center">
                  <i className="bi bi-arrow-right"></i>
                  <Image
                    src={ladder}
                    alt=""
                    className="mx-auto mt-2 h-16 w-16"
                  />
                </div>
              </div>
            </Link>
            <Link href="/freelancer/all-invitations">
              <div className="relative z-10 mx-4 grid grid-cols-[2fr,1fr] gap-2 rounded-lg bg-[#e2f1f9] p-4 shadow-sm">
                <div>
                  <div className="text-left text-lg text-[#031136]">My Jobs</div>
                  <h1 className="py-2 text-left text-sm text-[#0A142F] opacity-50">
                    View your active contracts, timesheets, and available earnings.
                  </h1>
                </div>
                <div className="text-center">
                  <i className="bi bi-arrow-right"></i>
                  <Image
                    src={bag}
                    alt=""
                    className="mx-auto mt-2 h-16 w-16"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* --- > Project card container */}
          <div className="w-full border border-gray-200 border-opacity-30 bg-[#FFFFFF] py-8 pt-3 text-left md:w-[70%]">
            <div className="border-b border-gray-200 border-opacity-30 px-4 pt-4 md:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-1 text-[21px] font-normal text-[#031136]">
                    Jobs You Might Like
                  </div>
                </div>
                <div className="flex items-center sm:flex-col">
                  <div className="mr-1 flex w-[200px] items-center space-x-1 rounded-md border p-1">
                    <Image
                      src={search}
                      alt="Search Icon"
                      className="ml-1 mr-1 h-4 w-4"
                    />
                    <input
                      className="h-7 w-28 text-sm outline-none lg:w-40 lg:text-sm xl:w-[160px]"
                      placeholder="Search Jobs by skills"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 md:px-8">
              <p className="text-[13px] text-[#0A142F] opacity-50">
                Browse jobs that match your experience to a client&apos;s hiring preferences.
                <br /> Ordered by most relevant.
              </p>
            </div>

            {isLoading ? (
              <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader
                  size="lg"
                  color="primary"
                />
              </div>
            ) : (
              <>
                {viewProject.length > 0 ? (
                  <div>
                    {viewProject.map((project) => {
                      return (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          searchQuery={searchQuery}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="mx-auto">
                    <Image
                      src={fileIcon}
                      alt=""
                      className="ml-[42%] mt-[20%] h-[10%]"
                    />
                    <p className="mt-5 text-center text-xl opacity-70">
                      There are no results that match your search.
                    </p>
                    <p className="mt-3 text-center text-sm opacity-60">
                      Please try adjusting your search keywords or filters.
                    </p>
                  </div>
                )}

                {/* ---> Pagination */}
                <Pagination totalPages={totalPages} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelancerAfterLogin;
