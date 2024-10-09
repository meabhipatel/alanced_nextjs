"use client";
import CategoryList from "@/constant/allSelectionData/categoryList";
import SkillsList from "@/constant/allSelectionData/skillsList";
import React, { useEffect, useRef, useState } from "react";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import { errorLog } from "@/utils/errorLog";
import { useRouter } from "next/navigation";

interface Project {
  title?: string;
  description?: string;
  deadline?: string;
  skills_required?: string[];
  category?: string;
  rate?: string;
  fixed_budget?: string | null;
  min_hourly_rate?: string | null;
  max_hourly_rate?: string | null;
  experience_level?: string;
}

const AddJobPost = () => {
  const router = useRouter();
  const [addProject, setAddProject] = useState<Project>({});
  const [skills, setSkills] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("Hourly");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTermSkill, setSearchTermSkill] = useState("");
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const [step, setStep] = useState(1);
  const [isValid, setIsValid] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperRefSkill = useRef<HTMLDivElement>(null);

  const categories = useState(CategoryList.sort())[0];
  const allSkills = SkillsList.sort();

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const payload: Project = {
    title: addProject.title,
    description: addProject.description,
    deadline: addProject.deadline,
    skills_required: skills,
    category: selectedCategory,
    rate: selectedOption,
    min_hourly_rate: addProject.min_hourly_rate || null,
    max_hourly_rate: addProject.max_hourly_rate || null,
    experience_level: addProject.experience_level,
  };

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTermSkill.toLowerCase()) && !skills.includes(skill)
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
    if (wrapperRefSkill.current && !wrapperRefSkill.current.contains(event.target as Node)) {
      setIsOpenSkill(false);
    }
  };

  const handlePostJob = async () => {
    try {
      await axiosWithAuth.post("/freelance/Add/Project", payload);
      toast.success("Job poseted Successfully.");
      setAddProject({});
      setSkills([]);
      setSelectedCategory("");
      setSelectedOption("Hourly");
      router.push(`/hirer/all-jobs`);
    } catch (error) {
      toast.error("Failed to post job. Please try again.");
      errorLog(error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    switch (step) {
      case 1:
        setIsValid(Boolean(addProject.title && selectedCategory));
        break;
      case 2:
        setIsValid(Boolean(addProject.description));
        break;
      case 3:
        setIsValid(skills.length > 0);
        break;
      case 4: {
        // Wrap code with curly braces to create a new block scope
        const isBudgetValid = Boolean(
          addProject.fixed_budget || (addProject.min_hourly_rate && addProject.max_hourly_rate)
        );
        setIsValid(isBudgetValid);
        break;
      }

      case 5: {
        // Wrap code with curly braces to create a new block scope
        const isDeadlineValid = Boolean(addProject.deadline && addProject.experience_level);
        setIsValid(isDeadlineValid);
        break;
      }
    }
  }, [step, addProject, skills, selectedCategory]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;
    if (e.target.name === "deadline") {
      value = formatToDDMMYYYY(value);
    }
    setAddProject((prevProject: Project) => ({
      ...prevProject,
      [e.target.name]: value,
    }));
  };

  const removeSkill = (index: number) => {
    const newSkills = skills.filter((_, idx) => idx !== index);
    setSkills(newSkills);
    setAddProject((prevProject: Project) => ({
      ...prevProject,
      skills_required: newSkills,
    }));
  };

  const formatToDDMMYYYY = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatToYYYYMMDD = (dateStr: string) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const goToNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const stepsLabels = ["Job Description", "Skills", "Budget", "Deadline"];

  const selectOptionHandler = (value: string) => {
    setSelectedOption(value);
    setAddProject((prev) => ({
      ...prev,
      rate: value,
    }));
  };

  return (
    <div className="mx-4 mt-4 sm:mx-6 md:mx-8 lg:mx-12">
      <div className="font-cardo p-3 text-left text-xl font-normal text-[#031136] sm:text-2xl md:text-3xl">
        Add Job Post
      </div>
      <div className="my-2 border border-gray-100 bg-white text-left">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="font-cardo mb-4 text-lg sm:text-xl md:text-2xl">{`${step}/5`}</div>
          <div className="space-y-4">
            {step === 1 && (
              <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                <div className="mb-5 flex-1 md:mb-0 md:mr-4">
                  <div className="font-cardo text-3xl font-semibold text-blue-600 md:text-4xl">
                    Your Job Post Title
                  </div>
                  <h1 className="font-cardo py-2 text-base font-medium opacity-75 sm:py-4 sm:text-lg">
                    Make it Shine, Attract the Right Candidates, <br />
                    Land the Best Talent
                  </h1>
                </div>
                <div className="flex-1">
                  <label
                    className="font-cardo mt-2 block text-lg sm:text-xl"
                    htmlFor="jobTitle"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    name="title"
                    value={addProject.title}
                    className="my-2 w-full rounded-md border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Add Job title"
                  />
                  <label
                    className="font-cardo mt-3 block text-lg sm:text-xl"
                    htmlFor="jobCategory"
                  >
                    Job Category
                  </label>
                  <div
                    ref={wrapperRef}
                    className="relative"
                  >
                    <input
                      type="text"
                      value={searchTerm}
                      onClick={() => setIsOpen(!isOpen)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          setIsOpen(!isOpen);
                        }
                      }}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                      }}
                      className="my-2 w-full rounded-md border px-2 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="Select Category"
                    />

                    {isOpen && (
                      <ul className="absolute z-10 m-0 mt-2 max-h-48 w-full list-none overflow-y-auto border border-gray-300 bg-white p-0">
                        {filteredCategories.length > 0 ? (
                          filteredCategories.map((cat, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSelectedCategory(cat);
                                setSearchTerm(cat);
                                setIsOpen(false);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  setSelectedCategory(cat);
                                  setSearchTerm(cat);
                                  setIsOpen(false);
                                }
                              }}
                              className="w-full cursor-pointer px-2 py-1 text-left hover:bg-blue-500 hover:text-white focus:outline-none"
                            >
                              {cat}
                            </button>
                          ))
                        ) : (
                          <li className="px-2 py-1">No categories found</li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div className="font-cardo text-2xl font-semibold text-blue-600 md:text-3xl">
                  Job Description
                </div>
                <p className="font-cardo py-2 text-base font-medium opacity-75 sm:py-4 sm:text-lg">
                  Describe the responsibilities and expectations.
                </p>
                <textarea
                  onChange={onChange}
                  name="description"
                  value={addProject.description}
                  className="my-2 w-full rounded-md border px-2 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  rows={5}
                  placeholder="Add Job Description"
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <div className="font-cardo text-2xl font-semibold text-blue-600 md:text-3xl">
                  Skills Required
                </div>
                <p className="font-cardo py-2 text-base font-medium opacity-75 sm:py-4 sm:text-lg">
                  Specify the skills needed for the job.
                </p>
                <div
                  ref={wrapperRefSkill}
                  className="relative"
                >
                  <input
                    type="text"
                    value={searchTermSkill}
                    onClick={() => setIsOpenSkill(!isOpenSkill)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsOpenSkill(!isOpenSkill);
                      }
                    }}
                    onChange={(e) => {
                      setSearchTermSkill(e.target.value);
                      setIsOpenSkill(true);
                    }}
                    className="my-2 w-full rounded-md border px-2 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Select Skills"
                  />

                  {isOpenSkill && (
                    <ul className="absolute z-10 m-0 mt-2 max-h-48 w-full list-none overflow-y-auto border border-gray-300 bg-white p-0">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSkills([...skills, skill]);
                              setAddProject((prevProject: Project) => ({
                                ...prevProject,
                                skills_required: [...skills, skill],
                              }));
                              setSearchTermSkill("");
                              setIsOpenSkill(false);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setSkills([...skills, skill]);
                                setAddProject((prevProject: Project) => ({
                                  ...prevProject,
                                  skills_required: [...skills, skill],
                                }));
                                setSearchTermSkill("");
                                setIsOpenSkill(false);
                              }
                            }}
                            className="w-full cursor-pointer px-2 py-1 text-left hover:bg-blue-500 hover:text-white focus:outline-none"
                          >
                            {skill}
                          </button>
                        ))
                      ) : (
                        <li className="px-2 py-1">No skills found</li>
                      )}
                    </ul>
                  )}
                </div>
                {skills.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-cardo text-lg font-semibold sm:text-xl">
                      Selected Skills:
                    </h3>
                    <ul className="mt-2">
                      {skills.map((skill, index) => (
                        <li
                          key={index}
                          className="font-cardo mb-2 mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 text-sm text-white"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(index)}
                            className="ml-2 text-red-600"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="font-cardo text-2xl font-semibold text-blue-600 md:text-3xl">
                  Budget and Rate
                </div>
                <p className="font-cardo py-2 text-base font-medium opacity-75 sm:py-4 sm:text-lg">
                  Specify the budget and rate for the job.
                </p>
                <div>
                  <label
                    className="font-cardo mt-2 block text-lg sm:text-xl"
                    htmlFor="rate"
                  >
                    Rate
                  </label>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => selectOptionHandler("Hourly")}
                      className={`rounded-md px-4 py-2 ${
                        selectedOption === "Hourly" ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      Hourly
                    </button>
                    <button
                      onClick={() => selectOptionHandler("Fixed")}
                      className={`ml-2 rounded-md px-4 py-2 ${
                        selectedOption === "Fixed" ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      Fixed
                    </button>
                  </div>
                  {selectedOption === "Fixed" ? (
                    <div className="mt-4">
                      <label
                        className="font-cardo mt-2 block text-lg sm:text-xl"
                        htmlFor="fixed_budget"
                      >
                        Fixed Budget
                      </label>
                      <input
                        type="number"
                        onChange={onChange}
                        name="fixed_budget"
                        value={addProject.fixed_budget || ""}
                        className="my-2 w-full rounded-md border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Enter fixed budget"
                      />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label
                        className="font-cardo mt-2 block text-lg sm:text-xl"
                        htmlFor="min_hourly_rate"
                      >
                        Min Hourly Rate
                      </label>
                      <input
                        type="number"
                        onChange={onChange}
                        name="min_hourly_rate"
                        value={addProject.min_hourly_rate || ""}
                        className="my-2 w-full rounded-md border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Enter minimum hourly rate"
                      />
                      <label
                        className="font-cardo mt-3 block text-lg sm:text-xl"
                        htmlFor="max_hourly_rate"
                      >
                        Max Hourly Rate
                      </label>
                      <input
                        type="number"
                        onChange={onChange}
                        name="max_hourly_rate"
                        value={addProject.max_hourly_rate || ""}
                        className="my-2 w-full rounded-md border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Enter maximum hourly rate"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <div className="font-cardo text-2xl font-semibold text-blue-600 md:text-3xl">
                  Deadline and Experience Level
                </div>
                <p className="font-cardo py-2 text-base font-medium opacity-75 sm:py-4 sm:text-lg">
                  Specify the deadline and experience level required.
                </p>
                <div>
                  <label
                    className="font-cardo mt-2 block text-lg sm:text-xl"
                    htmlFor="deadline"
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    onChange={onChange}
                    name="deadline"
                    value={formatToYYYYMMDD(addProject.deadline || "")}
                    className="my-2 w-full rounded-md border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Select deadline"
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="font-cardo mt-2 block text-lg sm:text-xl"
                    htmlFor="experience_level"
                  >
                    Experience Level
                  </label>
                  <select
                    name="experience_level"
                    onChange={onChange}
                    value={addProject.experience_level}
                    className="my-2 w-full rounded-md border px-3 py-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="">Select experience level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            {step > 1 && (
              <div className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5">
                <button
                  onClick={goToPreviousStep}
                  className="bg-white px-11 py-1"
                >
                  <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                    Back
                  </p>
                </button>
              </div>
            )}

            {step < 5 ? (
              <button
                onClick={goToNextStep}
                className={`font-cardo ml-auto rounded-md px-4 py-2 text-white focus:outline-none ${
                  isValid
                    ? "bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"
                    : "cursor-not-allowed bg-gray-400"
                }`}
                disabled={!isValid}
              >
                {`Next: ${stepsLabels[step - 1]}`}
              </button>
            ) : (
              <div>
                <button
                  onClick={handlePostJob}
                  disabled={!(addProject.deadline && addProject.experience_level)}
                  className={`rounded-md px-4 py-2 text-white ${addProject.deadline && addProject.experience_level ? "bg-green-500" : "bg-gray-500"}`}
                >
                  Post Job
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobPost;
