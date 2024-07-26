"use client";
import React, { useState, useEffect } from "react";
// import HomeSection4 from "../../components/Layout/HomeSection4";
// import Footer from "../../components/Layout/Footer";
import verify from "../../assets/icons/verify.png";
import locations from "../../assets/icons/location.png";
// import { useDispatch } from "react-redux";
// import { Link, useRouter } from "react-router-dom";
import mybg from "../../assets/images/half_background.png";
// import { Avatar } from "@material-tailwind/react";
// import { IconButton } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { RxArrowLeft } from "react-icons/rx";
{/* <RxArrowLeft />; */}
import { RxArrowRight } from "react-icons/rx";
{/* <RxArrowRight />; */}
import axios from "axios";
import SkillsList from "@/constant/freelancer/allSelectionData/SkillsList";
import CityList from "@/constant/freelancer/allSelectionData/CityList";
import LanguageList from "@/constant/freelancer/allSelectionData/LanguageList";
import ExperienceLevel from "@/constant/freelancer/allSelectionData/ExperienceLevel";
import Bag from "../../assets/images/experience.png";
import hero2Image from "../../assets/images/hero2.png";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";
// import { useRouter } from "next/router";
import Image from "next/image";
import { errorLog } from "@/utils/errorLog";
import { FaCheck } from "react-icons/fa6";

