"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/StartRating";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import FreelancerPortfolioPopup from "@/components/FreelancerPortfolioPopup";
import { errorLog } from "@/utils/errorLog";
import { axiosIntance } from "@/utils/axiosIntance";
import { useAppSelector } from "@/store/hooks";
import HireNowButtonAndPopup from "@/components/HireNowButtonAndPopup";
import { FreelanceProject, IEmployment, IReview } from "@/app/freelancer/profile/page";
import { formatDateToDayMonthYear, formateDate } from "@/utils/timeFunction";
import fileIcon from "@/assets/icons/file.png";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

interface IProps {
  params: {
    freelancerId: string;
  };
}

interface IFreelancerProfile {
  Address: string;
  Block: boolean;
  Company_Establish: string | null;
  Company_Name: string;
  DOB: string | null;
  Language: string;
  about: string;
  category: string;
  contact: string;
  date_of_creation: string;
  experience: number;
  experience_level: "Entry_Level" | "Intermediate" | "Expert";
  first_Name: string;
  gender: string;
  hourly_rate: string;
  id: number;
  images_logo: string;
  is_active: boolean;
  is_freelancer: boolean;
  is_hirer: boolean;
  is_owner: boolean;
  is_verified: boolean;
  last_Name: string;
  last_login: string | null;
  map: string;
  qualification: string;
  skills: string;
  social_media: string;
  type: "FREELANCER" | "HIRER";
}

