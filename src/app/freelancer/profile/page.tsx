"use client";
import React, { useState, useRef, useEffect } from "react";
// import Navbar from "../../components/Layout/Navbar";                       not in use
import freelancercover from "@/assets/images/freelancercover.png";
import edit from "@/assets/icons/edit.png";
// import profilepic from "../../components/images/profilepic.png";           not in use
// import HomeSection4 from "../../components/Layout/HomeSection4";           for remove
// import Footer from "../../components/Layout/Footer";                       for remove
// import { Link, useNavigate } from "react-router-dom";
import availablenow from "@/assets/icons/availablenow.png";
// import jobsuccess from "../../components/images/jobsuccess.png";           not in use
// import pin from "../../components/images/pin.png";                         not in use
// import threedot from "../../components/images/threedot.png";               not in use
// import share from "../../components/images/share.png";                     not in use
// import updownarrow from "../../components/images/updownarrow.png";         not in use
import plus from "@/assets/icons/plus.png";
// import cupbook from "../../components/images/cupbook.png";                 not in use
// import { IconButton, Typography } from "@material-tailwind/react";
// import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
// import testimonial from "../../components/images/testimonial.png";         not in use
// import certificate from "../../components/images/certificate.png";         not in use
// import del from "../../components/images/delete.png";                      not in use
import fileIcon from "@/assets/icons/file.png";
// import { useDispatch, useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { RxArrowRight, RxArrowLeft } from "react-icons/rx";
import { IoClose, IoLocationOutline } from "react-icons/io5";
// import {
//   GetFreelancerSelfProfileAction,
//   UpdateFreelancerProfileAction,
// } from "../../redux/Freelancer/FreelancerAction";                                           for use
// import StarRating from "./StarRating";                                                      for use
// import "bootstrap-icons/font/bootstrap-icons.css";                         for remove
// import EditTitlePopup from "./AllPopup/EditTitlePopup";                                     for use
// import AddEducationPopup from "./AllPopup/AddEducationPopup";                               for use
// import EditSkillPopup from "./AllPopup/EditSkillPopup";                                     for use
// import OtherExperiencePopup from "./AllPopup/OtherExperiencePopup";        not in use
// import VideoIntroPopup from "./AllPopup/VideoIntroPopup";                  not in use
// import HrsPerWeekPopup from "./AllPopup/HrsPerWeekPopup";                  not in use
// import AddLanguagePopup from "./AllPopup/AddLanguagePopup";                not in use
import EditLanguagePopup from "./EditLanguagePopup";
// import EditEducationPopup from "./AllPopup/EditEducationPopup";                             for use
// import AvailableOffPopup from "./AllPopup/AvailableOffPopup";                               for use
import AvailableOffPopup from "./EditProfileHeaderPopup";
// import EditHrRatePopup from "./AllPopup/EditHrRatePopup";                                   for use
// import AddCertificatesPopup from "./AllPopup/AddCertificatesPopup";        not in use
// import AddEmploymentPopup from "./AllPopup/AddEmploymentPopup";                             for use
// import EditEmploymentPopup from "./AllPopup/EditEmploymentPopup";                           for use
// import TestimonialPopup from "./AllPopup/TestimonialPopup";                not in use
// import FreelancerProjectsPopup from "./AllPopup/FreelancerProjectsPopup";  not in use
import axios from "axios";
import EditExperienceLevelPopup from "./EditExperienceLevelPopup";
// import EditFreelancerProjectsPopup from "./AllPopup/EditFreelancerProjectsPopup";           for use
import { formateDate, formatDateToDayMonthYear } from "@/utils/timeFunction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import Image from "next/image";
import { errorLog } from "@/utils/errorLog";
import { RiVerifiedBadgeFill } from "react-icons/ri";

import { useAppSelector } from "@/store/hooks";

