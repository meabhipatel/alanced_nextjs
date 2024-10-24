import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import DesignationList from "@/constant/allSelectionData/DesignationList";
import { errorLog } from "@/utils/errorLog";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import { IoClose } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";

interface IEmployment {
  emp_id: number;
  Freelancer_Company_Name: string;
  Company_Designation: string;
  Company_Joining_date: string;
  Company_Leaving_date?: string | null;
  design_by: string | null;
}

interface IProps {
  closeEditEmployment: () => void;
  employment: IEmployment | null;
  handleFetchEmployment: () => void;
}

const EditEmploymentPopup: React.FC<IProps> = ({
  closeEditEmployment,
  employment,
  handleFetchEmployment,
}) => {
  const formatToYYYYMMDD = (dateStr: string) => {
    if (!dateStr) return "";
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatToDDMMYYYY = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const id = employment?.emp_id;
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(!employment?.Company_Leaving_date);
  const [companyname, setCompanyname] = useState(employment?.Freelancer_Company_Name || "");
  const [designation, setDesignation] = useState(employment?.Company_Designation || "");
  const [joindate, setJoindate] = useState(
    formatToDDMMYYYY(employment?.Company_Joining_date || "")
  );
  const [leavedate, setLeavedate] = useState(
    formatToDDMMYYYY(employment?.Company_Leaving_date || "")
  );

  useEffect(() => {
    setIsCurrentlyWorking(!leavedate);
  }, [leavedate]);

  const handleSave = async () => {
    try {
      const updatedData = {
        Freelancer_Company_Name: companyname,
        Company_Designation: designation,
        Company_Joining_date: joindate,
        Company_Leaving_date: isCurrentlyWorking ? null : leavedate,
      };

      const res = await axiosWithAuth.put(
        `/freelance/update/Freelancer/Employment/${id}`,
        updatedData
      );
      toast.success(res.data.message);
      handleFetchEmployment();
      closeEditEmployment();
    } catch (error) {
      errorLog(error);
    }
  };

  const [cate] = useState(DesignationList);

  return (
    <div className="fixed inset-0 z-10 mt-14 overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[61%]">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-[26px] font-normal text-[#031136]">Edit Employment</h1>
            <button
              onClick={closeEditEmployment}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoClose className="text-3xl" />
            </button>
          </div>
          <div className="mt-10">
            <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
              Company Name
            </h1>
            <input
              type="text"
              className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Ex: Wiz91"
              onChange={(e) => setCompanyname(e.target.value)}
              name="Freelancer_Company_Name"
              value={companyname}
            />
            <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
              Designation
            </h1>

            <select
              onChange={(e) => setDesignation(e.target.value)}
              className="mb-6 mt-2 w-full rounded-md border bg-white px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              name="Company_Designation"
              value={designation}
            >
              <option
                disabled
                selected
                value=""
              >
                Select a Role
              </option>
              {cate.map((cat, index) => (
                <option
                  key={index}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>
            <div className="flex items-center justify-between">
              <div className="mr-2 flex-1">
                <p className="font-cardo text-left text-[18px] font-normal text-[#031136] opacity-50">
                  From
                </p>
                <input
                  type="date"
                  className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Start Date"
                  name="Company_Joining_date"
                  value={formatToYYYYMMDD(joindate)}
                  onChange={(e) => setJoindate(formatToDDMMYYYY(e.target.value))}
                />
              </div>
              <div className="ml-2 flex-1">
                <p className="font-cardo text-left text-[18px] font-normal text-[#031136] opacity-50">
                  To
                </p>
                <input
                  type="date"
                  className={`mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600 ${isCurrentlyWorking ? "cursor-not-allowed bg-gray-100" : ""}`}
                  placeholder="End Date"
                  name="Company_Leaving_date"
                  disabled={isCurrentlyWorking}
                  value={formatToYYYYMMDD(leavedate)}
                  onChange={(e) => setLeavedate(formatToDDMMYYYY(e.target.value))}
                />
              </div>
            </div>

            <label className="font-inter relative mb-4 flex cursor-pointer items-center">
              <input
                className="hidden"
                type="checkbox"
                onChange={() => setIsCurrentlyWorking(!isCurrentlyWorking)}
                checked={isCurrentlyWorking}
              />
              <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                <span className="checkmark hidden">
                  <FaCheck className="text-sm" />
                </span>
              </div>
              <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
              <span className="font-normal opacity-50">I Currently Work Here</span>
            </label>
            <div className="mt-8 flex justify-end">
              <button onClick={handleSave}>
                <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                  Save
                </span>
              </button>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeEditEmployment}
              >
                <button>
                  <button className="bg-white px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </button>
                </button>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEmploymentPopup;
