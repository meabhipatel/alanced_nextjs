"use client";
import React, { useState, useRef, useEffect } from "react";
import freelancercover from "@/assets/images/freelancercover.png";
import edit from "@/assets/icons/edit.png";
import availablenow from "@/assets/icons/availablenow.png";
import plus from "@/assets/icons/plus.png";
import fileIcon from "@/assets/icons/file.png";
import { RxArrowRight, RxArrowLeft } from "react-icons/rx";
import { IoClose, IoLocationOutline } from "react-icons/io5";
import EditTitlePopup from "./EditTitlePopup";
import EditSkillPopup from "./EditSkillPopup";
import EditLanguagePopup from "./EditLanguagePopup";
import EditEducationPopup from "./EditEducationPopup";
import AvailableOffPopup from "./EditProfileHeaderPopup";
import EditHrRatePopup from "./EditRatePopup";
import AddEmploymentPopup from "./AddEmploymentPopup";
import EditEmploymentPopup from "./EditEmploymentPopup";
import EditExperienceLevelPopup from "./EditExperienceLevelPopup";
import EditFreelancerProjectsPopup from "./EditPortfolioPopup";
import { formateDate, formatDateToDayMonthYear } from "@/utils/timeFunction";
import Link from "next/link";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import Image from "next/image";
import { errorLog } from "@/utils/errorLog";
import StarRating from "@/components/StartRating";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import { axiosIntance } from "@/utils/axiosIntance";

export interface IEmployment {
  emp_id: number;
  Freelancer_Company_Name: string;
  Company_Designation: string;
  Company_Joining_date: string;
  Company_Leaving_date?: string | null;
  design_by: string | null;
}

interface RatingReview {
  rating: number;
  review: string;
}

export interface IReview {
  Reviewee: string;
  Reviewer: string;
  rating: number;
  review: string;
  Project_Name: string;
  project_Rate: string;
  project_Budget: number;
  project_Min_Hourly_Rate?: number | null;
  project_Max_Hourly_Rate?: number | null;
  project_deadline: string;
  reviews_created_date: string;
}

export interface FreelanceProject {
  project_id: number | null;
  project_title: string | null;
  project_description: string | null;
  project_link: string | null;
  images_logo: string | null;
  project_pdf: string | null;
  skills_used: string | string[] | null;
  category: string | null;
  design_by: string | null;
}

