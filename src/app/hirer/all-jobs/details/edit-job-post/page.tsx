"use client";
import React, { useState } from "react";
import { FaPencil } from "react-icons/fa6";
import CategoryList from "@/constant/allSelectionData/categoryList";
import SkillsList from "@/constant/allSelectionData/skillsList";

//interface JobData {
// title: string;
// description: string;
// deadline: string;
//}

const Page = () => {
  //const [isScopeModalOpen, setIsScopeModalOpen] = useState(false);
  //const [newScope] = useState("");
  //const [projectDeadline] = useState<Date | null>(null);
  //const [experienceLevel] = useState("Entry Level");
  const [isTitleModalOpen, setIsTitleModalOpen] = useState(false);
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);

  const [title, setTitle] = useState("CRM Application");
  const [description, setDescription] = useState("CRM application for real estate deals.");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

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

  const handleEditSkillsClick = () => {
    setSelectedSkills(skills);
    setIsSkillsModalOpen(true);
  };

  const handleCloseTitleModal = () => setIsTitleModalOpen(false);
  const handleCloseDescriptionModal = () => setIsDescriptionModalOpen(false);
  const handleCloseCategoryModal = () => setIsCategoryModalOpen(false);
  const handleCloseSkillsModal = () => setIsSkillsModalOpen(false);
  //const handleCloseScopeModal = () => setIsScopeModalOpen(false);

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

  const toggleSkillSelection = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <>
      <div className="container sm:px-5 md:px-10 lg:px-20">
        <div className="text-2xl font-bold">Edit Job Post</div>
        <div className="rounded-lg border border-gray-300 px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-left text-lg font-semibold">{title}</div>
              <div className="text-left text-gray-500">{description}</div>
            </div>
            <div className="flex flex-col space-y-2">
              <FaPencil
                className="cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={handleEditTitleClick}
                aria-label="Edit title"
              />
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
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter title"
                    className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    aria-required="true"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseTitleModal}
                    className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700"
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
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter title"
                    className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    aria-required="true"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseDescriptionModal}
                    className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700"
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
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    aria-required="true"
                  >
                    <option value="">Select a category</option>
                    {CategoryList.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseCategoryModal}
                    className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700"
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
                <div className="mb-4">
                  <label
                    htmlFor="skills"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Skills
                  </label>
                  <div
                    className="flex max-h-40 flex-wrap gap-2 overflow-y-auto"
                    id="skills"
                    role="group"
                    aria-labelledby="skills"
                  >
                    {SkillsList.map((skill) => (
                      <button
                        key={skill}
                        type="button"
                        className={`rounded-full px-4 py-2 text-sm ${
                          selectedSkills.includes(skill)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                        onClick={() => toggleSkillSelection(skill)}
                        aria-pressed={selectedSkills.includes(skill)}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseSkillsModal}
                    className="mr-2 rounded-md bg-gray-500 px-4 py-2 text-sm text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-700"
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
