"use client";
import React, { useRef, useState } from "react";
import logo from "@/assets/images/alanced.png";
import navback from "@/assets/images/nav_background.png";
// import { useDispatch, useSelector } from "react-redux";
// import { LogoutAction } from "../../redux/Auth/AuthAction";
// import axios from "axios";
import { useEffect } from "react";
// import alancedlogo from "@/assets/images/alanced_transparent.png";

// import { timeAgo } from "../../container/freelancer/TimeFunctions";
// import { dontNeedMTScreens } from "../../routes/DynamicMarginTop";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { FaBell, FaChevronDown } from "react-icons/fa6";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  const accessToken = localStorage.getItem("accessToken");
  // const AccessToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUzNDI0MjI2LCJpYXQiOjE3MjE4ODgyMjYsImp0aSI6IjZiNGM3YjlmMmZjZTRlZTQ5OTY4NjFiZDU4Yzc4Yzk0IiwidXNlcl9pZCI6NH0.9IY5P_GoKns52wLXX0ZJMCbgXrx_fmMJK7mFkf54JxU";
  const loginType: "HIRER" | "FREELANCER" = "FREELANCER";
  const logindata = {
    id: 4,
    first_Name: "sachin",
    last_Name: "sharma",
    email: "sachinsharmapeace@gmail.com",
    contact: "",
    Address: "",
    images_logo: "/media/images/blank.png",
    social_media: "",
    skills: "['Python']",
    about: "",
    DOB: null,
    gender: "",
    map: "",
    experience: 0,
    qualification: "B.E",
    category: "",
    Language: "['Hindi']",
    hourly_rate: 0,
    experience_level: "",
  };
  const googleUserName = localStorage.getItem("googleUserName");
  const loginMethod = "traditional";
  //   const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);
  const [Findworkdropdown, setFindworkDropdown] = useState(false);
  const [MyJobsdropdown, setMyJobsDropdown] = useState(false);
  const [Reportsdropdown, setReportsDropdown] = useState(false);
  const hirerImage = "hirereimage";
  const [isScrolled, setIsScrolled] = useState(false); // eslint-disable-line
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const freelanceImage = "freelancerImage";
  var imagedata = useState(null); // eslint-disable-line
  if (hirerImage !== null) {
    // imagedata = hirerImage;
  }
  if (loginType === "FREELANCER") {
    if (freelanceImage !== null) {
      //   imagedata = freelanceImage[0];
    }
  }

  let displayName;

  //  @ts-expect-error -> as of now i am just ignoring ts will se leter on.
  if (loginMethod === "google") {
    // displayName = googleUserName;
    displayName =
      logindata.first_Name && logindata.last_Name
        ? logindata?.first_Name + " " + logindata?.last_Name
        : googleUserName;
  } else if (loginMethod === "traditional") {
    displayName = logindata?.first_Name + " " + logindata?.last_Name;
  }

  // // eslint-disable-next-line
  // const handleClickOutside = (event: any) => {
  //   // eslint-disable-next-line
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     // Clicked outside the dropdown, close it
  //     setDropdownVisible(false);
  //   }
  // };

  // useEffect(() => {
  //   // Add event listener when the component mounts
  //   document.addEventListener("mousedown", handleClickOutside);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const isLoggedIn = Boolean(accessToken || googleUserName);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("googleUserName");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("loginType");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("logindata");

    // dispatch(LogoutAction());
  };

  const [clientnotifications, setClientNotifications] = useState([]); //eslint-disable-line
  const [freenotifications, setFreeNotifications] = useState([]); //eslint-disable-line
  const [isNotificationsDropdownVisible, setIsNotificationsDropdownVisible] = useState(false);

  // const fetchClientNotifications = async () => {
  //   if (!isLoggedIn) return;
  //   try {
  //     const response = await axios.get(
  //       "https://www.api.alanced.com/freelance/view/client-notifications",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${AccessToken}`,
  //         },
  //       }
  //     );

  //     if (response.data.status === 200) {
  //       setClientNotifications(response.data.data);
  //     } else {
  //       console.log(response.data.message || "Error fetching notification");
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  //   useEffect(() => {
  //     fetchClientNotifications();
  //     const interval = setInterval(fetchClientNotifications, 60000);
  //     return () => clearInterval(interval);
  //   }, []);

  //   const markAsReadClient = async (notifId) => {
  //     try {
  //       const response = await axios.put(
  //         `https://www.api.alanced.com/freelance/read/client-notification/${notifId}`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${AccessToken}`,
  //           },
  //         }
  //       );

  //       if (response.data.status === 200) {
  //         fetchClientNotifications();
  //       } else {
  //         console.log(response.data.message || "Error marking notification as read");
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  const toggleNotificationDropdown = () => {
    setIsNotificationsDropdownVisible(!isNotificationsDropdownVisible);
  };
  // const unreadclientCount = clientnotifications.filter((notif) => !notif.is_read).length;
  const unreadclientCount = 0;

  //   const deleteClientNotification = async (notifId) => {
  //     try {
  //       const response = await axios.delete(
  //         `https://www.api.alanced.com/freelance/delete/client-notification/${notifId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${AccessToken}`,
  //           },
  //         }
  //       );

  //       if (response.data.status === 200) {
  //         fetchClientNotifications();
  //       } else {
  //         console.log(response.data.message || "Error deleting notification");
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   const fetchFreeNotifications = async () => {
  //     if (!isLoggedIn) return;
  //     try {
  //       const response = await axios.get(
  //         "https://www.api.alanced.com/freelance/view/freelancer-notifications",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${AccessToken}`,
  //           },
  //         }
  //       );

  //       if (response.data.status === 200) {
  //         setFreeNotifications(response.data.data);
  //       } else {
  //         console.log(response.data.message || "Error fetching notification");
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchFreeNotifications();
  //     const interval = setInterval(fetchFreeNotifications, 60000);
  //     return () => clearInterval(interval);
  //   }, []);

  //   const markAsReadFree = async (notifId) => {
  //     try {
  //       const response = await axios.put(
  //         `https://www.api.alanced.com/freelance/read/freelancer-notification/${notifId}`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${AccessToken}`,
  //           },
  //         }
  //       );

  //       if (response.data.status === 200) {
  //         fetchFreeNotifications();
  //       } else {
  //         console.log(response.data.message || "Error marking notification as read");
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  //   const deleteFreeNotification = async (notifId) => {
  //     try {
  //       const response = await axios.delete(
  //         `https://www.api.alanced.com/freelance/delete/freelancer-notification/${notifId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${AccessToken}`,
  //           },
  //         }
  //       );

  //       if (response.data.status === 200) {
  //         fetchFreeNotifications();
  //       } else {
  //         console.log(response.data.message || "Error deleting notification");
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   };

  // const unreadfreeCount = freenotifications.filter((notif) => !notif.is_read).length;
  const unreadfreeCount = 0;

  //   const getNotificationRedirectPath = (notif) => {
  //     if (notif.type === "bid") {
  //       return "/View-all/Job-post";
  //     } else if (notif.type === "AllInvite") {
  //       return "/view-all/invited-freelancers"; // Redirect to the invitation page
  //     } else if (notif.type === "AllHirereq") {
  //       return "/my-proposals"; // Redirect to the invitation page
  //     } else if (notif.type === "review") {
  //       return "/freelancer/edit-profile"; // Redirect to the invitation page
  //     } else {
  //       return "/notifications"; // Default redirect path
  //     }
  //   };

  //   const handleClientNotificationClick = (notif) => {
  //     // markAsReadClient(notif.id); // Mark the notification as read
  //     const redirectPath = getNotificationRedirectPath(notif);
  //     router.push(redirectPath); // Redirect to the appropriate page
  //   };

  //   const handleFreeNotificationClick = (notif) => {
  //     // markAsReadFree(notif.id); // Mark the notification as read
  //     const redirectPath = getNotificationRedirectPath(notif);
  //     router.push(redirectPath); // Redirect to the appropriate page
  //   };

  //   const handlenotifClickOutside = (event) => {
  //     if (
  //       notificationsDropdownRef.current &&
  //       !notificationsDropdownRef.current.contains(event.target)
  //     ) {
  //       // Clicked outside the notification dropdown, close it
  //       setIsNotificationsDropdownVisible(false);
  //     }
  //   };

  //   useEffect(() => {
  //     // Add event listener when the component mounts
  //     document.addEventListener("mousedown", handlenotifClickOutside);

  //     // Clean up the event listener when the component unmounts
  //     return () => {
  //       document.removeEventListener("mousedown", handlenotifClickOutside);
  //     };
  //   }, []);

  /** ---> Tracking page is scrolled or not  */
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setIsScrolled(true) : setIsScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** ---> Closing mobile menu bar on route change */
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router]);

  return (
    // <div
    //   className={`fixed top-0 z-50 w-full max-w-[1536px] bg-cover ${
    //     !dontNeedMTScreens.includes(router.pathname)
    //       ? "bg-white"
    //       : isScrolled
    //         ? "bg-white"
    //         : "bg-transparent"
    //   } bg-top`}
    //   style={{
    //     backgroundImage: `url(${!dontNeedMTScreens.includes(router.pathname) ? navback : isScrolled ? navback : ""})`,
    //   }}
    //   onMouseLeave={(e) => {
    //     setFindworkDropdown();
    //     setMyJobsDropdown();
    //     setReportsDropdown();
    //   }}
    // >

    <div
      className={`fixed top-0 z-50 w-full max-w-[1536px] bg-white bg-cover bg-top`}
      style={{
        backgroundImage: `url(${navback})`,
      }}
    >
      <nav className="flex items-center justify-between lg:p-6 lg:px-12">
        {!isLoggedIn ? (
          <div className="relative flex w-full items-center justify-between p-5 lg:p-0">
            <Link href={"/"}>
              <div className="flex flex-shrink-0 items-center">
                <Image
                  src={logo}
                  alt="logo"
                />
                <span className="font-poppins ml-2 text-[23px] font-semibold tracking-widest text-[#031136]">
                  ALANCED
                </span>
              </div>
            </Link>
            <div className="mt-0 hidden w-full flex-grow lg:flex lg:w-auto lg:items-center">
              <div className="text-sm lg:ml-[45px] lg:flex-grow">
                <Link href="/search-freelancer">
                  <span className="mt-4 block text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block">
                    Search Freelancer
                  </span>
                </Link>
                <Link href="/search-job">
                  <span className="mt-4 block text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block">
                    Search Job
                  </span>
                </Link>
                <Link href="/why-alanced">
                  <span className="mt-4 block text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block">
                    Why Alanced
                  </span>
                </Link>
                <Link href="/contact-us">
                  <span className="mt-4 block text-[16px] text-[#031136] lg:mt-0 lg:inline-block">
                    Contact Us
                  </span>
                </Link>
              </div>

              <div className="">
                <Link href="/login">
                  <span className="mr-2 mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                    Sign In
                  </span>
                </Link>
                <div className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                  <Link href="/signup">
                    <button className="rounded-[3px] bg-[#e1f9ff] px-2 py-1">
                      <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[6px] py-[4px] text-sm font-semibold text-transparent">
                        Sign Up
                      </p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* ---> mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className=""
              >
                {isMobileMenuOpen ? (
                  <MdClose className="h-8 w-8" />
                ) : (
                  <FiMenu className="h-8 w-8" />
                )}
              </button>

              <div
                className={`absolute top-16 ${
                  isMobileMenuOpen ? "right-0" : "-right-[100rem]"
                } flex h-screen w-full flex-col items-start bg-white px-5 duration-300`}
              >
                <div className="flex w-full flex-col items-start gap-5 pt-5 text-sm">
                  <Link href="/search-freelancer">
                    <span className="text-[16px] text-[#031136]">Search Freelancer</span>
                  </Link>
                  <div className="w-full border-t border-gray-300" />
                  <Link href="/search-job">
                    <span className="text-[16px] text-[#031136]">Search Job</span>
                  </Link>
                  <div className="w-full border-t border-gray-300" />
                  <Link href="/why-alanced">
                    <span className="text-[16px] text-[#031136]">Why Alanced</span>
                  </Link>
                  <div className="w-full border-t border-gray-300" />
                  <Link href="/contact-us">
                    <span className="text-[16px] text-[#031136]">Contact us</span>
                  </Link>
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="flex flex-col items-center gap-5">
                  <Link href="/login">
                    <span className="mr-2 mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                      Sign In
                    </span>
                  </Link>
                  <div className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                    <Link href="/signup">
                      <button className="rounded-[3px] bg-[#e1f9ff] px-2 py-1">
                        <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[6px] py-[4px] text-sm font-semibold text-transparent">
                          Sign Up
                        </p>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative flex w-full items-center justify-between p-5 lg:p-0">
            <Link
              href={loginType === "FREELANCER" ? "/freelancer/profile" : "/hirer/profile"}
              onMouseEnter={() => {
                setFindworkDropdown(false);
                setReportsDropdown(false);
                setMyJobsDropdown(false);
              }}
            >
              <div className="flex flex-shrink-0 items-center">
                <Image
                  src={logo}
                  alt="logo"
                />
                <span className="font-poppins ml-2 text-[23px] font-semibold tracking-widest text-[#031136]">
                  ALANCED
                </span>
              </div>
            </Link>

            {/* ----> Navigations  */}
            <div className="hidden p-5 text-sm lg:flex">
              {loginType === "FREELANCER" ? (
                <>
                  <span
                    className="mt-4 block cursor-pointer text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block"
                    onMouseEnter={() => {
                      setFindworkDropdown(true);
                      setReportsDropdown(false);
                      setMyJobsDropdown(false);
                    }}
                  >
                    Search Job <i className="bi bi-chevron-down text-xs text-[#031136]"></i>
                  </span>
                  {Findworkdropdown && (
                    <div className="dropdown-container absolute right-[11rem] z-20 mt-5 w-48 rounded-md bg-white shadow-lg md:right-[54.5rem]">
                      <div className="py-1">
                        <Link
                          href="/search-job"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            Search Job
                          </span>
                        </Link>
                        <Link
                          href="/saved-jobs"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            Saved Jobs
                          </span>
                        </Link>
                        <Link
                          href="/my-proposals"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            Proposals
                          </span>
                        </Link>
                        <Link
                          href="/freelancer/edit-profile"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            Profile
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/hirer/profile">
                  <button
                    className="mt-4 block text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block"
                    onClick={() => {
                      setFindworkDropdown(false);
                      setReportsDropdown(false);
                      setMyJobsDropdown(false);
                    }}
                  >
                    Search Freelancer{" "}
                  </button>
                </Link>
              )}
              {loginType === "FREELANCER" ? (
                <>
                  <button
                    className="mt-4 block cursor-pointer text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block"
                    onMouseEnter={() => {
                      setMyJobsDropdown(true);
                      setFindworkDropdown(false);
                      setReportsDropdown(false);
                    }}
                  >
                    My Jobs <i className="bi bi-chevron-down text-xs text-[#031136]"></i>
                  </button>
                  {MyJobsdropdown && (
                    <div className="dropdown-container absolute right-[11rem] z-20 mt-5 w-48 rounded-md bg-white shadow-lg md:right-[46.5rem]">
                      <div className="py-1">
                        <Link
                          href="/all-invitations"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            All Invitations
                          </span>
                        </Link>
                        <Link
                          href="/freelancer/all-contracts"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            All Contracts
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}{" "}
                </>
              ) : (
                <>
                  <span
                    className="mt-4 block cursor-pointer text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block"
                    onMouseEnter={() => {
                      setMyJobsDropdown(true);
                      setFindworkDropdown(false);
                      setReportsDropdown(false);
                    }}
                  >
                    {" "}
                    Jobs <i className="bi bi-chevron-down text-xs text-[#031136]"></i>
                  </span>
                  {MyJobsdropdown && (
                    <div className="dropdown-container absolute right-[11rem] z-20 mt-5 w-48 rounded-md bg-white shadow-lg md:right-[47rem]">
                      <div className="py-1">
                        <Link
                          href="/add/Job-post"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            Post A Job
                          </span>
                        </Link>
                        <Link
                          href="/View-all/Job-post"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            All Jobs
                          </span>
                        </Link>
                        <Link
                          href="/view-all/invited-freelancers"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            Invited Freelancers
                          </span>
                        </Link>
                        <Link
                          href="/view-all/hirer-contracts"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            All Contracts
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}{" "}
                </>
              )}
              {loginType === "FREELANCER" ? (
                <>
                  <span
                    className="mt-4 block cursor-pointer text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block"
                    onMouseEnter={() => {
                      setReportsDropdown(true);
                      setFindworkDropdown(false);
                      setMyJobsDropdown(false);
                    }}
                  >
                    {" "}
                    Payments <i className="bi bi-chevron-down text-xs text-[#031136]"></i>
                  </span>
                  {Reportsdropdown && (
                    <div className="dropdown-container absolute right-[11rem] z-20 mt-5 w-48 rounded-md bg-white shadow-lg md:right-[38.5rem]">
                      <div className="py-1">
                        <Link
                          href="/freelancer/my-reports"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            Transaction History
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <span
                    className="mt-4 block cursor-pointer text-[16px] text-[#031136] lg:mr-12 lg:mt-0 lg:inline-block"
                    onMouseEnter={() => {
                      setReportsDropdown(true);
                      setMyJobsDropdown(false);
                      setFindworkDropdown(false);
                    }}
                  >
                    {" "}
                    Payments <i className="bi bi-chevron-down text-xs text-[#031136]"></i>
                  </span>
                  {Reportsdropdown && (
                    <div className="dropdown-container absolute right-[11rem] z-20 mt-5 w-48 rounded-md bg-white shadow-lg md:right-[39.5rem]">
                      <div className="py-1">
                        <Link
                          href="/freelancer/my-reports"
                          className="flex items-center px-4 py-2"
                        >
                          <span className="text-[16px] text-[#031136] hover:text-blue-600">
                            Transaction History
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/** ######################### */}

              <Link href="/messages">
                <span
                  className="mt-4 block text-[16px] text-[#031136] lg:mt-0 lg:inline-block"
                  onMouseEnter={() => {
                    setFindworkDropdown(false);
                    setReportsDropdown(false);
                    setMyJobsDropdown(false);
                  }}
                >
                  Messages
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* ----> Notification and Profile icons  */}
              <div className="flex items-center space-x-4 md:space-x-10">
                {/* ----> Notification icon  */}
                <div
                  className="relative inline-block pt-1"
                  ref={notificationsDropdownRef}
                >
                  <FaBell
                    className="bi bi-bel cursor-pointer text-2xl"
                    onClick={toggleNotificationDropdown}
                    onMouseEnter={() => {
                      setFindworkDropdown(false);
                      setReportsDropdown(false);
                      setMyJobsDropdown(false);
                    }}
                  ></FaBell>

                  {loginType === "HIRER" && unreadclientCount > 0 && (
                    <span className="absolute right-0 top-1.5 block h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-500"></span>
                  )}
                  {loginType === "FREELANCER" && unreadfreeCount > 0 && (
                    <span className="absolute right-0 top-1.5 block h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-500"></span>
                  )}

                  {loginType === "HIRER" && isNotificationsDropdownVisible && (
                    <div className="drop absolute right-[-18px] mt-5 w-80 rounded-md bg-white text-left shadow-lg">
                      {/* {clientnotifications.length > 0 ? (
                        <>
                          {clientnotifications.slice(0, 3).map((notif) => (
                            <div
                              key={notif.id}
                              to={getNotificationRedirectPath(notif)}
                              className={`cursor-pointer border-b p-3 px-5 hover:bg-[#F6FAFD] ${
                                !notif.is_read ? "bg-[#f4f8fc]" : "bg-white"
                              } group relative`}
                              onClick={() => handleClientNotificationClick(notif)}
                            >
                              <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center">
                                  <img
                                    src={alancedlogo}
                                    alt=""
                                    className="mr-2 h-[18px] w-[18px]"
                                  />
                                  <h4 className="text-md font-bold">{notif.title}</h4>
                                </div>
                                <p className="text-xs opacity-50">{timeAgo(notif.timestamp)}</p>
                              </div>
                              <p className="pt-1 text-sm opacity-50">{notif.message}</p>
                              <i
                                className="bi bi-x absolute right-1 top-1 text-[#031136] opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteClientNotification(notif.id);
                                }}
                              ></i>
                            </div>
                          ))}
                          {clientnotifications.length > 3 && (
                            <Link
                              href="/notifications"
                              className="text-md block p-3 text-left font-semibold"
                            >
                              Show More Notifications
                            </Link>
                          )}
                        </>
                      ) : (
                        <div className="p-4">
                          <h4 className="text-md font-bold">No New Notifications</h4>
                        </div>
                      )} */}
                    </div>
                  )}

                  {/* {loginType == "FREELANCER" && isNotificationsDropdownVisible && (
                    <div className="drop absolute right-[-18px] mt-5 w-80 rounded-md bg-white text-left shadow-lg">
                      {freenotifications.length > 0 ? (
                        <>
                          {freenotifications.slice(0, 3).map((notif) => (
                            <div
                              key={notif.id}
                              className={`cursor-pointer border-b p-3 px-5 hover:bg-[#F6FAFD] ${
                                !notif.is_read ? "bg-[#f4f8fc]" : "bg-white"
                              } group relative`}
                              onClick={() => handleFreeNotificationClick(notif)}
                            >
                              <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center">
                                  <img
                                    src={alancedlogo}
                                    alt=""
                                    className="mr-2 h-[18px] w-[18px]"
                                  />
                                  <h4 className="text-md font-bold">{notif.title}</h4>
                                </div>
                                <p className="text-xs opacity-50">{timeAgo(notif.timestamp)}</p>
                              </div>
                              <p className="pt-1 text-sm opacity-50">{notif.message}</p>
                              <i
                                className="bi bi-x absolute right-1 top-1 text-[#031136] opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteFreeNotification(notif.id);
                                }}
                              ></i>
                            </div>
                          ))}
                          {freenotifications.length > 3 && (
                            <Link
                              href="/notifications"
                              className="text-md block p-3 text-left font-semibold"
                            >
                              Show More Notifications
                            </Link>
                          )}
                        </>
                      ) : (
                        <div className="p-4">
                          <h4 className="text-md font-bold">No New Notifications</h4>
                        </div>
                      )}
                    </div>
                  )} */}
                </div>
                {/* ----> Profile icon  */}
                <div
                  className="relative inline-block"
                  ref={dropdownRef}
                  onMouseEnter={() => {
                    setFindworkDropdown(false);
                    setReportsDropdown(false);
                    setMyJobsDropdown(false);
                  }}
                >
                  {logindata && logindata.images_logo ? (
                    <img
                      src={"https://www.api.alanced.com" + logindata.images_logo}
                      alt="Profile"
                      className="h-8 w-8 cursor-pointer rounded-full border border-gray-400"
                      // onClick={() => setDropdownVisible(!dropdownVisible)}
                    />
                  ) : (
                    <button
                      className="font-cardo flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-1 text-xl font-bold text-white"
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                    >
                      {displayName && displayName[0].toUpperCase()}
                    </button>
                  )}
                  {dropdownVisible && (
                    <div className="drop absolute right-[-10px] mt-5 w-[14rem] rounded-md bg-white shadow-lg">
                      <div className="py-1">
                        {logindata && logindata.images_logo ? (
                          <img
                            src={"https://www.api.alanced.com" + logindata.images_logo}
                            alt="Profile"
                            className="mx-auto my-5 h-20 w-20 cursor-pointer rounded-full border border-gray-200 p-0.5"
                            // onClick={() => setDropdownVisible(!dropdownVisible)}
                          />
                        ) : (
                          <button
                            className="font-cardo mx-auto my-5 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-1 text-4xl font-bold text-white"
                            onClick={() => setDropdownVisible(!dropdownVisible)}
                          >
                            {displayName && displayName[0].toUpperCase()}
                          </button>
                        )}
                        <h1 className="font-cardo px-2 text-center text-[19px] text-[#031136]">
                          {displayName}
                        </h1>
                        <h1 className="font-cardo mb-3 text-center text-lg text-gray-500">
                          {loginType === "FREELANCER" ? loginType.toLowerCase() : "client"}
                        </h1>
                        {loginType === "FREELANCER" ? (
                          <Link
                            href="/freelancer/edit-profile"
                            className="flex items-center px-4 py-2 hover:bg-gray-100"
                          >
                            <i className="bi bi-person-circle mr-3"></i>
                            <span className="font-cardo text-[16px] text-[#031136]">Profile</span>
                          </Link>
                        ) : (
                          <Link
                            href="/hirer/profile-edit"
                            className="flex items-center px-4 py-2 hover:bg-gray-100"
                          >
                            <i className="bi bi-person-circle mr-3"></i>
                            <span className="font-cardo text-[16px] text-[#031136]">Profile</span>
                          </Link>
                        )}
                        <Link
                          href="/"
                          className="flex items-center px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            window.scrollTo(0, 0);
                            handleLogout();
                          }}
                        >
                          <i className="bi bi-box-arrow-right mr-3"></i>
                          <span className="font-cardo text-[16px] text-[#031136]">Logout</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ---> mobile menu button for authenticated routes */}
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className=""
                >
                  {isMobileMenuOpen ? (
                    <MdClose className="h-8 w-8" />
                  ) : (
                    <FiMenu className="h-8 w-8" />
                  )}
                </button>

                <div
                  className={`absolute top-16 ${
                    isMobileMenuOpen ? "right-0" : "-right-[100rem]"
                  } flex h-screen w-full flex-col items-start bg-white px-5 duration-300`}
                >
                  <div className="flex w-full flex-col items-start gap-5 pt-3 text-sm">
                    {loginType === "FREELANCER" ? (
                      <>
                        <button
                          className="flex w-full cursor-pointer items-center justify-between pr-5 text-[16px] text-[#031136]"
                          onClick={() => {
                            setFindworkDropdown((prev) => !prev);
                            setReportsDropdown(false);
                            setMyJobsDropdown(false);
                          }}
                        >
                          Search Job <FaChevronDown className="text-xs text-[#031136]" />
                        </button>
                        {Findworkdropdown && (
                          <div className="">
                            <div className="py-1">
                              <Link
                                href="/search-job"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  Search Job
                                </span>
                              </Link>
                              <Link
                                href="/saved-jobs"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  Saved Jobs
                                </span>
                              </Link>
                              <Link
                                href="/my-proposals"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  Proposals
                                </span>
                              </Link>
                              <Link
                                href="/freelancer/edit-profile"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  Profile
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link href="/hirer/profile">
                        <button
                          className="text-[16px] text-[#031136]"
                          onClick={() => {
                            setFindworkDropdown(false);
                            setReportsDropdown(false);
                            setMyJobsDropdown(false);
                          }}
                        >
                          Search Freelancer
                        </button>
                      </Link>
                    )}
                    <div className="w-full border-t border-gray-300" />

                    {loginType === "FREELANCER" ? (
                      <>
                        <button
                          className="flex w-full cursor-pointer items-center justify-between pr-5 text-[16px] text-[#031136]"
                          onClick={() => {
                            setMyJobsDropdown((prev) => !prev);
                            setFindworkDropdown(false);
                            setReportsDropdown(false);
                          }}
                        >
                          My Jobs <FaChevronDown className="mt-1 text-xs text-[#031136]" />
                        </button>
                        {MyJobsdropdown && (
                          <div className="">
                            <div className="py-1">
                              <Link
                                href="/all-invitations"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  All Invitations
                                </span>
                              </Link>
                              <Link
                                href="/freelancer/all-contracts"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  All Contracts
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}{" "}
                      </>
                    ) : (
                      <>
                        <button
                          className="flex w-full cursor-pointer items-center justify-between gap-2 pr-5 text-[16px] text-[#031136]"
                          onClick={() => {
                            setMyJobsDropdown((prev) => !prev);
                            setFindworkDropdown(false);
                            setReportsDropdown(false);
                          }}
                        >
                          Jobs <FaChevronDown className="mt-1 text-xs text-[#031136]" />
                        </button>
                        {MyJobsdropdown && (
                          <div className="">
                            <div className="py-1">
                              <Link
                                href="/add/Job-post"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  Post A Job
                                </span>
                              </Link>
                              <Link
                                href="/View-all/Job-post"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  All Jobs
                                </span>
                              </Link>
                              <Link
                                href="/view-all/invited-freelancers"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  Invited Freelancers
                                </span>
                              </Link>
                              <Link
                                href="/view-all/hirer-contracts"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  All Contracts
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}{" "}
                      </>
                    )}
                    <div className="w-full border-t border-gray-300" />

                    {loginType === "FREELANCER" ? (
                      <>
                        <button
                          className="flex w-full cursor-pointer items-center justify-between gap-2 pr-5 text-[16px] text-[#031136]"
                          onClick={() => {
                            setReportsDropdown((prev) => !prev);
                            setFindworkDropdown(false);
                            setMyJobsDropdown(false);
                          }}
                        >
                          Payments <FaChevronDown className="mt-1 text-xs text-[#031136]" />
                        </button>
                        {Reportsdropdown && (
                          <div className="">
                            <div className="py-1">
                              <Link
                                href="/freelancer/my-reports"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  Transaction History
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <button
                          className="flex w-full cursor-pointer items-center justify-between pr-5 text-[16px] text-[#031136]"
                          onClick={() => {
                            setReportsDropdown((prev) => !prev);
                            setMyJobsDropdown(false);
                            setFindworkDropdown(false);
                          }}
                        >
                          Payments <FaChevronDown className="text-xs text-[#031136]" />
                        </button>
                        {Reportsdropdown && (
                          <div className="">
                            <div className="py-1">
                              <Link
                                href="/freelancer/my-reports"
                                className="flex items-center px-4 py-2"
                              >
                                <span className="text-[16px] text-[#031136] hover:text-blue-600">
                                  Transaction History
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <div className="w-full border-t border-gray-300" />

                    {/** ######################### */}

                    <Link href="/messages">
                      <button
                        className="text-[16px] text-[#031136]"
                        onClick={() => {
                          setFindworkDropdown(false);
                          setReportsDropdown(false);
                          setMyJobsDropdown(false);
                        }}
                      >
                        Messages
                      </button>
                    </Link>
                    <div className="w-full border-t border-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
