"use client";
import React, { useState } from "react";

const PortfolioPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [skillsUsed, setSkillsUsed] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  //const [projectImage, setProjectImage] = useState<File | null>(null);
  const [selectedCategory] = useState<string[]>([]);

  //const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
  //setSelectedCategory(selectedOptions);
  //};
  const handleNextStep = () => {
    if (currentStep === 1 && projectTitle && projectDescription) {
      setCurrentStep(2);
    } else if (currentStep === 2 && projectCategory && skillsUsed) {
      setCurrentStep(3);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 border-r border-gray-200 bg-white p-6">
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full rounded-lg p-2 text-left font-semibold ${
                currentStep === 1 ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setCurrentStep(1)}
            >
              Add Portfolio
            </button>
          </li>
          <li>
            <button
              className={`w-full rounded-lg p-2 text-left ${
                currentStep === 2 ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setCurrentStep(2)}
              disabled={!projectTitle || !projectDescription}
            >
              Add Details
            </button>
          </li>
          <li>
            <button
              className={`w-full rounded-lg p-2 text-left ${
                currentStep === 3 ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900"
              }`}
              onClick={() => setCurrentStep(3)}
              disabled={!projectCategory || !skillsUsed}
            >
              Select Template
            </button>
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-8">
        {currentStep === 1 && (
          <>
            <h1 className="mb-8 text-2xl font-semibold">Add portfolio project</h1>

            <div className="mb-6">
              <label
                htmlFor="project-title"
                className="mb-2 block text-lg font-medium"
              >
                Project Title<span className="text-red-600">*</span>
              </label>
              <p className="mb-2 text-gray-500">Enter a brief but descriptive title.</p>
              <input
                id="project-title"
                type="text"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter Project Title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="project-description"
                className="mb-2 block text-lg font-medium"
              >
                Project Description<span className="text-red-600">*</span>
              </label>
              <p className="mb-2 text-gray-500">Describe what you did on the project.</p>
              <textarea
                id="project-description"
                rows={6}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter Project Overview"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>

            <button
              className={`mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white ${
                !projectTitle || !projectDescription ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleNextStep}
              disabled={!projectTitle || !projectDescription}
            >
              Next: Add Details
            </button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h1 className="mb-8 text-2xl font-semibold">Add Details</h1>

            <div className="mb-6">
              <label
                htmlFor="project-category"
                className="mb-2 block text-lg font-medium"
              >
                Select Category<span className="text-red-600">*</span>
              </label>
              <p className="text-gray-500">
                {selectedCategory.join(", ") || "No categories selected."}
              </p>
              <input
                id="category"
                type="text"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter Project Category"
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="skills-used"
                className="mb-2 block text-lg font-medium"
              >
                Skills Used<span className="text-red-600">*</span>
              </label>
              <p className="mb-2 text-gray-500">What expertise was applied in this project?</p>
              <textarea
                id="skills-used"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter Skills Used"
                value={skillsUsed}
                onChange={(e) => setSkillsUsed(e.target.value)}
              />
            </div>

            <button
              className={`mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white ${
                !projectCategory || !skillsUsed ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleNextStep}
              disabled={!projectCategory || !skillsUsed}
            >
              Next: Select Template
            </button>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h1 className="mb-8 text-2xl font-semibold">Select Template</h1>

            <div className="mb-6">
              <label
                htmlFor="project-url"
                className="mb-2 block text-lg font-medium"
              >
                Project URL<span className="text-red-600">*</span>
              </label>
              <p className="mb-2 text-gray-500">Provide the Project Web Address</p>
              <input
                id="project-url"
                type="text"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter Project URL"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
              />
            </div>
            {/*
            <div className="mb-6">
              <label className="mb-2 block text-lg font-medium">
                Select Project Image<span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                onChange={(e) => setProjectImage(e.target.files?.[0] || null)}
              />
            </div>
            */}

            <button className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white">
              Submit Project
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