const ViewFreelancerDetails: FC<IProps> = ({ params: { freelancerId } }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [freelancerProfile, setFreelancerProfile] = useState<IFreelancerProfile | null>(null);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [freelancerproject, setfreelancerproject] = useState<FreelanceProject[]>([]);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [ProjectCount, setProjectCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [visibleReviews, setVisibleReviews] = useState<IReview[]>([]);
  const [freelanceremployment, setfreelanceremployment] = useState<IEmployment[]>([]);
  const [visibleEmployment, setVisibleEmployment] = useState<IEmployment[]>([]);

  /** ---> Fetching freelancer profile on laod. */
  useEffect(() => {
    handleFetchFreelancerProfile();
  }, []);

  const handleFetchFreelancerProfile = async () => {
    try {
      const res = await axiosIntance.get(`/account/freelancer/profile/view/${freelancerId}`);
      setFreelancerProfile(res.data);
    } catch (error) {
      errorLog(error);
    }
  };

  useEffect(() => {
    handleFetchSelfProjects();
  }, [currentPage]);

  const handleFetchSelfProjects = async () => {
    const queryParameters = [];
    queryParameters.push(`page=${currentPage}`);
    const queryString = queryParameters.join("&");
    try {
      const res = await axiosIntance.get(
        `/freelance/View-all/Freelancer/Self-Project/${freelancerId}?${queryString}`
      );
      setfreelancerproject(res.data.results);
      setProjectCount(res.data.count);
      setTotalPages(Math.ceil(res.data.count / 6));
    } catch (error) {
      errorLog(error);
    }
  };

  useEffect(() => {
    handleFetchReviews();
  }, [freelancerId]);

  const handleFetchReviews = async () => {
    try {
      const res = await axiosIntance.get(`/freelance/View-all/Review/${freelancerId}`);
      setReviews(res.data.data);
      setVisibleReviews(res.data.data?.slice(0, 3));
    } catch (error) {
      errorLog(error);
    }
  };

  useEffect(() => {
    handleFetchEmployment();
  }, [freelancerId]);

  const handleFetchEmployment = async () => {
    try {
      const res = await axiosIntance.get(
        `/freelance/View-all/Freelancer/Employment/${freelancerId}`
      );
      setfreelanceremployment(res.data.data);
      setVisibleEmployment(res.data.data?.slice(0, 3));
    } catch (error) {
      errorLog(error);
    }
  };

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  /* eslint-disable-next-line */
  const openPortfolio = (project: any) => {
    setSelectedProjects(project);
    setIsPortfolioOpen(true);
  };

  const closePortfolio = () => {
    setSelectedProjects(null);
    setIsPortfolioOpen(false);
  };

  /** ---> Show Either More or Less */

  const showMoreReviews = () => {
    setVisibleReviews(reviews);
  };

  const showLessReviews = () => {
    setVisibleReviews(reviews.slice(0, 3));
  };

  const showMoreEmployment = () => {
    setVisibleEmployment(freelanceremployment);
  };

  const showLessEmployment = () => {
    setVisibleEmployment(freelanceremployment.slice(0, 3));
  };

  return (
    <>
      <div className="container sm:px-5 md:px-10 lg:px-20">
        {/* ---> Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex flex-col items-center lg:flex-row">
            <div className="relative mt-4 h-24 w-24 lg:mt-0">
              <Image
                src={"https://www.api.alanced.com/" + freelancerProfile?.images_logo}
                alt="Profile"
                className="h-full w-full rounded-full border border-gray-200"
                height={96}
                width={96}
              />
              <div className="absolute bottom-3 right-0.5 h-4 w-4 rounded-full border-2 border-white bg-blue-500"></div>
            </div>
            <div className="ml-4 mt-4 text-center lg:mt-0 lg:text-left">
              <div className="flex items-center justify-center lg:justify-start">
                <h1 className="mr-1 text-[24px] font-normal text-[#031136]">
                  {freelancerProfile?.first_Name
                    ? freelancerProfile?.first_Name + " " + freelancerProfile?.last_Name
                    : "NA"}
                </h1>
                <RiVerifiedBadgeFill className="text-green-600" />
              </div>
              <div className="my-1 flex items-center justify-center lg:justify-start">
                <IoLocationOutline className="mr-1" />
                <p className="text-[14px] text-[#797979]">
                  {freelancerProfile?.Address ? freelancerProfile?.Address : "NA"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2 lg:ml-auto lg:mt-4 lg:flex-row lg:items-start lg:space-x-2 lg:space-y-0">
            <div className="mb-4 text-center lg:mb-2 lg:text-left">
              <Link href={isLoggedIn ? "/freelancer/messages" : "/login"}>
                <div className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                  <button className="bg-white px-4 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Message
                    </p>
                  </button>
                </div>
              </Link>
            </div>
            <div className="text-center lg:text-left">
              <HireNowButtonAndPopup freelancerId={freelancerProfile?.id} />
            </div>
          </div>
        </div>

        {/* ---> Page Sections */}
        <div className="mt-6 flex w-full flex-col lg:mt-8 lg:flex-row lg:gap-8">
          {/* ---> Left Section */}
          <div className="lg:min-w-[25%]">
            <div className="sticky top-24 flex flex-col gap-6">
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h1 className="text-xl font-medium text-gray-800">Experience Level</h1>
                <p className="mt-1 text-lg font-semibold text-gray-600">
                  {freelancerProfile?.experience_level
                    ? freelancerProfile?.experience_level.replace(/_/g, " ")
                    : "NA"}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h1 className="text-xl font-medium text-gray-800">Category</h1>
                <p className="mt-1 text-lg font-semibold text-gray-600">
                  {freelancerProfile?.category ? freelancerProfile?.category : "NA"}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h1 className="text-xl font-medium">Hourly Rate</h1>
                <p className="mt-1 text-lg font-semibold text-gray-600">
                  ${freelancerProfile?.hourly_rate ? freelancerProfile?.hourly_rate : 0}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h1 className="text-xl font-medium">Educations</h1>
                <p className="mt-1 text-lg font-semibold text-gray-600">
                  {freelancerProfile?.qualification ? freelancerProfile?.qualification : "NA"}
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                <h1 className="text-xl font-medium">Languages</h1>
                {freelancerProfile && freelancerProfile.Language
                  ? JSON.parse(freelancerProfile.Language.replace(/'/g, '"') ?? "[]").map(
                      (language: string, index: number) => (
                        <p
                          key={index}
                          className="mt-1 text-lg font-semibold text-gray-600"
                        >
                          {language}
                        </p>
                      )
                    )
                  : null}
              </div>
            </div>
          </div>

          {/* ---> Right Sections */}
          <div className="flex w-full flex-col gap-6">
            <div>
              <p className="text-left text-[22px] font-semibold">About Freelancer</p>
              <div className="relative ml-1 mt-2 w-28">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                <div className="rounded-lg border-b-2 border-gray-600"></div>
              </div>
              <p className="py-5 pr-8 text-justify text-[14px] text-[#031136]/60">
                {freelancerProfile?.about ? freelancerProfile.about : "NA"}
              </p>
            </div>
            <div>
              <p className="text-left text-[22px] font-semibold">Skills</p>
              <div className="relative ml-1 mt-2 w-8">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                <div className="rounded-lg border-b-2 border-gray-600"></div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-left">
                {freelancerProfile?.skills
                  ? JSON.parse(freelancerProfile?.skills.replace(/'/g, '"') ?? "[]").map(
                      (skill: string, index: number) => (
                        <div
                          key={index}
                          className="inline-block rounded-full bg-[#b4d3c3] bg-opacity-[60%] px-8 py-[3px] text-sm font-semibold text-blue-800 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee]"
                        >
                          <p className="text-center">{skill}</p>
                        </div>
                      )
                    )
                  : "NA"}
              </div>
            </div>
            <div>
              <p className="mt-4 text-left text-[22px] font-semibold">Portfolio ({ProjectCount})</p>
              <div className="relative ml-1 mt-2 w-20">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
                <div className="rounded-lg border-b-2 border-gray-600"></div>
              </div>
              <div className="-mx-2 mt-4 grid grid-cols-2 md:grid-cols-3">
                {freelancerproject &&
                  freelancerproject.map((project, index) => (
                    <button
                      className="mb-4 w-full px-2"
                      key={index}
                      onClick={() => openPortfolio(project)}
                    >
                      <div className="h-[165px] w-full overflow-hidden border border-gray-100">
                        <Image
                          src={"https://www.api.alanced.com/" + project.images_logo}
                          alt=""
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                          height={250}
                          width={250}
                        />
                      </div>
                      <p className="overflow-hidden overflow-ellipsis whitespace-nowrap pt-2 text-left text-[13px] font-semibold text-blue-600 underline hover:text-blue-700">
                        {project.project_title}
                      </p>
                    </button>
                  ))}
                {isPortfolioOpen && (
                  <FreelancerPortfolioPopup
                    project={selectedProjects}
                    closePortfolio={closePortfolio}
                  />
                )}
              </div>
              <div className="mt-5 flex items-center justify-center gap-6 sm:justify-end">
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

              <div
                className="border-b border-gray-200 border-opacity-30 px-2 py-6 text-left md:px-8"
                id="workHistory"
              >
                <div className="flex items-center justify-between">
                  <h1 className="mr-1 pb-3 text-[21px] font-normal text-[#031136]">
                    Reviews ({reviews && reviews ? reviews.length : 0})
                  </h1>
                </div>
                {visibleReviews.map((review, index) => (
                  <>
                    <div key={index}>
                      <div className="flex items-center justify-between">
                        <p className="py-1 text-[14px] text-[#0A142F]">{review.Project_Name}</p>
                        <div className="flex items-center space-x-2">
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <p className="text-[12px] text-[#0A142F] opacity-50">
                        {formatDateToDayMonthYear(review.reviews_created_date)}
                      </p>
                      <p className="pt-3 text-[14px] text-[#0A142F] opacity-50">{review.review}</p>
                      <div className="my-6 grid grid-cols-3 gap-4">
                        <div className="">
                          <p className="text-[16px] font-bold text-[#031136]">
                            $
                            {review.project_Rate === "Hourly"
                              ? review.project_Min_Hourly_Rate + "/hr"
                              : review.project_Budget}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-[16px] font-bold text-[#031136]">
                            {review.project_Rate}
                          </p>
                        </div>
                        <div className="">
                          <p className="text-[16px] font-bold text-[#031136]">{review.Reviewer}</p>
                        </div>
                      </div>
                      <div className="my-4 border-b opacity-50"></div>
                    </div>
                  </>
                ))}
                {reviews.length > 4 &&
                  (visibleReviews.length < reviews.length ? (
                    <button
                      className="cursor-pointer text-right text-sm font-semibold text-blue-500"
                      onClick={showMoreReviews}
                    >
                      Show More
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer text-right text-sm font-semibold text-blue-500"
                      onClick={showLessReviews}
                    >
                      Show Less
                    </button>
                  ))}
              </div>
              {/* ---> Employment history  */}
              <div className="my-6 border border-gray-200 border-opacity-40 bg-[#FFFFFF] px-2 py-8 md:px-8">
                <div className="flex items-center justify-between">
                  <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                    Employment history
                  </h1>
                </div>
                <div className="my-3 border-b opacity-50"></div>
                {visibleEmployment.length === 0 ? (
                  <>
                    <Image
                      src={fileIcon}
                      alt=""
                      className="mx-auto mt-5"
                    />
                    <h1 className="font-cardo py-3 text-center text-2xl">No Data Found</h1>
                  </>
                ) : (
                  visibleEmployment.map((emp, index) => (
                    <>
                      <div key={index}>
                        <div className="flex items-center justify-between">
                          <h1 className="font-cardo mr-1 text-[18px] font-normal text-[#031136]">
                            {emp.Company_Designation} | {emp.Freelancer_Company_Name}
                          </h1>
                        </div>
                        <p className="font-inter pt-2 text-left text-[14px] text-[#0A142F] opacity-50">
                          {formateDate(emp.Company_Joining_date)} -{" "}
                          {emp.Company_Leaving_date ? formateDate(emp.Company_Leaving_date) : ""}
                        </p>
                        <div className="my-3 border-b opacity-50"></div>
                      </div>
                    </>
                  ))
                )}

                {freelanceremployment.length > 3 &&
                  (visibleEmployment.length < freelanceremployment.length ? (
                    <button
                      className="mx-auto cursor-pointer text-sm font-semibold text-blue-500"
                      onClick={showMoreEmployment}
                    >
                      Show More
                    </button>
                  ) : (
                    <button
                      className="cursor-pointe mx-auto text-sm font-semibold text-blue-500"
                      onClick={showLessEmployment}
                    >
                      Show Less
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFreelancerDetails;