const FindTalent = () => {
  // const location = useRouter();
  // const searchParams = new URLSearchParams(location.search);
  // const category = searchParams.get("category");

  const [expe] = useState(ExperienceLevel);
  const [city] = useState(CityList);
  const [req_skill] = useState(SkillsList);
  const [language] = useState(LanguageList);

  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  // const [hourlyRate, setHourlyRate] = useState([1, 1000]);

  // const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  const handleCityFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const city = e.target.value;
    if (e.target.checked) {
      setCityFilter((prevFilters) => [...prevFilters, city]);
    } else {
      setCityFilter((prevFilters) => prevFilters.filter((filter) => filter !== city));
    }
    setCurrentPage(1);
  };

  const handleLanguageFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const language = e.target.value;
    if (e.target.checked) {
      setLanguageFilter((prevFilters) => [...prevFilters, language]);
    } else {
      setLanguageFilter((prevFilters) => prevFilters.filter((filter) => filter !== language));
    }
    setCurrentPage(1);
  };

  interface Freelancer {
    id: number;
    email: string;
    first_Name: string;
    last_Name: string;
    contact: string;
    Address: string;
    DOB: string | null;
    gender: string;
    experience: number;
    type: string;
    images_logo: string;
    qualification: string;
    social_media: string;
    map: string;
    skills: string;
    category: string;
    Language: string;
    hourly_rate: number;
    experience_level: string;
    about: string;
    length: number;
  }

  const [viewFreelancer, setViewFreelancer] = useState<Freelancer[]>([]);
  // console.log(viewFreelancer, "freelancers by axios");

  useEffect(() => {
    const queryParameters = [];

    if (skillFilter.length > 0) {
      queryParameters.push(`skills=${skillFilter.join("&skills=")}`);
    }

    if (expFilter.length > 0) {
      queryParameters.push(`experience_level=${expFilter.join("&experience_level=")}`);
    }

    if (cityFilter.length > 0) {
      queryParameters.push(`Address=${cityFilter.join("&Address=")}`);
    }

    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }

    if (languageFilter.length > 0) {
      queryParameters.push(`Language=${languageFilter.join("&Language=")}`);
    }

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(`https://www.api.alanced.com/account/freelancer/profile/view-all/?${queryString}`)
      .then((response) => {
        setViewFreelancer(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        errorLog(error);
      });
  }, [skillFilter, expFilter, searchQuery, cityFilter, languageFilter, currentPage]);

  // const [range, setRange] = useState<number[]>([1, 1000]);

  // const handleSliderChange = (newRange:any) => {
  //   setRange(newRange);
  // };

  // const handleInputChange = (index:any, newValue:string) => {
  //   const updatedRange = [...range];
  //   updatedRange[index] = Number(newValue);
  //   setRange(updatedRange);
  // };

  interface ShowMoreSkillsState {
    [key: string]: {
      showAll: boolean;
    };
  }

  const [showMoreSkills, setShowMoreSkills] = useState<ShowMoreSkillsState>({});

  // Define the toggleShowMoreSkills function
  const toggleShowMoreSkills = (freelancerId: number) => {
    setShowMoreSkills((prevShowMoreSkills) => ({
      ...prevShowMoreSkills,
      [freelancerId]: {
        showAll: !prevShowMoreSkills[freelancerId]?.showAll,
      },
    }));
  };

  interface ShowMoreDescState {
    [key: string]: {
      showAllDes: boolean;
    };
  }

  const [showMoreDes, setShowMoreDes] = useState<ShowMoreDescState>({});

  const toggleShowMoreDes = (freelancerId: number) => {
    setShowMoreDes((prevShowMoreDes) => ({
      ...prevShowMoreDes,
      [freelancerId]: {
        showAllDes: !prevShowMoreDes[freelancerId]?.showAllDes,
      },
    }));
  };

  const getDisplayedText = (text: string, showAll: boolean) => {
    if (showAll) return text;

    const words = text.split(" ");
    if (words.length <= 20) return text;

    return words.slice(0, 20).join(" ") + "...";
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

  const [showAllLanguage, setShowAllLanguage] = useState(false);
  const initialLanguageCount = 5; // Initial number of language to show

  const [visibleLanguages, setVisibleLanguages] = useState(language.slice(0, initialLanguageCount));

  const handleShowMoreLanguage = () => {
    setVisibleLanguages(language); // Show all Languages
    setShowAllLanguage(true);
  };

  const handleShowLessLanguage = () => {
    setVisibleLanguages(language.slice(0, initialLanguageCount)); // Show the initial count
    setShowAllLanguage(false);
  };

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

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      {/* ---> page Header  */}
      <div
        className="flex h-[50vh] items-end justify-center bg-cover bg-no-repeat pb-8"
        style={{ backgroundImage: `url(${mybg})` }}
      >
        <div className="flex w-[95%] rounded-md bg-white p-5 text-2xl sm:w-[80%]">
          <div className="flex w-full flex-col items-start pt-5">
            <h1>Find & Hire Freelancers</h1>
            <p className="mt-2 text-sm font-normal text-[#797979]">
              More than 10K expert freelancers are waiting for you
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
      <div className="mt-1 px-2 xl:px-20">
        <div className="mx-5 mb-5 flex flex-col md:flex-row">
          {/* ---> side categoy bar */}
          <div className="sticky top-24 hidden h-[90vh] w-full overflow-y-auto bg-[#FFFFFF] py-8 pt-3 text-left md:w-[25%] lg:block">
            <div className="skills">
              <div>
                <h1 className="bg-white text-left text-xl font-normal">Skills</h1>
              </div>
              {visibleSkills.map((skill, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-row"
                >
                  <div className="basis-8/12">
                    <label className="relative flex cursor-pointer items-center">
                      <input
                        className="hidden"
                        type="checkbox"
                        value={skill}
                        onChange={handleSkillFilterChange}
                      />
                      <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                        <span className="checkmark hidden">
                          {/* <FaCheck className="text-sm" /> */}
                          <FaCheck className="text-sm" />
                        </span>
                      </div>
                      <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                      <span className="font-normal text-[#797979]">{skill}</span>
                    </label>
                  </div>
                </div>
              ))}
              {showAllSkills ? (
                <div>
                  <button
                    className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
                    onClick={handleShowLessSkills}
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
                    onClick={handleShowMoreSkills}
                  >
                    +{req_skill.length - initialSkillCount} More
                  </button>
                </div>
              )}
            </div>

            <div className="location">
              <div>
                <h1 className="mt-10 bg-white text-left text-xl font-normal">Citys</h1>
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
                          <FaCheck className="text-sm" />
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
                    className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
                    onClick={handleShowLessCity}
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
                    onClick={handleShowMoreCity}
                  >
                    +{city.length - initialCityCount} More
                  </button>
                </div>
              )}
            </div>
            <div className="language">
              <div>
                <h1 className="mt-10 bg-white text-left text-xl font-normal">Languages</h1>
              </div>
              {visibleLanguages.map((language, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-row"
                >
                  <div className="basis-8/12">
                    <label className="relative flex cursor-pointer items-center">
                      <input
                        className="hidden"
                        type="checkbox"
                        value={language}
                        onChange={handleLanguageFilterChange}
                      />
                      <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                        <span className="checkmark hidden">
                          <FaCheck className="text-sm" />
                        </span>
                      </div>
                      <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                      <span className="font-normal text-[#797979]">{language}</span>
                    </label>
                  </div>
                </div>
              ))}
              {showAllLanguage ? (
                <div>
                  <button
                    className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
                    onClick={handleShowLessLanguage}
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="mt-5 cursor-pointer bg-white text-left text-xl font-normal"
                    onClick={handleShowMoreLanguage}
                  >
                    +{language.length - initialLanguageCount} More
                  </button>
                </div>
              )}
            </div>
            <div className="level">
              <div>
                <h1 className="mt-10 bg-white text-left text-xl font-normal">Experience Level</h1>
              </div>
              {expe.map((exp, index) => (
                <div
                  key={index}
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
                          <FaCheck className="text-sm" />
                        </span>
                      </div>
                      <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
                      <span className="font-normal text-[#797979]">{exp}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---> card container  */}
          <div className="w-full bg-[#FFFFFF] pb-8 pt-3 text-left lg:w-[70%]">
            <div className="px-4 pt-4 md:px-8">
              <div className="flex items-center">
                <h1 className="mr-1 text-[21px] font-semibold text-[#031136]">
                  Freelancers that Matches your Job
                </h1>
              </div>
              <div className="relative mt-3 w-40">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                <div className="rounded-lg border-b-2 border-gray-600"></div>
              </div>
            </div>

            {viewFreelancer !== null ? (
              viewFreelancer.length > 0 ? (
                <div className="grid w-full grid-cols-1 gap-x-5 md:grid-cols-2 lg:pl-3.5">
                  {viewFreelancer &&
                    viewFreelancer.map((free, index) => {
                      return (
                        <>
                          <div
                            key={index}
                            className="relative mt-4 w-full flex-shrink-0 cursor-pointer rounded-lg px-4 py-5 shadow-lg hover:bg-[#F6FAFD] md:px-8"
                          >
                            <div className="flex items-center">
                              <Image
                                src={"https://www.api.alanced.com" + free.images_logo}
                                alt=""
                                height={96}
                                width={96}
                                // variant="rounded"
                                className="mr-4 h-24 w-24 rounded-lg"
                              />
                              <div>
                                <p className="text-[18px] font-semibold text-[#0A142F]">
                                  {highlightText(
                                    free.first_Name + " " + free.last_Name,
                                    searchQuery
                                  )}
                                </p>
                                <p className="text-[14px] text-[#0A142F] opacity-50">
                                  {highlightText(free.category, searchQuery)}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="inline-block pt-4 text-[14px] text-[#0A142F] opacity-50">
                                {highlightText(
                                  getDisplayedText(free.about, showMoreDes[free.id]?.showAllDes),
                                  searchQuery
                                )}
                              </p>
                              {free.about && free.about.split(" ").length > 20 && (
                                <button
                                  onClick={() => toggleShowMoreDes(free.id)}
                                  className="mb-2 inline-block cursor-pointer text-[14px] font-bold text-blue-600"
                                >
                                  {showMoreDes[free.id] && showMoreDes[free.id].showAllDes
                                    ? "See Less"
                                    : "See More"}
                                </button>
                              )}
                            </div>

                            {free.skills &&
                              JSON.parse(free.skills.replace(/'/g, '"')).map(
                                (skill: string, skillIndex: number) => (
                                  <Link
                                    href={""}
                                    key={skillIndex}
                                  >
                                    <span
                                      className={`my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-50 ${
                                        skillIndex < 4 ||
                                        (showMoreSkills[free.id] && showMoreSkills[free.id].showAll)
                                          ? ""
                                          : "hidden"
                                      }`}
                                    >
                                      {highlightText(skill, searchQuery)}
                                    </span>
                                  </Link>
                                )
                              )}
                            {free.skills &&
                              JSON.parse(free.skills.replace(/'/g, '"')).length > 4 && (
                                <button
                                  onClick={() => toggleShowMoreSkills(free.id)}
                                  className="cursor-pointer text-[14px] font-bold text-blue-600"
                                >
                                  {showMoreSkills[free.id] && showMoreSkills[free.id].showAll
                                    ? " Less"
                                    : " More"}
                                </button>
                              )}

                            <div className="mb-12">
                              <Image
                                src={verify}
                                alt=""
                                className="mr-1 inline-block h-3 w-3"
                              />
                              <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
                                Account verified
                              </p>
                              <div className="mx-3 inline-block text-[16px] text-[#FFC107]">
                                ★★★★★
                              </div>
                              <p className="mr-1 inline-block text-[14px] text-[#0A142F] opacity-80">
                                ${free.hourly_rate ? free.hourly_rate : 0}/Hr
                              </p>
                              <p className="mr-3 inline-block text-[14px] text-[#0A142F] opacity-50">
                                Hourly Rate
                              </p>
                              <p className="mr-2 inline-block text-[14px] text-[#0A142F] opacity-50">
                                {highlightText(
                                  free.experience_level.replace(/_/g, " "),
                                  searchQuery
                                )}
                              </p>
                              <Image
                                src={locations}
                                alt=""
                                className="mr-1 inline-block h-3 w-3"
                              />
                              <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
                                {highlightText(free.Address ? free.Address : "NA", searchQuery)}
                              </p>
                            </div>

                            <div className="flex flex-row">
                              <div className="absolute bottom-4 basis-8/12 cursor-pointer items-center text-[14px] font-bold text-blue-600 hover:underline">
                                <Link
                                  href="/view-freelancer/detail"
                                  // state={{ free }}
                                  onClick={() => window.scroll(0, 0)}
                                >
                                  <p>View more detail</p>
                                </Link>
                              </div>
                              <div className="absolute bottom-2 right-6 ml-auto basis-4/12 items-center space-x-2">
                                <Link href="/login">
                                  <span className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                                    Hire Now
                                  </span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              ) : (
                <div className="mt-20">
                  <Image
                    src={Bag}
                    alt=""
                    className="mx-auto w-[18%]"
                  />
                  <p className="mt-5 bg-white text-center text-xl opacity-70">
                    There are no results that match your search.
                  </p>
                  <p className="mt-3 bg-white text-center text-sm opacity-60">
                    Please try adjusting your search keywords or filters.
                  </p>
                </div>
              )
            ) : (
              <div className="grid w-[70%] grid-cols-2 pl-3.5 md:w-full">
                {[...Array(6)].map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="relative mt-4 h-[467px] w-[26vw] flex-shrink-0 cursor-pointer rounded-lg border-t border-opacity-30 px-4 py-5 shadow-lg hover:bg-[#F6FAFD] md:px-8"
                    >
                      {/* <Skeleton
                        height={90}
                        width={90}
                        inline={true}
                        style={{ borderRadius: "10%", float: "left" }}
                      />
                      <Skeleton
                        height={20}
                        width={200}
                        style={{ marginLeft: 10, marginTop: 20 }}
                      />
                      <Skeleton
                        height={20}
                        width={200}
                        style={{ marginLeft: 10, marginTop: 10 }}
                      />
                      <Skeleton
                        height={200}
                        width={300}
                        style={{ marginTop: 20 }}
                      />
                      <Skeleton
                        height={50}
                        width={200}
                        style={{ marginTop: 10 }}
                      />
                      <Skeleton
                        height={35}
                        width={80}
                        style={{ marginTop: 20, float: "right" }}
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
                    className="rounded-lg p-1"
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
        </div>
      </div>
      {/* <HomeSection4 /> */}
      {/* <Footer /> */}
    </>
  );
};

export default FindTalent;
