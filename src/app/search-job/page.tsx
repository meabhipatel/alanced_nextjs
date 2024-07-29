"use client";
import React, { useState, useEffect } from "react";
// import HomeSection4 from "../../components/Layout/HomeSection4";
// import Footer from "../../components/Layout/Footer";
// import "font-awesome/css/font-awesome.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import "rc-slider/assets/index.css";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
// import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
// import { IconButton } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import CategoryList from "@/constant/allSelectionData/CategoryList";
import ExperienceLevel from "@/constant/allSelectionData/ExperienceLevel";
import ProjectRate from "@/constant/allSelectionData/ProjectRate";
import CityList from "@/constant/allSelectionData/CityList";
import SkillsList from "@/constant/allSelectionData/SkillsList";
import Bag from "../../assets/images/experience.png";
import mybg from "../../assets/images/half_background.png";
import hero2Image from "../../assets/images/hero2.png";
import { IoMdSearch } from "react-icons/io";
// import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { RxArrowRight , RxArrowLeft } from "react-icons/rx";

import { errorLog } from "@/utils/errorLog";

interface IProject {
    id: number;
    title: string;
    description: string;
    rate: "Hourly" | "Fixed";
    fixed_budget: number | null;
    min_hourly_rate?: number;
    max_hourly_rate?: number;
    experience_level?: string;
    category?: string;
    skills_required?: string;
    deadline?: string;
    is_hired?: boolean;
    project_creation_date?: string;
    project_owner?: number;
    project_owner_name?: string;
    project_owner_contact?: string;
    project_owner_location?: string;
    project_owner_date_of_creation?: string;
  }

  interface IBid {
    id: number;
    bid_amount: number;
    description: string;
    bid_type: string;
    bid_time: string;
    freelancer_id: number;
    project_id: number;
    project: IProject;
  }


