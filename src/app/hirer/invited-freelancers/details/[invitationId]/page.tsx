"use client";
import InvitationStatus from "@/components/attoms/InvitationStatus";
import Loader from "@/components/Loader";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface IProps {
  params: {
    invitationId: string;
  };
}

const InviationDetails: FC<IProps> = ({ params: { invitationId } }) => {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.hirer.freelnacerInvitations);
  const invitation = data.results.find((item) => item.hire_id === Number(invitationId));

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const descriptionToShow = showFullDescription
    ? invitation?.freelancer_description
    : invitation?.freelancer_description.slice(0, 400);

  if (data.results.length === 0) {
    router.replace("/hirer/invited-freelancers");
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <Loader
          size="lg"
          color="primary"
        />
      </div>
    );
  }

  return (
    <>
      <div className="container sm:px-5 md:px-10 lg:px-20">
        <div className="my-8 rounded-lg border border-[#E7E8F2] px-8 py-8">
          <h1 className="text-left text-3xl font-semibold">Invite Details</h1>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="mt-5 text-left text-xl font-medium">
                Hiring Budget :{" "}
                <span className="opacity-70">
                  ${invitation?.hiring_budget ? invitation.hiring_budget : 0}
                </span>
              </p>
            </div>
            <div>
              <p className="mt-5 text-left text-xl font-medium">
                Budget Type : <span className="opacity-70">{invitation?.hiring_budget_type}</span>
              </p>
            </div>
            <div>
              <p className="mt-5 text-left text-xl font-medium">
                Invited Freelancer :{" "}
                <span className="opacity-70">{invitation?.freelancer_name}</span>
              </p>
            </div>
          </div>
          <div>
            <div>
              <p className="mt-4 text-left text-xl font-medium">
                Message : <span className="opacity-70">{invitation?.message}</span>
              </p>
            </div>
            <p className="mt-4 text-left text-xl font-medium">
              Invite Status :{" "}
              <span className="inline-block opacity-70">
                {invitation?.freelancer_accepted ? (
                  <InvitationStatus status="accepted">Accepted</InvitationStatus>
                ) : invitation?.freelancer_rejected ? (
                  <InvitationStatus status="rejected">Rejected</InvitationStatus>
                ) : (
                  <InvitationStatus status="pending">Pending</InvitationStatus>
                )}
              </span>
            </p>
          </div>
          <hr className="my-5" />
          <h1 className="text-left text-2xl font-semibold">Freelancer Details</h1>
          <div className="mt-6 flex flex-row">
            <div className="basis-8/12">
              <h1 className="text-left text-xl font-medium">{invitation?.freelancer_name}</h1>
              <div className="flex flex-row text-left">
                <div className="mt-2 basis-4/12">
                  <div className="text-sm font-semibold text-blue-800">
                    {invitation?.freelancer_category}
                  </div>
                </div>
              </div>
              <p className="font-inter mt-3 text-left text-[15px] font-medium opacity-[70%]">
                {descriptionToShow}
              </p>
              {invitation?.freelancer_description
                ? invitation.freelancer_description.length > 400 && (
                    <button
                      className="mt-3 cursor-pointer text-left text-base font-semibold text-blue-600"
                      onClick={toggleDescription}
                    >
                      {showFullDescription ? "less" : "more"}
                    </button>
                  )
                : ""}
              <h1 className="mt-5 text-left text-xl font-medium">Skills</h1>
              <div className="text-left">
                {invitation?.freelancer_skills &&
                  (() => {
                    try {
                      const skillsArray = JSON.parse(
                        invitation?.freelancer_skills?.replace(/'/g, '"')
                      ) as string[];
                      return skillsArray.map((skill, index) => (
                        <div
                          key={index}
                          className="my-1 mr-3 inline-block w-28 rounded-full bg-[#b4d3c3] bg-opacity-[60%] px-3 py-[3px] text-sm font-semibold text-blue-800 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee]"
                        >
                          <p className="text-center">{skill}</p>
                        </div>
                      ));
                    } catch (error) {
                      console.log("Error parsing JSON:", error); // eslint-disable-line
                      return null;
                    }
                  })()}
              </div>
            </div>
            <div className="basis-1/12"></div>
            <div className="basis-3/12 border-l border-[#E7E8F2]">
              <div className="ml-4 flex flex-row">
                <div className="basis-3/12">
                  <i
                    className="fa fa-user-secret"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="basis-6/12">
                  <p className="text-left text-[14px] font-normal">
                    {invitation?.freelancer_experience_level
                      ? invitation?.freelancer_experience_level.replace(/_/g, " ")
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
                    ${invitation?.freelancer_hourly_rate ? invitation?.freelancer_hourly_rate : 0}
                  </p>
                  <p className="text-left text-[12px] font-normal opacity-50">Hourly Rate</p>
                </div>
              </div>
              <div className="ml-4 mt-4 flex flex-row">
                <div className="basis-3/12">
                  <i className="bi bi-translate"></i>
                </div>
                <div className="basis-8/12">
                  <p className="text-left text-[12px] font-normal opacity-50">Languages Known</p>
                  {invitation?.freelancer_language &&
                    (() => {
                      try {
                        const languageArray = JSON.parse(
                          invitation.freelancer_language.replace(/'/g, '"')
                        ) as string[];
                        return languageArray.map((language, index) => (
                          <div
                            key={index}
                            className="mt-2 text-left text-sm font-semibold text-blue-800"
                          >
                            <p>{language}</p>
                          </div>
                        ));
                      } catch (error) {
                        console.error("Error parsing JSON:", error); // eslint-disable-line
                        return null;
                      }
                    })()}
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <h1 className="text-left text-2xl font-semibold">Project Details</h1>
          <h1 className="mt-5 text-left text-xl font-medium">{invitation?.project_title}</h1>
          <div className="flex flex-row text-left">
            <div className="mt-2 basis-4/12">
              <div className="text-sm font-semibold text-blue-800">
                {invitation?.project_category}
              </div>
            </div>
          </div>
          <p className="font-inter mt-3 text-left text-[15px] font-medium opacity-[70%]">
            {invitation?.project_description}
          </p>
        </div>
      </div>
    </>
  );
};

export default InviationDetails;
