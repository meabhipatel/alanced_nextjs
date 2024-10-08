"use client";
import React, { useState, useEffect } from "react";
import hirerHeroBg from "@/assets/images/hirer_hero_bg.png";
import { IoIosSearch } from "react-icons/io";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import SkillsList from "@/constant/allSelectionData/skillsList";
import LanguageList from "@/constant/allSelectionData/languageList";
import CityList from "@/constant/allSelectionData/cityList";
import ExperienceLevel from "@/constant/allSelectionData/experienceLevel";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { errorLog } from "@/utils/errorLog";
import SendFreeLancerHireRequestPopup from "@/components/SendFreeLancerHireRequestPopup";
import fileIcon from "@/assets/icons/file.png";
import Link from "next/link";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { IFreelancerHiringOpen, IFreelancer } from "@/interfaces/index";
import { axiosIntance } from "@/utils/axiosIntance";
import { useAppSelector } from "@/store/hooks";

const HirerAfterLogin = () => {
  const { userProfile } = useAppSelector((state) => state.auth);
  const [isFreeHiringOpen, setIsFreeHiringOpen] = useState<IFreelancerHiringOpen>({});
  const [expe] = useState(ExperienceLevel);
  const [city] = useState(CityList);
  const [req_skill] = useState(SkillsList);
  const [language] = useState(LanguageList);
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState<string[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const openFreeHiring = (freelancerId: number) => {
    setIsFreeHiringOpen((prev) => ({ ...prev, [freelancerId]: true }));
  };

  const closeFreeHiring = (freelancerId: number) => {
    setIsFreeHiringOpen((prev) => ({ ...prev, [freelancerId]: false }));
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

  const [viewFreelancer, setViewFreelancer] = useState<IFreelancer[]>([]);
  errorLog(viewFreelancer);

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

    setIsLoading(true);

    axiosIntance
      .get(`/account/freelancer/profile/view-all/?${queryString}`)
      .then((response) => {
        setViewFreelancer(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 8));
      })
      .catch((error) => {
        errorLog(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [skillFilter, expFilter, searchQuery, cityFilter, languageFilter, currentPage]);

  interface ShowMoreSkillsState {
    [key: string]: {
      showAll: boolean;
    };
  }

  const [showMoreSkills, setShowMoreSkills] = useState<ShowMoreSkillsState>({});

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

  const [showAllSkills, setShowAllSkills] = useState(false);
  const initialSkillCount = 5;

  const [visibleSkills, setVisibleSkills] = useState(req_skill.slice(0, initialSkillCount));

  const handleShowMoreSkills = () => {
    setVisibleSkills(req_skill);
    setShowAllSkills(true);
  };

  const handleShowLessSkills = () => {
    setVisibleSkills(req_skill.slice(0, initialSkillCount));
    setShowAllSkills(false);
  };

  const [showAllCity, setShowAllCity] = useState(false);
  const initialCityCount = 5;

  const [visibleCities, setVisibleCities] = useState(city.slice(0, initialCityCount));

  const handleShowMoreCity = () => {
    setVisibleCities(city);
    setShowAllCity(true);
  };

  const handleShowLessCity = () => {
    setVisibleCities(city.slice(0, initialCityCount));
    setShowAllCity(false);
  };

  const [showAllLanguage, setShowAllLanguage] = useState(false);
  const initialLanguageCount = 5;
  const [visibleLanguages, setVisibleLanguages] = useState(language.slice(0, initialLanguageCount));

  const handleShowMoreLanguage = () => {
    setVisibleLanguages(language);
    setShowAllLanguage(true);
  };

  const handleShowLessLanguage = () => {
    setVisibleLanguages(language.slice(0, initialLanguageCount));
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
      {/* ---> page Body  */}
      <div className="mt-1 bg-red-500 md:mx-[9%]">
        {/* ---> page Header  */}
        <div className="relative m-2 h-32 bg-[#F6FAFD] md:m-0 md:h-auto md:bg-transparent">
          <Image
            src={hirerHeroBg}
            alt=""
            className="hidden h-52 w-full md:block"
          />
          <div className="absolute p-4 text-left md:left-12 md:top-12">
            <div className="text-lg font-normal text-[#031136] sm:text-xl">
              {day}, {formattedDate}
            </div>
            <div className="py-1 text-2xl font-semibold text-[#031136] sm:text-3xl">
              Good {greeting},{" "}
              <span className="font-semibold capitalize">{userProfile.first_Name}</span>
            </div>
          </div>
        </div>
        <div className="mx-5 mb-5 flex flex-col md:flex-row">
          {/* ---> side category bar */}
          <div className="sticky top-28 hidden h-[90vh] w-full overflow-y-auto bg-[#FFFFFF] py-8 pt-3 text-left md:block md:w-[30%]">
            <div className="skills">
              <div>
                <div className="text-left text-xl font-normal">Skills</div>
              </div>
              {visibleSkills.map((skill, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-row"
                >
                  <div className="basis-8/12">
                    <label className="font-inter relative flex cursor-pointer items-center">
                      <input
                        className="hidden"
                        type="checkbox"
                        value={skill}
                        onChange={handleSkillFilterChange}
                      />
                      <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                        <span className="checkmark hidden">
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
            </div>

            <div className="location">
              <div>
                <div className="mt-10 text-left text-xl font-normal">Cities</div>
              </div>

              {visibleCities.map((location, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-row"
                >
                  <div className="basis-8/12">
                    <label className="font-inter relative flex cursor-pointer items-center">
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
            <div className="language">
              <div>
                <div className="mt-10 text-left text-xl font-normal">Languages</div>
              </div>
              {visibleLanguages.map((language, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-row"
                >
                  <div className="basis-8/12">
                    <label className="font-inter relative flex cursor-pointer items-center">
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
                    className="mt-5 cursor-pointer text-left text-xl font-normal"
                    onClick={handleShowLessLanguage}
                  >
                    Show Less
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="mt-5 cursor-pointer text-left text-xl font-normal"
                    onClick={handleShowMoreLanguage}
                  >
                    +{language.length - initialLanguageCount} More
                  </button>
                </div>
              )}
            </div>
            <div className="level">
              <div>
                <div className="mt-10 text-left text-xl font-normal">Experience Level</div>
              </div>
              {expe.map((exp, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-row"
                >
                  <div className="basis-8/12">
                    <label className="font-inter relative flex cursor-pointer items-center">
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
          <div className="w-full bg-[#FFFFFF] py-8 pt-3 text-left md:w-[70%]">
            <div className="px-4 pt-4 md:px-8">
              <div className="items-center justify-between md:flex">
                <div className="flex items-center">
                  <h1 className="mr-1 text-[21px] font-semibold text-[#031136]">
                    Freelancers that Matches your Job
                  </h1>
                </div>
                <div className="mt-2 flex items-center md:mt-0">
                  <div className="flex w-full items-center space-x-1 rounded-md border p-1 md:mr-1 md:w-[200px]">
                    <IoIosSearch className="ml-1 mr-1 h-4 w-4 text-gray-400" />
                    <input
                      className="h-7 w-28 text-sm outline-none lg:w-40 lg:text-sm xl:w-[160px]"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 md:px-8">
              <p className="font-inter text-[13px] text-[#0A142F] opacity-50">
                Explore freelancers who are a perfect fit for your projects.
              </p>
            </div>

            {isLoading && (
              <div className="grid w-[70%] grid-cols-2 pl-3.5 md:w-full">
                {[...Array(6)].map((index) => {
                  return (
                    <div
                      key={index}
                      className="relative mt-4 h-[25rem] w-[26vw] flex-shrink-0 animate-pulse cursor-pointer rounded-lg border border-gray-200 bg-gray-100 px-4 py-5 shadow-lg md:px-8"
                    ></div>
                  );
                })}
              </div>
            )}

            {!isLoading &&
              (viewFreelancer.length > 0 ? (
                <div className="grid grid-cols-1 md:w-full md:grid-cols-2 md:pl-3.5">
                  {viewFreelancer &&
                    viewFreelancer.map((free, index) => {
                      return (
                        <>
                          <div
                            className="relative mt-4 flex-shrink-0 cursor-pointer rounded-lg border-b border-t border-gray-200 border-opacity-30 px-4 py-5 shadow hover:bg-[#F6FAFD] md:w-[26vw] md:px-8"
                            key={index}
                          >
                            <div className="flex items-center">
                              <Image
                                src={"https://www.api.alanced.com" + free.images_logo}
                                alt=""
                                height={96}
                                width={96}
                                className="mr-4 h-24 w-24 rounded-lg"
                              />
                              <div>
                                <p className="font-inter text-[18px] font-semibold text-[#0A142F]">
                                  {highlightText(
                                    free.first_Name + " " + free.last_Name,
                                    searchQuery
                                  )}
                                </p>
                                <p className="font-inter text-[14px] text-[#0A142F] opacity-50">
                                  {highlightText(free.category, searchQuery)}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="font-inter inline-block pt-4 text-[14px] text-[#0A142F] opacity-50">
                                {highlightText(
                                  getDisplayedText(free.about, showMoreDes[free.id]?.showAllDes),
                                  searchQuery
                                )}
                              </p>
                              {free.about && free.about.split(" ").length > 20 && (
                                <button
                                  onClick={() => toggleShowMoreDes(free.id)}
                                  className="font-inter mb-2 inline-block cursor-pointer text-[14px] font-bold text-blue-600"
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
                                      className={`font-inter my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-50 ${
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
                                  className="font-inter cursor-pointer text-[14px] font-bold text-blue-600"
                                >
                                  {showMoreSkills[free.id] && showMoreSkills[free.id].showAll
                                    ? " Less"
                                    : " More"}
                                </button>
                              )}

                            <div className="mb-12">
                              <RiVerifiedBadgeFill className="mr-1 h-3 w-3 text-green-500" />
                              <p className="font-inter inline-block text-[14px] text-[#0A142F] opacity-50">
                                Account verified
                              </p>
                              <div className="mx-3 inline-block text-[16px] text-[#FFC107]">
                                ★★★★★
                              </div>
                              <p className="font-inter mr-1 inline-block text-[14px] text-[#0A142F] opacity-80">
                                ${free.hourly_rate ? free.hourly_rate : 0}/Hr
                              </p>
                              <p className="font-inter mr-3 inline-block text-[14px] text-[#0A142F] opacity-50">
                                Hourly Rate
                              </p>
                              <p className="font-inter mr-2 inline-block text-[14px] text-[#0A142F] opacity-50">
                                {highlightText(
                                  free.experience_level.replace(/_/g, " "),
                                  searchQuery
                                )}
                              </p>
                              <IoLocationOutline className="mr-1 h-3 w-3" />
                              <p className="font-inter inline-block text-[14px] text-[#0A142F] opacity-50">
                                {highlightText(free.Address ? free.Address : "NA", searchQuery)}
                              </p>
                            </div>
                            <div className="flex flex-row">
                              <div className="font-inter absolute bottom-4 basis-8/12 cursor-pointer items-center text-[14px] font-bold text-blue-600 hover:underline">
                                <Link href={`/view-freelancer/details/${free.id}`}>
                                  <p>View more detail</p>
                                </Link>
                              </div>
                              <div className="absolute bottom-2 right-6 ml-auto basis-4/12 items-center space-x-2">
                                <button
                                  className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0"
                                  onClick={() => openFreeHiring(free.id)}
                                >
                                  Hire Now
                                </button>
                              </div>
                              {isFreeHiringOpen[free.id] && (
                                <SendFreeLancerHireRequestPopup
                                  closePopup={() => closeFreeHiring(free.id)}
                                  freelancer={free}
                                />
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              ) : (
                <div className="mt-20">
                  <Image
                    src={fileIcon}
                    alt=""
                    className="mx-auto w-[18%]"
                  />
                  <p className="mt-5 text-center text-xl opacity-70">
                    There are no results that match your search.
                  </p>
                  <p className="mt-3 text-center text-sm opacity-60">
                    Please try adjusting your search keywords or filters.
                  </p>
                </div>
              ))}

            {/* ---> Pagination  */}
            <div>
              {totalPages > 1 && (
                <div className="m-4 flex items-center justify-end gap-6">
                  <button
                    onClick={prev}
                    disabled={currentPage === 1}
                    className="rounded-lg p-1"
                    style={{
                      backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                      border: "none",
                    }}
                  >
                    <RxArrowLeft
                      strokeWidth={0.3}
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
                            ? "font-inter cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent"
                            : "font-inter cursor-pointer text-[14px] font-bold text-[#0A142F]"
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
                    className="rounded-lg p-1"
                    style={{
                      backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                      border: "none",
                    }}
                  >
                    <RxArrowRight
                      strokeWidth={0.3}
                      className="text-2xl text-white"
                    />
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

export default HirerAfterLogin;
