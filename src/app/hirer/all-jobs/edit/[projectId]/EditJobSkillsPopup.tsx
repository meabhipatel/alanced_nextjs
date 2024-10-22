import React, { FC, useEffect, useState, useRef, Dispatch, SetStateAction } from "react";

import SkillsList from "@/constant/allSelectionData/skillsList";

interface IProps {
  skills: string[];
  setSkills: Dispatch<SetStateAction<string[]>>;
  onClose: () => void;
  onSave: (param: string[]) => void;
}

const EditJobSkillsPopup: FC<IProps> = ({ skills, setSkills, onClose, onSave }) => {
  // const [jobskills, setJobSkills] = useState(skills);
  const [error, setError] = useState("");
  const [searchTermSkill, setSearchTermSkill] = useState("");
  const [isOpenSkill, setIsOpenSkill] = useState(false);
  const wrapperRefSkill = useRef<HTMLDivElement>(null);

  const removeSkill = (index: number) => {
    setSkills((prevSkills) => prevSkills.filter((_, idx) => idx !== index));
    setError("");
  };

  const allSkills = SkillsList.sort();

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
      <div className="fixed inset-0 z-10 mt-10 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[50%]">
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[26px] font-normal text-[#031136]">Edit Skills</h1>
            </div>
            <div className="mt-10">
              <p className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Edit Your Required Job Skills
              </p>
              <div className="my-3 flex flex-wrap items-center rounded-md border p-2">
                {skills.map((skill, index) => (
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
                    <ul className="absolute z-50 mt-[11px] max-h-[200px] w-full list-none overflow-y-auto border border-[#ccc] bg-white p-0">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skill, index) => (
                          <li key={index}>
                            <button
                              className="h-full w-full px-4 py-1 text-start hover:bg-[#f7f7f7]"
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
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                onClick={() => onSave([""])}
                className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditJobSkillsPopup;
