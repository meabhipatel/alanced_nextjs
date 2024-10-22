import React, { useEffect, useRef, useState } from "react";

import SkillsList from "@/constant/allSelectionData/skillsList";
import { useAppSelector } from "@/store/hooks";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

type ISkills = string;

interface IFormattedSkills {
  [key: string]: string;
}

interface IEditSkillPopup {
  closeEditSkill: () => void;
}

const EditSkillPopup: React.FC<IEditSkillPopup> = ({ closeEditSkill }) => {
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);

  const [skills, setSkills] = useState<ISkills[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile && freelancerselfprofile.skills) {
      setSkills(JSON.parse(freelancerselfprofile.skills.replace(/'/g, '"')));
    }
  }, [freelancerselfprofile]);

  const removeSkill = (index: number) => {
    setSkills((prevSkills) => prevSkills.filter((_, idx) => idx !== index));
    setError("");
  };

  const formatSkillsForDispatch = (skillsArray: ISkills[]) => {
    const formatted: IFormattedSkills = {};
    skillsArray.forEach((skill, index) => {
      formatted[`skills[${index}]`] = skill;
    });
    return formatted;
  };

  const handleSave = async () => {
    const formData = new FormData();

    const formattedSkills = formatSkillsForDispatch(skills);
    Object.keys(formattedSkills).forEach((key) => {
      formData.append(key, formattedSkills[key]);
    });
    const res = await axiosWithAuth.put("/account/freelancer/profile/update", formData);
    toast.success(res.data.message);

    closeEditSkill();
  };

  const allSkills = SkillsList.sort();

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
      </style>
      <div className="fixed inset-0 z-10 mt-10 overflow-y-auto sm:overflow-visible">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[700px]">
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[26px] font-normal text-[#031136]">
                {skills && skills.length > 0 ? "Edit Skills" : "Add Skills"}
              </h1>

              <button
                onClick={closeEditSkill}
                className="text-gray-500 hover:text-gray-700"
              >
                {/* <i className="bi bi-x-lg"></i> */}
                <IoClose className="text-3xl" />
              </button>
            </div>
            <div className="mt-10">
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
                        className="ml-2 mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-sm text-blue-500"
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
            <button className="mt-8 flex justify-end">
              <button onClick={handleSave}>
                <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                  Save
                </span>
              </button>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeEditSkill}
              >
                <button className="rounded-[3px] bg-white px-2 py-1">
                  <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                    Cancel
                  </p>
                </button>
              </button>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSkillPopup;
