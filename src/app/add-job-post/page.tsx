"use client";
import React, { useEffect, useRef, useState } from "react";
import CategoryList from "@/app/add-job-post/freelancers/category-list";
import SkillsList from "@/app/add-job-post/freelancers/skills-list";

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
  const [addProject, setAddProject] = useState<any>({}) // eslint-disable-line
  const [skills, setSkills] = useState<string[]>([]) 
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOption, setSelectedOption] = useState("hourly") // eslint-disable-line
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTermSkill, setSearchTermSkill] = useState("") // eslint-disable-line
  const [isOpenSkill, setIsOpenSkill] = useState(false) // eslint-disable-line
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string>("") // eslint-disable-line

  const wrapperRef = useRef<HTMLDivElement>(null);
  const wrapperRefSkill = useRef<HTMLDivElement>(null);

  const categories = useState(CategoryList.sort())[0];
  const allSkills = SkillsList.sort();

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTermSkill.toLowerCase()) &&
      !skills.includes(skill)
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
    if (wrapperRefSkill.current && !wrapperRefSkill.current.contains(event.target as Node)) {
      setIsOpenSkill(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    setError("");
  };
// eslint-disable-next-line
  const [isValid, setIsValid] = useState<boolean>(false); 
  useEffect(() => {
    switch (step) {
      case 1:
        setIsValid(addProject.title && selectedCategory);
        break;
      case 2:
        setIsValid(!!addProject.description);
        break;
      case 3:
        setIsValid(skills.length > 0);
        break;
      case 4:
        setIsValid(
          addProject.fixed_budget ||
          (addProject.min_hourly_rate && addProject.max_hourly_rate)
        );
        break;
      case 5:
        setIsValid(addProject.deadline && addProject.experience_level);
        break;
      default:
        setIsValid(false);
        break;
    }
  }, [step, addProject, selectedCategory, skills]);

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
    setStep(prevStep => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };

  const selectOptionHandler = (value: string) => {
    setSelectedOption(value);
    setAddProject((prev: any) => ({ ...prev, rate: value })) // eslint-disable-line
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
                  <label className="block text-lg sm:text-xl mt-3 font-cardo" htmlFor="jobCategory">
                    Job Category
                  </label>
                  <div ref={wrapperRef} className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onClick={() => setIsOpen(!isOpen)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          setIsOpen(!isOpen);
                        }
                      }}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                      }}
                      className="border my-2 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                      placeholder="Select Category"
                    />

                    {isOpen && (
                      <ul className="border border-gray-300 max-h-48 overflow-y-auto absolute w-full z-10 bg-white mt-2 list-none p-0 m-0">
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
                                if (e.key === 'Enter') {
                                  setSelectedCategory(cat);
                                  setSearchTerm(cat);
                                  setIsOpen(false);
                                }
                              }}
                              className="cursor-pointer text-left w-full px-2 py-1 focus:outline-none hover:bg-blue-500 hover:text-white"
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
                <h1 className="text-2xl md:text-3xl font-cardo font-semibold text-blue-600">
                  Job Description
                </h1>
                <p className="text-base sm:text-lg opacity-75 font-cardo font-medium py-2 sm:py-4">
                  Describe the responsibilities and expectations.
                </p>
                <textarea
                  onChange={onChange}
                  name="description"
                  value={addProject.description}
                  className="border my-2 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  rows={5}
                  placeholder="Add Job Description"
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h1 className="text-2xl md:text-3xl font-cardo font-semibold text-blue-600">
                  Skills Required
                </h1>
                <p className="text-base sm:text-lg opacity-75 font-cardo font-medium py-2 sm:py-4">
                  Specify the skills needed for the job.
                </p>
                <div ref={wrapperRefSkill} className="relative">
                  <input
                    type="text"
                    value={searchTermSkill}
                    onClick={() => setIsOpenSkill(!isOpenSkill)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setIsOpenSkill(!isOpenSkill);
                      }
                    }}
                    onChange={(e) => {
                      setSearchTermSkill(e.target.value);
                      setIsOpenSkill(true);
                    }}
                    className="border my-2 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Select Skills"
                  />

                  {isOpenSkill && (
                    <ul className="border border-gray-300 max-h-48 overflow-y-auto absolute w-full z-10 bg-white mt-2 list-none p-0 m-0">
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
                              if (e.key === 'Enter') {
                                setSkills([...skills, skill]);
                                setAddProject((prevProject: Project) => ({
                                  ...prevProject,
                                  skills_required: [...skills, skill],
                                }));
                                setSearchTermSkill("");
                                setIsOpenSkill(false);
                              }
                            }}
                            className="cursor-pointer text-left w-full px-2 py-1 focus:outline-none hover:bg-blue-500 hover:text-white"
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
                    <h3 className="text-lg sm:text-xl font-cardo font-semibold">
                      Selected Skills:
                    </h3>
                    <ul className="mt-2">
                      {skills.map((skill, index) => (
                        <li
                          key={index}
                          className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-cardo mr-2 mb-2"
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
                <h1 className="text-2xl md:text-3xl font-cardo font-semibold text-blue-600">
                  Budget and Rate
                </h1>
                <p className="text-base sm:text-lg opacity-75 font-cardo font-medium py-2 sm:py-4">
                  Specify the budget and rate for the job.
                </p>
                <div>
                  <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="rate">
                    Rate
                  </label>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => selectOptionHandler("hourly")}
                      className={`px-4 py-2 rounded-md ${
                        selectedOption === "hourly" ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      Hourly
                    </button>
                    <button
                      onClick={() => selectOptionHandler("fixed")}
                      className={`ml-2 px-4 py-2 rounded-md ${
                        selectedOption === "fixed" ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                    >
                      Fixed
                    </button>
                  </div>
                  {selectedOption === "fixed" ? (
                    <div className="mt-4">
                      <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="fixed_budget">
                        Fixed Budget
                      </label>
                      <input
                        type="number"
                        onChange={onChange}
                        name="fixed_budget"
                        value={addProject.fixed_budget || ""}
                        className="border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Enter fixed budget"
                      />
                    </div>
                  ) : (
                    <div className="mt-4">
                      <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="min_hourly_rate">
                        Min Hourly Rate
                      </label>
                      <input
                        type="number"
                        onChange={onChange}
                        name="min_hourly_rate"
                        value={addProject.min_hourly_rate || ""}
                        className="border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Enter minimum hourly rate"
                      />
                      <label className="block text-lg sm:text-xl mt-3 font-cardo" htmlFor="max_hourly_rate">
                        Max Hourly Rate
                      </label>
                      <input
                        type="number"
                        onChange={onChange}
                        name="max_hourly_rate"
                        value={addProject.max_hourly_rate || ""}
                        className="border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder="Enter maximum hourly rate"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h1 className="text-2xl md:text-3xl font-cardo font-semibold text-blue-600">
                  Deadline and Experience Level
                </h1>
                <p className="text-base sm:text-lg opacity-75 font-cardo font-medium py-2 sm:py-4">
                  Specify the deadline and experience level required.
                </p>
                <div>
                  <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="deadline">
                    Deadline
                  </label>
                  <input
                    type="date"
                    onChange={onChange}
                    name="deadline"
                    value={formatToYYYYMMDD(addProject.deadline || "")}
                    className="border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                    placeholder="Select deadline"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="experience_level">
                    Experience Level
                  </label>
                  <select
                    name="experience_level"
                    onChange={onChange}
                    value={addProject.experience_level}
                    className="border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                onClick={goToPreviousStep}
                className="bg-gray-500 hover:bg-gray-600 text-white font-cardo py-2 px-4 rounded-md focus:outline-none"
              >
                Back
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={goToNextStep}
                className="bg-blue-500 hover:bg-blue-600 text-white font-cardo py-2 px-4 rounded-md focus:outline-none"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-cardo py-2 px-4 rounded-md focus:outline-none"
              >
                Post Job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJobPost;

