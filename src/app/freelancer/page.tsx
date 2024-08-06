"use client";
import React, { useState, useEffect } from "react";
// import Navbar from "../../components/Layout/Navbar";
// import HomeSection4 from "../../components/Layout/HomeSection4";
// import Footer from "../../components/Layout/Footer";
// import profilebg from "../../components/images/profilebg.png";
import search from "@/assets/icons/SearchOutlined.png";
// import certifybadge from "../../components/images/certifybadge.png";
import ladder from "@/assets/images/ladder.png";
import bag from "@/assets/images/bag.png";
// import downarrow from "../../components/images/downarrow.png";
// import thumbdown from "../../components/images/thumbdown.png";
// import heart from "../../components/images/heart.png";
// import { Link, useNavigate } from "react-router-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import ViewProjectPopup from "./AllPopup/ViewProjectPopup";
// import { GetViewAllProjectsListAction } from "../../redux/Freelancer/FreelancerAction";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
// import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
// import { IconButton, Typography } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
// import { toast } from "react-toastify";
import toast from "react-hot-toast";
import { timeAgo } from "@/utils/timeFunction";
import fileIcon from "@/assets/icons/file.png";
import hero2Image from "@/assets/images/hero2.png";
import Image from "next/image";
import { RxArrowRight, RxArrowLeft } from "react-icons/rx";
import { errorLog } from "@/utils/errorLog";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";

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

