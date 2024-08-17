import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
Link;
// import {
//   GetFreelancerSelfProfileAction,
//   UpdateFreelancerProfileAction,
// } from "../../../redux/Freelancer/FreelancerAction";
import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import { IoClose } from "react-icons/io5";

interface IEditExperienceLevelPopupProps {
  closeExperienceLevel: () => void;
}

const EditExperienceLevelPopup: React.FC<IEditExperienceLevelPopupProps> = ({
  closeExperienceLevel,
}) => {
  //   const accessToken = useSelector(state => state.login.accessToken);
  //   const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");

  const [experiencelevel, setexperiencelevel] = useState("");
  //   const dispatch = useDispatch();
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);
  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile) {
      setexperiencelevel(freelancerselfprofile.experience_level);
    }
  }, [freelancerselfprofile]);

  const handleSave = () => {
    // dispatch(UpdateFreelancerProfileAction({ experience_level: experiencelevel }, accessToken));
    closeExperienceLevel();
    // dispatch(GetFreelancerSelfProfileAction(accessToken));
  };

  return (
    <div className="fixed inset-0 z-10 mt-8 overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[53%]">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-[26px] font-normal text-[#031136]">
              {experiencelevel && experiencelevel.length > 0
                ? "Edit Experience Level"
                : "Add Experience Level"}
            </h1>
            <button
              onClick={closeExperienceLevel}
              className="text-gray-500 hover:text-gray-700"
            >
              {/* <i className="bi bi-x-lg"></i> */}
              <IoClose className="text-3xl" />
            </button>
          </div>
          <div className="mt-10">
            {/* <input type="text" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' value={experiencelevel} onChange={e => setexperiencelevel(e.target.value)}/> */}
            <select
              className="mb-6 mt-2 w-full rounded-md border bg-white px-2 py-2 opacity-50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={experiencelevel}
              onChange={(e) => setexperiencelevel(e.target.value)}
            >
              <option value="Entry_Level">Entry Level</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
            <div className="mt-8 flex justify-end">
              <Link
                href=""
                onClick={handleSave}
              >
                <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                  Save
                </span>
              </Link>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeExperienceLevel}
              >
                <Link href="">
                  <button className="bg-white px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </button>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExperienceLevelPopup;
