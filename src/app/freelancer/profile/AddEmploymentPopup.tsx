import React, { ChangeEvent, useState } from "react";

import DesignationList from "@/constant/allSelectionData/DesignationList";
import { IoClose } from "react-icons/io5";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";

interface IAddEmploymentPopup {
  closeAddEmployment: () => void;
}

interface IEmploymentDetails {
  Freelancer_Company_Name: string;
  Company_Designation: string;
  Company_Joining_date: string;
  Company_Leaving_date: string;
}

const AddEmploymentPopup: React.FC<IAddEmploymentPopup> = ({ closeAddEmployment }) => {
  const [AddEmployment, setAddEmployment] = useState<IEmploymentDetails>({
    Freelancer_Company_Name: "",
    Company_Designation: "",
    Company_Joining_date: "",
    Company_Leaving_date: "",
  });

  const AddEmploymentData = async () => {
    const formData = new URLSearchParams();
    formData.append("Freelancer_Company_Name", AddEmployment.Freelancer_Company_Name);
    formData.append("Company_Designation", AddEmployment.Company_Designation);
    formData.append("Company_Joining_date", AddEmployment.Company_Joining_date);
    formData.append("Company_Leaving_date", AddEmployment.Company_Leaving_date);

    const res = await axiosWithAuth.post("freelance/Add/Freelancer/Employment", formData);
    toast.success(res.data.message);

    closeAddEmployment();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;

    if (e.target.name === "Company_Joining_date") {
      value = formatToDDMMYYYY(value);
    }
    if (e.target.name === "Company_Leaving_date") {
      value = formatToDDMMYYYY(value);
    }

    setAddEmployment((prevEmployment) => ({
      ...prevEmployment,
      [e.target.name]: value,
    }));
  };

  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(true);

  const formatToDDMMYYYY = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const [cate] = useState(DesignationList);

  return (
    <div className="fixed inset-0 z-10 mt-14 overflow-y-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex min-h-screen items-center justify-center">
        <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[61%]">
          <div className="flex items-center justify-between">
            <h1 className="font-cardo text-[26px] font-normal text-[#031136]">Add Employment</h1>
            <button
              onClick={closeAddEmployment}
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
              onChange={onChange}
              name="Freelancer_Company_Name"
            />
            <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
              Designation
            </h1>

            <select
              onChange={onChange}
              className="mb-6 mt-2 w-full rounded-md border bg-white px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              name="Company_Designation"
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
                  onChange={onChange}
                  name="Company_Joining_date"
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
                  onChange={onChange}
                  name="Company_Leaving_date"
                  disabled={isCurrentlyWorking}
                />
              </div>
            </div>

            <label className="font-inter relative mb-4 flex cursor-pointer items-center">
              <input
                className="hidden"
                type="checkbox"
                defaultChecked={true}
                onChange={() => setIsCurrentlyWorking((prev) => !prev)}
              />
              <div className="checkbox-border-gradient mr-3 flex h-5 w-5 items-center justify-center rounded bg-transparent">
                <span className="checkmark hidden">
                  <FaCheck className="text-sm" />
                </span>
              </div>
              <span className="normal-checkbox mr-3 inline-block h-5 w-5 rounded border border-gray-300"></span>
              <span className="font-normal opacity-50">I Am Currently Working Here</span>
            </label>
            <div className="mt-8 flex justify-end">
              <button onClick={AddEmploymentData}>
                <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                  Add
                </span>
              </button>
              <button
                className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                onClick={closeAddEmployment}
              >
                <button>
                  <button className="rounded-[3px] bg-white px-2 py-1">
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

export default AddEmploymentPopup;
