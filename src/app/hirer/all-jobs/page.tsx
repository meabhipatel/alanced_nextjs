"use client";

import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import axios from 'axios';
import { useRouter } from 'next/navigation'; 

interface Project {
  title: string;
  Project_Rate: number;
  experience_level: string;
  Project_created_at: string; 
}

const Page = () => {
  const router = useRouter(); // Initialize useRouter
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedTab, setSelectedTab] = useState('All Job Posts');
  const [searchQuery, setSearchQuery] = useState('');
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

        const queryString = queryParameters.join('&');

        const response = await axios.get(
          `https://www.api.alanced.com/freelance/view/hirer-self/Project?${queryString}`,
          {
            headers: {
              Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3OTk4ODc1LCJpYXQiOjE3MjY0NjI4NzUsImp0aSI6ImMyZTVjZGM2OTQzYTQyZjU5MGI2MThlZjk0ZmZmOTIwIiwidXNlcl9pZCI6NX0.2QnOmbYtqP9C_hVueBk2pH4CqqPCMvX1H1CXQEyynDI`,
            },
          }
        );

        if (response.data && Array.isArray(response.data.results)) {
          setProjects(response.data.results);
          setTotalPages(Math.ceil(response.data.count / 8));
        } else {
          setProjects([]);
        }
      } catch (error) {
       //eslint-disable-next-line
        console.error('Error fetching projects:', error);
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
    if (tab === 'All Contracts') {
      router.push('/hirer/contracts');
    } else if (tab === 'All Job Posts') {
      router.push('/hirer/all-jobs');
    }
  };

  return (
    <div className="p-6 bg-white">
      <div className="flex items-center justify-start space-x-4 mb-6">
        <button
          onClick={() => handleTabChange('All Job Posts')}
          className={`px-6 py-2 font-semibold rounded-lg ${
            selectedTab === 'All Job Posts'
              ? 'bg-gradient-to-r from-blue-700 to-cyan-400 text-white'
              : 'bg-transparent text-gray-500 border border-gray-300'
          }`}
        >
          All Job Posts
        </button>
        <button
          onClick={() => handleTabChange('All Contracts')}
          className={`px-6 py-2 font-semibold rounded-lg ${
            selectedTab === 'All Contracts'
              ? 'bg-gradient-to-r from-blue-700 to-cyan-400 text-white'
              : 'bg-transparent text-gray-500 border border-gray-300'
          }`}
        >
          All Contracts
        </button>
      </div>

      <div className="flex items-center border border-gray-300 rounded-lg p-2 mb-6">
        <IoIosSearch className="text-gray-500 w-6 h-6" />
        <input
          type="text"
          placeholder="Search Projects"
          value={searchQuery}
          onChange={handleSearch}
          className="ml-2 outline-none w-full text-sm p-1"
        />
        <button className="bg-gradient-to-r from-blue-700 to-cyan-400 p-2 rounded-lg text-white">
          <IoIosSearch className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.Project_Rate} - {project.experience_level}</p>
              <p className="text-sm text-gray-400">Posted {new Date(project.Project_created_at).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
