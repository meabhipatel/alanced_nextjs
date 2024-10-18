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
      <div className="container bg-white sm:px-5 md:px-10 lg:px-20">
        <h1 className="mb-4 text-2xl font-semibold">All Jobs</h1>
        <div className="mb-6 flex flex-row items-center justify-between rounded-lg border border-gray-300 p-2">
          <div className="flex w-full items-center md:w-3/4">
            {" "}
            <IoIosSearch className="h-6 w-6 text-gray-500" />
            <input
              type="text"
              placeholder="Search Projects"
              value={searchQuery}
              onChange={handleSearch}
              className="ml-2 w-full p-1 text-sm outline-none md:ml-3"
            />
          </div>
          <button className="ml-3 mt-0 w-auto rounded-lg bg-gradient-to-r from-blue-700 to-cyan-400 p-3 text-white md:text-lg">
            <IoIosSearch className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>

        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-between rounded-lg border bg-gray-50 p-4 shadow-sm md:flex-row md:items-center"
              >
                <div className="md:w-1/2">
                  <div className="flex gap-5">
                    <Link href={`/hirer/all-jobs/details/${project.id}`}>
                      <h2 className="inline-block text-base font-semibold capitalize hover:text-blue-500 hover:underline">
                        {project.title}
                      </h2>
                    </Link>
                    <p className="text-xs">
                      {project.is_hired ? (
                        <span className="rounded-full bg-red-100 px-3 text-red-500">Closed</span>
                      ) : (
                        <span className="rounded-full bg-green-100 px-3 text-green-500">Open</span>
                      )}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {project.Project_Rate} -{" "}
                    {project.experience_level === "Entry_Level"
                      ? "Entry Level"
                      : project.experience_level}
                  </p>
                  <p className="text-sm text-gray-400">
                    Posted {timeAgo(project.Project_created_at)}
                  </p>
                </div>

                <div className="mt-4 flex flex-col items-center justify-between space-y-2 md:mt-0 md:w-1/2 md:flex-row md:space-y-0">
                  <div className="flex flex-col items-center space-y-1 text-center">
                    <p className="text-lg font-semibold">{project?.proposals}</p>
                    <p className="text-sm text-gray-500">Proposals</p>
                  </div>
                  <div className="flex flex-col items-center space-y-1 text-center">
                    <p className="text-lg font-semibold">{project?.invitations}</p>
                    <p className="text-sm text-gray-500">Invitations</p>
                  </div>

                  <Link href={`/hirer/proposals/${project.id}`}>
                    <button className="ml-4 rounded-lg bg-gradient-to-r from-blue-700 to-cyan-400 px-4 py-2 text-white">
                      View Proposals
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No projects found</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-4 md:gap-4">
            <button
              onClick={prevPage}
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
              onClick={nextPage}
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
    );
  }
};

export default Page;
