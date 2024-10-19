"use client";
import React, { FC, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import CategoryList from "@/constant/allSelectionData/categoryList";
import SkillsList from "@/constant/allSelectionData/skillsList";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import Loader from "@/components/Loader";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import EditJobBudgetPopup from "./EditJobBudgetPopup";
import { errorLog } from "@/utils/errorLog";

type IExperienceLever = "Entry_Level" | "Intermediate" | "Expert";

interface IHandleUpdateDataParams {
  title?: string;
  description?: string;
  category?: string;
  skills_required?: string;
  deadline?: string;
  experience_level?: string;
  rate?: string;
  fixed_budget?: number;
  min_hourly_rate?: number;
  max_hourly_rate?: number;
}

interface IProps {
  params: {
    projectId: string;
  };
}

const EditJobDetails: FC<IProps> = ({ params: { projectId } }) => {
  const router = useRouter();
  const { data } = useAppSelector((state) => state.hirer.hirerSelfProjects);
  const project = data.results.find((item) => item.id === +projectId);

  /** ---> All state goes here ---->  */
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);
  const [category, setCategory] = useState(project?.category);
  // const [skills, setSkills] = useState(project?.skills_required);
  const [deadline, setDeadline] = useState(project?.deadline);
  const [experienceLevel, setExperienceLevel] = useState<IExperienceLever>(
    project?.experience_level ?? "Entry_Level"
  );
  const [rate, setRate] = useState(project?.Project_Rate ?? "");
  const [fixedBudget, setFixedBudget] = useState(project?.Project_Fixed_Budget ?? 0);
  const [minHourlyRate, setMinHourlyRate] = useState(project?.Project_Min_Hourly_Rate ?? 0);
  const [maxHourlyRate, setMaxHourlyRate] = useState(project?.Project_Max_Hourly_Rate ?? 0);
  const [skills, setSkills] = useState<string[]>([]);

  /** ----> Saving...... */

  const handleSaveTitle = () => {
    if (title) {
      handleUpdateData({ title });
      setIsTitleModalOpen(false);
    }
  };

  const handleSaveDescription = () => {
    if (description) {
      handleUpdateData({ description });
      setIsDescriptionModalOpen(false);
    }
  };

  const handleSaveCategory = () => {
    if (category) {
      handleUpdateData({ category });
      setIsCategoryModalOpen(false);
    }
  };

  const handleSaveSkills = () => {
    setIsSkillsModalOpen(false);
  };

  const handleSaveScope = () => {
    if (experienceLevel && deadline) {
      handleUpdateData({ experience_level: experienceLevel, deadline: formatToDDMMYYYY(deadline) });
      setIsScopeModalOpen(false);
    }
  };

  const handleSaveBudget = () => {
    handleUpdateData({
      rate: rate,
      fixed_budget: rate === "Hourly" ? 0 : (fixedBudget ?? 0),
      min_hourly_rate: rate === "Fixed" ? 0 : (minHourlyRate ?? 0),
      max_hourly_rate: rate === "Fixed" ? 0 : (maxHourlyRate ?? 0),
    });
    setIsBudgetModalOpen(false);
  };

  const toggleSkillSelection = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  /** ---> Updating data on database */
  const handleUpdateData = async (updatedData: IHandleUpdateDataParams) => {
    try {
      await axiosWithAuth.put(`/freelance/update/project/${projectId}`, updatedData);
      toast.success("Job Details updated Successfully");
    } catch (error) {
      errorLog(error);
      if (error instanceof AxiosError) {
        toast.success(error.response?.data.message);
      }
    }
  };

  const formatToDDMMYYYY = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  /** ---> Redirecting to all jobs page if there is no project available. */
  if (!project) {
    router.replace("/hirer/all-jobs");
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <Loader
          size="lg"
          color="primary"
        />
      </div>
    );
  }

  return (
    <>
      <div className="container sm:px-5 md:px-10 lg:px-20">
        <div className="mb-4 text-2xl font-bold">Edit Job Post</div>

        {/* Title Section */}
        <div className="rounded-lg border border-gray-300 px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-left text-lg font-semibold">{title}</div>
            </div>
            <div className="flex flex-col space-y-2">
              <FaPencil
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsTitleModalOpen(true)}
                aria-label="Edit title"
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6 rounded-lg border border-gray-300 px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-left text-gray-500">{description}</div>
            </div>
            <div className="flex flex-col space-y-2">
              <FaPencil
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsDescriptionModalOpen(true)}
                aria-label="Edit description"
              />
            </div>
          </div>
        </div>

        {/* Category Section */}
        <div className="mt-6 rounded-lg border border-gray-300 px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="text-left text-lg font-semibold">Category</div>
            <div className="flex flex-col space-y-2">
              <FaPencil
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsCategoryModalOpen(true)}
                aria-label="Edit category"
              />
            </div>
          </div>
          <div className="mt-4 text-blue-600">{category || "Select a category"}</div>
        </div>

        {/* Skills Section */}
        <div className="mt-6 rounded-lg border border-gray-300 px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="text-left text-lg font-semibold">Skills</div>
            <div className="flex flex-col space-y-2">
              <FaPencil
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsSkillsModalOpen(true)}
                aria-label="Edit skills"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.skills_required &&
              (() => {
                try {
                  const skillsArray = JSON.parse(
                    project.skills_required.replace(/'/g, '"') ?? "[]"
                  ) as string[];
                  return skillsArray.map((skill, index) => (
                    <div
                      key={index}
                      className="my-2 mr-3 inline-block rounded-full bg-[#b4d3c3] bg-opacity-[60%] px-4 py-1 text-sm font-semibold text-blue-800 duration-500 hover:bg-[#c1e2d1] focus:outline-none dark:bg-[#b4d3c3] dark:hover:bg-[#dffdee]"
                    >
                      <p className="text-center">{skill}</p>
                    </div>
                  ));
                } catch (error) {
                  return null;
                }
              })()}
          </div>
        </div>

        {/* Scope Section */}
        <div className="mt-6 rounded-lg border border-gray-300 px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="text-left text-lg font-semibold">Scope</div>
            <div className="flex flex-col space-y-2">
              <FaPencil
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsScopeModalOpen(true)}
                aria-label="Edit scope"
              />
            </div>
          </div>
          <div className="mt-4">
            <div>Project Deadline: {deadline}</div>
            <div>Experience Level: {experienceLevel}</div>
          </div>
        </div>

        {/* budget */}
        <div className="mt-6 rounded-lg border border-gray-300 px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="text-left text-lg font-semibold">Budget</div>
            <div className="flex flex-col space-y-2">
              <FaPencil
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setIsBudgetModalOpen(true)}
                aria-label="Edit budget"
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              Amount: ${" "}
              {rate === "Hourly"
                ? minHourlyRate + "/hr" + " - " + "$" + maxHourlyRate + "/hr"
                : fixedBudget}
            </div>
            <div>Rate Type: {rate}</div>
          </div>
        </div>

        {/* ---> Modals Starts <--- */}

        {/* Title Modal */}
        {isTitleModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Title</h2>
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsTitleModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTitle}
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Description Modal */}
        {isDescriptionModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Description</h2>
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsDescriptionModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveDescription}
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Category</h2>
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Select a category</option>
                  {CategoryList.map((cat) => (
                    <option
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="mt-6 flex justify-end">
                  <button
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsCategoryModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCategory}
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Modal */}
        {isSkillsModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Skills</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveSkills();
                }}
              >
                <div className="max-h-64 overflow-y-auto">
                  {SkillsList.map((skill) => (
                    <div
                      key={skill}
                      className="mb-2 flex items-center"
                    >
                      <input
                        type="checkbox"
                        id={skill}
                        checked={skills.includes(skill)}
                        onChange={() => toggleSkillSelection(skill)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={skill}
                        className="text-sm"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsSkillsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Scope Modal */}
        {isScopeModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Scope</h2>
              <div>
                <label
                  htmlFor="project-deadline"
                  className="mb-2 block text-sm"
                >
                  Project Deadline
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />

                <label
                  htmlFor="project-experience"
                  className="mb-2 mt-4 block text-sm"
                >
                  Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as IExperienceLever)}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="Entry_Level">Entry Level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={() => setIsScopeModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveScope}
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Budget Modal */}
        {isBudgetModalOpen && (
          <EditJobBudgetPopup
            rate={rate}
            fixed_budget={fixedBudget}
            min_hourly_rate={minHourlyRate}
            max_hourly_rate={maxHourlyRate}
            setRate={setRate}
            setFixedBudget={setFixedBudget}
            setMinHourlyRate={setMinHourlyRate}
            setMaxHourlyRate={setMaxHourlyRate}
            onClose={() => setIsBudgetModalOpen(false)}
            onSave={handleSaveBudget}
          />
        )}
      </div>
    </>
  );
};

export default EditJobDetails;
