import { FC } from "react";
import axios from "axios";
import fileIcon from "@/assets/icons/file.png";
import Image from "next/image";
import Link from "next/link";

import { errorLog } from "@/utils/errorLog";

interface IProject {
  id: number;
  title: string;
  description: string;
  rate: "Hourly" | "Fixed";
  fixed_budget: number | null;
  min_hourly_rate?: number;
  max_hourly_rate?: number;
  experience_level?: string;
  category?: string;
  skills_required?: string;
  deadline?: string;
  is_hired?: boolean;
  project_creation_date?: string;
  project_owner?: number;
  project_owner_name?: string;
  project_owner_contact?: string;
  project_owner_location?: string;
  project_owner_date_of_creation?: string;
}

// eslint-disable-next-line
interface IBid {
  id: number;
  bid_amount: number;
  description: string;
  bid_type: string;
  bid_time: string;
  freelancer_id: number;
  project_id: number;
  project: IProject;
}

// eslint-disable-next-line
interface Bids {
  [key: string]: number;
}

interface IProps {
  searchParams: {
    q?: string;
    skills?: string | string[];
    language?: string | string[];
    explevel?: string | string[];
    address?: string | string[];
    page?: string;
  };
}

const SearchJob: FC<IProps> = async ({ searchParams }) => {
  const { q: queryText, language, page, skills, explevel, address } = searchParams;

  const query = [];
  let data: IProject[] = [];
  let totalPages = 1; // eslint-disable-line

  if (queryText) {
    query.push(`search_query=${queryText}`);
  }

  if (page) {
    query.push(`page=${page}`);
  }

  if (skills) {
    if (typeof skills === "string") {
      query.push(`skills=${skills}`);
    } else {
      query.push(`skills=${skills.join("&skills=")}`);
    }
  }

  if (language) {
    if (typeof language === "string") {
      query.push(`Language=${language}`);
    } else {
      query.push(`Language=${language.join("&Language=")}`);
    }
  }
  if (explevel) {
    if (typeof explevel === "string") {
      query.push(`experience_level=${explevel}`);
    } else {
      query.push(`experience_level=${explevel.join("&experience_level=")}`);
    }
  }
  if (address) {
    if (typeof address === "string") {
      query.push(`Address=${address}`);
    } else {
      query.push(`Address=${address.join("&Address=")}`);
    }
  }

  const queryString = query.join("&");

  try {
    const res = await axios.get(
      `https://www.api.alanced.com/freelance/view-all/Project/?${queryString}`
    );
    data = res.data.results;

    totalPages = Math.ceil(res.data.count / 8); // eslint-disable-line
  } catch (error) {
    errorLog(error);
  }
  /** -------------------------- */

  function timeAgo(postedTimeStr: string) {
    const postedTime = new Date(postedTimeStr);
    const currentTime = new Date();

    const deltaInMilliseconds = currentTime.getTime() - postedTime.getTime();
    const deltaInSeconds = Math.floor(deltaInMilliseconds / 1000);
    const deltaInMinutes = Math.floor(deltaInSeconds / 60);
    const deltaInHours = Math.floor(deltaInMinutes / 60);
    const deltaInDays = Math.floor(deltaInHours / 24);

    if (deltaInMinutes < 1) {
      return "just now";
    } else if (deltaInMinutes < 60) {
      return `${deltaInMinutes} minute ago`;
    } else if (deltaInHours < 24) {
      return `${deltaInHours} hour ago`;
    } else if (deltaInDays < 30) {
      return `${deltaInDays} day ago`;
    } else if (deltaInDays < 365) {
      const months = Math.floor(deltaInDays / 30);
      return `${months} month ago`;
    } else {
      const years = Math.floor(deltaInDays / 365);
      return `${years} year ago`;
    }
  }

  // const handleToggleDescription = (index: number) => {
  //   const updatedState = [...expandedProjects];
  //   updatedState[index] = !updatedState[index];
  //   setExpandedProjects(updatedState);
  // };
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
  //   event.stopPropagation();

  //   handleToggleDescription(index);
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!accessToken) return;
  //     try {
  //       // Fetch doc API
  //       const response1 = await axios.get(
  //         "https://www.api.alanced.com/freelance/view/freelancer-all-self/bid",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       setAllProposals(response1.data.data);
  //     } catch (error) {
  //       errorLog(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  //(=//=//=//=//=//=//=//=//=)filter API integrtion(//=//=//=//=//=//=//=//=//=)

  // useEffect(() => {
  //   const fetchBidsForAllProjects = async () => {
  //     const bids: Bids = {};

  //     for (const project of viewProject || []) {
  //       try {
  //         const response = await axios.get(
  //           `https://www.api.alanced.com/freelance/View/bids/${project.id}`
  //         );
  //         if (response.status === 200) {
  //           bids[project.id] = response.data.count;
  //         } else {
  //           // console.log(response.data.message || "Error fetching bids");
  //           bids[project.id] = 0;
  //         }
  //       } catch (err: unknown) {
  //         if (err instanceof Error) {
  //           errorLog(err.message);
  //         } else {
  //           errorLog(" An unknown error occured");
  //         }
  //         bids[project.id] = 0;
  //       }
  //     }

  //     setBidsCount(bids);
  //   };

  //   fetchBidsForAllProjects();
  // }, [viewProject]);

  function highlightText(text: string, query: string) {
    if (!query) {
      return text;
    }

    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span
            key={index}
            style={{ backgroundColor: "#73cbfa" }}
          >
            {part}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
  }

  return (
    <>
      {data !== null ? (
        data.length > 0 ? (
          <div className="mb-5 mt-10 flex w-full flex-col gap-y-3 md:ml-2 lg:w-[80%]">
            {data && (
              <>
                {data.map((project: IProject, index: number) => {
                  const words = project.description.split(" ");
                  // const displayWords =
                  //   expandedProjects[index] || words.length <= 30 ? words : words.slice(0, 30);
                  const displayWords = words.slice(0, 30);

                  return (
                    <div
                      key={index}
                      className="flex w-full flex-col justify-between rounded-md bg-gray-50 p-2 duration-300 hover:bg-gray-100 md:flex-row md:px-12"
                    >
                      <div className="basis-9/12 text-left">
                        <h1 className="text-lg">
                          {/* {highlightText(project.title, searchQuery)} */}
                          {project.title}
                        </h1>
                        {/* {AllProposals &&
                          AllProposals.map((all: IBid) => {
                            return (
                              <>
                                {project.id === all.project_id ? (
                                  <span
                                    key={all.project_id}
                                    className="flex w-fit items-center justify-center text-blue-600"
                                  >
                                    <TaskOutlinedIcon className="mr-1 text-blue-600" /> 
                                    Already Applied
                                  </span>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          })} */}
                        <div className="mt-3 flex flex-row">
                          <div className="mr-2 basis-4/12 border-2 border-b-0 border-l-0 border-t-0 border-r-[#797979]">
                            <div className="flex flex-row">
                              <div className="basis-2/12">
                                <i className="bi bi-geo-alt"></i>
                              </div>
                              <div className="basis-10/12 text-[#797979]">
                                {/* {highlightText(
                                      project.project_owner_location
                                        ? project.project_owner_location
                                        : "NA",
                                      searchQuery
                                    )} */}
                                {project.project_owner_location}
                              </div>
                            </div>
                          </div>
                          <div className="mr-2 basis-4/12 border-2 border-b-0 border-l-0 border-t-0 border-r-[#797979]">
                            <div className="flex flex-row">
                              <div className="basis-2/12">
                                <i
                                  className="fa fa-calendar"
                                  aria-hidden="true"
                                ></i>
                              </div>
                              <div className="basis-10/12 text-[#797979]">
                                {project.project_creation_date
                                  ? timeAgo(project.project_creation_date)
                                  : "Date not available"}
                              </div>
                            </div>
                          </div>
                          <div className="basis-4/12">
                            <div className="flex flex-row">
                              <div className="basis-2/12">
                                <i className="bi bi-file-text"></i>
                              </div>
                              {/* <div className="basis-10/12 text-[#797979]">
                                {bidsCount[project.id] ? bidsCount[project.id] : 0} Received
                              </div> */}
                            </div>
                          </div>
                        </div>

                        <p className="py-3 text-[14px] text-[#0A142F] text-opacity-50">
                          Job Description: {highlightText(displayWords.join(" "), "searchQuery")}
                          {/* {words.length > 30 && (
                            <button
                              className="cursor-pointer pl-2 text-[18px] font-semibold text-[#031136]"
                              onClick={(event) => handleClick(event, index)}
                            >
                              {expandedProjects[index] ? "Less" : "More"}
                            </button>
                          )} */}
                        </p>
                        {project.skills_required &&
                          JSON.parse(project.skills_required.replace(/'/g, '"')).map(
                            (skill: string, index: number) => (
                              <span
                                key={index}
                                className="my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-60"
                              >
                                {highlightText(skill, "searchQuery")}
                              </span>
                            )
                          )}
                      </div>
                      <div className="flex h-full flex-row items-center justify-center gap-5 md:flex-col md:items-end md:gap-2">
                        <h1 className="text-right text-xl font-extrabold">
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
                        <p className="mt-1 text-right text-sm text-[#797979]">
                          {project.rate} Rate
                        </p>
                        <div className="">
                          <Link
                            href={`/view-project/details`}
                            // state={{ project }}
                          >
                            <button className="h-12 w-36 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-sm font-bold text-white">
                              View Detail
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        ) : (
          <div className="mx-auto">
            <Image
              src={fileIcon}
              alt=""
              className="ml-[30%] mt-[20%] h-[10%]"
            />
            <p className="mt-5 text-xl opacity-70">There are no results that match your search.</p>
            <p className="mt-3 text-sm opacity-60">
              Please try adjusting your search keywords or filters.
            </p>
          </div>
        )
      ) : (
        <div className="mt-10 basis-9/12">
          {/* <Skeleton
                height={50}
                width={50}
                inline={true}
                style={{ float: "left" }}
              />
              <Skeleton
                height={110}
                width={700}
                style={{ float: "left", marginLeft: 20 }}
              />
              <Skeleton
                height={40}
                width={100}
                style={{ marginTop: 40 }}
              />
              <br />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                style={{ marginTop: 5, marginLeft: 70, float: "left" }}
              />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                count={2}
                style={{ marginTop: 5, marginLeft: 5, float: "left" }}
              />

              <Skeleton
                height={50}
                width={50}
                inline={true}
                style={{ float: "left", marginTop: 80, marginLeft: -382 }}
              />
              <Skeleton
                height={110}
                width={700}
                style={{ float: "left", marginLeft: 70, marginTop: 35 }}
              />
              <Skeleton
                height={40}
                width={100}
                style={{ marginTop: 125 }}
              />
              <br />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                style={{ marginTop: 5, marginLeft: 70, float: "left" }}
              />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                count={2}
                style={{ marginTop: 5, marginLeft: 5, float: "left" }}
              />

              <Skeleton
                height={50}
                width={50}
                inline={true}
                style={{ float: "left", marginTop: 80, marginLeft: -382 }}
              />
              <Skeleton
                height={110}
                width={700}
                style={{ float: "left", marginLeft: 70, marginTop: 35 }}
              />
              <Skeleton
                height={40}
                width={100}
                style={{ marginTop: 125 }}
              />
              <br />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                style={{ marginTop: 5, marginLeft: 70, float: "left" }}
              />
              <Skeleton
                height={40}
                width={100}
                inline={true}
                count={2}
                style={{ marginTop: 5, marginLeft: 5, float: "left" }}
              /> */}
        </div>
      )}
    </>
  );
};

export default SearchJob;
