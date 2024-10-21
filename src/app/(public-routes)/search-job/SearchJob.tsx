import { FC } from "react";
import axios from "axios";
import fileIcon from "@/assets/icons/file.png";
import Image from "next/image";
import Link from "next/link";
import { errorLog } from "@/utils/errorLog";
import { timeAgo } from "@/utils/timeFunction";
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import Pagination from "@/components/Pagination";

export interface IProject {
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
    category?: string | string[];
    explevel?: string | string[];
    city?: string | string[];
    rate?: string | string[];
    page?: string;
  };
}

const SearchJob: FC<IProps> = async ({ searchParams }) => {
  const { q: queryText, category, page, skills, explevel, city, rate } = searchParams;

  const query = [];
  let data: IProject[] = [];
  let totalPages = 1;
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

  if (category) {
    if (typeof category === "string") {
      query.push(`category=${category}`);
    } else {
      query.push(`category=${category.join("&category=")}`);
    }
  }

  if (explevel) {
    if (typeof explevel === "string") {
      query.push(`experience_level=${explevel}`);
    } else {
      query.push(`experience_level=${explevel.join("&experience_level=")}`);
    }
  }
  if (city) {
    if (typeof city === "string") {
      query.push(`Address=${city}`);
    } else {
      query.push(`Address=${city.join("&Address=")}`);
    }
  }
  if (rate) {
    if (typeof rate === "string") {
      query.push(`rate=${rate}`);
    } else {
      query.push(`rate=${rate.join("&rate=")}`);
    }
  }

  const queryString = query.join("&");

  try {
    const res = await axios.get(
      `https://www.api.alanced.com/freelance/view-all/Project/?${queryString}`
    );
    data = res.data.results;

    totalPages = Math.ceil(res.data.count / 8);
  } catch (error) {
    errorLog(error);
  }
  /** -------------------------- */

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
    <div className="w-full">
      {data.length > 0 ? (
        <div className="mb-5 mt-10 flex w-full flex-col gap-y-3 md:ml-2">
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
                      <div className="text-lg">{highlightText(project.title, queryText ?? "")}</div>
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
                          <div className="flex flex-row items-center gap-3">
                            <IoLocationOutline className="text-md" />

                            <div className="text-[#797979]">
                              {highlightText(
                                project.project_owner_location
                                  ? project.project_owner_location
                                  : "NA",
                                queryText ?? ""
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mr-2 basis-4/12 border-2 border-b-0 border-l-0 border-t-0 border-r-[#797979]">
                          <div className="flex flex-row items-center gap-3">
                            <FaRegCalendarAlt className="text-md" />

                            <div className="basis-10/12 text-[#797979]">
                              {project.project_creation_date
                                ? timeAgo(project.project_creation_date)
                                : "Date not available"}
                            </div>
                          </div>
                        </div>
                        <div className="basis-4/12">
                          <div className="flex flex-row items-center gap-3">
                            <FiFileText className="text-md" />

                            <div className="basis-10/12 text-[#797979]">
                              {/* {bidsCount[project.id] ? bidsCount[project.id] : 0} Received */}
                              N/A
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="py-3 text-[14px] text-[#0A142F] text-opacity-50">
                        Job Description: {highlightText(displayWords.join(" "), queryText ?? "")}
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
                              {highlightText(skill, queryText ?? "")}
                            </span>
                          )
                        )}
                    </div>
                    <div className="flex h-full flex-row items-center justify-center gap-5 md:flex-col md:items-end md:gap-2">
                      <div className="text-right text-xl font-extrabold">
                        $
                        {project.rate === "Hourly"
                          ? project.min_hourly_rate +
                            "/hr" +
                            " - " +
                            "$" +
                            project.max_hourly_rate +
                            "/hr"
                          : project.fixed_budget}
                      </div>
                      <p className="mt-1 text-right text-sm text-[#797979]">{project.rate} Rate</p>
                      <div className="">
                        <Link href={`/view-project/details/${project.id}`}>
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
        <div className="mt-20">
          <Image
            src={fileIcon}
            alt=""
            className="mx-auto w-[18%]"
          />
          <p className="mt-5 bg-white text-center text-xl opacity-70">
            There are no results that match your search.
          </p>
          <p className="mt-3 bg-white text-center text-sm opacity-60">
            Please try adjusting your search keywords or filters.
          </p>
        </div>
      )}

      {/* ---> Pagination */}
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default SearchJob;