const FreelancerSelfProfile = () => {
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);

  const [reviews, setReviews] = useState([]);
  const [bid, setBid] = useState([]);
  const [freelancerproject, setfreelancerproject] = useState<FreelanceProject[]>([]);
  const [freelanceremployment, setfreelanceremployment] = useState<IEmployment[]>([]);
  const id = freelancerselfprofile.id;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ProjectCount, setProjectCount] = useState(0);

  const scrollToWorkHistory = () => {
    const element = document.getElementById("workHistory");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (id) {
      axiosIntance
        .get(`/freelance/View-all/Review/${id}`)
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

  useEffect(() => {
    const queryParameters = [];

    queryParameters.push(`page=${currentPage}`);

    const queryString = queryParameters.join("&");

    axiosIntance
      .get(`/freelance/View-all/Freelancer/Self-Project/${id}?${queryString}`)
      .then((response) => {
        setfreelancerproject(response.data.results);
        setProjectCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / 6));
      })
      .catch((error) => {
        errorLog(error);
      });
  }, [currentPage, id]);

  useEffect(() => {
    if (id) {
      axiosIntance
        .get(`/freelance/View-all/Freelancer/Employment/${id}`)
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

  useEffect(() => {
    axiosWithAuth
      .get("/freelance/view/freelancer-self/bid")
      .then((response) => {
        setBid(response.data.count);
      })
      .catch((err) => {
        errorLog(err.message);
      });
  }, []);

  const [isAvailable, setIsAvailable] = useState(
    localStorage.getItem("userAvailability") || "available"
  );

  useEffect(() => {
    localStorage.setItem("userAvailability", isAvailable);
  }, [isAvailable]);

  const prev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const [startIdx, setStartIdx] = useState(0);

  const showMoreHandler = () => {
    setStartIdx((prevIdx) => prevIdx + 4);
  };

  const showLessHandler = () => {
    setStartIdx(0);
  };

  const visibleReviews: IReview[] = reviews.slice(startIdx, startIdx + 4);

  const sortedEmployments = [...freelanceremployment].sort(
    (a, b) =>
      new Date(b.Company_Joining_date).getDate() - new Date(a.Company_Joining_date).getDate()
  );

  const showMoreHandlers = () => {
    setStartIdx((prevIdx) => prevIdx + 3);
  };

  const showLessHandlers = () => {
    setStartIdx(0);
  };

  const visibleEmp = sortedEmployments.slice(startIdx, startIdx + 3);

  // const [selectedButton, setSelectedButton] = useState("All Work");
  // const [selectedButtons, setSelectedButtons] = useState("Github");
  // const commonStyle = "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  const [selectedProject, setSelectedProject] = useState<FreelanceProject | null>(null);
  const [selectedEmp, setSelectedEmp] = useState<IEmployment | null>(null);

  function calculateJobSuccess(reviews: RatingReview[]) {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const totalReviews = reviews.length;
    const positiveReviews = reviews.filter((review) => review.rating >= 4).length;
    const neutralReviews = reviews.filter((review) => review.rating === 3).length;

    const successPercentage = ((positiveReviews + 0.5 * neutralReviews) / totalReviews) * 100;

    return Math.round(successPercentage);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);

  const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);

  const [isEditLanguageOpen, setIsEditLanguageOpen] = useState(false);
  const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const [isAvailableOffOpen, setIsAvailableOffOpen] = useState(false);
  const [isHrRateOpen, setIsHrRateOpen] = useState(false);

  const [isAddEmploymentOpen, setIsAddEmploymentOpen] = useState(false);
  const [isEditEmploymentOpen, setIsEditEmploymentOpen] = useState(false);

  const [isExperienceLevelOpen, setIsExperienceLevelOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openExperienceLevel = () => {
    setIsExperienceLevelOpen(true);
  };

  const closeExperienceLevel = () => {
    setIsExperienceLevelOpen(false);
  };

  const [isEditFreeProjectOpen, setIsEditFreeProjectOpen] = useState(false);

  const openEditFreeProject = (project: FreelanceProject) => {
    setSelectedProject(project);
    setIsEditFreeProjectOpen(true);
  };

  const closeEditFreeProject = () => {
    setSelectedProject(null);
    setIsEditFreeProjectOpen(false);
  };

  const openEditEmployment = (employment: IEmployment) => {
    setSelectedEmp(employment);
    setIsEditEmploymentOpen(true);
  };

  const closeEditEmployment = () => {
    setSelectedEmp(null);
    setIsEditEmploymentOpen(false);
  };

  const openAddEmployment = () => {
    setIsAddEmploymentOpen(true);
  };

  const closeAddEmployment = () => {
    setIsAddEmploymentOpen(false);
  };

  const openHrRate = () => {
    setIsHrRateOpen(true);
  };

  const closeHrRate = () => {
    setIsHrRateOpen(false);
  };

  const openAvailableOff = () => {
    setIsAvailableOffOpen(true);
  };

  const closeAvailableOff = () => {
    setIsAvailableOffOpen(false);
  };

  const openEditEducation = () => {
    setIsEditEducationOpen(true);
  };

  const closeEditEducation = () => {
    setIsEditEducationOpen(false);
  };

  const openEditLanguage = () => {
    setIsEditLanguageOpen(true);
  };

  const closeEditLanguage = () => {
    setIsEditLanguageOpen(false);
  };

  const openEditSkill = () => {
    setIsEditSkillOpen(true);
  };

  const closeEditSkill = () => {
    setIsEditSkillOpen(false);
  };

  const openAddEducation = () => {
    // setIsAddEducationOpen(true);
  };

  // const closeAddEducation = () => {
  //   setIsAddEducationOpen(false);
  // };

  const openEditTitle = () => {
    setIsEditTitleOpen(true);
  };

  const closeEditTitle = () => {
    setIsEditTitleOpen(false);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleImageClick = () => {
    inputRef.current!.click();
  };

  const handleImageSave = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("images_logo", selectedFile);

      const res = await axiosWithAuth.put("/account/freelancer/profile/update", formData);
      toast.success(res.data.message);
    }

    setIsModalOpen(false);
  };

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const maxWords = 50;
  const aboutText =
    freelancerselfprofile && freelancerselfprofile ? freelancerselfprofile.about : "";
  const words = aboutText.split(/\s+/).slice(0, maxWords);
  const truncatedText = words.join(" ") + (words.length >= maxWords && !isExpanded ? "..." : "");

  const imageUrl: string =
    freelancerselfprofile && freelancerselfprofile
      ? "https://www.api.alanced.com" + freelancerselfprofile.images_logo
      : "";

  return (
    <>
      <div className="container mt-4 sm:px-5 md:px-10 lg:px-20">
        <Image
          src={freelancercover}
          alt=""
          className="w-full"
        />
        <div className="flex flex-col md:flex-row">
          <div className="border border-gray-200 border-opacity-30 bg-white md:w-[30%]">
            <div className="relative mb-4 border-b border-gray-200 border-opacity-30 p-4 py-8 md:mb-0">
              <div className="relative mx-auto h-28 w-28">
                <Image
                  width={100}
                  height={100}
                  src={imageUrl}
                  alt="Profile"
                  className="h-full w-full rounded-full border border-gray-200"
                />
                <button
                  className="absolute left-2 top-1 h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                  onClick={handleEditClick}
                >
                  <Image
                    src={edit}
                    alt="edit"
                  />
                </button>
                <div className="absolute bottom-3 right-2 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
              </div>
            </div>

            <div className="mb-4 flex flex-col items-center border-b border-gray-200 border-opacity-30 bg-[#ffffff] py-4 text-left md:mb-0">
              <h1 className="font-cardo mb-3 mr-1 text-[21px] font-normal text-[#031136]">
                {freelancerselfprofile && freelancerselfprofile.category
                  ? freelancerselfprofile.category
                  : "Your Designation"}
              </h1>

              <div className="col-span-3 flex gap-3">
                <div className="flex flex-col items-center">
                  <h4 className="font-cardo text-[23px] font-bold text-[#031136]">
                    $
                    {freelancerselfprofile && freelancerselfprofile
                      ? freelancerselfprofile.hourly_rate
                      : 0}
                  </h4>
                  <p className="font-inter text-[14px] text-[#0A142F] opacity-50">Hourly rate</p>
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="font-cardo text-[23px] font-bold text-[#031136]">{bid}</h4>
                  <p className="font-inter text-[14px] text-[#0A142F] opacity-50">Proposals</p>
                </div>
                <div className="flex flex-col items-center">
                  <h4 className="font-cardo text-[23px] font-bold text-[#031136]">
                    {reviews && reviews ? reviews.length : 0}
                  </h4>
                  <p className="font-inter text-[14px] text-[#0A142F] opacity-50">Reviews</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 px-2 py-4 text-left md:px-8">
              <div className="flex items-center justify-between">
                <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                  Experience Level
                </h1>
                <div className="flex items-center space-x-2">
                  {freelancerselfprofile &&
                  freelancerselfprofile &&
                  freelancerselfprofile.experience_level ? (
                    <button
                      className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                      onClick={openExperienceLevel}
                    >
                      <Image
                        src={edit}
                        alt="edit"
                      />
                    </button>
                  ) : (
                    <button
                      className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                      onClick={openExperienceLevel}
                    >
                      <Image
                        src={plus}
                        alt="add"
                      />
                    </button>
                  )}
                  {isExperienceLevelOpen && (
                    <EditExperienceLevelPopup closeExperienceLevel={closeExperienceLevel} />
                  )}
                </div>
              </div>
              <p className="font-inter py-1 text-[14px] text-[#0A142F]">
                {freelancerselfprofile && freelancerselfprofile
                  ? freelancerselfprofile.experience_level.replace(/_/g, " ")
                  : ""}
              </p>
            </div>
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 px-2 py-4 text-left md:px-8">
              <div className="flex items-center justify-between">
                <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                  Languages
                </h1>
                <div className="flex items-center space-x-2">
                  {freelancerselfprofile &&
                  freelancerselfprofile &&
                  freelancerselfprofile.Language ? (
                    <button
                      className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                      onClick={openEditLanguage}
                    >
                      <Image
                        src={edit}
                        alt="edit"
                      />
                    </button>
                  ) : (
                    <button
                      className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                      onClick={openEditLanguage}
                    >
                      <Image
                        src={plus}
                        alt="add"
                      />
                    </button>
                  )}
                  {isEditLanguageOpen && (
                    <EditLanguagePopup closeEditLanguage={closeEditLanguage} />
                  )}
                </div>
              </div>
              {freelancerselfprofile && freelancerselfprofile && freelancerselfprofile.Language
                ? JSON.parse(freelancerselfprofile.Language.replace(/'/g, '"')).map(
                    (language: string, index: number) => (
                      <p
                        key={index}
                        className="font-inter py-1 text-[14px] text-[#0A142F]"
                      >
                        {language}
                      </p>
                    )
                  )
                : null}
            </div>
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 px-2 py-4 text-left md:px-8">
              <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                Verifications
              </h1>
              <p className="font-inter mr-1 inline-block py-1 text-[14px] text-[#0A142F]">
                ID : <span className="mr-1 opacity-50">Verified</span>
                <RiVerifiedBadgeFill className="text-md mr-1 inline-block text-green-600" />
              </p>
              <p className="font-inter py-1 text-[14px] text-[#0A142F] opacity-50">
                {freelancerselfprofile && freelancerselfprofile
                  ? `${freelancerselfprofile.first_Name} ${freelancerselfprofile.last_Name}`
                  : ""}
              </p>
            </div>
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 px-2 py-4 text-left md:px-8">
              <div className="">
                <div className="flex items-center justify-between">
                  <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                    Education
                  </h1>
                  <div className="flex items-center space-x-2">
                    {/* Display + icon only if qualification is not available */}
                    {!freelancerselfprofile ||
                    !freelancerselfprofile ||
                    !freelancerselfprofile.qualification ? (
                      <button
                        className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                        onClick={openAddEducation}
                      >
                        <Image
                          src={plus}
                          alt="more"
                        />
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="font-inter pt-1 text-[14px] text-[#0A142F]">
                    {freelancerselfprofile && freelancerselfprofile
                      ? freelancerselfprofile.qualification
                      : ""}
                  </p>
                  <div className="flex items-center space-x-2">
                    {/* Display edit icon only if qualification is available */}
                    {freelancerselfprofile &&
                    freelancerselfprofile &&
                    freelancerselfprofile.qualification ? (
                      <button
                        className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                        onClick={openEditEducation}
                      >
                        <Image
                          src={edit}
                          alt="more"
                        />
                      </button>
                    ) : null}

                    {isEditEducationOpen && (
                      <EditEducationPopup
                        qualification={
                          freelancerselfprofile && freelancerselfprofile
                            ? freelancerselfprofile.qualification
                            : ""
                        }
                        closeEditEducation={closeEditEducation}
                      />
                    )}
                  </div>
                </div>

                <div className="my-5 border-b opacity-50"></div>
                {/* code commented for future use for navigating to github and stackoverflow profile */}
                {/* <div className="my-3 flex flex-wrap">
                  <Link
                    href=""
                    className="flex-grow p-1 md:flex-none"
                  >
                    <button
                      className={`${commonStyle} px-3 md:px-6 ${
                        selectedButtons === "Github"
                          ? "border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white"
                          : "border border-gray-300 text-[#0A142F] opacity-50"
                      } mr-1`}
                      onClick={() => setSelectedButtons("Github")}
                    >
                      Github
                    </button>
                  </Link>
                  <Link
                    href=""
                    className="flex-grow p-1 md:flex-none"
                  >
                    <button
                      className={`${commonStyle} px-3 md:px-6 ${
                        selectedButtons === "StackOverflow"
                          ? "border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white"
                          : "border border-gray-300 text-[#0A142F] opacity-50"
                      } mr-3`}
                      onClick={() => setSelectedButtons("StackOverflow")}
                    >
                      StackOverflow
                    </button>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 z-10 mt-10 overflow-y-auto">
              <div className="fixed inset-0 bg-black opacity-50"></div>
              <div className="flex min-h-screen items-center justify-center">
                <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 md:w-[50%]">
                  <div className="text-right">
                    <button
                      onClick={handleModalClose}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <IoClose className="text-3xl" />
                    </button>
                  </div>
                  <div className="mx-8">
                    <h1 className="font-cardo text-left text-[21px] font-normal text-[#031136]">
                      Edit Photo
                    </h1>
                    <p className="font-cardo pt-2 text-left text-[17px] font-normal text-[#031136]">
                      Show Clients The Best Version Of Yourself!
                    </p>
                    <div className="mb-2 mt-4 flex items-center justify-between">
                      <div className="relative h-[200px] w-[200px] overflow-hidden">
                        {selectedFile ? (
                          <Image
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <Image
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={imageUrl}
                            alt="Profile"
                          />
                        )}
                      </div>
                      <div className="relative h-28 w-28 overflow-hidden">
                        {selectedFile ? (
                          <Image
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <Image
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={imageUrl}
                            alt="Profile"
                          />
                        )}
                      </div>
                      <div className="relative h-20 w-20 overflow-hidden">
                        {selectedFile ? (
                          <Image
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <Image
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={imageUrl}
                            alt="Profile"
                          />
                        )}
                      </div>
                      <div className="relative h-16 w-16 overflow-hidden">
                        {selectedFile ? (
                          <Image
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <Image
                            width={100}
                            height={100}
                            className="absolute inset-0 h-full w-full object-cover"
                            src={imageUrl}
                            alt="Profile"
                          />
                        )}
                      </div>
                      <input
                        type="file"
                        ref={inputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                    <p className="font-cardo pt-2 text-left text-[17px] font-normal text-[#031136]">
                      Must Be An Actual Photo Of You.
                    </p>
                    <p className="font-inter text-left text-[14px] text-[#0A142F] opacity-50">
                      Logos, clip-art, group photos, and digitally-altered images are not allowed.
                    </p>
                    <div
                      onChange={handleFileChange}
                      className="mt-8 flex justify-end"
                    >
                      <Link href="">
                        <button
                          className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white"
                          onClick={handleImageClick}
                        >
                          Change Image
                        </button>
                      </Link>
                      <button
                        className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                        onClick={handleImageSave}
                      >
                        <Link href="">
                          <button className="bg-white px-2 py-1">
                            <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                              Save Photo
                            </p>
                          </button>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="border border-gray-200 border-opacity-30 md:w-[70%]">
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 py-3.5 md:flex-row">
              <div className="w-full pl-2 pt-3 text-left sm:pl-8 md:w-3/4">
                <div className="flex items-center">
                  <h1 className="font-cardo mr-1 text-[24px] font-normal text-[#031136]">
                    {freelancerselfprofile && freelancerselfprofile
                      ? `${freelancerselfprofile.first_Name} ${freelancerselfprofile.last_Name}`
                      : ""}
                  </h1>
                  <RiVerifiedBadgeFill className="text-md mr-1 inline-block text-green-600" />
                </div>
                <div className="my-1 flex items-center">
                  <IoLocationOutline className="text-md mr-1 inline-block" />
                  <p className="font-inter text-[14px] text-[#797979]">
                    {freelancerselfprofile && freelancerselfprofile.Address
                      ? freelancerselfprofile.Address
                      : "Your Location here"}
                  </p>
                </div>

                <div className="mt-2 flex space-x-1">
                  <button
                    className={`font-inter flex items-center justify-center rounded-full px-4 py-2 text-[13px] text-[#0A142F] opacity-50 focus:outline-none ${
                      isAvailable === "available" ? "ring-1 ring-gray-400" : ""
                    }`}
                  >
                    <Image
                      src={availablenow}
                      alt=""
                      className="mr-2 h-[16px]"
                    />
                    Available Now
                  </button>

                  <button
                    className={`font-inter rounded-full px-4 py-2 text-center text-[13px] text-[#0A142F] opacity-50 focus:outline-none ${
                      isAvailable === "off" ? "ring-1 ring-gray-400" : ""
                    }`}
                  >
                    Off
                  </button>

                  <button
                    className="mt-1 h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                    onClick={openAvailableOff}
                  >
                    <Image
                      src={edit}
                      alt="edit"
                    />
                  </button>
                  {isAvailableOffOpen && (
                    <AvailableOffPopup
                      isAvailable={isAvailable}
                      setIsAvailable={setIsAvailable}
                      closeAvailableOff={closeAvailableOff}
                    />
                  )}
                </div>
                <div className="mt-3 flex items-center">
                  <RiVerifiedBadgeFill className="text-md mr-1 inline-block text-blue-600" />

                  <p className="font-inter text-[13px] text-[#797979]">
                    {calculateJobSuccess(reviews)}% Job Success
                  </p>
                </div>
              </div>
              <div className="px-auto w-full pt-8 md:w-1/4">
                <div className="ml-2 mr-2 mt-3 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5 md:ml-0">
                  <button
                    className="rounded-[3px] bg-white px-2 py-1"
                    onClick={scrollToWorkHistory}
                  >
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      See Public Reviews
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 border-opacity-30 px-2 py-4 text-left md:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h1 className="font-cardo mr-2 text-[21px] font-normal text-[#031136]">
                    {freelancerselfprofile && freelancerselfprofile.category
                      ? freelancerselfprofile.category.replace(/_/g, " ")
                      : "Your Designation"}
                  </h1>
                  <button
                    className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                    onClick={openEditTitle}
                  >
                    <Image
                      src={freelancerselfprofile && freelancerselfprofile.category ? edit : plus}
                      alt={freelancerselfprofile && freelancerselfprofile.category ? "Edit" : "Add"}
                      className="align-middle"
                    />
                  </button>
                  {isEditTitleOpen && <EditTitlePopup closeEditTitle={closeEditTitle} />}
                </div>

                <div className="flex items-center">
                  <h1 className="font-cardo mr-2 text-[20px] font-bold text-[#031136]">
                    $
                    {freelancerselfprofile && freelancerselfprofile
                      ? freelancerselfprofile.hourly_rate
                      : 0}
                    /Hr
                  </h1>
                  <button
                    className="mr-2 h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                    onClick={openHrRate}
                  >
                    <Image
                      src={edit}
                      alt="edit"
                      className="align-middle"
                    />
                  </button>
                  {isHrRateOpen && <EditHrRatePopup closeHrRate={closeHrRate} />}
                </div>
              </div>
              <p className="font-inter py-2 text-[13px] text-[#0A142F] opacity-50">
                Specializes in{" "}
                {freelancerselfprofile && freelancerselfprofile.category
                  ? freelancerselfprofile.category.replace(/_/g, " ")
                  : "Your Designation"}
              </p>
              <p className="font-inter text-[14px] text-[#0A142F] opacity-50">
                {isExpanded ? aboutText : truncatedText}
              </p>
              {words.length >= maxWords && (
                <button
                  onClick={toggleExpansion}
                  className="font-cardo cursor-pointer py-2 text-[18px] font-normal text-[#031136]"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </div>
            <div
              className="border-b border-gray-200 border-opacity-30 px-2 py-6 text-left md:px-8"
              id="workHistory"
            >
              <div className="flex items-center justify-between">
                <h1 className="font-cardo mr-1 pb-3 text-[21px] font-normal text-[#031136]">
                  Reviews ({reviews && reviews ? reviews.length : 0})
                </h1>
              </div>
              {visibleReviews.map((review, index) => (
                <>
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <p className="font-inter py-1 text-[14px] text-[#0A142F]">
                        {review.Project_Name}
                      </p>
                      <div className="flex items-center space-x-2">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>
                    <p className="font-inter text-[12px] text-[#0A142F] opacity-50">
                      {formatDateToDayMonthYear(review.reviews_created_date)}
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
              ))}
              {reviews.length > 4 &&
                (startIdx + 4 < reviews.length ? (
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
            <div
              className="border-b border-gray-200 border-opacity-30 px-2 py-8 pt-3 text-left md:px-8"
              id="freeselfpro"
            >
              <div className="flex items-center justify-between">
                <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                  Portfolio ({ProjectCount})
                </h1>
                <div className="flex items-center space-x-2">
                  <Link
                    href="/freelancer/add-portfolio"
                    onClick={() => window.scroll(0, 0)}
                  >
                    <div className="h-6 w-6 rounded-full border border-gray-200 bg-white p-1">
                      <Image
                        src={plus}
                        alt="More"
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <div className="-mx-2 flex flex-wrap">
                {freelancerproject &&
                  freelancerproject.map((pro, index) => (
                    <button
                      className="w-1/3 cursor-pointer px-2"
                      key={index}
                      onClick={() => openEditFreeProject(pro)}
                    >
                      <div className="mt-4 h-[165px] w-full overflow-hidden border border-gray-100">
                        <Image
                          height={100}
                          width={100}
                          src={"https://www.api.alanced.com" + pro.images_logo}
                          alt=""
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                      <p className="font-inter overflow-hidden overflow-ellipsis whitespace-nowrap pt-2 text-[13px] font-semibold text-blue-600 underline hover:text-blue-700">
                        {pro.project_title}
                      </p>
                    </button>
                  ))}
                {isEditFreeProjectOpen && (
                  <EditFreelancerProjectsPopup
                    project={selectedProject}
                    closeEditFreeProject={closeEditFreeProject}
                  />
                )}
              </div>
              <div className="mt-5 flex items-center justify-end gap-6">
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
                        strokeWidth={2}
                        className="h-4 w-4 text-white"
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
                        strokeWidth={2}
                        className="h-4 w-4 text-white"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 px-2 py-8 pt-3 text-left md:px-8">
              <div className="flex items-center justify-between pb-3">
                <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                  Skills & Expertise
                </h1>
                <div className="flex items-center space-x-2">
                  {freelancerselfprofile &&
                  freelancerselfprofile &&
                  freelancerselfprofile.skills ? (
                    <button
                      className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                      onClick={openEditSkill}
                    >
                      <Image
                        src={edit}
                        alt="edit"
                      />
                    </button>
                  ) : (
                    <button
                      className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                      onClick={openEditSkill}
                    >
                      <Image
                        src={plus}
                        alt="add"
                      />
                    </button>
                  )}
                  {isEditSkillOpen && <EditSkillPopup closeEditSkill={closeEditSkill} />}
                </div>
              </div>

              {freelancerselfprofile && freelancerselfprofile && freelancerselfprofile.skills
                ? JSON.parse(freelancerselfprofile.skills.replace(/'/g, '"')).map(
                    (skill: string, index: number) => (
                      <Link
                        key={index}
                        href=""
                      >
                        <span className="font-inter my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-50">
                          {skill}
                        </span>
                      </Link>
                    )
                  )
                : null}
            </div>
          </div>
        </div>
        <div className="my-6 border border-gray-200 border-opacity-40 bg-[#FFFFFF] px-2 py-8 md:px-8">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
              Employment history
            </h1>
            <div className="flex items-center space-x-2">
              <button
                className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                onClick={openAddEmployment}
              >
                <Image
                  src={plus}
                  alt="more"
                />
              </button>
              {isAddEmploymentOpen && (
                <AddEmploymentPopup closeAddEmployment={closeAddEmployment} />
              )}
            </div>
          </div>
          <div className="my-3 border-b opacity-50"></div>
          {visibleEmp.length === 0 ? (
            <>
              <Image
                src={fileIcon}
                alt=""
                className="mx-auto mt-5"
              />
              <h1 className="font-cardo py-3 text-center text-2xl">No Data Found</h1>
            </>
          ) : (
            visibleEmp.map((emp, index) => (
              <>
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <h1 className="font-cardo mr-1 text-[18px] font-normal text-[#031136]">
                      {emp.Company_Designation} | {emp.Freelancer_Company_Name}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <button
                        className="h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                        onClick={() => openEditEmployment(emp)}
                      >
                        <Image
                          src={edit}
                          alt="edit"
                        />
                      </button>
                      {isEditEmploymentOpen && (
                        <EditEmploymentPopup
                          employment={selectedEmp}
                          closeEditEmployment={closeEditEmployment}
                        />
                      )}
                    </div>
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
            (startIdx + 3 < freelanceremployment.length ? (
              <button
                className="mx-auto cursor-pointer text-sm font-semibold text-blue-500"
                onClick={showMoreHandlers}
              >
                Show Less
              </button>
            ) : (
              <button
                className="cursor-pointe mx-auto text-sm font-semibold text-blue-500"
                onClick={showLessHandlers}
              >
                Show More
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default FreelancerSelfProfile;
