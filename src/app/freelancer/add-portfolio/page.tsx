"use client";
import React, { useState } from "react";
import categoryList from "@/constant/allSelectionData/categoryList";
import SkillsList from "@/constant/allSelectionData/skillsList";
import { FaTimes } from "react-icons/fa";

const PortfolioPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [skillsUsed, setSkillsUsed] = useState<string[]>([]);

  const handleNextStep = () => {
    if (currentStep === 1 && projectTitle && projectDescription) {
      setCurrentStep(2);
    } else if (currentStep === 2 && projectCategory) {
      setCurrentStep(3);
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSkillsUsed((prevSkills) => {
      const combinedSkills = [...prevSkills, ...selectedOptions];
      return Array.from(new Set(combinedSkills));
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProjectCategory(e.target.value);
  };

  const removeSkill = (skillToRemove: string) => {
    setSkillsUsed(skillsUsed.filter((skill) => skill !== skillToRemove));
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
              disabled={!projectCategory || skillsUsed.length === 0}
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
              <p className="mb-2 text-gray-500">Choose a category for your project.</p>
              <select
                id="project-category"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                value={projectCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categoryList.map((category, index) => (
                  <option
                    key={index}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="skills-used"
                className="mb-2 block text-lg font-medium"
              >
                Skills Used<span className="text-red-600">*</span>
              </label>
              <p className="mb-2 text-gray-500">What expertise was applied in this project?</p>

              <select
                id="skills-used"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                multiple
                value={skillsUsed}
                onChange={handleSkillsChange}
              >
                {SkillsList.map((skill, index) => (
                  <option
                    key={index}
                    value={skill}
                  >
                    {skill}
                  </option>
                ))}
              </select>

              <div className="mt-2 flex flex-wrap gap-2">
                {skillsUsed.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center rounded-full bg-blue-200 px-3 py-1"
                  >
                    {skill}
                    <button
                      className="ml-2 text-red-600"
                      onClick={() => removeSkill(skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white ${
                !projectCategory ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleNextStep}
              disabled={!projectCategory}
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

            <div className="mb-6">
              <label
                htmlFor="project-image"
                className="mb-2 block text-lg font-medium"
              >
                Select Project Image<span className="text-red-600">*</span>
              </label>
              <input
                id="project-image"
                type="file"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-between">
              <button className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-2 text-white">
                Add Project
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