// interface FreelancerProfile {
//   id: number;
//   email: string;
//   first_Name: string;
//   last_Name: string;
//   contact: string;
//   Address: string;
//   DOB: Date | null;
//   gender: string;
//   experience: number;
//   type: string;
//   images_logo: string;
//   qualification: string;
//   social_media: string;
//   map: string;
//   skills: string; // Alternatively: string[] if you want to parse JSON string to array
//   category: string;
//   about: string;
//   Language: string; // Alternatively: string[] if you want to parse JSON string to array
//   hourly_rate: number;
//   experience_level: string;
// }

interface Employment {
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

interface IReview {
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

interface FreelanceProject {
  project_id: number | null;
  project_title: string | null;
  project_description: string | null;
  project_link: string | null;
  images_logo: string | null;
  project_pdf: string | null;
  skills_used: string[] | null; // or array if you intend to parse it
  category: string | null;
  design_by: string | null;
}

const FreelancerSelfProfile = () => {
  // const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");    for remove
  // const jwtToken = localStorage.getItem("jwtToken");
  // console.log(accessToken, "chkaccesstojken");                                                                for remove
  // console.log(jwtToken, "chkjwttoken");
  // const freelancerselfprofile = useSelector((state) => state.freelancer.freelancerselfprofile);               for use
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);
  // const freelancerselfprofile: FreelancerProfile[] = [
  //   {
  //     id: 4,
  //     email: "sachinsharmapeace@gmail.com",
  //     first_Name: "sachin",
  //     last_Name: "sharma",
  //     contact: "",
  //     Address: "",
  //     DOB: null,
  //     gender: "",
  //     experience: 0,
  //     type: "FREELANCER",
  //     images_logo: "/media/images_logo/profile8.jfif",
  //     qualification: "B.E",
  //     social_media: "",
  //     map: "",
  //     skills: "['Python']",
  //     category: "",
  //     about: "",
  //     Language: "['Hindi']",
  //     hourly_rate: 0,
  //     experience_level: "",
  //   },
  // ];
  // const dispatch = useDispatch();
  // const [isHovered, setIsHovered] = useState(false);            for use
  const [reviews, setReviews] = useState([]);
  const [bid, setBid] = useState([]);
  const [freelancerproject, setfreelancerproject] = useState<FreelanceProject[]>([]);
  const [freelanceremployment, setfreelanceremployment] = useState<Employment[]>([]);
  const id = freelancerselfprofile && freelancerselfprofile.id ? freelancerselfprofile.id : "";
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [ProjectCount, setProjectCount] = useState(0);

  //   function formatDate(dateStr) {
  //     if (!dateStr) return "present";

  //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //     const dateObj = new Date(dateStr);

  //     return dateObj.toLocaleDateString(undefined, options);
  // }

  // function formatDateToDayMonthYear(dateStr) {
  //     if (!dateStr) return "";

  //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
  //     const dateObj = new Date(dateStr);

  //     return dateObj.toLocaleDateString(undefined, options);
  // }

  const scrollToWorkHistory = () => {
    const element = document.getElementById("workHistory");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // function handleMouseEnter() {
  //   setIsHovered(true);
  // }

  // function handleMouseLeave() {
  //   setIsHovered(false);                  for use
  // }

  // function combinedClick() {
  //   handlePinClick();
  //   handleMouseLeave();
  // }

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
  }, [currentPage, id]);

  // useEffect(() => {
  //     if(id) {
  //         axios.get(`https://aparnawiz91.pythonanywhere.com/freelance/View-all/Freelancer/Self-Project/${id}`)
  //             .then(response => {
  //                 if (response.data.status === 200) {
  //                     setfreelancerproject(response.data.data);
  //                 } else {
  //                     console.log(response.data.message || 'Error fetching project');
  //                 }
  //             })
  //             .catch(err => {
  //                 console.log(err.message);
  //             });
  //     }
  // }, [id]);

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

  // useEffect(() => {
  //     const queryParameters = [];

  //     queryParameters.push(`page=${currentPage}`);

  //     const queryString = queryParameters.join('&');

