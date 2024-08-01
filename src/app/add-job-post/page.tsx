"use client";
import React, { useState } from "react";

const AddJobPost = () => {
  const [step] = useState(1);
  const [addProject, setAddProject] = useState({
    title: '',
    description: '',
    category: '',
    min_hourly_rate: '',
    max_hourly_rate: '',
    total_budget: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddProject({
      ...addProject,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-4 mx-4 sm:mx-6 md:mx-8 lg:mx-12">
      <h1 className="font-cardo text-xl sm:text-2xl md:text-3xl text-[#031136] text-left font-normal p-3">
        Add Job Post
      </h1>
      <div className="my-2 bg-white border border-gray-100 text-left">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl mb-4 font-cardo">
            {`${step}/5`}
          </h2>
          <div className="space-y-4">
            {step === 1 && (
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex-1 mb-5 md:mb-0 md:mr-4">
                  <h1 className="text-3xl md:text-4xl text-blue-600 font-cardo font-semibold">
                    Your Job Post Title
                  </h1>
                  <p className="text-base sm:text-lg opacity-75 font-cardo font-medium py-2 sm:py-4">
                    Make it Shine, Attract the Right Candidates, <br />
                    Land the Best Talent
                  </p>
                </div>
                <div className="flex-1">
                  <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="jobTitle">
                    Job Title
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    name="title"
                    value={addProject.title}
                    className="border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Add Job title"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobPost;
