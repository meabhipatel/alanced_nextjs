import React, { FC } from "react";
import { Metadata } from "next";
import axios from "axios";
import Image from "next/image";

import FileIcon from "@/assets/icons/file.png";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { IFreelancer } from "@/interfaces";
import { errorLog } from "@/utils/errorLog";

export const metadata: Metadata = {
  title: "Search Freelancer at Alanced",
  description:
    "The best platform to search freelancer where we take care of every things which you should avoid for wasting your time unnecessarily.",
};

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

const Page: FC<IProps> = async ({ searchParams }) => {
  const query = [];

  const { q: queryText, language, page, skills, explevel, address } = searchParams;

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
  let data;

  try {
    const res = await axios.get(
      `https://www.api.alanced.com/account/freelancer/profile/view-all?${queryString}`
    );
    data = res.data.results;
  } catch (error) {
    errorLog(error);
  }

  function highlightText(text: string, query?: string) {
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
    <div className="w-full bg-[#FFFFFF] pb-8 pt-3 text-left lg:w-[70%]">
      <div className="px-4 pt-4 md:px-8">
        <div className="flex items-center">
          <h1 className="mr-1 text-[21px] font-semibold text-[#031136]">
            Freelancers that Matches your Job
          </h1>
        </div>
        <div className="relative mt-3 w-40">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
          <div className="rounded-lg border-b-2 border-gray-600"></div>
        </div>
      </div>

      {data !== null ? (
        data.length > 0 ? (
          <div className="grid w-full grid-cols-1 gap-x-5 md:grid-cols-2 lg:pl-3.5">
            {data &&
              data.map((freelancer: IFreelancer, index: number) => {
                return (
                  <>
                    <div
                      key={index}
                      className="relative mt-4 w-full flex-shrink-0 cursor-pointer rounded-lg px-4 py-5 shadow-lg hover:bg-[#F6FAFD] md:px-8"
                    >
                      <div className="flex items-center">
                        <Image
                          src={"https://www.api.alanced.com" + freelancer.images_logo}
                          alt=""
                          height={96}
                          width={96}
                          // variant="rounded"
                          className="mr-4 h-24 w-24 rounded-lg"
                        />
                        <div>
                          <p className="text-[18px] font-semibold text-[#0A142F]">
                            {freelancer.first_Name} {freelancer.last_Name}
                          </p>
                          <p className="text-[14px] text-[#0A142F] opacity-50">
                            {freelancer.category}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="inline-block pt-4 text-[14px] text-[#0A142F] opacity-50">
                          {highlightText(freelancer.about, queryText)}
                        </p>
                        {/* {free.about && free.about.split(" ").length > 20 && (
                          <button
                            onClick={() => toggleShowMoreDes(free.id)}
                            className="mb-2 inline-block cursor-pointer text-[14px] font-bold text-blue-600"
                          >
                            {showMoreDes[free.id] && showMoreDes[free.id].showAllDes
                              ? "See Less"
                              : "See More"}
                          </button>
                        )} */}
                      </div>

                      {freelancer.skills &&
                        JSON.parse(freelancer.skills.replace(/'/g, '"')).map(
                          (skill: string, skillIndex: number) => (
                            <Link
                              href={""}
                              key={skillIndex}
                            >
                              {/* <span
                                className={`my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-50 ${
                                  skillIndex < 4 ||
                                  (showMoreSkills[free.id] && showMoreSkills[free.id].showAll)
                                    ? ""
                                    : "hidden"
                                }`}
                              >
                                {highlightText(skill, searchQuery)}
                              </span> */}

                              {skill}
                            </Link>
                          )
                        )}
                      {/* {free.skills && JSON.parse(free.skills.replace(/'/g, '"')).length > 4 && (
                        <button
                          onClick={() => toggleShowMoreSkills(free.id)}
                          className="cursor-pointer text-[14px] font-bold text-blue-600"
                        >
                          {showMoreSkills[free.id] && showMoreSkills[free.id].showAll
                            ? " Less"
                            : " More"}
                        </button>
                      )} */}

                      <div className="mb-12">
                        <RiVerifiedBadgeFill className="text-md mr-1 inline-block text-green-600" />
                        <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
                          Account verified
                        </p>
                        <div className="mx-3 inline-block text-[16px] text-[#FFC107]">★★★★★</div>
                        <p className="mr-1 inline-block text-[14px] text-[#0A142F] opacity-80">
                          ${freelancer.hourly_rate ? freelancer.hourly_rate : 0}/Hr
                        </p>
                        <p className="mr-3 inline-block text-[14px] text-[#0A142F] opacity-50">
                          Hourly Rate
                        </p>
                        <p className="mr-2 inline-block text-[14px] text-[#0A142F] opacity-50">
                          {/* {highlightText(freelancer.experience_level.replace(/_/g, " "), searchQuery)} */}
                          {freelancer.experience_level}
                        </p>

                        <IoLocationOutline className="text-md mr-1 inline-block" />
                        <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
                          {/* {highlightText(free.Address ? free.Address : "NA", searchQuery)} */}
                          {freelancer.Address}
                        </p>
                      </div>

                      <div className="flex flex-row">
                        <div className="absolute bottom-4 basis-8/12 cursor-pointer items-center text-[14px] font-bold text-blue-600 hover:underline">
                          <Link
                            href="/view-freelancer/details"
                            // state={{ free }}
                          >
                            <p>View more detail</p>
                          </Link>
                        </div>
                        <div className="absolute bottom-2 right-6 ml-auto basis-4/12 items-center space-x-2">
                          <Link href="/login">
                            <span className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
                              Hire Now
                            </span>
                          </Link>
                          {/* <button
                            className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0"
                            onClick={() => openFreeHiring(free.id)}
                          >
                            Hire Now
                          </button> */}
                        </div>
                        {/* {isFreeHiringOpen[free.id] && (
                          <AddFreeHireRequest
                            closeFreeHiring={() => closeFreeHiring(free.id)}
                            free={free}
                          />
                        )} */}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        ) : (
          <div className="mt-20">
            <Image
              src={FileIcon}
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
        )
      ) : (
        <div className="grid w-[70%] grid-cols-2 pl-3.5 md:w-full">
          {[...Array(6)].map((_, index) => {
            return (
              <div
                key={index}
                className="relative mt-4 h-[467px] w-[26vw] flex-shrink-0 cursor-pointer rounded-lg border-t border-opacity-30 px-4 py-5 shadow-lg hover:bg-[#F6FAFD] md:px-8"
              >
                {/* <Skeleton
                height={90}
                width={90}
                inline={true}
                style={{ borderRadius: "10%", float: "left" }}
              />
              <Skeleton
                height={20}
                width={200}
                style={{ marginLeft: 10, marginTop: 20 }}
              />
              <Skeleton
                height={20}
                width={200}
                style={{ marginLeft: 10, marginTop: 10 }}
              />
              <Skeleton
                height={200}
                width={300}
                style={{ marginTop: 20 }}
              />
              <Skeleton
                height={50}
                width={200}
                style={{ marginTop: 10 }}
              />
              <Skeleton
                height={35}
                width={80}
                style={{ marginTop: 20, float: "right" }}
              /> */}
              </div>
            );
          })}
        </div>
      )}
      {/* <div>
      {totalPages > 1 && (
        <div className="m-4 flex items-center justify-end gap-6">
          <button
            // size="sm"
            // variant="outlined"
            onClick={prev}
            disabled={currentPage === 1}
            className="rounded-lg p-1"
            style={{
              backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
              border: "none",
            }}
          >
            <RxArrowLeft
              // strokeWidth={2}
              className="text-2xl text-white"
            />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                className={`px-0 py-1 ${
                  currentPage === pageNumber
                    ? "cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent"
                    : "cursor-pointer text-[14px] font-bold text-[#0A142F]"
                }`}
                onClick={() => {
                  setCurrentPage(pageNumber);
                }}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            // size="sm"
            // variant="outlined"
            onClick={next}
            disabled={currentPage === totalPages}
            className="rounded-lg p-1"
            style={{
              backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
              border: "none",
            }}
          >
            <RxArrowRight
              // strokeWidth={2}
              className="text-2xl text-white"
            />
          </button>
        </div>
      )}
    </div> */}
    </div>
  );
};

export default Page;
