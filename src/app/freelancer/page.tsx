"use client";
import React, { useState, useEffect } from "react";
import search from "@/assets/icons/SearchOutlined.png";
import ladder from "@/assets/images/ladder.png";
import bag from "@/assets/images/bag.png";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { timeAgo } from "@/utils/timeFunction";
import fileIcon from "@/assets/icons/file.png";
import hero2Image from "@/assets/images/hero2.png";
import Image from "next/image";
import { RxArrowRight, RxArrowLeft } from "react-icons/rx";
import { errorLog } from "@/utils/errorLog";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { BsCoin, BsSendCheck } from "react-icons/bs";
import { useAppSelector } from "@/store/hooks";
import { axiosIntance } from "@/utils/axiosIntance";
import { axiosWithAuth } from "@/utils/axiosWithAuth";

interface IFreelanceProject {
  id: number;
  title: string;
  description: string;
  rate: "Hourly" | "Fixed";
  fixed_budget: number | null;
  min_hourly_rate: number;
  max_hourly_rate: number;
  deadline: string;
  skills_required: string;
  category: string;
  project_owner_name: string;
  project_creation_date: string;
  project_owner_location: string;
  project_owner_contact: string;
  experience_level: "Beginner" | "Intermediate" | "Expert";
  is_hired: boolean;
  project_owner_date_of_creation: string;
  project_owner: number;
}

interface IBid {
  id: number;
  bid_amount: number;
  description: string;
  bid_type: string;
  bid_time: string;
  freelancer_id: number;
  project_id: number;
  project: IFreelanceProject;
}

interface Bids {
  [key: string]: number;
}

