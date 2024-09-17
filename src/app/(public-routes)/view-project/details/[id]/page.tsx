"use client";
import React, { useState, useEffect, FC } from "react";
import mobileInHandImage from "@/assets/images/mobile_hand_contract.png";
import axios from "axios";
import { MdDoDisturbAlt, MdLightbulbOutline } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { timeAgo } from "@/utils/timeFunction";
import Image from "next/image";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { RiShieldStarLine } from "react-icons/ri";
import Link from "next/link";
import { errorLog } from "@/utils/errorLog";
import { axiosIntance } from "@/utils/axiosIntance";
import { useAppSelector } from "@/store/hooks";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { IProject } from "@/app/(public-routes)/search-job/SearchJob";

const project = {
  id: 1,
  title: "Fitness Tracking App",
  description: "Developed a fitness tracking application with React...",
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

interface IProps {
  params: {
    id: number;
  };
}

const ViewProjectDetail: FC<IProps> = ({ params: { id } }) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [BidCount, setBidCount] = useState(0);
  const accessToken = localStorage.getItem("@accessToken");
  const [AllProposals, setAllProposals] = useState<any>(); // eslint-disable-line
  const [projectDetails, setProjectDetails] = useState<IProject | null>(null); // eslint-disable-line
  let clickable = false;

  useEffect(() => {
    handleFetchProjectDetails();
  }, []);

  const handleFetchProjectDetails = async () => {
    try {
      if (isLoggedIn) {
        const res = await axiosWithAuth.get(`/freelance/View/project-detail/${id}`);

        setProjectDetails(res.data.data);
      } else {
        const res = await axiosIntance.get(`/freelance/View/project-detail/${id}`);

        setProjectDetails(res.data.data);
      }
    } catch (error) {
      errorLog(error);
    }
  };

  if (project !== null && AllProposals !== "") {
    for (const key in AllProposals) {
      if (project.id === AllProposals[key].project_id) {
        clickable = true;
      }
    }
  }

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

  // const toggleSaveProject = async (project: any) => {
  //   try {
  //     let response;

  //     if (project.isSaved) {
  //       response = await axios.delete(
  //         https://www.api.alanced.com/freelance/saved-projects/${project.id},
  //         {
  //           headers: {
  //             Authorization: Bearer ${accessToken},
  //           },
  //         }
  //       );
  //     } else {
  //       response = await axios.post(
  //         https://www.api.alanced.com/freelance/saved-projects/${project.id},
  //         {},
  //         {
  //           headers: {
  //             Authorization: Bearer ${accessToken},
  //           },
  //         }
  //       );
  //     }

  //     const updatedJob = response.data;

  //     localStorage.setItem(isSaved_${project.id}, JSON.stringify(updatedJob.isSaved));

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

  //     const updatedJob = response.data;

  //     localStorage.setItem(isSaved_${project.id}, JSON.stringify(updatedJob.isSaved));

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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {clickable ? (
        <div className="mt-4 flex h-16 items-center rounded-md bg-blue-100 pl-5 pt-2 text-left">
          <MdLightbulbOutline />
          <span className="ml-4">You have already submitted a proposal for this project.</span>
        </div>
      ) : null}
      {project.is_hired && !clickable ? (
        <div className="mt-4 h-16 rounded-md bg-blue-100 pl-5 pt-2 text-left">
          <MdDoDisturbAlt />
          <span className="ml-4">This project is closed, you can&apos;t add a proposal now</span>
        </div>
      ) : null}
      <div className="my-6 flex flex-col lg:flex-row">
        <div className="w-full text-left lg:w-8/12">
          <h1 className="font-cardo text-xl font-normal">{project.title}</h1>
          <p className="font-cardo mt-4 text-base font-normal">{project.category}</p>
          <div className="mt-2 flex flex-col justify-between sm:flex-row">
            <div className="basis-full sm:basis-6/12">
              <p className="text-base font-normal text-[#797979]">
                Posted {timeAgo(project.project_creation_date)}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2 text-base font-normal opacity-[50%] sm:mt-0">
              <IoLocationOutline /> Worldwide
            </div>
          </div>
          <div className="mt-8 text-base font-normal text-[#797979]">
            Job Description: {project.description}
          </div>
          <div className="text-base font-normal text-[#797979]">
            Please Share Your Details On this Whatsapp No.+{project.project_owner_contact}
          </div>
          <div className="mt-5 text-base font-normal text-[#797979]">
            Are you a talented and imaginative Graphic Designer...
          </div>
          <div className="mt-10 flex flex-col lg:flex-row">
            <div className="mb-4 w-full lg:mb-0 lg:w-6/12">
              <div className="flex">
                <div className="mr-4">
                  <FaMoneyCheckDollar className="text-2xl" />
                </div>
                <div>
                  <h1 className="font-cardo text-lg font-normal">
                    $
                    {project.rate === "Hourly"
                      ? project.min_hourly_rate + "/hr - $" + project.max_hourly_rate + "/hr"
                      : project.fixed_budget}
                  </h1>
                  <p className="text-base font-normal opacity-[50%]">{project.rate}</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="flex">
                <div className="mr-4">
                  <RiShieldStarLine className="text-2xl" />
                </div>
                <div>
                  <h1 className="font-cardo text-lg font-normal">
                    {project.experience_level.replace(/_/g, " ")}
                  </h1>
                  <p className="text-base font-normal opacity-[50%]">Experience Level</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center lg:flex-row">
            <div className="w-full lg:w-8/12">
              <h1 className="font-cardo text-lg font-normal">Contract-to-hire opportunity</h1>
              <p className="mt-3 text-base font-normal opacity-[50%]">
                This lets talent know that this job could become full time.
              </p>
            </div>
            <div className="mt-6 w-full lg:mt-0 lg:w-4/12">
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
              Project Type: <span className="opacity-[50%]">{project.category}</span>
            </h1>
          </div>
          <div className="font-cardo mt-10 text-lg font-normal">Skills and Expertise</div>
          <div className="mt-2 text-sm font-normal">{project.category} Deliverables</div>
          {JSON.parse(project.skills_required.replace(/'/g, '"')).map(
            (skill: string, index: number) => (
              <span
                key={index}
                className="my-3 mr-4 inline-block rounded border border-gray-300 px-5 py-1 text-base text-[#797979]"
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
                className="my-3 mr-4 inline-block rounded border border-gray-300 px-5 py-1 text-base text-[#797979]"
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
              Proposals: <span className="opacity-[50%]">{BidCount ? BidCount : 0}</span>
            </h1>
          </div>
        </div>
        <div className="mt-10 w-full lg:mt-0 lg:w-4/12">
          <div className="ml-0 mt-6 lg:ml-[16%]">
            {accessToken ? (
              <Link href="/freelancer/send-proposal">
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
          <div className="font-cardo ml-0 mt-12 text-xl font-normal text-[#0A142F] lg:ml-10">
            About the client
          </div>
          <div className="ml-0 mt-3 text-sm font-normal text-[#0A142F] opacity-[50%] lg:ml-10">
            Payment method not verified
          </div>
          <div className="ml-0 mt-5 text-base font-normal text-[#0A142F] lg:ml-10">Owner Name</div>
          <div className="ml-0 mt-2 text-base font-normal text-[#0A142F] opacity-[50%] lg:ml-10">
            {project.project_owner_name}
          </div>
          <div className="ml-0 mt-5 text-base font-normal text-[#0A142F] lg:ml-10">Location</div>
          <div className="ml-0 mt-2 text-base font-normal text-[#0A142F] opacity-[50%] lg:ml-10">
            {project.project_owner_location ? project.project_owner_location : "NA"}
          </div>
          <div className="ml-0 mt-5 text-base font-normal text-[#0A142F] lg:ml-10">History</div>
          <div className="ml-0 mt-2 text-base font-normal text-[#0A142F] opacity-[50%] lg:ml-10">
            Member since {project.project_owner_date_of_creation}
          </div>
          <div className="font-cardo ml-0 mt-16 text-xl font-normal text-[#0A142F] lg:ml-10">
            Job link
          </div>
          <div className="ml-0 mt-5 inline-block rounded bg-black p-0.5 opacity-[30%] lg:ml-10">
            <button className="bg-white px-1 py-1">
              <p className="cursor-not-allowed bg-[#E4EBE4] px-4 py-[10px] text-sm font-normal text-black opacity-[90%]">
                https://www.alanced.com/find-work
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProjectDetail;
