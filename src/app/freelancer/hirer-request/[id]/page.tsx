"use client";
import { FC, useState } from "react";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { formatDate, formatDateInput, getCurrentTime, timeAgo } from "@/utils/timeFunction";

interface IProps {
  params: {
    id: string;
  };
}

const hirerRequest = {
  hire_id: 35,
  project_id: 38,
  freelancer_id: 4,
  hired_by: "sachin sharma ji",
  hired_by_id: 5,
  hired_freelancer_name: "sachin sharma",
  project_title: "App",
  project_category: "Data Entry",
  project_description: "App",
  project_exp_level: "Entry_Level",
  project_skills: "['React Native', 'React', 'JavaScript']",
  project_deadline: "2024-03-12",
  hiring_budget: 28,
  hiring_budget_type: "Fixed",
  message: "Ok",
  freelancer_accepted: false,
  freelancer_rejected: false,
  hirer_location: "Chennai",
  hirer_creation_date: "2023-12-30",
  Received_time: "2024-10-03T16:53:51.164705",
  is_hired: false,
};

const HirerRequestDetails: FC<IProps> = ({ params: { id: hire_id } }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const descriptionToShow = showFullDescription
    ? hirerRequest && hirerRequest.project_description
      ? hirerRequest.project_description
      : ""
    : hirerRequest.project_description.slice(0, 200);

  const handleAcceptProject = async () => {
    try {
      const response = await axiosWithAuth.put(`/freelance/projects/accept/${hire_id}`);
      if (response.data.status === 200) {
        toast.success("Hiring Request Accepted Successfully");
        // navigate("/all-invitations");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const handleRejectProject = async () => {
    try {
      const response = await axiosWithAuth.put(`/freelance/projects/reject/${hire_id}`);
      if (response.data.status === 200) {
        toast.success("You have Rejected the Hiring Request");
        // navigate("/all-invitations");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <div className="container sm:px-5 md:px-10 lg:px-20">
        <h1 className="font-inter mt-5 text-left text-2xl">Hiring Details</h1>
        <div className="my-8 rounded-lg border border-[#E7E8F2] px-8 py-8">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-left text-2xl font-semibold">Job Details</h1>
            <div className="mt-4 text-right">
              <button
                className="mr-4 inline-block cursor-pointer rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-8 py-[10px] text-sm font-semibold text-white"
                onClick={handleAcceptProject}
              >
                Accept
              </button>
              <div className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                <button className="bg-white px-8 py-1">
                  <button
                    className="from-primary to-danger cursor-pointer bg-gradient-to-r bg-clip-text px-[6px] py-[4px] text-sm font-semibold text-transparent"
                    onClick={handleRejectProject}
                  >
                    Reject
                  </button>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-row">
            <div className="basis-8/12">
              <h1 className="font-inter text-left text-xl font-medium">
                {hirerRequest && hirerRequest.project_title ? hirerRequest.project_title : ""}
              </h1>
              <div className="flex flex-row">
                <div className="mt-5 basis-4/12">
                  <div className="w-[90%] rounded-xl bg-[#b4d3c3] bg-opacity-[60%] py-[3px] text-sm font-semibold text-blue-800 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#dffdee] dark:hover:bg-[#dffdee]">
                    {hirerRequest && hirerRequest.project_category
                      ? hirerRequest.project_category
                      : ""}
                  </div>
                </div>
                <div className="ml-2 mt-5 basis-4/12">
                  <p className="font-inter text-left text-sm font-medium opacity-[50%]">
                    Received{" "}
                    {timeAgo(
                      hirerRequest && hirerRequest.Received_time ? hirerRequest.Received_time : ""
                    )}
                  </p>
                </div>
              </div>
              <p className="font-inter mt-3 text-left text-[15px] font-medium opacity-[70%]">
                {descriptionToShow}
              </p>
              {hirerRequest && hirerRequest.project_description
                ? hirerRequest.project_description.length > 200 && (
                    <button
                      className="mt-3 cursor-pointer text-left text-base font-semibold text-blue-600"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "less" : "more"}
                    </button>
                  )
                : ""}
            </div>
            <div className="basis-1/12"></div>
            <div className="mt-4 basis-3/12 border-l border-[#E7E8F2]">
              <div className="ml-4 flex flex-row">
                <div className="basis-3/12">
                  <i
                    className="fa fa-user-secret"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="basis-6/12">
                  <p className="text-left text-[14px] font-normal">
                    {hirerRequest && hirerRequest.project_exp_level
                      ? hirerRequest.project_exp_level.replace(/_/g, " ")
                      : ""}
                  </p>
                  <p className="text-left text-[12px] font-normal opacity-50">Experience level</p>
                </div>
              </div>
              <div className="ml-4 mt-4 flex flex-row">
                <div className="basis-3/12">
                  <i className="bi bi-tag-fill"></i>
                </div>
                <div className="basis-9/12">
                  <p className="text-left text-[14px] font-normal">
                    {hirerRequest && hirerRequest.hiring_budget_type
                      ? hirerRequest.hiring_budget_type
                      : " "}
                  </p>
                  <p className="text-left text-[12px] font-normal opacity-50">Budget</p>
                </div>
              </div>
              <div className="ml-4 mt-4 flex flex-row">
                <div className="basis-3/12">
                  <i className="bi bi-calendar2-check-fill"></i>
                </div>
                <div className="basis-8/12">
                  <p className="text-left text-[14px] font-normal">
                    {formatDate(
                      hirerRequest && hirerRequest.project_deadline
                        ? hirerRequest.project_deadline
                        : " "
                    )}
                  </p>
                  <p className="text-left text-[12px] font-normal opacity-50">Project Deadline</p>
                </div>
              </div>
            </div>
          </div>
          <h1 className="font-inter mt-5 text-left text-base font-medium">Skills & Experties</h1>
          <div className="mt-3 text-left">
            {JSON.parse(hirerRequest.project_skills.replace(/'/g, '"')).map((skill: string) => (
              <div
                key={skill}
                className="mr-3 mt-4 inline-block rounded-full bg-[#b4d3c3] bg-opacity-[60%] px-5 py-[3px] text-sm font-semibold text-blue-800 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee]"
              >
                <p className="text-center">{skill}</p>
              </div>
            ))}
          </div>
          <hr className="mt-8" />
          <div className="flex flex-row">
            <div className="basis-6/12">
              <h1 className="font-cardo mt-4 text-left text-2xl font-semibold">Hiring Details</h1>
            </div>
          </div>
          <div className="mt-6 flex flex-row">
            <div className="basis-8/12">
              <p className="font-inter mt-5 text-left text-[15px] font-medium">
                Client&apos;s Hiring Budget
              </p>
              <p className="font-inter text-left text-[15px] font-medium opacity-70">
                ${hirerRequest && hirerRequest.hiring_budget ? hirerRequest.hiring_budget : ""}
              </p>
              <p className="font-inter mt-5 text-left text-[15px] font-medium">
                Client&apos;s Budget Type
              </p>
              <p className="font-inter text-left text-[15px] font-medium opacity-70">
                {hirerRequest && hirerRequest.hiring_budget_type
                  ? hirerRequest.hiring_budget_type
                  : ""}
              </p>
              <p className="font-inter mt-5 text-left text-[15px] font-medium">
                Client&apos;s Message
              </p>
              <p className="font-inter text-left text-[15px] font-medium opacity-70">
                {hirerRequest && hirerRequest.message ? hirerRequest.message : ""}
              </p>
            </div>
            <div className="basis-1/12"></div>
            <div className="basis-3/12 border-l border-[#E7E8F2]">
              <div className="ml-7">
                <p className="font-cardo text-left text-xl font-normal">About the client</p>
              </div>
              <div className="ml-7 mt-5">
                <p className="font-inter text-left text-[17px] font-normal opacity-50">
                  {hirerRequest && hirerRequest.hired_by ? hirerRequest.hired_by : ""}
                </p>
              </div>
              <div className="ml-7 mt-5">
                <p className="font-inter text-left text-[17px] font-normal">Location</p>
                <p className="font-inter mt-2 text-left text-[15px] font-normal opacity-75">
                  {hirerRequest && hirerRequest.hirer_location ? hirerRequest.hirer_location : ""}
                </p>
                <p className="font-inter text-left text-[15px] font-normal opacity-75">
                  {getCurrentTime()}
                </p>
              </div>
              <div className="ml-7 mt-5">
                <p className="font-inter text-left text-[17px] font-normal">History</p>
                <p className="font-inter mt-2 text-left text-[12px] font-normal opacity-75">
                  Member since{" "}
                  {formatDateInput(
                    hirerRequest && hirerRequest.hirer_creation_date
                      ? hirerRequest.hirer_creation_date
                      : ""
                  )}
                </p>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default HirerRequestDetails;