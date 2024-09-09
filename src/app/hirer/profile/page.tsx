"use client";
import React, { useState, useRef, useEffect } from "react";
import freelancercover from "@/assets/images/freelancercover.png";

import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { IHirerProfile } from "@/interfaces";
import { MdClose, MdModeEditOutline } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import HirerAccountPopup from "@/components/HirerAccountPopup";
import { errorLog } from "@/utils/errorLog";
import HirerCompanyPopup from "@/components/HirerCompanyPopup";
import HirerContactPopup from "@/components/HirerContactPopup";

const hirerSelfProfileObj: IHirerProfile = {
  id: 0,
  email: "",
  first_Name: "",
  last_Name: "",
  contact: "",
  Address: "",
  DOB: null,
  gender: "",
  Company_Name: "",
  images_logo: "",
  Company_Establish: null,
  social_media: "",
  map: "",
  about: "",
};

const HirerProfile = () => {
  const [hirerSelfProfile, setHirerSelfProfile] = useState<IHirerProfile>(hirerSelfProfileObj);

  const formatToDDMMYYYY = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };
  const [reviews, setReviews] = useState([]); // eslint-disable-line

  /** ---> Fetching Hirer profile data. */
  useEffect(() => {
    fetchHirerProfile();
  }, []);

  const fetchHirerProfile = async () => {
    try {
      const res = await axiosWithAuth.get("/account/hirer/selfprofile/view");
      setHirerSelfProfile(res.data.data[0]);
    } catch (error) {
      errorLog(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccount, setIsAccountOpen] = useState(false);
  const [isDetails, setIsDetailsOpen] = useState(false);
  const [isContacts, setIsContactsOpen] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleEditAccount = () => {
    setIsAccountOpen(true);
  };

  const handleAccountClose = () => {
    setIsAccountOpen(false);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
  };

  const handleContactsClose = () => {
    setIsContactsOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files ? event.target.files[0] : null);
  };

  const handleImageClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  /** ---> Handling image save. */
  const handleImageSave = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("images_logo", selectedFile);

    axiosWithAuth
      .put("/account/hirer/profile/update", formData)
      .then((response) => {
        if (response.data.status === 200) {
          setReviews(response.data.data);
          fetchHirerProfile();
          toast.success("profile image updated", { className: "mt-[100px]" });
        } else {
          toast.error("profile image not updated", { className: "mt-[100px]" });
        }
      })
      .catch((error) => {
        errorLog(error);
      });
    setIsModalOpen(false);
  };

  // eslint-disable-next-line
  const underlineStyle = {
    content: '""',
    display: "block",
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "2px",
    background: "linear-gradient(90deg, #0909E9, #00D4FF)",
  };

  return (
    <>
      <div className="mx-[9%] mt-4">
        <Image
          src={freelancercover}
          alt=""
          className="mb-4 h-[272px] w-full"
        />

        <div className="flex flex-col md:flex-row">
          <div className="border border-gray-200 border-opacity-30 bg-white md:w-[30%]">
            <div className="relative mb-4 border-b border-gray-200 border-opacity-30 p-4 py-8 md:mb-0">
              <div className="relative mx-auto h-28 w-28">
                {hirerSelfProfile !== null ? (
                  <Image
                    alt="Profile"
                    src={`https://www.api.alanced.com/${hirerSelfProfile.images_logo}`}
                    className="h-full w-full rounded-full border border-gray-200"
                    width={100}
                    height={100}
                  />
                ) : (
                  <div className="h-full w-full rounded-full border border-gray-200">
                    {/* <Selection
                      className="z-0"
                      height={104}
                      width={104}
                      style={{ borderRadius: 100 }}
                    /> */}{" "}
                    Selection
                  </div>
                )}
                <button
                  className="absolute left-2 top-1 h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                  onClick={handleEditClick}
                >
                  <MdModeEditOutline />
                </button>
                <div className="absolute bottom-3 right-2 h-4 w-4 rounded-full border-2 border-white bg-green-500"></div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-b border-gray-200 border-opacity-30 px-4 py-4 text-left md:px-8">
              <h1 className="font-cardo mr-1 text-[21px] font-normal text-[#031136]">
                Verifications
              </h1>
              <p className="font-inter mr-1 inline-block py-1 text-[14px] text-[#0A142F]">
                ID : <span className="mr-1 opacity-50">Verified</span>
                <RiVerifiedBadgeFill className="inline-block text-green-600" />
              </p>
            </div>
          </div>
          {/* ---> Profile Image modal */}
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
                      <MdClose className="text-xl" />
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
                            className="absolute inset-0 h-full w-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={`https://www.api.alanced.com/${hirerSelfProfile.images_logo}`}
                            alt="Profile"
                            width={200}
                            height={200}
                          />
                        )}
                      </div>
                      <div className="relative h-28 w-28 overflow-hidden">
                        {selectedFile ? (
                          <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={`https://www.api.alanced.com/${hirerSelfProfile.images_logo}`}
                            alt="Profile"
                            width={112}
                            height={112}
                          />
                        )}
                      </div>
                      <div className="relative h-20 w-20 overflow-hidden">
                        {selectedFile ? (
                          <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={`https://www.api.alanced.com/${hirerSelfProfile.images_logo}`}
                            alt="Profile"
                            width={80}
                            height={80}
                          />
                        )}
                      </div>
                      <div className="relative h-16 w-16 overflow-hidden">
                        {selectedFile ? (
                          <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={URL.createObjectURL(selectedFile)}
                            alt="Profile"
                          />
                        ) : (
                          <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src={`https://www.api.alanced.com/${hirerSelfProfile.images_logo}`}
                            alt="Profile"
                            width={64}
                            height={64}
                          />
                        )}
                      </div>
                      <input
                        type="file"
                        ref={inputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </div>
                    <p className="font-cardo pt-2 text-left text-[17px] font-normal text-[#031136]">
                      Must Be An Actual Photo Of You.
                    </p>
                    <p className="font-inter text-left text-[14px] text-[#0A142F] opacity-50">
                      Logos, clip-art, group photos, and digitally-altered images are not allowed.
                    </p>
                    <div className="mt-8 flex justify-end">
                      <button
                        className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white"
                        onClick={handleImageClick}
                      >
                        Change Image
                      </button>

                      <button
                        className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                        onClick={handleImageSave}
                      >
                        <Link href="">
                          <button className="rounded-sm bg-white px-2 py-1">
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
            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
            </div>

            <div
              className="flex border-b border-gray-200 border-opacity-30 px-4 py-6 text-left md:px-8"
              id="workHistory"
            >
              <div className="flex w-fit flex-col">
                <span className="text-xl font-bold text-[#0909E9]">Account</span>
                {hirerSelfProfile !== null ? (
                  <div className="ml-4 mt-5 flex flex-col">
                    <span className="text-2xl font-semibold capitalize">
                      {hirerSelfProfile.first_Name + " " + hirerSelfProfile.last_Name}
                    </span>
                    <span className="text-md mt-4 text-gray-500">Client</span>
                    <span className="text-lg font-semibold capitalize">
                      {hirerSelfProfile.first_Name + " " + hirerSelfProfile.last_Name}
                    </span>
                    <span className="text-md mt-4 text-gray-500">Email</span>
                    <span className="font-semibold">{hirerSelfProfile.email}</span>
                  </div>
                ) : (
                  <div className="ml-4 mt-5 flex flex-col">
                    <span className="text-2xl font-semibold">
                      {/* <Selection
                        height={30}
                        width={200}
                      /> */}
                    </span>
                    <span className="text-md mt-4 text-gray-500">Client</span>
                    <span className="text-lg font-semibold">
                      {/* <Selection
                        height={20}
                        width={200}
                      /> */}
                    </span>
                    <span className="text-md mt-4 text-gray-500">Email</span>
                    <span className="font-semibold">
                      {/* <Selection
                        height={20}
                        width={300}
                      /> */}
                    </span>
                  </div>
                )}
              </div>

              <button
                className="float-right ml-auto mt-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-1"
                onClick={handleEditAccount}
              >
                <MdModeEditOutline className="text-xl" />
              </button>
            </div>

            {isAccount && (
              <HirerAccountPopup
                handleAccountClose={handleAccountClose}
                hirerSelfProfile={hirerSelfProfile}
                fetchHirerProfile={fetchHirerProfile}
              />
            )}
            <div
              className="flex border-b border-gray-200 border-opacity-30 px-4 py-6 text-left md:px-8"
              id="workHistory"
            >
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#0909E9]">Company Details</span>
                {hirerSelfProfile !== null ? (
                  <div className="ml-4 mt-5 flex flex-col">
                    <span className="text-lg font-semibold capitalize">
                      {hirerSelfProfile.first_Name + " " + hirerSelfProfile.last_Name}
                    </span>
                    <span className="text-md mt-4 text-gray-500">Website</span>
                    <span className="font-semibold">{hirerSelfProfile.social_media}</span>
                    <span className="text-md mt-4 text-gray-500">Establish</span>
                    <span className="font-semibold">
                      {formatToDDMMYYYY(hirerSelfProfile.Company_Establish ?? "")}
                    </span>
                  </div>
                ) : (
                  <div className="ml-4 mt-5 flex flex-col">
                    <span className="text-lg font-semibold">
                      {/* <Skeleton
                        height={20}
                        width={200}
                      /> */}
                    </span>
                    <span className="text-md mt-4 text-gray-500">Website</span>
                    <span className="font-semibold">
                      {/* <Skeleton
                        height={20}
                        width={300}
                      /> */}
                    </span>
                    <span className="text-md mt-4 text-gray-500">Establish</span>
                    <span className="font-semibold">
                      {/* <Skeleton
                        height={20}
                        width={100}
                      /> */}
                    </span>
                  </div>
                )}
              </div>
              <button
                className="float-right ml-auto mt-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-1"
                onClick={() => setIsDetailsOpen(true)}
              >
                <MdModeEditOutline className="text-xl" />
              </button>
              <div className="flex items-center justify-between"></div>
            </div>

            {isDetails && (
              <HirerCompanyPopup
                handleDetailsClose={handleDetailsClose}
                hirerSelfProfile={hirerSelfProfile}
                fetchHirerProfile={fetchHirerProfile}
              />
            )}
            <div
              className="flex border-b border-gray-200 border-opacity-30 px-4 py-6 text-left md:px-8"
              id="workHistory"
            >
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#0909E9]">Company Contacts</span>
                {hirerSelfProfile !== null ? (
                  <div className="ml-4 mt-5 flex flex-col">
                    <span className="text-md text-gray-500">Owner</span>
                    <span className="text-lg font-semibold capitalize">
                      {hirerSelfProfile.first_Name + " " + hirerSelfProfile.last_Name}
                    </span>
                    <span className="text-md mt-4 text-gray-500">phone</span>
                    <span className="text-lg font-semibold">{hirerSelfProfile.contact}</span>
                    <span className="text-md mt-4 text-gray-500">Address</span>
                    <span className="text-lg font-semibold">{hirerSelfProfile.Address}</span>
                  </div>
                ) : (
                  <div className="ml-4 mt-5 flex flex-col">
                    <span className="text-md text-gray-500">Owner</span>
                    <span className="text-lg font-semibold">
                      {/* <Skeleton
                        height={20}
                        width={200}
                      /> */}
                    </span>
                    <span className="text-md mt-4 text-gray-500">phone</span>
                    <span className="text-lg font-semibold">
                      {/* <Skeleton
                        height={20}
                        width={250}
                      /> */}
                    </span>
                    <span className="text-md mt-4 text-gray-500">Address</span>
                    <span className="text-lg font-semibold">
                      {/* <Skeleton
                        height={20}
                        width={300}
                      /> */}
                    </span>
                  </div>
                )}
              </div>
              <button
                className="float-right ml-auto mt-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white p-1"
                onClick={() => setIsContactsOpen(true)}
              >
                <MdModeEditOutline className="text-xl" />
              </button>
            </div>

            {isContacts && (
              <HirerContactPopup
                handleContactsClose={handleContactsClose}
                hirerSelfProfile={hirerSelfProfile}
                fetchHirerProfile={fetchHirerProfile}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HirerProfile;
