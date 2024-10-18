"use client";

import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { errorLog } from "@/utils/errorLog";
import { timeAgo } from "@/utils/timeFunction";
import Link from "next/link";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleFetchHirerSelfProjetsAsync } from "@/store/features/hirer/hirerApi";
import Loader from "@/components/Loader";

const Page = () => {
  const dispatch = useAppDispatch();
  const {
    isloading,
    data: { count, results: projects },
  } = useAppSelector((state) => state.hirer.hirerSelfProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchProjects();
    //eslint-disable-next-line
  }, [searchQuery, currentPage]);

  useEffect(() => {
    if (count > 0) {
      setTotalPages(Math.ceil(count / 8));
    }
  }, [count]);

  const fetchProjects = async () => {
    try {
      const queryParameters = [];

      if (searchQuery) {
        queryParameters.push(`search_query=${searchQuery}`);
      }
      queryParameters.push(`page=${currentPage}`);
      const queryString = queryParameters.join("&");
      dispatch(handleFetchHirerSelfProjetsAsync({ query: queryString }));
    } catch (error) {
      errorLog(error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (isloading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader
          size="lg"
          color="primary"
        />
      </div>
    );
  }

  if (!isloading) {
    return (
      <div className="container sm:px-5 md:px-10 lg:px-20">
        <h1 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">All Jobs</h1>

        <div className="mb-8 flex flex-row items-center justify-between space-y-2 rounded-lg border border-gray-300 p-2 md:space-y-0">
          <div className="flex w-full items-center">
            <IoIosSearch className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search Projects"
              value={searchQuery}
              onChange={handleSearch}
              className="ml-2 w-full py-1 text-sm outline-none md:ml-3"
            />
          </div>

          <button className="ml-3 w-auto rounded-lg bg-gradient-to-r from-blue-700 to-cyan-400 px-2 py-1 text-white">
            <IoIosSearch className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col rounded-lg border border-gray-300 bg-gray-50 p-6 shadow-md transition hover:shadow-lg md:flex-row md:justify-between"
              >
                {/* Project Details */}
                <div className="md:w-2/3">
                  <div className="flex flex-wrap items-center space-x-4">
                    <Link href={`/hirer/all-jobs/details/${project.id}`}>
                      <h2 className="inline-block text-lg font-semibold text-blue-600 transition hover:text-blue-400 hover:underline">
                        {project.title}
                      </h2>
                    </Link>
                    <p className="text-sm">
                      {project.is_hired ? (
                        <span className="rounded-full bg-red-100 px-3 text-red-500">Closed</span>
                      ) : (
                        <span className="rounded-full bg-green-100 px-3 text-green-500">Open</span>
                      )}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {project.Project_Rate} -{" "}
                    {project.experience_level === "Entry_Level"
                      ? "Entry Level"
                      : project.experience_level}
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Posted {timeAgo(project.Project_created_at)}
                  </p>
                </div>

                <div className="mt-4 flex w-full justify-around space-x-8 text-center md:mt-0 md:w-auto">
                  <div>
                    <p className="text-lg font-semibold">{project?.proposals}</p>
                    <p className="text-sm text-gray-500">Proposals</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{project?.invitations}</p>
                    <p className="text-sm text-gray-500">Invitations</p>
                  </div>
                  <Link href={`/hirer/proposals/${project.id}`}>
                    <div className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                      <button className="rounded bg-white px-8 py-3">
                        <p className="bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-sm font-semibold text-transparent">
                          View Proposal
                        </p>
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No projects found</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 py-8">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`rounded-lg p-2 text-white ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "bg-gradient-to-r from-blue-600 to-cyan-400"}`}
            >
              <RxArrowLeft
                strokeWidth={0.3}
                className="h-6 w-6"
              />
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`px-4 py-2 font-semibold ${currentPage === pageNumber ? "bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent" : "text-gray-700"}`}
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
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`rounded-lg p-2 text-white ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "bg-gradient-to-r from-blue-600 to-cyan-400"}`}
            >
              <RxArrowRight
                strokeWidth={0.3}
                className="h-6 w-6"
              />
            </button>
          </div>
        )}
      </div>
    );
  }
};

export default Page;
