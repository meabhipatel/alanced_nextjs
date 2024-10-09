"use client";

import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { useRouter } from "next/navigation";
import { axiosWithAuth } from "@/utils/axiosWithAuth";

interface Project {
  title: string;
  Project_Rate: number;
  experience_level: string;
  Project_created_at: string;
}

const Page = () => {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTab, setSelectedTab] = useState("All Job Posts");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const queryParameters = [];

        if (searchQuery) {
          queryParameters.push(`search_query=${searchQuery}`);
        }

        queryParameters.push(`page=${currentPage}`);

        const queryString = queryParameters.join("&");

        const response = await axiosWithAuth.get(
          `/freelance/view/hirer-self/Project?${queryString}`
        );

        if (response.data && Array.isArray(response.data.results)) {
          setProjects(response.data.results);
          setTotalPages(Math.ceil(response.data.count / 8));
        } else {
          setProjects([]);
        }
      } catch (error) {
        //eslint-disable-next-line
        console.error("Error fetching projects:", error);
        setProjects([]);
      }
    };

    fetchProjects();
  }, [searchQuery, currentPage, selectedTab]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "All Contracts") {
      router.push("/hirer/contracts");
    } else if (tab === "All Job Posts") {
      router.push("/hirer/all-jobs");
    }
  };

  return (
    <div className="container bg-white sm:px-5 md:px-10 lg:px-20">
      {/* Tab Section */}
      <div className="mb-4 flex flex-col items-center justify-start md:mb-6 md:flex-row md:space-x-4">
        <button
          onClick={() => handleTabChange("All Job Posts")}
          className={`w-full rounded-lg px-4 py-2 text-center font-semibold md:w-auto md:px-6 ${
            selectedTab === "All Job Posts"
              ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white"
              : "border border-gray-300 bg-transparent text-gray-500"
          }`}
        >
          All Job Posts
        </button>
        <button
          onClick={() => handleTabChange("All Contracts")}
          className={`mt-2 w-full rounded-lg px-4 py-2 text-center font-semibold md:mt-0 md:w-auto md:px-6 ${
            selectedTab === "All Contracts"
              ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF] text-white"
              : "border border-gray-300 bg-transparent text-gray-500"
          }`}
        >
          All Contracts
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex flex-col items-center rounded-lg border border-gray-300 p-2 md:flex-row">
        <IoIosSearch className="h-6 w-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search Projects"
          value={searchQuery}
          onChange={handleSearch}
          className="ml-2 w-full p-1 text-sm outline-none"
        />
        <button className="mt-2 rounded-lg bg-gradient-to-r from-blue-700 to-cyan-400 p-2 text-white md:mt-0">
          <IoIosSearch className="h-5 w-5" />
        </button>
      </div>

      {/* Projects Section */}
      <div className="space-y-4">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
            <div
              key={index}
              className="rounded-lg border bg-gray-50 p-4 shadow-sm"
            >
              <div className="text-lg font-semibold">{project.title}</div>
              <p className="text-sm text-gray-500">
                {project.Project_Rate} - {project.experience_level}
              </p>
              <p className="text-sm text-gray-400">
                Posted {new Date(project.Project_created_at).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No projects found</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="rounded-lg bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
          >
            Previous
          </button>
          <p className="text-gray-600">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="rounded-lg bg-gray-200 px-4 py-2 transition hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
