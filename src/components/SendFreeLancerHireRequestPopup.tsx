"use client";
import axios from "axios";
import React, { FC, useEffect, useState, MouseEvent } from "react";
// import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
// import useWebSocket, { ReadyState } from "react-use-websocket";
import useWebSocket from "react-use-websocket";
import { IHirerProfile, IError, IViewProject, IFreelancer } from "@/interfaces/index";
import { errorLog } from "@/utils/errorLog";

interface IProps {
  closeFreeHiring: (id: number) => void;
  free: IFreelancer;
}

const SendFreeLancerHireRequestPopup: FC<IProps> = ({ closeFreeHiring, free }) => {
  const handleClickInsidePopup = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  // const accessToken = useSelector(state => state.login.accessToken);
  //   const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU0NjMzMzI1LCJpYXQiOjE3MjMwOTczMjUsImp0aSI6Ijc1OGU5ZjBkZGU2NzQ2ZDk4MjhiZDAxODA5MjQwNTJkIiwidXNlcl9pZCI6NX0.LPNY-4V5campnDyg7lfVYyQpJN7A9gpMfRkFKFbT3Wk";
  //   const hirer = useSelector((state) => state.login.login_data) || JSON.parse(localStorage.getItem("logindata"));
  const hirer: IHirerProfile = {
    id: 5,
    Company_Name: "",
    first_Name: "sachin",
    last_Name: "sharma",
    email: "sachinsharmaece@gmail.com",
    contact: "",
    Address: "",
    images_logo: "/media/images_logo/admin-profle.png",
    social_media: "",
    about: "",
    DOB: null,
    Company_Establish: null,
    gender: "",
    map: "",
  };
  const [ProjectId, setProjectId] = useState(0);
  const [Title, setTitle] = useState("");
  const [HiringBudget, setHiringBudget] = useState("");
  const [HiringBudgetType, setHiringBudgetType] = useState("");
  const [msg, setMsg] = useState("");
  const id = free.id;
  //   console.log(id, "chkfreelancerrriddddd");
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [totalPages, setTotalPages] = useState(0);
  //   const [searchQuery, setSearchQuery] = useState("");

  const [viewhirerProject, setViewhirerProject] = useState<IViewProject[]>([]);

  function createConversationName() {
    const names = [hirer.id, id].sort();
    return `${names[0]}__${names[1]}`;
  }

  //   const { readyState, sendJsonMessage } = useWebSocket(
  const { sendJsonMessage } = useWebSocket(
    `wss://api.alanced.com:8001/${createConversationName()}`,
    {
      onOpen: () => {
        console.log("Connected !"); //eslint-disable-line
      },
      onClose: () => {
        console.log("Disconnected !"); //eslint-disable-line
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        console.log("data :", data); //eslint-disable-line
      },
    }
  );

  //   const connectionStatus = {
  //     [ReadyState.CONNECTING]: "Connecting",
  //     [ReadyState.OPEN]: "Open",
  //     [ReadyState.CLOSING]: "Closing",
  //     [ReadyState.CLOSED]: "Closed",
  //     [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  //   }[readyState];

  //   console.log("connection status -------------- ", connectionStatus);

  function handleSubmit() {
    sendJsonMessage({
      type: "chat_message",
      message: "you are invited by " + hirer.first_Name,
      name: hirer.id,
    });
  }
  useEffect(() => {
    axios
      .get(`https://www.api.alanced.com/freelance/view-all/hirer-self/Project`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setViewhirerProject(response.data.data);
      })
      .catch((error) => {
        errorLog(error);
      });
  }, []);

  const handleSave = async () => {
    if (!Title || !HiringBudget || !HiringBudgetType || !msg) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `https://www.api.alanced.com/freelance/hire/${id}`,
        {
          project: ProjectId,
          project_title: Title,
          hiring_budget: HiringBudget,
          message: msg,
          hiring_budget_type: HiringBudgetType,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.status === 200) {
        toast.success("Hiring Request Sent Successfully");
        closeFreeHiring(id);
        handleSubmit();
      } else {
        errorLog(response.data.message);
        toast.error(response.data.message);
      }
    } catch (err) {
      //   console.log(err.response.data.message);
      //   toast.error(err.response.data.message);
      const error = err as IError;
      if (error.response && error.response.data && error.response.data.message) {
        errorLog(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        errorLog("An unexpected error occurred");
      }
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
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[26px] font-normal text-[#031136]">Add Data</h1>
              <button
                onClick={() => closeFreeHiring(id)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="mt-8">
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Project Title <span className="text-red-500">*</span>
              </h1>
              <select
                className="my-2 w-full rounded-md border bg-white px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                name=""
                value={Title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  // Find the selected project in the viewhirerProject array and set its id
                  const selectedProject = viewhirerProject.find(
                    (project) => project.title === e.target.value
                  );
                  if (selectedProject) {
                    setProjectId(selectedProject.id);
                    // console.log(selectedProject.id, "chkproidddsec");
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
                {viewhirerProject.map((project) => (
                  <option
                    key={project.id}
                    value={project.title}
                  >
                    {project.title}
                  </option>
                ))}
              </select>

              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
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
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
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
              <h1 className="font-cardo pt-5 text-left text-[20px] font-normal text-[#031136]">
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
                <button onClick={handleSave}>
                  <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                    Hire
                  </span>
                </button>
                <button
                  className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                  onClick={() => closeFreeHiring(id)}
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
      </button>
    </>
  );
};

export default SendFreeLancerHireRequestPopup;
