import React, { useEffect, useRef, useState } from "react";
import edit from "@/assets/icons/edit.png";
import SkillsList from "@/constant/allSelectionData/skillsList";
import CategoryList from "@/constant/allSelectionData/categoryList";
import toast from "react-hot-toast";
import Image from "next/image";
import { errorLog } from "@/utils/errorLog";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { FreelanceProject } from "./page";
import { IoClose } from "react-icons/io5";

interface IProps {
  closeEditFreeProject: () => void;
  project: FreelanceProject | null;
}

const EditFreelancerProjectsPopup: React.FC<IProps> = ({ closeEditFreeProject, project }) => {
  const id = project && project.project_id;
  const [title, setTitle] = useState((project && project.project_title) || "");
  const [category, setCategory] = useState((project && project.category) || "");
  const [projectLink, setProjectLink] = useState((project && project.project_link) || "");
  const [description, setDescription] = useState((project && project.project_description) || "");
  const [skills, setSkills] = useState<string[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (project && project.skills_used) {
      if (typeof project.skills_used === "string") {
        setSkills(JSON.parse(project.skills_used.replace(/'/g, '"') ?? "[]"));
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
      <div className="fixed inset-0 z-10 mt-24 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[55%]">
            <div className="flex items-center justify-between">
              <h1 className="text-wrap text-[26px] font-normal text-[#031136]">Edit Portfolio</h1>
              <button
                onClick={closeEditFreeProject}
                className="text-gray-500 hover:text-gray-700"
              >
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
              <h1 className="text-left text-[20px] font-normal text-[#031136]">Title</h1>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mb-3 w-full rounded-md border px-2 py-1.5 opacity-50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder=""
              />
              <h1 className="text-left text-[20px] font-normal text-[#031136]">Category</h1>
              <div
                ref={wrapperRef}
                className="relative"
              >
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
                  <ul className="absolute z-50 max-h-[200px] w-full list-none overflow-y-auto border border-[#ccc] bg-white p-0 shadow-lg">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat, index) => (
                        <li key={index}>
                          <button
                            className="h-full w-full px-4 py-1 text-start hover:bg-[#f7f7f7]"
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

              <h1 className="text-left text-[20px] font-normal text-[#031136]">Project Link</h1>
              <input
                type="text"
                value={projectLink}
                onChange={(e) => setProjectLink(e.target.value)}
                className="mb-3 w-full rounded-md border px-2 py-1.5 opacity-50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder=""
              />
              <h1 className="text-left text-[20px] font-normal text-[#031136]">Skills</h1>
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
                    <ul className="absolute z-50 mt-[11px] max-h-[200px] w-full list-none overflow-y-auto border border-[#ccc] bg-white p-0 shadow-lg">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill, index) => (
                          <li key={index}>
                            <button
                              className="h-full w-full px-4 py-1 text-start hover:bg-[#f7f7f7]"
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
              <h1 className="text-left text-[20px] font-normal text-[#031136]">Description</h1>
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
                <button onClick={handleSave}>
                  <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                    Save
                  </span>
                </button>
                <button
                  className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                  onClick={closeEditFreeProject}
                >
                  <button className="bg-white px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </button>
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