  //     axios
  //       .get(`https://alanced.pythonanywhere.com/freelance/view/freelancer-self/bid?${queryString}`,{
  //         headers: {
  //             'Authorization': `Bearer ${accessToken}`
  //         }
  //     })
  //       .then((response) => {
  //         setBid(response.data.count);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching filtered data:', error);
  //       });
  //   }, [currentPage]);

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

  // const [active, setActive] = React.useState(1);

  const prev = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    // window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  //   const next = () => {
  //       if (active === Math.ceil(freelancerproject.length / 6)) return;
  //       setActive(active + 1);
  //   };

  //   const prev = () => {
  //       if (active === 1) return;
  //       setActive(active - 1);
  //   };

  // const chunkArray = (array, size) => {
  //   let chunked = [];
  //   for (let i = 0; i < array.length; i += size) {
  //     chunked.push(array.slice(i, i + size));
  //   }
  //   return chunked;
  // };

  // const chunkedProjects = chunkArray(freelancerproject, 6);             for check

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

  const [selectedButton, setSelectedButton] = useState("All Work");
  const [selectedButtons, setSelectedButtons] = useState("Github");
  const commonStyle = "inline-block text-sm py-[10px] mt-4 lg:mt-0 border rounded font-semibold";

  // const [selected, setSelected] = useState("completed");
  // const [selectedProject, setSelectedProject] = useState<FreelanceProject | null>(null);
  // const [selectedEmp, setSelectedEmp] = useState<Employment | null>(null);

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
  // const [isEditTitleOpen, setIsEditTitleOpen] = useState(false);
  // const [isAddEducationOpen, setIsAddEducationOpen] = useState(false);
  // const [isEditSkillOpen, setIsEditSkillOpen] = useState(false);
  // const [isOtherExpOpen, setIsOtherExpOpen] = useState(false);
  // const [isVideoIntroOpen, setIsVideoIntroOpen] = useState(false);
  // const [isHrsperWeekOpen, setIsHrsperWeekOpen] = useState(false);
  // const [isAddLanguageOpen, setIsAddLanguageOpen] = useState(false);
  const [isEditLanguageOpen, setIsEditLanguageOpen] = useState(false);
  // const [isEditEducationOpen, setIsEditEducationOpen] = useState(false);
  const [isAvailableOffOpen, setIsAvailableOffOpen] = useState(false);
  // const [isHrRateOpen, setIsHrRateOpen] = useState(false);
  // const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  // const [isAddEmploymentOpen, setIsAddEmploymentOpen] = useState(false);
  // const [isEditEmploymentOpen, setIsEditEmploymentOpen] = useState(false);
  // const [isTestimonialOpen, setIsTestimonialOpen] = useState(false);
  // //   const [isFreeProjectOpen, setIsFreeProjectOpen] = useState(false);
  const [isExperienceLevelOpen, setIsExperienceLevelOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openExperienceLevel = () => {
    setIsExperienceLevelOpen(true);
  };

  const closeExperienceLevel = () => {
    setIsExperienceLevelOpen(false);
  };

  //   const openFreeProject = (project) => {
  //     setSelectedProject(project);
  //     setIsFreeProjectOpen(true);
  // };

  // const closeFreeProject = () => {
  //     setSelectedProject(null);
  //     setIsFreeProjectOpen(false);
  // };

  // const [isEditFreeProjectOpen, setIsEditFreeProjectOpen] = useState(false);

  // const openEditFreeProject = (project: FreelanceProject) => {
  //   // setSelectedProject(project);
  //   // setIsEditFreeProjectOpen(true);
  // };

  // const closeEditFreeProject = () => {
  //   setSelectedProject(null);
  //   setIsEditFreeProjectOpen(false);
  // };

  // const openTestimonial = () => {
  //   setIsTestimonialOpen(true);
  // };

  // const closeTestimonial = () => {
  //   setIsTestimonialOpen(false);
  // };

  // const openEditEmployment = (employment: Employment) => {
  //   // setSelectedEmp(employment);
  //   // setIsEditEmploymentOpen(true);
  // };

  // const closeEditEmployment = () => {
  //   setSelectedEmp(null);
  //   setIsEditEmploymentOpen(false);
  // };

  const openAddEmployment = () => {
    // setIsAddEmploymentOpen(true);
  };

  // const closeAddEmployment = () => {
  //   setIsAddEmploymentOpen(false);
  // };

  // const openAddCertificates = () => {
  //   setIsCertificatesOpen(true);
  // };

  // const closeAddCertificates = () => {
  //   setIsCertificatesOpen(false);
  // };

  const openHrRate = () => {
    // setIsHrRateOpen(true);
  };

  // const closeHrRate = () => {
  //   setIsHrRateOpen(false);
  // };

  const openAvailableOff = () => {
    setIsAvailableOffOpen(true);
  };

  const closeAvailableOff = () => {
    setIsAvailableOffOpen(false);
  };

  const openEditEducation = () => {
    // setIsEditEducationOpen(true);
  };

  // const closeEditEducation = () => {
  //   setIsEditEducationOpen(false);
  // };

  const openEditLanguage = () => {
    setIsEditLanguageOpen(true);
  };

  const closeEditLanguage = () => {
    setIsEditLanguageOpen(false);
  };

  // const openAddLanguage = () => {
  //   setIsAddLanguageOpen(true);
  // };

  // const closeAddLanguage = () => {
  //   setIsAddLanguageOpen(false);
  // };

  // const openHrsperWeek = () => {
  //   setIsHrsperWeekOpen(true);
  // };

  // const closeHrsperWeek = () => {
  //   setIsHrsperWeekOpen(false);
  // };

  // const openVideoIntro = () => {
  //   setIsVideoIntroOpen(true);
  // };

  // const closeVideoIntro = () => {
  //   setIsVideoIntroOpen(false);
  // };

  // const openOtherExp = () => {
  //   setIsOtherExpOpen(true);
  // };

  // const closeOtherExp = () => {
  //   setIsOtherExpOpen(false);
  // };

  const openEditSkill = () => {
    // setIsEditSkillOpen(true);
  };

  // const closeEditSkill = () => {
  //   setIsEditSkillOpen(false);
  // };

  const openAddEducation = () => {
    // setIsAddEducationOpen(true);
  };

  // const closeAddEducation = () => {
  //   setIsAddEducationOpen(false);
  // };

  const openEditTitle = () => {
    // setIsEditTitleOpen(true);
  };

  // const closeEditTitle = () => {
  //   setIsEditTitleOpen(false);
  // };

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

  //       const handleImageSave = async () => {
  //     const formData = new FormData();
  //     formData.append("images_logo", selectedFile);

  //     if(freelancerselfprofile && freelancerselfprofile[0]){
  //         freelancerselfprofile[0].images_logo = URL.createObjectURL(selectedFile);
  //     }

  //     dispatch(UpdateFreelancerProfileAction(formData, accessToken));
  //     setIsModalOpen(false);
  //     navigate('/freelancer/edit-profile');
  // }

  const handleImageSave = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("images_logo", selectedFile);

      if (freelancerselfprofile && freelancerselfprofile) {
        freelancerselfprofile.images_logo = URL.createObjectURL(selectedFile);
      }

      // dispatch(UpdateFreelancerProfileAction(formData, accessToken));           for use
    }

    setIsModalOpen(false);
    router.push("/freelancer/edit-profile");
  };

  // const underlineStyle = {
  //   content: '""',
  //   display: "block",
  //   position: "absolute",                for use
  //   bottom: "0",
  //   left: "0",
  //   width: "100%",
  //   height: "2px",
  //   background: "linear-gradient(90deg, #0909E9, #00D4FF)",
  // };

  // React.useEffect(() => {
  //   dispatch(GetFreelancerSelfProfileAction(accessToken));                for use
  // }, []);

  // const [showCopyMessage, setShowCopyMessage] = useState(false);            for  use
  // const profileLink = "http://localhost:3000/freelancer/edit-profile";      for  use

  // const handlePinClick = useCallback(() => {
  //   navigator.clipboard
  //     .writeText(profileLink)
  //     .then(() => {
  //       errorLog("Setting showCopyMessage to true");
  //       setShowCopyMessage(true);
  //       setTimeout(() => setShowCopyMessage(false), 2000);               for use
  //     .catch((err) => {
  //       errorLog(err);
  //     });
  // }, [profileLink]);

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
            <div className="mb-4 border-b border-gray-200 border-opacity-30 bg-[#FFFFFF] py-4 pl-8 text-left md:mb-0">
              <h1 className="font-cardo mb-3 mr-1 text-[21px] font-normal text-[#031136]">
                {freelancerselfprofile && freelancerselfprofile.category
                  ? freelancerselfprofile.category
                  : "Your Designation"}
              </h1>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-3">
                <div className="">
                  <h4 className="font-cardo text-[23px] font-bold text-[#031136]">
                    $
                    {freelancerselfprofile && freelancerselfprofile
                      ? freelancerselfprofile.hourly_rate
                      : 0}
                  </h4>
                  <p className="font-inter text-[14px] text-[#0A142F] opacity-50">Hourly rate</p>
                </div>
                <div className="">
                  <h4 className="font-cardo text-[23px] font-bold text-[#031136]">{bid}</h4>
                  <p className="font-inter text-[14px] text-[#0A142F] opacity-50">Proposals</p>
                </div>
                <div className="">
                  <h4 className="font-cardo text-[23px] font-bold text-[#031136]">
                    {reviews && reviews ? reviews.length : 0}
                  </h4>
                  <p className="font-inter text-[14px] text-[#0A142F] opacity-50">Reviews</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 px-4 py-4 text-left md:px-8">
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
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 px-4 py-4 text-left md:px-8">
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
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 px-4 py-4 text-left md:px-8">
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
            <div className="flex flex-col border-b border-gray-200 border-opacity-30 px-4 py-4 text-left md:px-8">
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

                    {/* {isAddEducationOpen && (
                      <AddEducationPopup closeAddEducation={closeAddEducation} />          for use
                    )} */}
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

                    {/* {isEditEducationOpen && (
                      <EditEducationPopup
                        qualification={
                          freelancerselfprofile && freelancerselfprofile[0]
                            ? freelancerselfprofile[0].qualification
                            : ""
                        }
                        closeEditEducation={closeEditEducation}                          for use
                      />
                    )}
                    {isAddEducationOpen && (
                      <AddEducationPopup closeAddEducation={closeAddEducation} />
                    )} */}
                  </div>
                </div>

                <div className="my-5 border-b opacity-50"></div>

                <div className="my-3 flex flex-wrap">
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
                </div>
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
                      {/* <i className="bi bi-x-lg"></i> */}
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
                          // onChange={handleFileChange}
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
              <div className="w-full pl-8 pt-3 text-left md:w-3/4">
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
                  {/* <Image src={jobsuccess} alt="" className="h-[22px] mr-2" /> */}
                  <i className="bi bi-patch-check mr-2 text-blue-600"></i>
                  <p className="font-inter text-[13px] text-[#797979]">
                    {calculateJobSuccess(reviews)}% Job Success
                  </p>
                </div>
              </div>
              <div className="px-auto w-full pt-8 md:w-1/4">
                {/* <Link href=''><span class="inline-block text-sm px-4 py-[10px] mt-4 lg:mt-0 bg-gradient-to-r from-[#0909E9] to-[#00D4FF] border rounded border-none text-white mr-2 font-semibold">See Public View</span></Link> */}
                <div className="mr-2 mt-3 inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                  <button
                    className="bg-white px-2 py-1"
                    onClick={scrollToWorkHistory}
                  >
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      See Public Reviews
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 px-8 py-4 text-left">
              <h1 className="font-cardo text-[21px] font-normal text-[#031136]">View Profile</h1>
              <div className="my-3 flex flex-wrap">
                {freelancerselfprofile && freelancerselfprofile && freelancerselfprofile.skills
                  ? JSON.parse(freelancerselfprofile.skills.replace(/'/g, '"')).map(
                      (skill: string, index: number) => (
                        <Link
                          key={index}
                          href=""
                          className="flex-grow p-1 md:flex-none"
                        >
                          <button
                            className={`${commonStyle} my-3 px-3 md:px-8 ${
                              selectedButton === skill
                                ? "border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white"
                                : "border border-gray-300 text-[#0A142F] opacity-50"
                            } mr-3`}
                            onClick={() => setSelectedButton(skill)}
                          >
                            {skill}
                          </button>
                        </Link>
                      )
                    )
                  : null}
                <Link
                  href=""
                  className="flex-grow p-1 md:flex-none"
                >
                  <button
                    className={`${commonStyle} px-3 md:px-8 ${
                      selectedButton === "All Work"
                        ? "border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white"
                        : "border border-gray-300 text-[#0A142F] opacity-50"
                    } mr-3`}
                    onClick={() => setSelectedButton("All Work")}
                  >
                    All Work
                  </button>
                </Link>
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 px-4 py-4 text-left md:px-8">
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
                  {/* {isEditTitleOpen && <EditTitlePopup closeEditTitle={closeEditTitle} />}        for use */}
                </div>

                {/* <div className="flex items-center">
        <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-2">{freelancerselfprofile && freelancerselfprofile.category ? freelancerselfprofile.category.replace(/_/g, ' ') : 'Your Designation'}</h1>
        <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={openEditTitle}>
            <Image src={edit} alt="Edit" className="align-middle" />
        </div>
        {isEditTitleOpen && <EditTitlePopup closeEditTitle={closeEditTitle} />}
    </div> */}
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
                  {/* {isHrRateOpen && <EditHrRatePopup closeHrRate={closeHrRate} />}          for use */}
                  {/* <div 
        className="relative p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" 
        onClick={combinedClick} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <Image src={pin} alt="pin" className="align-middle" />
        {isHovered && 
    <div style={{
        position: 'absolute',
        top: '-70px',
        left: '50%', 
        transform: 'translateX(-50%)',
        zIndex: 1000
    }}>
        <div style={{
            padding: '8px 6px',
            paddingLeft: 16,
            backgroundColor: 'black',
            color: 'white',
            width: 200,
            position: 'relative',
        }}>
            <div style={{
                position: 'absolute',
                top: '40px', 
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderTop: '10px solid black',
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom: 'none', 
            }}></div>
            Copy link to clipboard
        </div>
    </div>
}

        {showCopyMessage && 
            <div style={{
                position: 'absolute',
                top: '-60px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                padding: '8px 6px',
                backgroundColor: 'black',
                color: 'white',
                zIndex: 1000,
                width:250,
                borderRadius:10,
                paddingLeft:16
            }}>
                Profile link copied to clipboard
            </div>
        }
    </div> */}
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
              {/* <p className='font-inter opacity-50 text-[#0A142F] text-[14px]'>{freelancerselfprofile && freelancerselfprofile ? freelancerselfprofile.about : ''}</p> 
   <h1 className="font-cardo text-[18px] text-[#031136] font-normal py-2 cursor-pointer">See More</h1> */}
            </div>
            <div
              className="border-b border-gray-200 border-opacity-30 px-4 py-6 text-left md:px-8"
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
                        {/* <StarRating rating={review.rating} /> */}
                        {/* <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 inline-block">
                <Image src={share} alt="share" />
            </div> */}
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
              className="border-b border-gray-200 border-opacity-30 px-4 py-8 pt-3 text-left md:px-8"
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
                {/* {chunkedProjects[active - 1] && chunkedProjects[active - 1].map((pro, index) => ( */}
                {freelancerproject &&
                  freelancerproject.map((pro, index) => (
                    <button
                      className="w-1/3 cursor-pointer px-2"
                      key={index}
                      // onClick={() => openEditFreeProject(pro)}
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
                {/* {isEditFreeProjectOpen && (
                  <EditFreelancerProjectsPopup
                    project={selectedProject}
                    closeEditFreeProject={closeEditFreeProject}   for use
                  />
                )} */}
              </div>
              <div className="mt-5 flex items-center justify-end gap-6">
                {/* {freelancerproject.length > 6 && (
  <>
    <IconButton
      size="sm"
      variant="outlined"
      onClick={prev}
      disabled={active === 1}
      style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
    >
      <ArrowLeftIcon strokeWidth={2} className="h-4 w-4 text-white" />
    </IconButton>

    {[...Array(Math.ceil(freelancerproject.length / 6))].map((_, index) => {
      const pageNumber = index + 1;
      return (
        <span
          key={pageNumber}
          className={`px-0 py-1 ${active === pageNumber ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#0909E9] to-[#00D4FF] font-bold font-inter text-[14px] cursor-pointer' : 'text-[#0A142F] font-bold font-inter text-[14px] cursor-pointer'}`}
          onClick={() => setActive(pageNumber)}
        >
          {pageNumber}
        </span>
      );
    })}

    <IconButton
      size="sm"
      variant="outlined"
      onClick={next}
      disabled={active === Math.ceil(freelancerproject.length / 6)}
      style={{ backgroundImage: 'linear-gradient(45deg, #0909E9, #00D4FF)', border: 'none' }}
    >
      <ArrowRightIcon strokeWidth={2} className="h-4 w-4 text-white" />
    </IconButton>
  </>
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
                        strokeWidth={2}
                        className="h-4 w-4 text-white"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="border-b border-gray-200 border-opacity-30 px-4 py-8 pt-3 text-left md:px-8">
              <div className="flex items-center justify-between pb-3">
                <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                  Skills & Expertise
                </h1>
                <div className="flex items-center space-x-2">
                  {freelancerselfprofile &&
                  freelancerselfprofile &&
                  freelancerselfprofile.skills ? (
                    // If skills are available, show the edit icon
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
                  {/* {isEditSkillOpen && <EditSkillPopup closeEditSkill={closeEditSkill} />} */}{" "}
                  for use
                </div>
              </div>

              {/* <div className="flex items-center justify-between pb-3">
    <h1 className="font-cardo text-[21px] text-[#031136] font-normal mr-1">Skills & Expertise</h1>
    <div className="flex items-center space-x-2">
        <div className="p-1 w-6 h-6 bg-white rounded-full border border-gray-200 cursor-pointer" onClick={openEditSkill}>
            <Image src={edit} alt="edit"/>
        </div>
        {isEditSkillOpen && <EditSkillPopup closeEditSkill={closeEditSkill}/>}
    </div>
    </div> */}
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
        <div className="my-6 border border-gray-200 border-opacity-40 bg-[#FFFFFF] p-4 py-8">
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
              {/* {isAddEmploymentOpen && (
                <isAddEmploymentOpen closeAddEmployment={closeAddEmployment} />  for use
              )} */}
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
                        // onClick={() => openEditEmployment(emp)}
                      >
                        <Image
                          src={edit}
                          alt="edit"
                        />
                      </button>
                      {/* {isEditEmploymentOpen && (
                        <EditEmploymentPopup
                          employment={selectedEmp}
                          closeEditEmployment={closeEditEmployment}             for use
                        />
                      )} */}
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
          {/* <h1 className="font-cardo text-[20px] text-[#031136] font-normal mx-auto cursor-pointer">Show More</h1> */}
        </div>
      </div>
      {/* <HomeSection4 /> */}
      {/* <Footer /> */}
    </>
  );
};

export default FreelancerSelfProfile;