const FreelancerAfterLogin = () => {
  const { userProfile } = useAppSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedProjects, setExpandedProjects] = useState<boolean[]>([]);
  const [viewProject, setViewProject] = useState<IFreelanceProject[]>([]);

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
      const res = await axiosIntance.get(`/freelance/view-all/Project/?${queryString}`);
      setViewProject(res.data.results);
      setTotalPages(Math.ceil(res.data.count / 8));
    } catch (error) {
      errorLog(error);
    }
  };

  const handleToggleDescription = (index: number) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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

  const [AllProposals, setAllProposals] = useState<IBid[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosWithAuth.get("/freelance/view/freelancer-all-self/bid");
        setAllProposals(res.data.data);
      } catch (error) {
        errorLog(error);
      }
    };

    fetchData();
  }, []);

  const toggleSaveProject = async (project: IFreelanceProject) => {
    try {
      const res = await axiosWithAuth.post(`/freelance/saved-projects/${project.id}`);

      if (res.data.isSaved) {
        toast.success("Job saved successfully!");
      } else {
        toast.success("Job unsaved successfully!");
      }
    } catch (error) {
      errorLog(error);
    }
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
    project: IFreelanceProject
  ) => {
    event.stopPropagation();
    event.preventDefault();
    handleToggleDescription(index);
    toggleSaveProject(project);
  };

  const [bidsCount, setBidsCount] = useState<Bids>({});

  useEffect(() => {
    const fetchBidsForAllProjects = async () => {
      const bids: Bids = {};

      for (const project of viewProject || []) {
        try {
          const response = await axios.get(
            `https://www.api.alanced.com/freelance/View/bids/${project.id}`
          );
          if (response.status === 200) {
            bids[project.id] = response.data.count;
          } else {
            errorLog(response.data.message || "Error fetching bids");
            bids[project.id] = 0;
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            errorLog(err.message);
          } else {
            errorLog(" An unknown error occured");
          }
          bids[project.id] = 0;
        }
      }

      setBidsCount(bids);
    };

    fetchBidsForAllProjects();
  }, [viewProject]);

  function highlightText(text: string, query: string) {
    if (!query) {
      return text;
    }

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            style={{ backgroundColor: "#73cbfa" }}
          >
            {part}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }

  return (
    <>
      <div className="px-5 lg:px-24 lg:pt-5">
        <div className="flex h-40 w-full bg-[#F6FAFD] md:h-52">
          <div className="flex w-full flex-col items-start justify-center p-2 md:w-[60%] md:pl-10">
            <h1 className="text-xl font-normal text-[#031136]">
              {day}, {formattedDate}
            </h1>
            <h1 className="py-1 text-start text-3xl font-medium text-[#031136]">
              Good {greeting},{" "}
              <span className="font-semibold capitalize">{userProfile.first_Name}</span>
            </h1>
          </div>
          <div className="hidden h-full w-[40%] md:block">
            <Image
              src={hero2Image}
              alt="hero-2"
              className="h-full w-full bg-contain"
            />
          </div>
        </div>
        <div className="mx-5 mb-5 flex flex-col md:flex-row">
          <div className="w-full border-b border-l border-gray-200 border-opacity-30 bg-[#FFFFFF] py-8 pt-3 text-left md:w-[30%]">
            <Link href="/freelancer/saved-jobs">
              <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
                <h1 className="mr-1 text-xl font-normal text-[#031136]">Saved Jobs</h1>
                <div className="mr-5 flex items-center space-x-2 text-blue-600">
                  <IoIosHeartEmpty className="text-2xl" />
                </div>
              </div>
            </Link>
            <Link href="/freelancer/my-proposals">
              <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
                <h1 className="mr-1 text-xl font-normal text-[#031136]">Proposals</h1>
                <div className="mr-5 flex items-center space-x-2 text-blue-600">
                  <BsSendCheck className="text-2xl" />
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
              <h1 className="mr-1 text-xl font-normal text-[#031136]">Get Paid</h1>
              <div className="mr-5 flex items-center space-x-2 text-blue-600">
                <BsCoin className="text-2xl" />
              </div>
            </div>
            <Link href="/search-job">
              <div className="mx-4 my-3 grid grid-cols-[2fr,1fr] gap-2 rounded-lg bg-[#e2f1f9] p-4 shadow-sm">
                <div>
                  <h1 className="text-left text-lg text-[#031136]">Get Tips To Find Work</h1>
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
                  <h1 className="text-left text-lg text-[#031136]">My Jobs</h1>
                  <p className="py-2 text-left text-sm text-[#0A142F] opacity-50">
                    View your active contracts, timesheets, and available earnings.
                  </p>
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
          <div className="w-full border border-gray-200 border-opacity-30 bg-[#FFFFFF] py-8 pt-3 text-left md:w-[70%]">
            <div className="border-b border-gray-200 border-opacity-30 px-4 pt-4 md:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h1 className="mr-1 text-[21px] font-normal text-[#031136]">
                    Jobs You Might Like
                  </h1>
                </div>
                <div className="flex items-center">
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
            {viewProject !== null ? (
              viewProject.length > 0 ? (
                <div>
                  {viewProject &&
                    viewProject.map((project, index) => {
                      const words = project.description.split(" ");
                      const displayWords =
                        expandedProjects[index] || words.length <= 50 ? words : words.slice(0, 50);
                      return (
                        <>
                          <Link href={`/view-project/details/${project.id}`}>
                            <div className="cursor-pointer border-b border-t border-gray-200 border-opacity-30 px-4 py-5 hover:bg-[#F6FAFD] md:px-8">
                              <div className="flex items-center justify-between">
                                <p className="text-[18px] font-semibold text-[#0A142F]">
                                  {highlightText(project.title, searchQuery)}
                                </p>
                                <div className="flex items-center space-x-2 text-blue-600">
                                  <button
                                    className="h-8 w-8 rounded-full border border-gray-200 bg-white p-1"
                                    onClick={(event) => handleClick(event, index, project)}
                                  >
                                    {localStorage.getItem(`isSaved_${project.id}`) === "true" ? (
                                      <IoIosHeart className="text-xl" />
                                    ) : (
                                      <IoIosHeartEmpty className="text-xl" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              {AllProposals &&
                                AllProposals.map((all: IBid, proposal) => {
                                  return (
                                    <div key={proposal}>
                                      {project.id === all.project_id ? (
                                        <span className="flex w-fit items-center justify-center text-blue-600">
                                          Already Applied
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  );
                                })}
                              <p className="py-3 text-[13px] text-[#0A142F] opacity-50">
                                {highlightText(project.rate, searchQuery)} -{" "}
                                {highlightText(
                                  project.experience_level.replace(/_/g, " "),
                                  searchQuery
                                )}{" "}
                                - Est. Budget: $
                                {project.rate === "Hourly"
                                  ? project.min_hourly_rate +
                                    "/hr" +
                                    " - " +
                                    "$" +
                                    project.max_hourly_rate +
                                    "/hr"
                                  : project.fixed_budget}{" "}
                                - Posted {timeAgo(project.project_creation_date)}
                              </p>
                              <p className="py-3 text-[14px] text-[#0A142F] text-opacity-50">
                                Job Description:{" "}
                                {highlightText(displayWords.join(" "), searchQuery)}
                                {words.length > 50 && (
                                  <button
                                    className="cursor-pointer pl-2 text-[18px] font-semibold text-[#031136]"
                                    onClick={(event) => handleClick(event, index, project)}
                                  >
                                    {expandedProjects[index] ? "Less" : "More"}
                                  </button>
                                )}
                              </p>
                              {JSON.parse(project.skills_required.replace(/'/g, '"')).map(
                                (skill: string, index: number) => (
                                  <Link
                                    key={index}
                                    href=""
                                  >
                                    <span className="my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-50">
                                      {highlightText(skill, searchQuery)}
                                    </span>
                                  </Link>
                                )
                              )}
                              <p className="mr-1 py-1 text-[14px] text-[#0A142F]">
                                Proposals :{" "}
                                <span className="opacity-50">
                                  {bidsCount[project.id] ? bidsCount[project.id] : 0}
                                </span>
                              </p>

                              <IoLocationOutline className="text-md mr-1 inline-block" />
                              <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
                                {highlightText(
                                  project.project_owner_location
                                    ? project.project_owner_location
                                    : "NA",
                                  searchQuery
                                )}
                              </p>
                            </div>
                          </Link>
                        </>
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
              )
            ) : (
              <div>
                {[...Array(8)].map((index) => {
                  return (
                    <div
                      key={index}
                      className="mb-5"
                    >
                      {/* <Skeleton
                        height={30}
                        width={200}
                        style={{ marginLeft: 20, marginTop: 20 }}
                      />
                      <Skeleton
                        height={30}
                        width={300}
                        style={{ marginLeft: 20, marginTop: 10 }}
                      />
                      <Skeleton
                        height={110}
                        width={700}
                        style={{ marginLeft: 20, marginTop: 10 }}
                      />
                      <Skeleton
                        height={30}
                        width={100}
                        inline={true}
                        style={{ marginTop: 5, marginLeft: 70, float: "left" }}
                      />
                      <Skeleton
                        height={30}
                        width={100}
                        inline={true}
                        count={2}
                        style={{ marginTop: 5, marginLeft: 5, float: "left" }}
                      />
                      <br />
                      <br />
                      <Skeleton
                        height={20}
                        width={200}
                        style={{ marginLeft: 20 }}
                      />
                      <Skeleton
                        height={20}
                        width={250}
                        style={{ marginLeft: 20, marginTop: 10 }}
                      /> */}
                    </div>
                  );
                })}
              </div>
            )}
            <div>
              {totalPages > 1 && (
                <div className="m-4 flex items-center justify-end gap-6">
                  <button
                    onClick={prev}
                    disabled={currentPage === 1}
                    style={{
                      backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                      border: "none",
                    }}
                  >
                    <RxArrowLeft className="text-2xl text-white" />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                      <button
                        key={pageNumber}
                        className={`px-0 py-1 ${
                          currentPage === pageNumber
                            ? "cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent"
                            : "cursor-pointer text-[14px] font-bold text-[#0A142F]"
                        }`}
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
                    onClick={next}
                    disabled={currentPage === totalPages}
                    style={{
                      backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                      border: "none",
                    }}
                  >
                    <RxArrowRight className="text-2xl text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelancerAfterLogin;
