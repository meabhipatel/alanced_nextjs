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

  const goToNextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const goToPreviousStep = () => {
    setStep(prevStep => Math.max(prevStep - 1, 1));
  };


  const selectOptionHandler = (value: string) => {
    setSelectedOption(value);
    setAddProject((prev: Project) => ({ ...prev, rate: value }));
  };

  const getButtonText = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Next: Job Description";
      case 2:
        return "Next: Skills Required";
      case 3:
        return "Next: Budget and Rate";
      case 4:
        return "Next: Deadline and Experience Level";
      case 5:
        return "Submit";
      default:
        return "Next";
    }
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
  className="py-2 px-3 cursor-pointer hover:bg-gray-200 text-left w-full"
  aria-label={`Select category ${cat}`}
>
  {cat}
</button>

                          ))
                        ) : (
                          <li className="py-2 px-3">No categories found</li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
        {step === 2 && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1 mb-5 md:mb-0 md:mr-4">
              <h1 className="text-3xl md:text-4xl text-blue-600 font-cardo font-semibold">
                Job Description
              </h1>
              <p className="text-base sm:text-lg opacity-75 font-cardo font-medium py-2 sm:py-4">
                Highlight the Benefits, and Required Qualifications,
                Share Your Vision
              </p>
            </div>
            <div className="flex-1">
              <textarea
                onChange={onChange}
                name="description"
                value={addProject.description || ""}
                className="border my-2 py-2 px-3 rounded-md w-full h-48 sm:h-48 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder="Enter Description"
  />
</div>
          </div>
        )}
          </div>
          {step === 1 && (
            <div className="flex justify-end mt-4">
              <button
                onClick={goToNextStep}
                className={`px-6 py-3 rounded-md text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!isValid}
              >
                {getButtonText(step)}
              </button>
            </div>
          )}

{step === 3 && (
  <div className="flex flex-col">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <div className="flex-1 mb-5 md:mb-0 md:mr-4">
        <h1 className="text-3xl md:text-4xl text-blue-600 font-cardo font-semibold">
          Skills Required
        </h1>
        <p className="text-base sm:text-lg opacity-75 font-cardo font-medium py-2 sm:py-4">
          Find and Add the Skills That Match Your Job
        </p>
      </div>
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            value={searchTermSkill || ""}
            onClick={() => setIsOpenSkill(!isOpenSkill)}
            onChange={(e) => {
              setSearchTermSkill(e.target.value);
              setIsOpenSkill(true);
            }}
            className="border my-2 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
            placeholder="Search Skills"
          />
          {isOpenSkill && (
            <ul className="border border-gray-300 max-h-48 overflow-y-auto absolute w-full md:w-1/3 z-10 bg-white mt-2 list-none p-0 m-0">
              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill, index) => (
<button
  key={index}
  onClick={() => {
    setSkills([...skills, skill]);
    setSearchTermSkill("");
    setIsOpenSkill(false);
  }}
  className="py-2 px-3 cursor-pointer hover:bg-gray-200 w-full text-left"
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      setSkills([...skills, skill]);
      setSearchTermSkill("");
      setIsOpenSkill(false);
    }
  }}
>
  {skill}
</button>

                ))
              ) : (
                <li className="py-2 px-3">No skill found</li>
              )}
            </ul>
          )}
        </div>
        <div className="py-2">
          {skills.length > 0 &&
            skills.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center border border-gray-300 rounded-lg py-2 px-4 mr-2 mb-2 bg-gray-100"
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
)}

 {step === 4 && (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex-1 mb-5 md:mb-0 md:mr-4">
                    <h1 className="text-3xl md:text-4xl text-blue-600 font-cardo font-semibold">
                      Define Budget and Rate
                    </h1>
                    <p className="text-base sm:text-lg opacity-75 font-cardo font-medium py-2 sm:py-4">
                      Set Your Budget and Rate for the Job
                    </p>
                  </div>
                  <div className="flex-1">
                    <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="rate">
                      Rate Type
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => selectOptionHandler("hourly")}
                        className={`px-6 py-3 rounded-md ${selectedOption === "hourly" ? 'bg-gradient-to-b from-[#0909E9] to-[#00D4FF] text-white' : 'bg-gray-200'} flex items-center justify-center`}
                      >
                        Hourly
                      </button>
                      <button
                        onClick={() => selectOptionHandler("fixed")}
                        className={`px-6 py-3 rounded-md ${selectedOption === "fixed" ? 'bg-gradient-to-b from-[#0909E9] to-[#00D4FF] text-white' : 'bg-gray-200'} flex items-center justify-center`}
                      >
                        Fixed
                      </button>
                    </div>
                    {selectedOption === "hourly" && (
                      <div className="mt-4">
                        <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="minHourlyRate">
                          Minimum Hourly Rate
                        </label>
                        <input
                          type="number"
                          onChange={onChange}
                          name="min_hourly_rate"
                          value={addProject.min_hourly_rate || ""}
                          className="border my-2 py-2 px-3 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                          placeholder="Enter minimum hourly rate"
                        />
                        <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="maxHourlyRate">
                          Maximum Hourly Rate
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
                    {selectedOption === "fixed" && (
                      <div className="mt-4">
                        <label className="block text-lg sm:text-xl mt-2 font-cardo" htmlFor="fixedBudget">
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
                    )}

                  </div>
                </div>
              )}
          
          {step !== 1 && (
            <div className="flex justify-between items-center mt-4">
              {step > 1 && (
                <button
                  onClick={goToPreviousStep}
                  className="px-6 py-3 rounded-md text-white bg-gray-500 hover:bg-gray-600"
                >
                  Back
                </button>
              )}
              <button
                onClick={goToNextStep}
                className={`px-6 py-3 rounded-md text-white ${isValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!isValid}
              >
                {getButtonText(step)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddJobPost;
