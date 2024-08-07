"use client";
import React, { useState } from "react";

import mobileInHandImage from "@/assets/images/mobile_hand_contract.png";

import axios from "axios";
// import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { MdDoDisturbAlt, MdLightbulbOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { timeAgo } from "@/utils/timeFunction";
import Image from "next/image";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiShieldStarLine } from "react-icons/ri";
import Link from "next/link";
import { errorLog } from "@/utils/errorLog";

const ViewProjectDetail = () => {
  //   const project = location.state && location.state.project;
  const project = {
    id: 1,
    title: "Fitness Tracking App",
    description:
      "Developed a fitness tracking application with React for the frontend and Django Rest Framework for the backend. Implemented workout logs, progress charts, and goal setting features.",
    rate: "Hourly",
    fixed_budget: null,
    min_hourly_rate: 4,
    max_hourly_rate: 8,
    deadline: "2024-01-03",
    skills_required: "['PHP', 'Wordpress', 'Shopify', 'CSS', 'Figma', 'HTML']",
    category: "Web Development",
    project_owner_name: "Pihu Sharma",
    project_creation_date: "2023-12-30T15:36:10.305340",
    project_owner_location: "Gujarat",
    project_owner_contact: "9876543421",
    experience_level: "Intermediate",
    is_hired: false,
    project_owner_date_of_creation: "2023-12-30",
    project_owner: 3,
  };
  const id = project.id;
  // const projectData = { project };
  const [BidCount, setBidCount] = useState(0);

  const accessToken = localStorage.getItem("@accessToken");

  const [AllProposals, setAllProposals] = useState<any>(); // eslint-disable-line
  let clickable = false;

  useEffect(() => {
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

  if (project !== null && AllProposals !== "") {
    for (const key in AllProposals) {
      if (project.id === AllProposals[key].project_id) {
        clickable = true;
      }
    }
  }

  // const toggleSaveProject = async (project: any) => {
  //   try {
  //     let response;

  //     if (project.isSaved) {
  //       response = await axios.delete(
  //         `https://www.api.alanced.com/freelance/saved-projects/${project.id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //     } else {
  //       response = await axios.post(
  //         `https://www.api.alanced.com/freelance/saved-projects/${project.id}`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //     }

  //     const updatedJob = response.data;

  //     localStorage.setItem(`isSaved_${project.id}`, JSON.stringify(updatedJob.isSaved));

  //     if (updatedJob.isSaved) {
  //       toast.success("Job saved successfully!");
  //       // navigate("/view-more/project-detail");
  //     } else {
  //       toast.success("Job unsaved successfully!");
  //       // navigate("/view-more/project-detail");
  //     }
  //   } catch (error) {
  //     console.error("Error toggling job save state", error);
  //   }
  // };

  useEffect(() => {
    axios
      .get(`https://www.api.alanced.com/freelance/View/bids/${id}`)
      .then((response) => {
        setBidCount(response.data.count);
      })
      .catch((error) => {
        errorLog(error);
      });
  }, []);

  return (
    <>
      <div className="container-sm px-40">
        {clickable ? (
          <div className="mt-4 flex h-16 items-center rounded-md bg-blue-100 pl-5 pt-2 text-left">
            <MdLightbulbOutline />
            <span className="ml-4">You have already submitted a proposal for this project.</span>
          </div>
        ) : (
          ""
        )}
        {project.is_hired && !clickable ? (
          <div className="mt-4 h-16 rounded-md bg-blue-100 pl-5 pt-2 text-left">
            <MdDoDisturbAlt />
            <span className="ml-4">This project is closed ,you can&apos;t add proposal now</span>
          </div>
        ) : (
          ""
        )}
        <div className="my-6 flex flex-row">
          <div className="basis-8/12 text-left">
            <h1 className="font-cardo text-xl font-normal">{project.title}</h1>
            <p className="font-cardo mt-4 text-base font-normal">{project.category}</p>
            <div className="mt-2 flex justify-between">
              <div className="basis-6/12">
                <p className="text-base font-normal text-[#797979]">
                  Posted {timeAgo(project.project_creation_date)}
                </p>
              </div>

              <div className="flex items-center gap-2 text-right text-base font-normal opacity-[50%]">
                <IoLocationOutline /> Worldwide
              </div>
            </div>
            <div className="mt-8 text-base font-normal text-[#797979]">
              Job Description: {project.description}
            </div>
            <div className="text-base font-normal text-[#797979]">
              Please Share Your Details On this Whatsapp No.+
              {project.project_owner_contact ? project.project_owner_contact : "NA"}{" "}
            </div>
            <div className="mt-5 text-base font-normal text-[#797979]">
              Are you a talented and imaginative Graphic Designer with a flair for creating visually
              stunning and engaging designs? Vogue Tourism, a premier name in the travel and
              hospitality sector, is seeking a skilled Graphic Designer to join our team. If
              you&apos;re passionate about translating travel experiences into captivating visuals,
              we want to hear from you.
            </div>
            <div className="mt-5 text-base font-normal text-[#797979]">Responsibilities:</div>
            <div className="mt-5 text-base font-normal text-[#797979]">
              Collaborate with the marketing team to understand design requirements and objectives
              for various projects, including flyers, posters, social media graphics, and
              more.Create compelling visual content that aligns with our brand identity and
              resonates with our target audience.Develop original design concepts, graphics, and
              layouts that tell the story of unique travel destinations and experiences.Ensure that
              all designs adhere to branding guidelines and maintain a consistent visual
              identity.Use your creative expertise to enhance the overall aesthetic and impact of
              our marketing materials.
            </div>
            <div className="mt-10 flex flex-row">
              <div className="basis-6/12">
                <div className="flex flex-row">
                  <div className="basis-2/12">
                    <FaMoneyCheckDollar className="text-2xl" />
                  </div>
                  <div className="basis-10/12">
                    <h1 className="font-cardo text-left text-lg font-normal">
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
                    <p className="text-left text-base font-normal opacity-[50%]">{project.rate}</p>
                  </div>
                </div>
              </div>
              <div className="basis-6/12">
                <div className="flex flex-row">
                  <div className="basis-2/12">
                    <RiShieldStarLine className="text-2xl" />
                  </div>
                  <div className="basis-10/12">
                    <h1 className="font-cardo text-left text-lg font-normal">
                      {project.experience_level.replace(/_/g, " ")}
                    </h1>
                    <p className="text-left text-base font-normal opacity-[50%]">
                      Experience Level
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex items-center">
              <div className="basis-8/12">
                <h1 className="font-cardo text-left text-lg font-normal">
                  Contract-to-hire opportunity
                </h1>
                <p className="mt-3 text-base font-normal opacity-[50%]">
                  This lets talent know that this job could become full time.
                </p>
              </div>
              <div className="basis-4/12">
                <Image
                  src={mobileInHandImage}
                  alt="contract in hand"
                  height={150}
                  width={150}
                />
              </div>
            </div>
            <div className="mt-14">
              <h1 className="text-base font-normal">
                Project Type:
                <span className="opacity-[50%]">{project.category}</span>
              </h1>
            </div>
            <div className="font-cardo mt-10 text-lg font-normal">Skills and Expertise</div>
            <div className="mt-2 text-sm font-normal">{project.category} Deliverables</div>
            {JSON.parse(project.skills_required.replace(/'/g, '"')).map(
              (skill: string, index: number) => (
                <span
                  key={index}
                  className="my-3 mr-4 inline-block rounded border border-gray-300 px-5 py-1 text-base text-[#797979] focus:border-none"
                >
                  {skill}
                </span>
              )
            )}

            <div className="mt-6 text-sm font-normal text-[#0A142F]">Other</div>
            {JSON.parse(project.skills_required.replace(/'/g, '"')).map(
              (skill: string, index: number) => (
                <span
                  key={index}
                  className="my-3 mr-4 inline-block rounded border border-gray-300 px-5 py-1 text-base text-[#797979] focus:border-none"
                >
                  {skill}
                </span>
              )
            )}
            <div className="font-cardo mt-14 text-lg font-normal text-[#031136]">
              Activity on this job
            </div>
            <div className="mt-5">
              <h1 className="text-base font-normal">
                Proposals:
                <span className="opacity-[50%]"> {BidCount ? BidCount : 0}</span>
              </h1>
            </div>
          </div>
          <div className="basis-4/12">
            <div className="ml-[16%] mt-6">
              {accessToken ? (
                <Link
                  href="/freelancer/send-proposal"
                  //   style={{
                  //     pointerEvents: clickable || project.is_hired ? "none" : "",
                  //   }}
                  //   state={{ projectData }}
                >
                  <span
                    className={
                      clickable || project.is_hired
                        ? "rounded border border-none bg-slate-200 px-12 py-[15px] text-base font-normal text-white lg:mt-0"
                        : "rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-12 py-[15px] text-base font-normal text-white lg:mt-0"
                    }
                  >
                    Apply Now
                  </span>
                </Link>
              ) : (
                <Link href="/login">
                  <span className="rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-12 py-[15px] text-base font-normal text-white lg:mt-0">
                    Apply Now
                  </span>
                </Link>
              )}
            </div>

            <div className="font-cardo ml-10 mt-12 text-xl font-normal text-[#0A142F]">
              About the client
            </div>
            <div className="ml-10 mt-3 text-sm font-normal text-[#0A142F] opacity-[50%]">
              Payment method not verified
            </div>
            <div className="ml-10 mt-5 text-base font-normal text-[#0A142F]">Owner Name</div>
            <div className="ml-10 mt-2 text-base font-normal text-[#0A142F] opacity-[50%]">
              {project.project_owner_name}
            </div>
            <div className="ml-10 mt-5 text-base font-normal text-[#0A142F]">Location</div>
            <div className="ml-10 mt-2 text-base font-normal text-[#0A142F] opacity-[50%]">
              {project.project_owner_location ? project.project_owner_location : "NA"}
            </div>
            <div className="ml-10 mt-5 text-base font-normal text-[#0A142F]">Histroy</div>
            <div className="ml-10 mt-2 text-base font-normal text-[#0A142F] opacity-[50%]">
              Member since {project.project_owner_date_of_creation}
            </div>
            <div className="font-cardo ml-10 mt-16 text-xl font-normal text-[#0A142F]">
              Job link
            </div>
            <div className="ml-10 mt-5 inline-block rounded bg-black p-0.5 opacity-[30%]">
              <button className="bg-white px-1 py-1">
                <p className="cursor-not-allowed bg-[#E4EBE4] px-4 py-[10px] text-sm font-normal text-black opacity-[90%]">
                  https://www.alanced.com/find-work
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProjectDetail;
