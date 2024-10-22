import React, { useEffect, useState } from "react";

import { useAppSelector } from "@/store/hooks";
import { IoClose } from "react-icons/io5";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
interface IEditEducationPopupProps {
  closeEditEducation: () => void;
  qualification: string;
}

const EditEducationPopup: React.FC<IEditEducationPopupProps> = ({ closeEditEducation }) => {
  const [qualification, setqualification] = useState("");

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

    closeEditEducation();
  };

  return (
    <div className="fixed inset-0 z-10 mt-8 overflow-y-auto sm:overflow-visible">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[700px]">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-[26px] font-normal text-[#031136]">Edit Education</h1>
            <button
              onClick={closeEditEducation}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoClose className="text-3xl" />
            </button>
          </div>
          <div className="mt-10">
            <input
              type="text"
              className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              value={qualification}
              onChange={(e) => setqualification(e.target.value)}
            />

            <div className="mt-8 flex justify-end">
              <button
                className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeEditEducation}
              >
                <button className="rounded-[3px] bg-white px-[5px] py-[6px]">
                  <span className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                    Cancel
                  </span>
                </button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEducationPopup;
