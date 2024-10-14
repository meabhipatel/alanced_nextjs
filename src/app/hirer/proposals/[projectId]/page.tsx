"use client";
import { FC, MouseEvent, useEffect , useState } from "react";

import fileIcon from "@/assets/icons/file.png";
import Link from "next/link";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { IBidDetails } from "@/interfaces/bidDetails";
import { axiosIntance } from "@/utils/axiosIntance";
import { IInvitationDetails } from "@/interfaces/invitationDetails";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { errorLog } from "@/utils/errorLog";

interface IProps {
  params: {
    projectId: string;
  };
}

const Proposals: FC<IProps> = ({ params: { projectId } }) => {
  const [allBids, setAllBids] = useState<IBidDetails[]>([]);
  const [viewinvites, setViewinvites] = useState<IInvitationDetails[]>([]);
  const [sortCriterion, setSortCriterion] = useState("bestMatch");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHiringOpen, setIsHiringOpen] = useState([]); // eslint-disable-line
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = true;

  const sortBids = (bids: IBidDetails[]) => {
    if (!bids) return [];

    const sortedBids = [...bids];
    switch (sortCriterion) {
      case "newest":
        sortedBids.sort((a, b) => new Date(b.bid_time).getTime() - new Date(a.bid_time).getTime());
        break;
      case "oldest":
        sortedBids.sort((a, b) => new Date(a.bid_time).getTime() - new Date(b.bid_time).getTime());
        break;
      case "highestRate":
        sortedBids.sort((a, b) => b.bid_amount - a.bid_amount);
        break;
      case "lowestRate":
        sortedBids.sort((a, b) => a.bid_amount - b.bid_amount);
        break;
      default:
        break;
    }
    return sortedBids;
  };

  const openHiring = (freelancerId: string) => {
    setIsHiringOpen((prev) => ({ ...prev, [freelancerId]: true }));
  };

  // eslint-disable-next-line
  const closeHiringPopup = (freelancerId: string) => {
    setIsHiringOpen((prev) => ({ ...prev, [freelancerId]: false }));
  };

  /** ---> Fetching bids data on page Load. */
  useEffect(() => {
    handleFetchBids();
  }, [searchQuery, currentPage]);

  useEffect(() => {
    handleFetchFreelancerInvitations();
  }, []);

  const handleFetchBids = async () => {
    const queryParameters = [];
    if (searchQuery) {
      queryParameters.push(`search_query=${searchQuery}`);
    }
    queryParameters.push(`page=${currentPage}`);
    const queryString = queryParameters.join("&");

    setIsLoading(true);
    try {
      const res = await axiosIntance.get(`/freelance/View/bids/${projectId}?${queryString}`);
      setAllBids(res.data?.results ?? []);
      setTotalPages(Math.ceil(res.data?.count / 8));
    } catch (error) {
      errorLog(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchFreelancerInvitations = async () => {
    try {
      const res = await axiosWithAuth.get(`/freelance/View-all/invited-freelancers`);
      setViewinvites(res.data.results);
    } catch (error) {
      errorLog(error);
    }
  };

  const prev = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const next = () => {
    window.scrollTo(0, 0);
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  function highlightText(text: string, query: string) {
    if (!query || (typeof text !== "string" && typeof text !== "number")) {
      return text;
    }

    const textString = String(text);
    const regex = new RegExp(`(${query})`, "gi");

    return textString.split(regex).map((part, index) => {
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

  const sortedBids = sortBids(allBids);

  const handleOpenHiringModal = (e: MouseEvent, freelancerId: string, isInvited: boolean) => {
    if (isInvited) return;
    e.stopPropagation();
    e.preventDefault();
    openHiring(freelancerId);
  };

  const [expandedProjects, setExpandedProjects] = useState<boolean[]>([]);

  const handleToggleDescription = (e: MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    const updatedState = [...expandedProjects];
    updatedState[index] = !updatedState[index];
    setExpandedProjects(updatedState);
  };

  return (
    <>
      <div className="mx-[9%] mt-2">
        <h1 className="font-cardo p-3 text-left text-[26px] text-[#031136]">
          Proposals for <span className="text-blue-500">{allBids[0]?.project?.title}</span>
        </h1>
        <div className="my-2 border border-gray-200 border-opacity-30 bg-[#FFFFFF] text-left">
          <div className="p-4 px-6">
            <p className={`py-2 pr-10 font-semibold text-gray-900/70`}>All Proposals</p>
          </div>
          {isOpen ? (
            <>
              {allBids.length > 0 && (
                <div className="flex items-center justify-between">
                  <section className="m-5 flex w-[49%] items-center rounded-lg border bg-white p-2">
                    <div className="mr-1 flex w-full items-center space-x-1">
                      <IoIosSearch />
                      <input
                        className="h-7 w-28 text-xs outline-none lg:w-40 lg:text-sm xl:w-[30rem]"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="h-7 w-7 rounded bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-2 text-xs font-semibold text-white lg:text-sm">
                      <IoIosSearch />
                    </button>
                  </section>
                  <select
                    id="countries"
                    onChange={(e) => {
                      setSortCriterion(e.target.value);
                    }}
                    className="mr-12 block w-[22%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-normal text-[#797979] focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  >
                    <option
                      selected
                      disabled
                      value="bestMatch"
                    >
                      Best Match
                    </option>
                    <option value="newest">Newest Applicants</option>
                    <option value="oldest">Oldest Applicants</option>
                    <option value="highestRate">Highest Rate</option>
                    <option value="lowestRate">Lowest Rate</option>
                  </select>
                </div>
              )}
              {allBids.length === 0 ? (
                <div className="my-8">
                  <Image
                    src={fileIcon}
                    alt="experience"
                    className="mx-auto mt-2"
                  />
                  <div className="px-4 py-5 text-center text-2xl opacity-50 md:px-8">
                    No proposals found for this project
                  </div>
                </div>
              ) : (
                <>
                  {!isLoading ? (
                    <div>
                      {sortedBids &&
                        sortedBids.map((bid, index) => {
                          const words = bid.description.split(" ");
                          const displayWords =
                            expandedProjects[index] || words.length <= 50
                              ? words
                              : words.slice(0, 50);

                          const isInvited =
                            viewinvites &&
                            viewinvites.some(
                              (invitation) =>
                                bid.freelancer_id === invitation.freelancer_id &&
                                bid.project_id === invitation.project_id
                            );
                          return (
                            <>
                              <Link
                                href={`#`}
                                // state={{ project, bid }}
                              >
                                <div className="border-b border-gray-200 border-opacity-30 px-4 py-2 hover:bg-[#F6FAFD] md:px-8">
                                  <div className="flex">
                                    <div className="flex-[10%] p-4">
                                      <div className="relative mx-auto h-24 w-24">
                                        <Image
                                          src={
                                            "https://www.api.alanced.com" +
                                            bid.freelancer_profilepic
                                          }
                                          alt="Profile"
                                          className="h-full w-full rounded-full border border-gray-200"
                                        />
                                        <div className="absolute bottom-2 right-1 h-4 w-4 rounded-full border-2 border-white bg-blue-500"></div>
                                      </div>
                                    </div>
                                    <div className="flex-[90%] p-4">
                                      <div className="flex items-center justify-between">
                                        <p className="font-cardo text-2xl font-medium text-[#0A142F]">
                                          {highlightText(bid.freelancer_name, searchQuery)}
                                        </p>

                                        <div className="flex items-center space-x-4">
                                          <Link
                                            href="/messages"
                                            // state={{
                                            //   conversationName: {
                                            //     hirer: project.project_owner_id,
                                            //     freelancer: bid.freelancer_id,
                                            //     freelancerDetails: bid,
                                            //   },
                                            // }}
                                          >
                                            <span className="inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-10 py-[10px] text-sm font-semibold text-white">
                                              Message
                                            </span>
                                          </Link>

                                          <button
                                            className={` ${
                                              isInvited
                                                ? "inline-block rounded bg-gradient-to-b from-[gray] to-[lightgray] p-0.5"
                                                : "inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                                            }`}
                                            onClick={(e) =>
                                              handleOpenHiringModal(
                                                e,
                                                String(bid.freelancer_id),
                                                isInvited
                                              )
                                            }
                                          >
                                            <button
                                              className={`bg-white px-10 py-1 ${isInvited ? "cursor-not-allowed" : ""}`}
                                              disabled={isInvited}
                                            >
                                              <p
                                                className={`${
                                                  isInvited
                                                    ? "from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent"
                                                    : "from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent"
                                                }`}
                                              >
                                                {isInvited ? "Hired" : "Hire"}
                                              </p>
                                            </button>
                                          </button>

                                          {/* {isHiringOpen[bid.freelancer_id] && (
                                            <SendFreeLancerHireRequestPopup
                                              closePopup={() =>
                                                closeHiringPopup(String(bid.freelancer_id))
                                              }
                                            //   freelancer={bid.freelancer_id}
                                            />
                                          )} */}
                                        </div>
                                      </div>
                                      <h1 className="font-cardo text-lg text-[#031136] opacity-50">
                                        {highlightText(
                                          bid.freelancer_category.replace(/_/g, " "),
                                          searchQuery
                                        )}
                                      </h1>
                                      <div style={{ display: "flex" }}>
                                        <h1 className="font-cardo flex-1 py-3 text-lg font-semibold text-[#031136]">
                                          ${highlightText(String(bid.bid_amount), searchQuery)}{" "}
                                          <span className="font-medium opacity-50">
                                            {bid.bid_type === "Fixed" ? "" : "/hr"}
                                          </span>
                                        </h1>
                                        <h1 className="font-cardo flex-1 py-3 text-lg font-semibold text-[#031136]">
                                          {highlightText(bid.bid_type, searchQuery)}
                                        </h1>
                                        <h1 className="font-cardo flex-1 py-3 text-lg text-[#031136]">
                                          {highlightText(bid.freelancer_address, searchQuery)}
                                        </h1>
                                      </div>
                                      <p className="text-[14px] text-[#0A142F]">
                                        Cover Letter -{" "}
                                        <span className="opacity-50">
                                          {highlightText(displayWords.join(" "), searchQuery)}
                                          {words.length > 50 && (
                                            <button
                                              className="font-cardo cursor-pointer pl-2 text-[18px] font-semibold text-[#031136]"
                                              onClick={(e) => handleToggleDescription(e, index)}
                                            >
                                              {expandedProjects[index] ? "Less" : "More"}
                                            </button>
                                          )}
                                        </span>
                                      </p>
                                      <div className="mt-5 text-left">
                                        {bid.freelancer_skills &&
                                          (() => {
                                            try {
                                              const skillsArray = JSON.parse(
                                                bid.freelancer_skills.replace(/'/g, '"')
                                              );
                                              return skillsArray.map(
                                                (skill: string, index: number) => (
                                                  <div
                                                    key={index}
                                                    className="my-2 mr-3 inline-block w-28 rounded-full bg-[#b4d3c3] bg-opacity-[60%] px-3 py-[3px] text-sm font-semibold text-blue-800 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee]"
                                                  >
                                                    <p className="text-center">
                                                      {highlightText(skill, searchQuery)}
                                                    </p>
                                                  </div>
                                                )
                                              );
                                            } catch (error) {
                                              return null;
                                            }
                                          })()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </>
                          );
                        })}

                      {/* {totalPages > 1 && (
                        <div className="m-4 flex items-center justify-end gap-6">
                          <button
                            size="sm"
                            variant="outlined"
                            onClick={prev}
                            disabled={currentPage === 1}
                            style={{
                              backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                              border: "none",
                            }}
                          >
                            <ArrowLeftIcon
                              strokeWidth={2}
                              className="h-4 w-4 text-white"
                            />
                          </button>

                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                              <span
                                key={pageNumber}
                                className={`px-0 py-1 ${
                                  currentPage === pageNumber
                                    ? " cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent"
                                    : " cursor-pointer text-[14px] font-bold text-[#0A142F]"
                                }`}
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  setCurrentPage(pageNumber);
                                }}
                              >
                                {pageNumber}
                              </span>
                            );
                          })}

                          <IconButton
                            size="sm"
                            variant="outlined"
                            onClick={next}
                            disabled={currentPage === totalPages}
                            style={{
                              backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
                              border: "none",
                            }}
                          >
                            <ArrowRightIcon
                              strokeWidth={2}
                              className="h-4 w-4 text-white"
                            />
                          </IconButton>
                        </div>
                      )} */}

                      {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 py-4 md:gap-4">
                          <button
                            onClick={prev}
                            disabled={currentPage === 1}
                            className="rounded-lg border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-1 text-white"
                          >
                            <RxArrowLeft
                              strokeWidth={0.3}
                              className="text-2xl text-white"
                            />
                          </button>
                          {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            return (
                              <button
                                key={pageNumber}
                                className={`px-3 py-1 ${currentPage === pageNumber ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-sm font-bold text-transparent" : "text-sm font-bold text-[#0A142F]"}`}
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
                            onClick={next}
                            disabled={currentPage === totalPages}
                            className="rounded-lg border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] p-1 text-white"
                          >
                            <RxArrowRight
                              strokeWidth={0.3}
                              className="text-2xl text-white"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {/* {[...Array(8)].map((_) => {
                        return (
                          <div>
                            <Selection
                              height={100}
                              width={100}
                              style={{
                                borderRadius: "50%",
                                marginLeft: 30,
                                float: "left",
                                marginTop: 30,
                              }}
                            />
                            <Skeleton
                              height={20}
                              width={100}
                              style={{ marginLeft: 20, marginTop: 30 }}
                            />
                            <Skeleton
                              height={20}
                              width={150}
                              style={{ marginLeft: 20 }}
                            />
                            <Skeleton
                              height={40}
                              width={150}
                              style={{
                                float: "right",
                                marginTop: -40,
                                marginLeft: 10,
                                marginRight: 50,
                              }}
                            />
                            <Skeleton
                              height={40}
                              width={150}
                              style={{
                                float: "right",
                                marginTop: -64,
                                marginRight: 210,
                              }}
                            />
                            <Skeleton
                              height={100}
                              width={1000}
                              style={{ marginLeft: 150 }}
                            />
                            <Skeleton
                              height={30}
                              width={100}
                              inline="true"
                              style={{
                                marginLeft: 150,
                                marginTop: 10,
                                borderRadius: "25px",
                              }}
                            />
                            <Skeleton
                              height={30}
                              width={100}
                              inline="true"
                              count={4}
                              style={{
                                marginLeft: 20,
                                marginTop: 10,
                                borderRadius: "25px",
                              }}
                            />
                          </div>
                        );
                      })} */}
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="my-8">
              <Image
                src={fileIcon}
                alt="experience"
                className="mx-auto mt-2"
              />
              <div className="px-4 py-5 text-center text-2xl opacity-50 md:px-8">
                This job is closed and is no longer accepting proposals.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Proposals;
