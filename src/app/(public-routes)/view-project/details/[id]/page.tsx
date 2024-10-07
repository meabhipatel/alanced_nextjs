"use client";
import React, { useState, useEffect, FC } from "react";
import mobileInHandImage from "@/assets/images/mobile_hand_contract.png";
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
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

interface IProps {
  params: {
    id: number;
  };
}

interface IProjectDetils extends IProject {
  is_applied: boolean;
  total_bid_count: number;
}

const ViewProjectDetail: FC<IProps> = ({ params: { id } }) => {
  const router = useRouter();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const [projectDetails, setProjectDetails] = useState<IProjectDetils | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    handleFetchProjectDetails();
  }, []);

  const handleFetchProjectDetails = async () => {
    setIsLoading(true);
    try {
      if (isLoggedIn) {
        const res = await axiosWithAuth.get(`/freelance/View/project-detail/${id}`);
        setProjectDetails(res.data.data[0]);
      } else {
        const res = await axiosIntance.get(`/freelance/View/project-detail/${id}`);
        setProjectDetails(res.data.data[0]);
      }
    } catch (error) {
      errorLog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToSendProposal = () => {
    router.push(`/freelancer/send-proposal/${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader
          color="primary"
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="container sm:px-5 md:px-10 lg:px-20">
      {projectDetails?.is_applied ? (
        <div className="mt-4 flex h-16 gap-3 rounded-md bg-blue-100 pl-5 pt-3 text-left">
          <div className="pt-1">
            <MdLightbulbOutline />
          </div>
          <div className="flex flex-col">
            <span className="">You have already submitted a proposal for this project. </span>
            <span className="text-sm font-semibold text-blue-700">
              <Link href={`/freelancer/view-proposal/${projectDetails.id}`}>View Proposal</Link>
            </span>
          </div>
        </div>
      ) : null}
      {projectDetails?.is_hired && !projectDetails?.is_applied ? (
        <div className="mt-4 flex h-16 items-center rounded-md bg-blue-100 pl-5 pt-2 text-left">
          <MdDoDisturbAlt />
          <span className="ml-4">This project is closed, you can&apos;t add a proposal now</span>
        </div>
      ) : null}
      <div className="my-6 flex flex-col pt-6 lg:flex-row">
        <div className="w-full text-left lg:w-8/12">
          <h1 className="font-cardo text-xl font-normal">{projectDetails?.title}</h1>
          <p className="font-cardo mt-4 text-base font-normal">{projectDetails?.category}</p>
          <div className="mt-2 flex flex-col justify-between sm:flex-row">
            <div className="basis-full sm:basis-6/12">
              <p className="text-base font-normal text-[#797979]">
                Posted {timeAgo(projectDetails?.project_creation_date ?? " ")}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2 text-base font-normal opacity-[50%] sm:mt-0">
              <IoLocationOutline /> Worldwide
            </div>
          </div>
          <div className="mt-8 text-base font-normal text-[#797979]">
            Job Description: {projectDetails?.description}
          </div>
          <div className="text-base font-normal text-[#797979]">
            Please Share Your Details On this Whatsapp No.+{projectDetails?.project_owner_contact}
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
                    {projectDetails?.rate === "Hourly"
                      ? projectDetails?.min_hourly_rate +
                        "/hr - $" +
                        projectDetails?.max_hourly_rate +
                        "/hr"
                      : projectDetails?.fixed_budget}
                  </h1>
                  <p className="text-base font-normal opacity-[50%]">{projectDetails?.rate}</p>
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
                    {projectDetails?.experience_level?.replace(/_/g, " ")}
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
              Project Type: <span className="opacity-[50%]">{projectDetails?.category}</span>
            </h1>
          </div>
          <div className="font-cardo mt-10 text-lg font-normal">Skills and Expertise</div>
          <div className="mt-2 text-sm font-normal">{projectDetails?.category} Deliverables</div>
          {JSON.parse(projectDetails?.skills_required?.replace(/'/g, '"') ?? "[]").map(
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
              Proposals: <span className="opacity-[50%]">{projectDetails?.total_bid_count}</span>
            </h1>
          </div>
        </div>
        <div className="mt-10 w-full lg:mt-0 lg:w-4/12">
          <div className="ml-0 mt-6 lg:ml-[16%]">
            {isLoggedIn ? (
              <button
                disabled={projectDetails?.is_applied || projectDetails?.is_hired}
                onClick={handleNavigateToSendProposal}
              >
                <span
                  className={
                    projectDetails?.is_applied || projectDetails?.is_hired
                      ? "rounded border border-none bg-slate-200 px-12 py-[15px] text-base font-normal text-white lg:mt-0"
                      : "rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-12 py-[15px] text-base font-normal text-white lg:mt-0"
                  }
                >
                  Apply Now
                </span>
              </button>
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
            {projectDetails?.project_owner_name}
          </div>
          <div className="ml-0 mt-5 text-base font-normal text-[#0A142F] lg:ml-10">Location</div>
          <div className="ml-0 mt-2 text-base font-normal text-[#0A142F] opacity-[50%] lg:ml-10">
            {projectDetails?.project_owner_location ? projectDetails?.project_owner_location : "NA"}
          </div>
          <div className="ml-0 mt-5 text-base font-normal text-[#0A142F] lg:ml-10">History</div>
          <div className="ml-0 mt-2 text-base font-normal text-[#0A142F] opacity-[50%] lg:ml-10">
            Member since {projectDetails?.project_owner_date_of_creation}
          </div>
          <div className="font-cardo ml-0 mt-16 text-xl font-normal text-[#0A142F] lg:ml-10">
            Job link
          </div>
          <div className="ml-0 mt-5 inline-block rounded bg-black p-0.5 opacity-[30%] lg:ml-10">
            <button className="bg-white px-1 py-1">
              <p className="cursor-not-allowed bg-[#E4EBE4] px-4 py-[10px] text-sm font-normal text-black opacity-[90%]">
                https://www.alanced.com/search-job
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProjectDetail;