function ProjectList() {
  // const location = useLocation();
  // const router = useRouter();
  // const searchParams = new URLSearchParams(location.search);
  // const searchParams = new URLSearchParams(router.query);
  // const category = searchParams.get("category");
  // const accessToken = useSelector((state: any) => state?.login?.accessToken) || localStorage.getItem("jwtToken");
  const accessToken = "this is access token";


  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState<string[]>([]);
  const [rateFilter, setRateFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    if (e.target.checked) {
      setCategoryFilter((prevFilters) => [...prevFilters, category]);
    } else {
      setCategoryFilter((prevFilters) => prevFilters.filter((filter) => filter !== category));
    }
    setCurrentPage(1);
  };

  const handleSkillFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value;
    if (e.target.checked) {
      setSkillFilter((prevFilters) => [...prevFilters, skills]);
    } else {
      setSkillFilter((prevFilters) => prevFilters.filter((filter) => filter !== skills));
    }
    setCurrentPage(1);
  };

  const handleExpFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const exp = e.target.value;
    if (e.target.checked) {
      setExpFilter((prevFilters) => [...prevFilters, exp]);
    } else {
      setExpFilter((prevFilters) => prevFilters.filter((filter) => filter !== exp));
    }
    setCurrentPage(1);
  };

  const handleRateFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const protype = e.target.value;
    if (e.target.checked) {
      setRateFilter((prevFilters) => [...prevFilters, protype]);
    } else {
      setRateFilter((prevFilters) => prevFilters.filter((filter) => filter !== protype));
    }
    setCurrentPage(1);
  };

  const handleCityFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    if (e.target.checked) {
      setCityFilter((prevFilters) => [...prevFilters, city]);
    } else {
      setCityFilter((prevFilters) => prevFilters.filter((filter) => filter !== city));
    }
    setCurrentPage(1);
  };

  const [viewProject, setViewProject] = useState<IProject[]>([]);

  useEffect(() => {
    const queryParameters = [];

    if (categoryFilter.length > 0) {
      queryParameters.push(`category=${categoryFilter.join("&category=")}`);
    }

    if (skillFilter.length > 0) {
      queryParameters.push(`skills_required=${skillFilter.join("&skills_required=")}`);
    }

    if (expFilter.length > 0) {
      queryParameters.push(`experience_level=${expFilter.join("&experience_level=")}`);
    }

    if (rateFilter.length > 0) {
      queryParameters.push(`rate=${rateFilter.join("&rate=")}`);
    }

    if (cityFilter.length > 0) {
      queryParameters.push(`project_owner_location=${cityFilter.join("&project_owner_location=")}`);
    }

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/freelance/view-all/Project/?${queryString}`)
      .then((response) => {
        setViewProject(response.data.results) 
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        errorLog(error);
      });
  }, [categoryFilter, skillFilter, expFilter, rateFilter, searchQuery, cityFilter, currentPage]);

  const [cate] = useState(CategoryList);
  const [expe] = useState(ExperienceLevel);
  const [type] = useState(ProjectRate);
  const [city] = useState(CityList);
  const [req_skill] = useState(SkillsList);

  

  function timeAgo(postedTimeStr: string) {
    const postedTime = new Date(postedTimeStr);
    const currentTime = new Date();

    const deltaInMilliseconds = currentTime.getTime() - postedTime.getTime();
    const deltaInSeconds = Math.floor(deltaInMilliseconds / 1000);
    const deltaInMinutes = Math.floor(deltaInSeconds / 60);
    const deltaInHours = Math.floor(deltaInMinutes / 60);
    const deltaInDays = Math.floor(deltaInHours / 24);

    if (deltaInMinutes < 1) {
      return "just now";
    } else if (deltaInMinutes < 60) {
      return `${deltaInMinutes} minute ago`;
    } else if (deltaInHours < 24) {
      return `${deltaInHours} hour ago`;
    } else if (deltaInDays < 30) {
      return `${deltaInDays} day ago`;
    } else if (deltaInDays < 365) {
      const months = Math.floor(deltaInDays / 30);
      return `${months} month ago`;
    } else {
      const years = Math.floor(deltaInDays / 365);
      return `${years} year ago`;
    }
  }

  const [expandedProjects, setExpandedProjects] = useState<boolean[]>([]);

  const handleToggleDescription = (index: number) => {
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.stopPropagation();

    handleToggleDescription(index);
  };

  const [AllProposals, setAllProposals] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!accessToken) return;
      try {
        // Fetch doc API
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

  //(=//=//=//=//=//=//=//=//=)filter API integrtion(//=//=//=//=//=//=//=//=//=)

  interface Bids {
    [key: string]: number;
  }

  

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
            // console.log(response.data.message || "Error fetching bids");
            bids[project.id] = 0;
          }
        } catch (err:unknown) {
          if(err instanceof Error){
            errorLog(err.message);
          }
          else{
            errorLog(" An unknown error occured")
          }
          bids[project.id] = 0;
        }
      }

      setBidsCount(bids);
    };

    fetchBidsForAllProjects();
  }, [viewProject]);

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [showAll, setShowAll] = useState(false);
  const initialCategoryCount = 5; // Initial number of categories to show

  const [visibleCategories, setVisibleCategories] = useState(cate.slice(0, initialCategoryCount));

  const handleShowMore = () => {
    setVisibleCategories(cate); // Show all categories
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleCategories(cate.slice(0, initialCategoryCount)); // Show the initial count
    setShowAll(false);
  };

  const [showAllSkills, setShowAllSkills] = useState(false);
  const initialSkillCount = 5; // Initial number of skills to show

  const [visibleSkills, setVisibleSkills] = useState(req_skill.slice(0, initialSkillCount));

  const handleShowMoreSkills = () => {
    setVisibleSkills(req_skill); // Show all skills
    setShowAllSkills(true);
  };

  const handleShowLessSkills = () => {
    setVisibleSkills(req_skill.slice(0, initialSkillCount)); // Show the initial count
    setShowAllSkills(false);
  };

  const [showAllCity, setShowAllCity] = useState(false);
  const initialCityCount = 5; // Initial number of cities to show

  const [visibleCities, setVisibleCities] = useState(city.slice(0, initialCityCount));

  const handleShowMoreCity = () => {
    setVisibleCities(city); // Show all cities
    setShowAllCity(true);
  };

  const handleShowLessCity = () => {
    setVisibleCities(city.slice(0, initialCityCount)); // Show the initial count
    setShowAllCity(false);
  };

  function highlightText(text:string, query:string) {
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
      {/* ---> page Header  */}
      <div
        className="flex h-[50vh] items-end justify-center bg-cover bg-no-repeat pb-6"
        style={{ backgroundImage: `url(${mybg})` }}
      >
        <div className="flex w-[95%] rounded-md bg-white p-5 text-2xl sm:w-[80%]">
          <div className="flex w-full flex-col items-start pt-5 text-start">
            <h1>Projects List</h1>
            <p className="mt-2 text-sm font-normal text-[#797979]">
              Explore high-paying freelance opportunities and land your dream job now!
            </p>
            <div className="mt-4 flex h-14 w-full items-center rounded-md bg-gray-50 p-3 shadow-md">
              <div className="flex w-full flex-row">
                <IoMdSearch className="h-6 w-6 text-[#797979]" />
                <input
                  className="w-full bg-transparent px-3 text-base outline-none"
                  placeholder="Search by Category"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                ></input>
              </div>

              <button className="h-8 w-24 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-base font-semibold text-white">
                Search
              </button>
            </div>
          </div>
          <div className="relative hidden w-full lg:block">
            <Image
              src={hero2Image}
              alt="hero-image-2"
              className="absolute -bottom-12"
            />
          </div>
        </div>
      </div>

      {/* ---> page Body  */}
      <div className="mb-2 mt-1 xl:px-20">
        <div className="flex flex-row px-5">
          {/* ---> side categoy bar */}
          <div className="sticky top-24 hidden h-[90vh] w-full overflow-y-auto bg-[#FFFFFF] py-8 pt-3 text-left md:w-[25%] lg:block">
            <div>
              <h1 className="text-left text-xl font-normal">Category</h1>
            </div>
            {visibleCategories.map((category, index) => (
              <div
                key={index}
                className="mt-4 flex flex-row"
              >
                <div className="basis-10/12">
                  <label className="relative flex cursor-pointer items-center">
                    <input
                      className="hidden"
                      type="checkbox"
                      value={category}
                      onChange={handleCategoryFilterChange}
                    />
                    <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                      <span className="checkmark hidden">
                        <i className="bi bi-check-lg pr-0.5 pt-2"></i>
                      </span>
                    </div>
                    <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                    <span className="font-normal text-[#797979]">{category}</span>
                  </label>
                </div>
              </div>
            ))}
            {showAll ? (
              <div>
                <button
                  className="mt-5 cursor-pointer text-left text-xl font-normal"
                  onClick={handleShowLess}
                >
                  Show Less
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="mt-5 cursor-pointer text-left text-xl font-normal"
                  onClick={handleShowMore}
                >
                  +{cate.length - initialCategoryCount} More
                </button>
              </div>
            )}
            <div>
              <h1 className="mt-10 text-left text-xl font-normal">Experience Level</h1>
            </div>
            {expe.map((exp) => (
              <div
                key={exp}
                className="mt-4 flex flex-row"
              >
                <div className="basis-8/12">
                  <label className="relative flex cursor-pointer items-center">
                    <input
                      className="hidden"
                      type="checkbox"
                      value={exp}
                      onChange={handleExpFilterChange}
                    />
                    <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                      <span className="checkmark hidden">
                        <i className="bi bi-check-lg pr-0.5 pt-2"></i>
                      </span>
                    </div>
                    <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                    <span className="font-normal text-[#797979]">{exp.replace(/_/g, " ")}</span>
                  </label>
                </div>
              </div>
            ))}
            <div>
              <h1 className="mt-10 text-left text-xl font-normal">Project Type</h1>
            </div>
            {type.map((protype, index) => (
              <div
                key={index}
                className="mt-4 flex flex-row"
              >
                <div className="basis-8/12 text-left">
                  <label className="relative mr-5 inline-flex cursor-pointer items-center">
                    <input
                      className="peer sr-only"
                      type="checkbox"
                      value={protype}
                      onChange={handleRateFilterChange}
                    />
                    <div className="dark:bg-white-700 peer h-6 w-11 rounded-full border-2 border-blue-300 bg-white from-[#0909E9] to-[#00D4FF] after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:bg-gradient-to-r after:transition-all after:content-[''] peer-checked:bg-gradient-to-r peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-0 peer-focus:ring-blue-600 dark:border-gray-600"></div>
                    <span className="ml-3 text-base font-normal text-[#797979]">{protype}</span>
                  </label>
                </div>
              </div>
            ))}

            <div>
              <h1 className="mt-10 text-left text-xl font-normal">Skills</h1>
            </div>
            {visibleSkills.map((skills) => (
              <div
                key={skills}
                className="mt-4 flex flex-row"
              >
                <div className="basis-8/12">
                  <label className="relative flex cursor-pointer items-center">
                    <input
                      className="hidden"
                      type="checkbox"
                      value={skills}
                      onChange={handleSkillFilterChange}
                    />
                    <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                      <span className="checkmark hidden">
                        <i className="bi bi-check-lg pr-0.5 pt-2"></i>
                      </span>
                    </div>
                    <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                    <span className="font-normal text-[#797979]">{skills}</span>
                  </label>
                </div>
              </div>
            ))}
            {showAllSkills ? (
              <div>
                <button
                  className="mt-5 cursor-pointer text-left text-xl font-normal"
                  onClick={handleShowLessSkills}
                >
                  Show Less
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="mt-5 cursor-pointer text-left text-xl font-normal"
                  onClick={handleShowMoreSkills}
                >
                  +{req_skill.length - initialSkillCount} More
                </button>
              </div>
            )}
            <div>
              <h1 className="mt-10 text-left text-xl font-normal">Citys</h1>
            </div>
            {visibleCities.map((location, index) => (
              <div
                key={index}
                className="mt-4 flex flex-row"
              >
                <div className="basis-8/12">
                  <label className="relative flex cursor-pointer items-center">
                    <input
                      className="hidden"
                      type="checkbox"
                      value={location}
                      onChange={handleCityFilterChange}
                    />
                    <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                      <span className="checkmark hidden">
                        <i className="bi bi-check-lg pr-0.5 pt-2"></i>
                      </span>
                    </div>
                    <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                    <span className="font-normal text-[#797979]">{location}</span>
                  </label>
                </div>
              </div>
            ))}
            {showAllCity ? (
              <div>
                <button
                  className="mt-5 cursor-pointer text-left text-xl font-normal"
                  onClick={handleShowLessCity}
                >
                  Show Less
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="mt-5 cursor-pointer text-left text-xl font-normal"
                  onClick={handleShowMoreCity}
                >
                  +{city.length - initialCityCount} More
                </button>
              </div>
            )}
          </div>

          {/* ---> card container  */}
          {viewProject !== null ? (
            viewProject.length > 0 ? (
              <div className="mb-5 mt-10 flex w-full flex-col gap-y-3 md:ml-2 lg:w-[80%]">
                {viewProject && (
                  <>
                    {viewProject.map((project: IProject, index) => {
                      const words = project.description.split(" ");
                      const displayWords =
                        expandedProjects[index] || words.length <= 30 ? words : words.slice(0, 30);

                      return (
                        <div
                          key={index}
                          className="flex w-full flex-col justify-between rounded-md bg-gray-50 p-2 duration-300 hover:bg-gray-100 md:flex-row md:px-12"
                        >
                          <div className="basis-9/12 text-left">
                            <h1 className="text-lg">{highlightText(project.title, searchQuery)}</h1>
                            {AllProposals &&
                              AllProposals.map((all: IBid) => {
                                return (
                                  <>
                                    {project.id === all.project_id ? (
                                      <span
                                        key={all.project_id}
                                        className="flex w-fit items-center justify-center text-blue-600"
                                      >
                                        {/* <TaskOutlinedIcon className="mr-1 text-blue-600" /> */}
                                        Already Applied
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                );
                              })}
                            <div className="mt-3 flex flex-row">
                              <div className="mr-2 basis-4/12 border-2 border-b-0 border-l-0 border-t-0 border-r-[#797979]">
                                <div className="flex flex-row">
                                  <div className="basis-2/12">
                                    <i className="bi bi-geo-alt"></i>
                                  </div>
                                  <div className="basis-10/12 text-[#797979]">
                                    {highlightText(
                                      project.project_owner_location
                                        ? project.project_owner_location
                                        : "NA",
                                      searchQuery
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="mr-2 basis-4/12 border-2 border-b-0 border-l-0 border-t-0 border-r-[#797979]">
                                <div className="flex flex-row">
                                  <div className="basis-2/12">
                                    <i
                                      className="fa fa-calendar"
                                      aria-hidden="true"
                                    ></i>
                                  </div>
                                  <div className="basis-10/12 text-[#797979]">
                                    {project.project_creation_date
                                      ? timeAgo(project.project_creation_date)
                                      : "Date not available"}
                                  </div>
                                </div>
                              </div>
                              <div className="basis-4/12">
                                <div className="flex flex-row">
                                  <div className="basis-2/12">
                                    <i className="bi bi-file-text"></i>
                                  </div>
                                  <div className="basis-10/12 text-[#797979]">
                                    {bidsCount[project.id] ? bidsCount[project.id] : 0} Received
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p className="py-3 text-[14px] text-[#0A142F] text-opacity-50">
                              Job Description: {highlightText(displayWords.join(" "), searchQuery)}
                              {words.length > 30 && (
                                <button
                                  className="cursor-pointer pl-2 text-[18px] font-semibold text-[#031136]"
                                  onClick={(event) => handleClick(event, index)}
                                >
                                  {expandedProjects[index] ? "Less" : "More"}
                                </button>
                              )}
                            </p>
                            {project.skills_required &&
                              JSON.parse(project.skills_required.replace(/'/g, '"')).map(
                                (skill: string, index: number) => (
                                  <span
                                    key={index}
                                    className="my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-60"
                                  >
                                    {highlightText(skill, searchQuery)}
                                  </span>
                                )
                              )}
                          </div>
                          <div className="flex h-full flex-row items-center justify-center gap-5 md:flex-col md:items-end md:gap-2">
                            <h1 className="text-right text-xl font-extrabold">
                              $
                              {project.rate === "Hourly"
                                ? project.min_hourly_rate +
                                  "/hr" +
                                  " - " +
                                  "$" +
                                  project.max_hourly_rate +
                                  "/hr"
                                : project.fixed_budget}
                            </h1>
                            <p className="mt-1 text-right text-sm text-[#797979]">
                              {project.rate} Rate
                            </p>
                            <div className="">
                              <Link
                                href={`/view-more/project-detail?state=${project}`}
                                // state={{ project }}
                              >
                                <button className="h-12 w-36 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-sm font-bold text-white">
                                  View Detail
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            ) : (
              <div className="mx-auto">
                <Image
                  src={Bag}
                  alt=""
                  className="ml-[30%] mt-[20%] h-[10%]"
                />
                <p className="mt-5 text-xl opacity-70">
                  There are no results that match your search.
                </p>
                <p className="mt-3 text-sm opacity-60">
                  Please try adjusting your search keywords or filters.
                </p>
              </div>
            )
          ) : (
            <div className="mt-10 basis-9/12">
              {/* <Skeleton
                height={50}
                width={50}
                inline={true}
                style={{ float: "left" }}
              />
              <Skeleton
                height={110}
                width={700}
                style={{ float: "left", marginLeft: 20 }}
              />
              <Skeleton
                height={40}
                width={100}
                style={{ marginTop: 40 }}
              />
              <br />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                style={{ marginTop: 5, marginLeft: 70, float: "left" }}
              />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                count={2}
                style={{ marginTop: 5, marginLeft: 5, float: "left" }}
              />

              <Skeleton
                height={50}
                width={50}
                inline={true}
                style={{ float: "left", marginTop: 80, marginLeft: -382 }}
              />
              <Skeleton
                height={110}
                width={700}
                style={{ float: "left", marginLeft: 70, marginTop: 35 }}
              />
              <Skeleton
                height={40}
                width={100}
                style={{ marginTop: 125 }}
              />
              <br />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                style={{ marginTop: 5, marginLeft: 70, float: "left" }}
              />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                count={2}
                style={{ marginTop: 5, marginLeft: 5, float: "left" }}
              />

              <Skeleton
                height={50}
                width={50}
                inline={true}
                style={{ float: "left", marginTop: 80, marginLeft: -382 }}
              />
              <Skeleton
                height={110}
                width={700}
                style={{ float: "left", marginLeft: 70, marginTop: 35 }}
              />
              <Skeleton
                height={40}
                width={100}
                style={{ marginTop: 125 }}
              />
              <br />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                style={{ marginTop: 5, marginLeft: 70, float: "left" }}
              />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                count={2}
                style={{ marginTop: 5, marginLeft: 5, float: "left" }}
              /> */}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="m-4 flex items-center justify-end gap-6">
            <button
              // size="sm"
              // variant="outlined"
              onClick={prev}
              disabled={currentPage === 1}
              className="rounded-lg p-1"
              style={{
                backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                border: "none",
              }}
            >
              <RxArrowLeft
                // strokeWidth={2}
                className="text-2xl text-white"
                // className="h-4 w-4 text-white"
              />
            </button>

            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`px-0 py-1 ${currentPage === pageNumber ? "cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent" : "cursor-pointer text-[14px] font-bold text-[#0A142F]"}`}
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
              className="rounded-lg p-1"
              style={{
                backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                border: "none",
              }}
            >
              <RxArrowRight
                // strokeWidth={2}
                className="text-2xl text-white"
                // className="h-4 w-4 text-white"
              />
            </button>
          </div>
        )}
      </div>
      {/* <HomeSection4 /> */}
      {/* <Footer /> */}
    </>
  );
}

export default ProjectList;
