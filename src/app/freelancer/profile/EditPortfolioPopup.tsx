import React, { useEffect, useRef, useState } from "react";
// import { Link } from 'react-router-dom';
import edit from "@/assets/icons/edit.png";
// import { useSelector } from "react-redux";
// import axios from "axios";
import SkillsList from "@/constant/allSelectionData/skillsList";
// import { toast } from 'react-toastify';
import CategoryList from "@/constant/allSelectionData/categoryList";
import toast from "react-hot-toast";
import Image from "next/image";
import { errorLog } from "@/utils/errorLog";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { FreelanceProject } from "./page";
import { IoClose } from "react-icons/io5";

// interface FreelanceProject {
//   project_id: number | null;
//   project_title: string | null;
//   project_description: string | null;
//   project_link: string | null;
//   images_logo: string | null;
//   project_pdf: string | null;
//   skills_used: string | null;
//   category: string | null;
//   design_by: string | null;
// }

// interface IProjectDetails {
//   project_id: number;
//   project_title: string;
//   project_description: string;
//   skills_used: string;
//   category: string;
//   project_link: string;
//   images_logo: File | Blob;
// }

// interface IProject {
//   project_id: number;
//   project_title: string;
//   project_description: string;
//   project_link: string;
//   images_logo: File | Blob | string;
//   project_pdf: string;
//   skills_used: string | string[];
//   category: string;
//   design_by: string;
// }

interface IProps {
  closeEditFreeProject: () => void;
  project: FreelanceProject | null;
}

const EditFreelancerProjectsPopup: React.FC<IProps> = ({ closeEditFreeProject, project }) => {
  const id = project && project.project_id;
  // const accessToken = useSelector(state => state.login.accessToken);
  //   const accessToken =
  //     useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  const [title, setTitle] = useState((project && project.project_title) || "");
  const [category, setCategory] = useState((project && project.category) || "");
  const [projectLink, setProjectLink] = useState((project && project.project_link) || "");
  const [description, setDescription] = useState((project && project.project_description) || "");
  const [skills, setSkills] = useState<string[]>([]);
  //   const [currentSkill, setCurrentSkill] = useState("");
  const [error, setError] = useState("");

  //   useEffect(() => {
  //     if (project.skills_used) {
  //       setSkills(JSON.parse(project.skills_used.replace(/'/g, '"')));
  //     }
  //   }, [project]);

  useEffect(() => {
    if (project && project.skills_used) {
      if (typeof project.skills_used === "string") {
        setSkills(JSON.parse(project.skills_used.replace(/'/g, '"')));
      } else if (Array.isArray(project.skills_used)) {
        setSkills(project.skills_used);
      }
    }
  }, [project]);

  const removeSkill = (index: number) => {
    setSkills((prevSkills) => prevSkills.filter((_, idx) => idx !== index));
    setError("");
  };

  const [uploadedImage, setUploadedImage] = useState(
    "https://www.api.alanced.com" + project?.images_logo
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     let file = null;
  //     if (e.target.files && e.target.files.length > 0) {
  //       file = e.target.files[0];
  //     }
  //     if (file) {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         setUploadedImage(reader.result); // set the Data URL for preview purposes
  //         setUploadedFile(file); // store the File object
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setUploadedImage(reader.result);
        }
        setUploadedFile(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEditIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      if (uploadedFile) {
        formData.append("images_logo", uploadedFile);
      }

      formData.append("project_title", title);
      formData.append("category", category);
      formData.append("project_link", projectLink);

      skills.forEach((skill, index) => {
        formData.append(`skills_used[${index}]`, skill);
      });

      formData.append("project_description", description);

      const res = await axiosWithAuth.put(
        `/freelance/update/Freelancer/Self-project/${id}`,
        formData
        // {
        //   headers: {
        //     Authorization: `Bearer ${""}`,
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      if (res.data.status === 200) {
        toast.success("Portfolio Data Updated Successfully");
        closeEditFreeProject();
      } else {
        errorLog(res.data.message || "Error updating the project");
      }
    } catch (err) {
      if (err instanceof Error) {
        errorLog(err.message);
      } else {
        errorLog(String(err));
      }
    }
  };

  const allSkills = SkillsList;
  const [searchTermSkill, setSearchTermSkill] = useState("");
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const wrapperRefSkill = useRef<HTMLDivElement | null>(null);

  const filteredSkills = allSkills.filter(
    (skill) =>
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

  const [categories] = useState(CategoryList);

  const [searchTerm, setSearchTerm] = useState(category || "");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <style>
        {`
    .dropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 100%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
        margin-top:11px;
    }
    
    .dropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .dropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}
        {`
    .cat-dropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 91%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
    }
    
    .cat-dropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .cat-dropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}
      </style>
      <div className="fixed inset-0 z-10 mt-24 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[55%]">
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-wrap text-[26px] font-normal text-[#031136]">
                Edit Portfolio
              </h1>
              <button
                onClick={closeEditFreeProject}
                className="text-gray-500 hover:text-gray-700"
              >
                {/* <i className="bi bi-x-lg"></i> */}
                <IoClose className="text-3xl" />
              </button>
            </div>
            <div className="mt-8">
              <div className="relative">
                <Image
                  height={250}
                  width={500}
                  src={uploadedImage || "https://www.api.alanced.com" + project?.images_logo}
                  alt="project image"
                  className="mx-auto mb-4 h-[250px] w-[500px]"
                />
                <button
                  className="absolute right-2 top-2 h-6 w-6 cursor-pointer rounded-full border border-gray-200 bg-white p-1"
                  onClick={handleEditIconClick}
                >
                  <Image
                    src={edit}
                    alt="edit"
                  />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">Title</h1>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-3 w-full rounded-md border px-2 py-1.5 opacity-50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder=""
              />
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Category
              </h1>
              <div ref={wrapperRef}>
                <input
                  type="text"
                  value={category}
                  onClick={() => setIsOpen(!isOpen)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCategory(e.target.value);
                    setIsOpen(true);
                  }}
                  className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Select Category"
                />
                {isOpen && (
                  <ul className="cat-dropdown-list">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat, index) => (
                        <li key={index}>
                          <button
                            key={index}
                            onClick={() => {
                              setSearchTerm(cat);
                              setCategory(cat);
                              setIsOpen(false);
                            }}
                          >
                            {cat}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>No results found</li>
                    )}
                  </ul>
                )}
              </div>

              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Project Link
              </h1>
              <input
                type="text"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="mb-3 w-full rounded-md border px-2 py-1.5 opacity-50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder=""
              />
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Skills
              </h1>
              <div className="my-3 flex flex-wrap items-center rounded-md border p-2">
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
                    <ul className="dropdown-list w-full">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill, index) => (
                          <li key={index}>
                            <button
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
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Description
              </h1>
              <textarea
                name=""
                id=""
                cols={30}
                rows={5}
                className="mb-6 w-full rounded-md border px-2 py-1.5 opacity-50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button
                  //   to=""
                  onClick={handleSave}
                >
                  <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                    Save
                  </span>
                </button>
                <button
                  className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                  onClick={closeEditFreeProject}
                >
                  {/* <Link to=""> */}
                  <button className="bg-white px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </button>
                  {/* </Link> */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditFreelancerProjectsPopup;
