"use client";
import React, { useEffect, useState, useRef } from "react";
import categoryList from "@/constant/allSelectionData/categoryList";
import SkillsList from "@/constant/allSelectionData/skillsList";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";

interface IProjectDetails {
  project_title: string;
  project_description: string;
  skills_used: string[];
  category: string;
  project_link: string;
  images_logo: File | Blob;
}

const PortfolioPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);

  const [projectDetails, setProjectDetails] = useState<IProjectDetails | null>(null);

  const handleNextStep = () => {
    if (currentStep === 1 && projectDetails?.project_title && projectDetails?.project_description) {
      setCurrentStep(2);
    } else if (currentStep === 2 && projectDetails?.category) {
      setCurrentStep(3);
    }
  };

  const removeSkill = (index: string | number) => {
    const newSkills = skills.filter((_, idx) => idx !== index);

    setSkills(newSkills);
    setProjectDetails(
      (prevProject) =>
        ({
          ...prevProject,
          skills_used: newSkills,
        }) as IProjectDetails
    );
    setError("");
  };

  const AddProjects = async () => {
    const formData = new FormData();

    formData.append("project_title", projectDetails?.project_title || "");
    formData.append("project_description", projectDetails?.project_description || "");

    skills.forEach((skill, index) => {
      formData.append(`skills_used[${index}]`, skill || "");
    });

    formData.append("category", projectDetails?.category || "");
    formData.append("project_link", projectDetails?.project_link || "");

    formData.append("images_logo", selectedFile || "");

    const res = await axiosWithAuth.post("/freelance/Add/Freelancer/Self-Project", formData);
    toast.success(res.data.message);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setProjectDetails(
      (prevProject) =>
        ({
          ...prevProject,
          [e.target.name]: e.target.value,
        }) as IProjectDetails
    );
  };
  const allSkills = SkillsList.sort();

  const [searchTermSkill, setSearchTermSkill] = useState("");
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const wrapperRefSkill = useRef<HTMLDivElement | null>(null);
  const filteredSkills = allSkills.filter(
    (skill: string) =>
      skill.toLowerCase().includes(searchTermSkill.toLowerCase()) && !skills.includes(skill)
  );

  const handleClickOutsideSkill = (event: MouseEvent) => {
    if (wrapperRefSkill.current && !wrapperRefSkill.current.contains(event.target as Node)) {
      setIsOpenSkill(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSkill);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSkill);
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  return (
    <div className="container flex">
      <div className="hidden w-1/4 border-r border-gray-200 bg-white p-6 sm:block">
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
              disabled={!projectDetails?.project_title || !projectDetails.project_description}
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
              disabled={!projectDetails?.category || skills.length === 0}
            >
              Select Template
            </button>
          </li>
        </ul>
      </div>

      <div className="w-full p-2 sm:w-3/4 sm:p-8">
        {currentStep === 1 && (
          <>
            <h1 className="mb-8 text-2xl font-semibold">Add portfolio project</h1>
            <div className="mb-6">
              <label
                htmlFor="project_title"
                className="mb-2 block text-lg font-medium"
              >
                Project Title<span className="text-red-600">*</span>
              </label>
              <p className="mb-2 text-gray-500">Enter a brief but descriptive title.</p>
              <input
                id="project_title"
                type="text"
                name="project_title"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter Project Title"
                value={projectDetails?.project_title}
                onChange={onChange}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="project_description"
                className="mb-2 block text-lg font-medium"
              >
                Project Description<span className="text-red-600">*</span>
              </label>
              <p className="mb-2 text-gray-500">Describe what you did on the project.</p>
              <textarea
                id="project_description"
                name="project_description"
                rows={6}
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter Project Overview"
                value={projectDetails?.project_description}
                onChange={onChange}
              />
            </div>

            <button
              className={`mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white ${
                !projectDetails?.project_title || !projectDetails?.project_description
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={handleNextStep}
              disabled={!projectDetails?.project_title || !projectDetails?.project_description}
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
                name="category"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                value={projectDetails?.category}
                onChange={onChange}
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

              <div className="font-inter my-3 flex flex-wrap items-center rounded-md border p-2 text-sm">
                {Array.isArray(skills) &&
                  skills.map((skill, index) => (
                    <div
                      key={index}
                      className="my-2 mr-3 flex items-center rounded border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-2 py-1.5 font-semibold text-white"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-white pb-0.5 text-sm text-blue-500"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                <div
                  ref={wrapperRefSkill}
                  className="relative w-full"
                >
                  <input
                    type="text"
                    value={searchTermSkill}
                    onClick={() => setIsOpenSkill(!isOpenSkill)}
                    onChange={(e) => setSearchTermSkill(e.target.value)}
                    className="w-full outline-none"
                    placeholder="Search & Select Skills"
                  />
                  {isOpenSkill && (
                    <ul className="skilldropdown-list w-full">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill, index) => (
                          <li key={index}>
                            <button
                              className="ml-3 text-left"
                              key={index}
                              onClick={() => {
                                if (skills.length < 15) {
                                  setSkills((prev) => [...prev, skill]);
                                  setSearchTermSkill("");
                                  setIsOpenSkill(false);
                                } else {
                                  setError("You can add a maximum of 15 skills.");
                                }
                              }}
                            >
                              {skill}
                            </button>
                          </li>
                        ))
                      ) : (
                        <li>No results found</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
              {error && <p className="mt-2 text-red-500">{error}</p>}
            </div>

            <button
              className={`mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white ${
                !projectDetails?.category || skills.length === 0
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={handleNextStep}
              disabled={!projectDetails?.category || skills.length === 0}
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
                name="project_link"
                className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
                placeholder="Enter Project URL"
                value={projectDetails?.project_link}
                onChange={onChange}
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
                name="images_logo"
                onChange={handleFileChange}
              />
            </div>

            <div className="flex justify-between">
              <button
                className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 px-4 py-2 text-white"
                onClick={AddProjects}
              >
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
