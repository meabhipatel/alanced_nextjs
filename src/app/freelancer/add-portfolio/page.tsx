"use client";
import React, { useState } from "react";

const PortFolioPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription] = useState("");
  const [projectCategory] = useState("");
  const [skillsUsed] = useState<string[]>([]);
  return (
    <>
      <div className="flex">
        <div className="w-1/4 border-r border-gray-200 bg-white p-6">
          <ul className="space-y-4">
            <li>
              <button
                className={`w-full rounded-lg p-2 text-left font-semibold ${
                  currentStep === 1 ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900"
                }`}
                onClick={() => setCurrentStep(1)}
              >
                Add Portfolio
              </button>
              <button
                className={`w-full rounded-lg p-2 text-left font-semibold ${currentStep === 2 ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900"}`}
                onClick={() => setCurrentStep(2)}
                disabled={!projectTitle || !projectDescription}
              >
                Add Details
              </button>
              <button
                className={`w-full rounded-lg p-2 text-left font-semibold ${currentStep === 3 ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-900"}`}
                onClick={() => setCurrentStep(3)}
                disabled={!projectCategory || skillsUsed.length === 0}
              >
                Select Template
              </button>
            </li>
          </ul>
        </div>
        <div className="w-3/4 p-8">
          {currentStep === 1 && (
            <>
              <h1 className="mb-8 text-2xl font-semibold">Add portfolio Project</h1>
              <div className="mb-6">
                <label
                  htmlFor="project-title"
                  className="mb-2 block text-lg font-medium"
                >
                  Project Title<span className="text-red-600">*</span>
                  <p className="mb-2 text-gray-500">Enter a brief but descriptive title.</p>
                  <input
                    id="project-title"
                    type="text"
                    className="mb-2 block text-lg font-medium"
                    placeholder="Enter a Project Title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                  />
                </label>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PortFolioPage;