// interface IAllPraposals {
//   title: string;
//   category: string;
//   description: string;
//   skills_required: string;
//   Project_rate: "Hourly" | "Fixed";
//   Project_budget: number | null;
//   Project_min_hourly_rate: number;
//   Project_max_hourly_rate: number;
//   Project_experience_level: "Beginner" | "Intermediate" | "Expert";
//   deadline: string;
//   created_at: string;
//   project_owner_first_Name: string;
//   project_owner_address: string;
//   project_owner_data_of_creation: string;
// }

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
  //   const logindata = useSelector(state => state.login.login_data);
  //   const logindata = useSelector((state) => state.login.login_data) || JSON.parse(localStorage.getItem("logindata"));

  // const logindata = {
  //   id: 4,
  //   first_Name: "sachin",
  //   last_Name: "sharma",
  //   email: "sachinsharmapeace@gmail.com",
  //   contact: "",
  //   Address: "",
  //   images_logo: "/media/images_logo/profile8.jfif",
  //   social_media: "",
  //   skills: "['Python']",
  //   about: "",
  //   DOB: null,
  //   gender: "",
  //   map: "",
  //   experience: 0,
  //   qualification: "B.E",
  //   category: "",
  //   Language: "['Hindi']",
  //   hourly_rate: 0,
  //   experience_level: "",
  // };

  //   const googleUserName = localStorage.getItem("googleUserName");
  //   const loginMethod = localStorage.getItem("loginMethod");
  // const viewallprojects = useSelector((state: any) => state.freelancer.viewallprojects);
  // const viewallprojects: any[] = [];
  //   const accessToken = useSelector(state => state.login.accessToken);
  //   const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzOTQyMjI2LCJpYXQiOjE3MjI0MDYyMjYsImp0aSI6IjA5OTA3MGI4OTQ5NDRkZDQ4ZWNiNTQwNzc4ZTE4OTNhIiwidXNlcl9pZCI6NH0.wSynaiGQ8ykuvLI-FNyd8B2XoYYDATI1QotxySyzRu0";
  //   const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm] = useState("");
  //   const dispatch = useDispatch();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  //   React.useEffect(() => {
  //     dispatch(GetViewAllProjectsListAction())
  //   }, [])

  //   let displayName;

  //   if (loginMethod === "google") {
  //     //   displayName = googleUserName;
  //     displayName =
  //       logindata.first_Name && logindata.last_Name
  //         ? logindata?.first_Name + " " + logindata?.last_Name
  //         : googleUserName;
  //   } else if (loginMethod === "traditional") {
  //     displayName = logindata?.first_Name + " " + logindata?.last_Name;
  //   }

  // const filteredProjects = viewallprojects
  //   ? viewallprojects.filter((project:IFreelanceProject) => project.category === logindata?.category)
  //   : [];

  const filteredProjects: any[] = []; // eslint-disable-line

  // eslint-disable-next-line
  const searchFilteredProjects = filteredProjects.filter((project: any) => {
    const skills = JSON.parse(project.skills_required.replace(/'/g, '"'));
    return (
      skills.some((skill: string) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const projectsToDisplay = searchFilteredProjects.length > 0 ? searchFilteredProjects : [];
  const [expandedProjects, setExpandedProjects] = useState<boolean[]>([]);

  const [viewProject, setViewProject] = useState<IFreelanceProject[]>([]);
  //   const userCategory = logindata?.category

  useEffect(() => {
    const queryParameters = [];

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/freelance/view-all/Project/?${queryString}`)
      .then((response) => {
        setViewProject(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
        // const projectsMatchingCategory = response.data.results.filter(project => project.category === userCategory);
        // setViewProject(projectsMatchingCategory);
        // setTotalPages(Math.ceil(projectsMatchingCategory.length / 8));
      })
      .catch((error) => {
        errorLog(error);
      });
  }, [searchQuery, currentPage]);

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

  //   const { day, formattedDate, greeting } = getCurrentDateAndGreeting();
  const { day, formattedDate } = getCurrentDateAndGreeting();

  const [AllProposals, setAllProposals] = useState<IBid[]>([]);

  //   console.log("All Proposal --------------- >", AllProposals);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "https://www.api.alanced.com/freelance/view/freelancer-all-self/bid",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setAllProposals(response1.data.data);
      } catch (error) {
        errorLog(error);
      }
    };

    fetchData();
  }, []);
  //   console.log("/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/", AllProposals);

  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [categorySearch, setCategorySearch] = useState('');

  //   useEffect(() => {
  //       setCurrentPage(1);
  //   }, [categorySearch]);

  //   const jobsPerPage = 5;
  //   const indexOfLastJob = currentPage * jobsPerPage;
  //   const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  //   const filteredJobs = projectsToDisplay?.filter(project =>
  //       project.skills_required.toLowerCase().includes(categorySearch.toLowerCase())
  //   ) || [];

  //   const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  //   const totalPages = Math.ceil((filteredJobs.length || 0) / jobsPerPage);
  //   const next = () => {
  //       window.scrollTo(0, 0);
  //       if (currentPage === totalPages) return;
  //       setCurrentPage(currentPage + 1);
  //   };

  //   const prev = () => {
  //       window.scrollTo(0, 0);
  //       if (currentPage === 1) return;
  //       setCurrentPage(currentPage - 1);
  //   };

  //   const chunkArray = (array, size:number) => {
  //     let chunked = [];
  //     if (viewallprojects != null) {
  //       for (let i = 0; i < array.length; i += size) {
  //         chunked.push(array.slice(i, i + size));
  //       }
  //     }
  //     return chunked;
  //   };

  //   const chunkedFree = chunkArray(projectsToDisplay);
  //eslint-disable-next-line
  const toggleSaveProject = async (project: any) => {
    try {
      let response;

      if (project.isSaved) {
        response = await axios.delete(
          `https://www.api.alanced.com/freelance/saved-projects/${project.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      } else {
        response = await axios.post(
          `https://www.api.alanced.com/freelance/saved-projects/${project.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }

      const updatedJob = response.data;

      localStorage.setItem(`isSaved_${project.id}`, JSON.stringify(updatedJob.isSaved));

      if (updatedJob.isSaved) {
        toast.success("Job saved successfully!");
        router.push("/freelancer/profile");
      } else {
        toast.success("Job unsaved successfully!");
        router.push("/freelancer/profile");
      }
      //eslint-disable-next-line
      const updatedProjects = projectsToDisplay.map((p: any) => {
        if (p.id === updatedJob.id) {
          return updatedJob;
        }
        return p;
      });

      projectsToDisplay.push(updatedProjects);
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
            <h1 className="py-1 text-start text-3xl font-semibold text-[#031136]">
              {/* Good {greeting}, <span className="font-[500] capitalize">{displayName}</span> */}
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
            <Link href="/saved-jobs">
              <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
                <h1 className="mr-1 text-xl font-normal text-[#031136]">Saved Jobs</h1>
                <div className="mr-5 flex items-center space-x-2 text-blue-600">
                  <i className="bi bi-heart"></i>
                  {/* <i class="bi bi-heart-fill"></i> */}
                </div>
              </div>
            </Link>
            <Link href="/my-proposals">
              <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
                <h1 className="mr-1 text-xl font-normal text-[#031136]">Proposals</h1>
                <div className="mr-5 flex items-center space-x-2 text-blue-600">
                  <i className="bi bi-send-check"></i>
                  {/* <i class="bi bi-send-check-fill"></i> */}
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between rounded-2xl border-b border-gray-200 border-opacity-30 px-4 py-4 hover:bg-[#e2f1f9] md:px-8">
              <h1 className="mr-1 text-xl font-normal text-[#031136]">Get Paid</h1>
              <div className="mr-5 flex items-center space-x-2 text-blue-600">
                {/* <img src={downarrow} alt="" /> */}
                <i className="bi bi-coin"></i>
              </div>
            </div>
            <Link href="/projects">
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
            <Link href="/all-invitations">
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
          {/* {viewallprojects != null ?  */}
          <div className="w-full border border-gray-200 border-opacity-30 bg-[#FFFFFF] py-8 pt-3 text-left md:w-[70%]">
            <div className="border-b border-gray-200 border-opacity-30 px-4 pt-4 md:px-8">
              {/* <h1 className=" text-[21px] text-[#031136] font-normal mr-1">Jobs You Might Like</h1> */}
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
                          <Link
                            href="/view-project/full-detail"
                            // state={{ project }}
                          >
                            <div className="cursor-pointer border-b border-t border-gray-200 border-opacity-30 px-4 py-5 hover:bg-[#F6FAFD] md:px-8">
                              <div className="flex items-center justify-between">
                                <p className="text-[18px] font-semibold text-[#0A142F]">
                                  {highlightText(project.title, searchQuery)}
                                </p>
                                <div className="flex items-center space-x-2">
                                  <button
                                    className="h-8 w-8 rounded-full border border-gray-200 bg-white p-1"
                                    onClick={(event) => handleClick(event, index, project)}
                                  >
                                    {localStorage.getItem(`isSaved_${project.id}`) === "true" ? (
                                      <i className="fa fa-heart p-1 text-blue-600"></i>
                                    ) : (
                                      <i className="fa fa-heart-o p-1"></i>
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
                                          {/* <TaskOutlinedIcon className="mr-1 text-blue-600" /> */}
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
                              <RiVerifiedBadgeFill className="text-md mr-1 inline-block text-green-600" />
                              <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
                                Payment verified
                              </p>
                              <div className="mx-3 inline-block text-[16px] text-[#FFC107]">
                                ★★★★★
                              </div>
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
              {/* {projectsToDisplay?.length > 5 && (
                    <div className="flex justify-end items-center gap-6 m-4">
                        <IconButton
                            size="sm"
                            variant="outlined"
                            onClick={prev}
                            disabled={currentPage === 1}
                            style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
                        >
                            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
                        </IconButton>
                        
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <span
                                    key={pageNumber}
                                    className={`px-0 py-1 ${currentPage === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold  text-[14px] cursor-pointer' : 'text-[#0A142F] font-bold  text-[14px] cursor-pointer'}`}
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </span>
                            );
                        })}

                        <IconButton
                            size="sm"
                            variant="outlined"
                            onClick={next}
                            disabled={currentPage === totalPages}
                            style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
                        >
                            <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
                        </IconButton>
                    </div>
                )} */}
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
                      //   strokeWidth={2}
                      className="text-2xl text-white"
                    />
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
                      //   strokeWidth={2}
                      className="text-2xl text-white"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <HomeSection4 /> */}
      {/* <Footer /> */}
    </>
  );
};

export default FreelancerAfterLogin;
