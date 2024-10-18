"use client";
import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import CategoryList from "@/constant/allSelectionData/categoryList";
import SkillsList from "@/constant/allSelectionData/skillsList";

const Page = () => {
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);

  const [title, setTitle] = useState("CRM Application");
  const [description, setDescription] = useState("CRM application for real estate deals.");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [projectDeadline, setProjectDeadline] = useState<Date | null>(null);
  const [experienceLevel, setExperienceLevel] = useState("Entry Level");

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [newDeadline, setNewDeadline] = useState<Date | null>(null);
  const [newExperienceLevel, setNewExperienceLevel] = useState("Entry Level");
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState<number | null>(null);
  const [newRateType, setNewRateType] = useState<"Fixed" | "Hourly">("Fixed");

  const handleEditTitleClick = () => {
    setNewTitle(title);
    setIsTitleModalOpen(true);
  };

  const handleEditDescriptionClick = () => {
    setNewDescription(description);
    setIsDescriptionModalOpen(true);
  };

  const handleEditCategoryClick = () => {
    setNewCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleEditBudgetClick = () => setIsBudgetModalOpen(true);
  const handleCloseBudgetModal = () => setIsBudgetModalOpen(false);
  const handleSaveBudget = () => {
    setIsBudgetModalOpen(false);
  };

  const handleEditSkillsClick = () => {
    setSelectedSkills(skills);
    setIsSkillsModalOpen(true);
  };

  const handleEditScopeClick = () => {
    setNewDeadline(projectDeadline);
    setNewExperienceLevel(experienceLevel);
    setIsScopeModalOpen(true);
  };

  const handleCloseTitleModal = () => setIsTitleModalOpen(false);
  const handleCloseDescriptionModal = () => setIsDescriptionModalOpen(false);
  const handleCloseCategoryModal = () => setIsCategoryModalOpen(false);
  const handleCloseSkillsModal = () => setIsSkillsModalOpen(false);
  const handleCloseScopeModal = () => setIsScopeModalOpen(false);

  const handleSaveTitle = () => {
    setTitle(newTitle);
    handleCloseTitleModal();
  };

  const handleSaveDescription = () => {
    setDescription(newDescription);
    handleCloseDescriptionModal();
  };

  const handleSaveCategory = () => {
    setCategory(newCategory);
    handleCloseCategoryModal();
  };

  const handleSaveSkills = () => {
    setSkills(selectedSkills);
    handleCloseSkillsModal();
  };

  const handleSaveScope = () => {
    setProjectDeadline(newDeadline);
    setExperienceLevel(newExperienceLevel);
    handleCloseScopeModal();
  };

  const toggleSkillSelection = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

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
                onClick={handleEditTitleClick}
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
                onClick={handleEditDescriptionClick}
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
                onClick={handleEditCategoryClick}
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
                onClick={handleEditSkillsClick}
                aria-label="Edit skills"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-blue-500 px-4 py-2 text-sm text-white"
                >
                  {skill}
                </span>
              ))
            ) : (
              <div className="text-gray-500">Select required skills</div>
            )}
          </div>
        </div>

        {/* Scope Section */}
        <div className="mt-6 rounded-lg border border-gray-300 px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="text-left text-lg font-semibold">Scope</div>
            <div className="flex flex-col space-y-2">
              <FaPencil
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={handleEditScopeClick}
                aria-label="Edit scope"
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              Project Deadline: {projectDeadline ? projectDeadline.toDateString() : "Not set"}
            </div>
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
                onClick={handleEditBudgetClick}
                aria-label="Edit budget"
              />
            </div>
          </div>
          <div className="mt-4">
            <div>Amount: ${newBudget ? newBudget : "Not specified"}</div>
            <div>Rate Type: {newRateType}</div>
          </div>
        </div>

        {/* Modals */}

        {/* Title Modal */}
        {isTitleModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Title</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveTitle();
                }}
              >
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={handleCloseTitleModal}
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

        {/* Description Modal */}
        {isDescriptionModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Description</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveDescription();
                }}
              >
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                ></textarea>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={handleCloseDescriptionModal}
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

        {/* Category Modal */}
        {isCategoryModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Category</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveCategory();
                }}
              >
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
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
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={handleCloseCategoryModal}
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
                        checked={selectedSkills.includes(skill)}
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
                    onClick={handleCloseSkillsModal}
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveScope();
                }}
              >
                <label
                  htmlFor="project-deadline"
                  className="mb-2 block text-sm"
                >
                  Project Deadline
                </label>
                <input
                  type="date"
                  value={newDeadline ? newDeadline.toISOString().substring(0, 10) : ""}
                  onChange={(e) => setNewDeadline(new Date(e.target.value))}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />

                <label
                  htmlFor="project-experience"
                  className="mb-2 mt-4 block text-sm"
                >
                  Experience Level
                </label>
                <select
                  value={newExperienceLevel}
                  onChange={(e) => setNewExperienceLevel(e.target.value)}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={handleCloseScopeModal}
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
        {/* Budget Modal */}

        {isBudgetModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md rounded-lg bg-white p-8">
              <h2 className="mb-4 text-xl font-semibold">Edit Budget</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveBudget();
                }}
              >
                <label
                  htmlFor="budget-amount"
                  className="mb-2 block text-sm"
                >
                  Budget Amount
                </label>
                <input
                  type="number"
                  value={newBudget ?? ""}
                  onChange={(e) => setNewBudget(parseFloat(e.target.value))}
                  className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter budget"
                />

                <label
                  htmlFor="project-rate"
                  className="mb-2 mt-4 block text-sm"
                >
                  Rate Type
                </label>
                <div className="mb-4 flex items-center">
                  <input
                    type="radio"
                    id="fixed"
                    name="rateType"
                    value="Fixed"
                    checked={newRateType === "Fixed"}
                    onChange={() => setNewRateType("Fixed")}
                    className="mr-2"
                  />
                  <label
                    htmlFor="fixed"
                    className="text-sm"
                  >
                    Fixed Rate
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="hourly"
                    name="rateType"
                    value="Hourly"
                    checked={newRateType === "Hourly"}
                    onChange={() => setNewRateType("Hourly")}
                    className="mr-2"
                  />
                  <label
                    htmlFor="hourly"
                    className="text-sm"
                  >
                    Hourly Rate
                  </label>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                    onClick={handleCloseBudgetModal}
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
      </div>
    </>
  );
};

export default Page;
