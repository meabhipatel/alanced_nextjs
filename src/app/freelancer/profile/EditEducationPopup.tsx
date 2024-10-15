import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import Link from "next/link";
// import {
//   GetFreelancerSelfProfileAction,
//   UpdateFreelancerProfileAction,
// } from "../../../redux/Freelancer/FreelancerAction";
import { useAppSelector } from "@/store/hooks";
import { IoClose } from "react-icons/io5";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
interface IEditEducationPopupProps {
  closeEditEducation: () => void;
  qualification: string;
}

const EditEducationPopup: React.FC<IEditEducationPopupProps> = ({ closeEditEducation }) => {
  //   const accessToken = useSelector(state => state.login.accessToken);
  //   const accessToken = useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");

  const [qualification, setqualification] = useState("");
  //   const dispatch = useDispatch();
  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);
  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile) {
      setqualification(freelancerselfprofile.qualification);
    }
  }, [freelancerselfprofile]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("qualification", qualification);
    const res = await axiosWithAuth.put("/account/freelancer/profile/update", formData);
    toast.success(res.data.message);
    // dispatch(UpdateFreelancerProfileAction({ qualification }, accessToken));
    closeEditEducation();
    // dispatch(GetFreelancerSelfProfileAction(accessToken));
  };

  return (
    <div className="fixed inset-0 z-10 mt-8 overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[53%]">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-[26px] font-normal text-[#031136]">Edit Education</h1>
            <button
              onClick={closeEditEducation}
              className="text-gray-500 hover:text-gray-700"
            >
              {/* <i className="bi bi-x-lg"></i> */}
              <IoClose className="text-3xl" />
            </button>
          </div>
          <div className="mt-10">
            {/* <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Edit Qualification</h1> */}
            <input
              type="text"
              className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={qualification}
              onChange={(e) => setqualification(e.target.value)}
            />
            {/* <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left"></h1>
            <div className="flex justify-between items-center mt-2 mb-6">
        <select className="border py-2 px-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 mr-5 flex-1 bg-white opacity-50" defaultValue={startdate}>
            <option value="" disabled selected>{startdate}</option>
            {Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, idx) => 1980 + idx).map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>
        <select className="border py-2 px-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 flex-1 bg-white opacity-50" defaultValue={enddate}>
            <option value="" disabled selected>{enddate}</option>
            {Array.from({ length: new Date().getFullYear() - 1980 + 1 + 4 }, (_, idx) => 1980 + idx).map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
        </select>
            </div>
            
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Degree</h1>
            <select className="border mt-2 mb-6 py-2 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white opacity-50" defaultValue={qualification}>
            <option value="" disabled selected>{qualification}</option>
            {degrees.map(degree => (
                <option key={degree} value={degree}>{degree}</option>
            ))}
        </select>
            <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Area of Study (Optional) </h1>
            <input type="text" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' defaultValue={stream}/> */}
            {/* <h1 className="font-cardo text-[20px] text-[#031136] font-normal text-left">Description (Optional)</h1>
            <textarea name="" id="" cols="30" rows="5" className='border mt-2 mb-6 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600'></textarea> */}
            <div className="mt-8 flex justify-end">
              <button
                // href=""
                className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white"
                onClick={handleSave}
              >
                {/* <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white"> */}
                Save
                {/* </span> */}
              </button>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeEditEducation}
              >
                {/* <Link href=""> */}
                <button className="rounded-[2px] bg-white px-[5px] py-[6px]">
                  <span className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                    Cancel
                  </span>
                </button>
                {/* </Link> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEducationPopup;
