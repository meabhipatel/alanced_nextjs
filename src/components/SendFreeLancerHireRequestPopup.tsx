"use client";
import { AxiosError } from "axios";
import React, { FC, useEffect, useState, MouseEvent } from "react";
import { toast } from "react-hot-toast";
import { IViewProject } from "@/interfaces/index";
import { errorLog } from "@/utils/errorLog";
import { IoMdClose } from "react-icons/io";
import { axiosWithAuth } from "@/utils/axiosWithAuth";

interface IProps {
  closePopup: (id: number) => void;
  freelancerId: number;
  projectTitle?: string;
  projectId?: number;
}

const SendFreeLancerHireRequestPopup: FC<IProps> = ({
  closePopup,
  freelancerId,
  projectTitle,
  projectId,
}) => {
  const [ProjectId, setProjectId] = useState(projectId ?? 0);
  const [Title, setTitle] = useState(projectTitle ?? "");
  const [HiringBudget, setHiringBudget] = useState("");
  const [HiringBudgetType, setHiringBudgetType] = useState("");
  const [msg, setMsg] = useState("");
  const [hirerProjects, setHirerProject] = useState<IViewProject[]>([]);

  /** ---> Preventing click on modal */
  const handleClickInsidePopup = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  /** ---> Fetching hirer projects on load. */
  useEffect(() => {
    if (!projectTitle) {
      handleFetchHirerProjects();
    }
  }, []);

  const handleFetchHirerProjects = async () => {
    try {
      const res = await axiosWithAuth.get(`/freelance/view-all/hirer-self/Project`);
      setHirerProject(res.data.data);
    } catch (error) {
      errorLog(error);
    }
  };

  const handleSentHireRequest = async () => {
    if (!Title || !HiringBudget || !HiringBudgetType || !msg) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axiosWithAuth.post(`/freelance/hire/${freelancerId}`, {
        project: ProjectId,
        project_title: Title,
        hiring_budget: HiringBudget,
        message: msg,
        hiring_budget_type: HiringBudgetType,
      });

      toast.success("Hiring Request Sent Successfully");
      closePopup(freelancerId);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      errorLog(error);
    }
  };

  return (
    <>
      <button
        className="fixed inset-0 z-10 mt-24 overflow-y-auto"
        onClick={handleClickInsidePopup}
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[50%]">
            <button
              onClick={() => closePopup(freelancerId)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={24} />
            </button>
            <div className="flex items-center justify-between">
              <h1 className="text-[26px] font-normal text-[#031136]">Add Data</h1>
            </div>
            <div className="mt-8">
              <h1 className="text-left text-[20px] font-normal text-[#031136]">
                Project Title <span className="text-red-500">*</span>
              </h1>
              {projectTitle ? (
                <input
                  type="text"
                  value={Title}
                  className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Project title"
                  disabled
                />
              ) : (
                <select
                  className="my-2 w-full rounded-md border bg-white px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  name=""
                  value={Title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    const selectedProject = hirerProjects.find(
                      (project) => project.title === e.target.value
                    );
                    if (selectedProject) {
                      setProjectId(selectedProject.id);
                    }
                  }}
                >
                  <option
                    disabled
                    selected
                    value=""
                  >
                    Choose Project Title
                  </option>
                  {hirerProjects.map((project) => (
                    <option
                      key={project.id}
                      value={project.title}
                    >
                      {project.title}
                    </option>
                  ))}
                </select>
              )}

              <h1 className="text-left text-[20px] font-normal text-[#031136]">
                Hiring Budget <span className="text-red-500">*</span>
              </h1>
              <input
                type="number"
                value={HiringBudget}
                onChange={(e) => setHiringBudget(e.target.value)}
                className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                placeholder=""
                required
              />
              <h1 className="text-left text-[20px] font-normal text-[#031136]">
                Budget Type <span className="text-red-500">*</span>
              </h1>
              <select
                className="my-2 w-full rounded-md border bg-white px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="hiring_budget_type"
                value={HiringBudgetType}
                onChange={(e) => setHiringBudgetType(e.target.value)}
                required
              >
                <option
                  disabled
                  selected
                  value=""
                >
                  Choose Budget Type
                </option>
                <option value="Hourly">Hourly</option>
                <option value="Fixed">Fixed</option>
              </select>
              <h1 className="pt-5 text-left text-[20px] font-normal text-[#031136]">
                Message <span className="text-red-500">*</span>
              </h1>
              <textarea
                name=""
                id=""
                cols={30}
                rows={5}
                className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                required
              ></textarea>
              <div className="mt-8 flex justify-end">
                <button onClick={handleSentHireRequest}>
                  <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                    Hire
                  </span>
                </button>
                <button
                  className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                  onClick={() => closePopup(freelancerId)}
                >
                  <div className="bg-white px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </button>
    </>
  );
};

export default SendFreeLancerHireRequestPopup;
