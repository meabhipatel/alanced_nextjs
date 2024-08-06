"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import FreelancerPortfolio from "./HirerAllPopup/FreelancerPortfolio";
// import { formateDate, formatDateToDayMonthYear } from "../freelancer/TimeFunctions";
// import StarRating from "../freelancer/StarRating";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StartRating";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import FileIcon from "@/assets/icons/file.png";
import FreelancerPortfolioPopup from "@/components/FreelancerPortfolioPopup";
import { errorLog } from "@/utils/errorLog";

const ViewFreelancerDetails = () => {
  //   const location = useLocation();
  //   const freelancer = location.state && location.state.free;
  const freelancer = {
    id: 4,
    email: "ayan@gmail.com",
    first_Name: "Ayan",
    last_Name: "Jain",
    contact: "",
    Address: "Ahmedabad",
    DOB: null,
    gender: "",
    experience: 0,
    type: "FREELANCER",
    images_logo: "/media/images_logo/profilepic_cwZ76i6.png",
    qualification: "",
    social_media: "",
    map: "",
    skills: "['HTML', 'CSS', 'Wordpress', 'Shopify', 'Figma']",
    category: "Web Development",
    Language: "['Hindi', 'English']",
    hourly_rate: 5,
    experience_level: "Intermediate",
    about:
      "Passionate and seasoned web developer with three years of freelancing experience. Committed to delivering high-quality, innovative solutions that seamlessly blend functionality and aesthetics. Proficient in a variety of technologies to create engaging and user-friendly websites.",
  };
  // const hirer = useSelector(state => state.login.login_data); // 20 @
  // const loginData = useSelector(state => state.login.login_data);
  //   const loginData =
  //     useSelector((state) => state.login.login_data) || JSON.parse(localStorage.getItem("logindata"));

  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  const [freelancerproject, setfreelancerproject] = useState([]);
  const id = freelancer.id;
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [ProjectCount, setProjectCount] = useState(0); // eslint-disable-line
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [freelanceremployment, setfreelanceremployment] = useState([]);

  useEffect(() => {
    const queryParameters = [];

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axios
      .get(
        `https://www.api.alanced.com/freelance/View-all/Freelancer/Self-Project/${id}?${queryString}`
      )
      .then((response) => {
        setfreelancerproject(response.data.results);
        setProjectCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / 6));
      })
      .catch((error) => {
        errorLog(error);
      });
  }, [currentPage]);

  const prev = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`https://www.api.alanced.com/freelance/View-all/Review/${id}`)
        .then((response) => {
          if (response.data.status === 200) {
            setReviews(response.data.data);
          } else {
            errorLog(response.data.message || "Error fetching reviews");
          }
        })
        .catch((err) => {
          errorLog(err.message);
        });
    }
  }, [id]);

  const [startIdx, setStartIdx] = useState(0);

  const showMoreHandler = () => {
    setStartIdx((prevIdx) => prevIdx + 3);
  };

  const showLessHandler = () => {
    setStartIdx(0);
  };

  const visibleReviews = reviews.slice(startIdx, startIdx + 3);

  // const chunkArray = (array, size) => {
  //     let chunked = [];
  //     for (let i = 0; i < array.length; i += size) {
  //         chunked.push(array.slice(i, i + size));
  //     }
  //     return chunked;
  // }

  // const chunkedProjects = chunkArray(freelancerproject, 6);

  /* eslint-disable-next-line */
  const openPortfolio = (project: any) => {
    setSelectedProjects(project);
    setIsPortfolioOpen(true);
  };

  const closePortfolio = () => {
    setSelectedProjects(null);
    setIsPortfolioOpen(false);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`https://www.api.alanced.com/freelance/View-all/Freelancer/Employment/${id}`)
        .then((response) => {
          if (response.data.status === 200) {
            setfreelanceremployment(response.data.data);
          } else {
            errorLog(response.data.message || "Error fetching Employment data");
          }
        })
        .catch((err) => {
          errorLog(err.message);
        });
    }
  }, [id]);

  /* eslint-disable */
  const sortedEmployments = [...freelanceremployment].sort(
    (a: any, b: any) =>
      new Date(b.Company_Joining_date).getTime() - new Date(a.Company_Joining_date).getTime()
  );
  /* eslint-enable */

  const showMoreHandlers = () => {
    setStartIdx((prevIdx) => prevIdx + 2);
  };

  const showLessHandlers = () => {
    setStartIdx(0);
  };

  const visibleEmp = sortedEmployments.slice(startIdx, startIdx + 2);

  return (
    <>
      <div className="container-sm mb-6 mt-14 px-28">
        <div className="flex flex-row">
          <div className="basis-3/12 pl-14">
            <div className="relative h-24 w-24">
              <Image
                src={"https://www.api.alanced.com" + freelancer.images_logo}
                alt="Profile"
                className="h-full w-full rounded-full border border-gray-200"
                height={96}
                width={96}
              />
              <div className="absolute bottom-3 right-0.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500"></div>
            </div>
            <div className="mt-10 pl-2 text-left">
              <h1 className="font-cardo fond-semibold text-[20px]">Experience level</h1>
              <p className="font-cardo fond-semibold text-lg text-gray-500">
                {freelancer.experience_level
                  ? freelancer.experience_level.replace(/_/g, " ")
                  : "NA"}
              </p>
            </div>
            <div className="mt-5 pl-2 text-left">
              <h1 className="font-cardo fond-semibold text-[20px]">Category</h1>
              <p className="font-cardo fond-semibold text-lg text-gray-500">
                {freelancer.category ? freelancer.category : "NA"}
              </p>
            </div>
            <div className="mt-5 pl-2 text-left">
              <h1 className="font-cardo fond-semibold text-[20px]">Hourly Rate</h1>
              <p className="font-cardo fond-semibold text-lg text-gray-500">
                ${freelancer.hourly_rate ? freelancer.hourly_rate : 0}
              </p>
            </div>
            <div className="mt-5 pl-2 text-left">
              <h1 className="font-cardo fond-semibold text-[20px]">Educations</h1>
              <p className="font-cardo fond-semibold text-lg text-gray-500">
                {freelancer.qualification ? freelancer.qualification : "NA"}
              </p>
            </div>
            <div className="mt-5 pl-2 text-left">
              <h1 className="font-cardo fond-semibold text-[20px]">Languages</h1>
              {freelancer && freelancer.Language
                ? JSON.parse(freelancer.Language.replace(/'/g, '"')).map(
                    (language: string, index: number) => (
                      <p
                        key={index}
                        className="font-cardo fond-semibold text-lg text-gray-500"
                      >
                        {language}
                      </p>
                    )
                  )
                : null}
            </div>
          </div>
          <div className="basis-9/12">
            <div className="flex flex-row">
              <div className="basis-6/12">
                <div className="flex items-center">
                  <h1 className="font-cardo mr-1 text-[24px] font-normal text-[#031136]">
                    {freelancer.first_Name
                      ? freelancer.first_Name + " " + freelancer.last_Name
                      : " NA"}
                  </h1>
                  <RiVerifiedBadgeFill className="text-green-600" />
                </div>
                <div className="my-1 flex items-center">
                  <IoLocationOutline />
                  <p className="font-inter text-[14px] text-[#797979]">
                    {freelancer.Address ? freelancer.Address : "NA"}
                  </p>
                </div>
              </div>
              <div className="basis-3/12 text-right">
                <Link href="/login">
                  <span className="mr-4 mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-10 py-[10px] text-sm font-semibold text-white lg:mt-0">
                    Message
                  </span>
                </Link>
              </div>
              <Link href="/login">
                <div className="basis-3/12 text-left">
                  <div className="mr-2 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                    <button className="bg-white px-11 py-1">
                      <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                        Hire
                      </p>
                    </button>
                  </div>
                </div>
              </Link>
            </div>
            <div className="mt-[8%]">
              <p className="font-cardo fond-semibold text-left text-[22px]">About Freelancer</p>
              <div className="relative ml-1 mt-2 w-28">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                <div className="rounded-lg border-b-2 border-gray-600"></div>
              </div>
              <p className="font-inter py-5 pr-8 text-left text-[14px] text-[#031136] opacity-50">
                {freelancer.about ? freelancer.about : "NA"}
              </p>
            </div>
            <div className="mt-6">
              <p className="font-cardo fond-semibold text-left text-[22px]">Skills</p>
              <div className="relative ml-1 mt-2 w-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                <div className="rounded-lg border-b-2 border-gray-600"></div>
              </div>
              <div className="mt-5 text-left">
                {freelancer.skills
                  ? JSON.parse(freelancer.skills.replace(/'/g, '"')).map(
                      (skill: string, index: number) => (
                        <div
                          key={index} // Add a key prop for each skill for React to identify them uniquely.
                          className="mb-3 mr-3 inline-block rounded-full bg-[#b4d3c3] bg-opacity-[60%] px-8 py-[3px] text-sm font-semibold text-blue-800 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee]"
                        >
                          <p className="text-center">{skill}</p>
                        </div>
                      )
                    )
                  : "NA"}
              </div>
            </div>
            <div className="mt-8">
              <p className="font-cardo fond-semibold text-left text-[22px]">
                Portfolio ({freelancerproject ? freelancerproject.length : 0})
              </p>
              <div className="relative ml-1 mt-2 w-20">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                <div className="rounded-lg border-b-2 border-gray-600"></div>
              </div>
              <div className="-mx-2 flex flex-wrap">
                {
                  /* eslint-disable */
                  freelancerproject &&
                    freelancerproject.map((project: any, index) => (
                      <button
                        className="w-1/3 cursor-pointer px-2"
                        key={index}
                        onClick={() => openPortfolio(project)}
                      >
                        <div className="mt-4 h-[165px] w-full overflow-hidden border border-gray-100">
                          <Image
                            src={"https://www.api.alanced.com" + project.images_logo}
                            alt=""
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                            height={"250"}
                            width={"250"}
                          />
                        </div>
                        <p className="font-inter overflow-hidden overflow-ellipsis whitespace-nowrap pt-2 text-left text-[13px] font-semibold text-blue-600 underline hover:text-blue-700">
                          {project.project_title}
                        </p>
                      </button>
                    ))
                  /* eslint-enable */
                }
                {isPortfolioOpen && (
                  <FreelancerPortfolioPopup
                    project={selectedProjects}
                    closePortfolio={closePortfolio}
                  />
                )}
              </div>
              <div className="mt-5 flex items-center justify-end gap-6">
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
                      ArrowLeftIcon
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
                      style={{
                        backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                        border: "none",
                      }}
                    >
                      ArrowRightIcon
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-6">
                <p className="font-cardo fond-semibold text-left text-[22px]">
                  Reviews ({reviews && reviews ? reviews.length : 0})
                </p>
                <div className="relative ml-1 mt-2 w-24">
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                  <div className="rounded-lg border-b-2 border-gray-600"></div>
                </div>
                {
                  // eslint-disable-next-line
                  visibleReviews.map((review: any, index) => (
                    <>
                      <div
                        key={index}
                        className="my-3 text-left"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-inter py-1 text-[14px] text-[#0A142F]">
                            {review.Project_Name}
                          </p>
                          <div className="flex items-center space-x-2">
                            <StarRating rating={review.rating} />
                          </div>
                        </div>
                        <p className="font-inter text-[12px] text-[#0A142F] opacity-50">
                          {/* {formatDateToDayMonthYear(review.reviews_created_date)} */}
                          {new Date(review.reviews_created_date).toLocaleString()}
                        </p>
                        <p className="font-inter pt-3 text-[14px] text-[#0A142F] opacity-50">
                          {review.review}
                        </p>
                        <div className="my-6 grid grid-cols-3 gap-4">
                          <div className="">
                            <p className="font-cardo text-[16px] font-bold text-[#031136]">
                              $
                              {review.project_Rate === "Hourly"
                                ? review.project_Min_Hourly_Rate + "/hr"
                                : review.project_Budget}
                            </p>
                          </div>
                          <div className="">
                            <p className="font-cardo text-[16px] font-bold text-[#031136]">
                              {review.project_Rate}
                            </p>
                          </div>
                          <div className="">
                            <p className="font-cardo text-[16px] font-bold text-[#031136]">
                              {review.Reviewer}
                            </p>
                          </div>
                        </div>
                        <div className="my-4 border-b opacity-50"></div>
                      </div>
                    </>
                  ))
                }
                {reviews.length > 3 &&
                  (startIdx + 3 < reviews.length ? (
                    <button
                      className="font-cardo cursor-pointer text-right text-[20px] font-normal text-[#031136]"
                      onClick={showMoreHandler}
                    >
                      Show More
                    </button>
                  ) : (
                    <button
                      className="font-cardo cursor-pointer text-right text-[20px] font-normal text-[#031136]"
                      onClick={showLessHandler}
                    >
                      Show Less
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border border-gray-100 p-4 text-left">
          <p className="font-cardo fond-semibold text-left text-[22px]">Employment History</p>
          <div className="relative ml-1 mt-2 w-48">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
            <div className="rounded-lg border-b-2 border-gray-600"></div>
          </div>
          <div className="my-8 border-b opacity-50"></div>
          {visibleEmp.length === 0 ? (
            <>
              <Image
                src={FileIcon}
                alt="folder"
                className="mx-auto mt-5"
              />
              <p className="font-cardo py-3 text-center text-2xl">No Data Found</p>
            </>
          ) : (
            // eslint-disable-next-line
            visibleEmp.map((emp: any, index) => (
              <>
                <div
                  key={index}
                  className="my-5"
                >
                  <h1 className="font-cardo mr-1 text-[18px] font-normal text-[#031136]">
                    {emp.Company_Designation} | {emp.Freelancer_Company_Name}
                  </h1>
                  <p className="font-inter pt-2 text-left text-[14px] text-[#0A142F] opacity-50">
                    {emp.Company_Joining_date} - {emp.Company_Leaving_date}
                  </p>
                  <div className="my-3 border-b opacity-50"></div>
                </div>
              </>
            ))
          )}

          {freelanceremployment.length > 2 &&
            (startIdx + 2 < freelanceremployment.length ? (
              <button
                className="font-cardo mx-auto cursor-pointer text-[20px] font-normal text-[#031136]"
                onClick={showMoreHandlers}
              >
                Show More
              </button>
            ) : (
              <button
                className="font-cardo mx-auto cursor-pointer text-[20px] font-normal text-[#031136]"
                onClick={showLessHandlers}
              >
                Show Less
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default ViewFreelancerDetails;
