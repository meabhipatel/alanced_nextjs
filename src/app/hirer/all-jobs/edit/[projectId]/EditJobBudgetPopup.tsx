import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { BsStopwatch } from "react-icons/bs";
import { IoIosPricetag } from "react-icons/io";

interface IProps {
  rate: string;
  fixed_budget: number | null;
  min_hourly_rate: number | null;
  max_hourly_rate: number | null;
  setRate: Dispatch<SetStateAction<string>>;
  setFixedBudget: Dispatch<SetStateAction<number>>;
  setMinHourlyRate: Dispatch<SetStateAction<number>>;
  setMaxHourlyRate: Dispatch<SetStateAction<number>>;
  onClose: () => void;
  onSave: () => void;
}

const EditJobBudgetPopup: FC<IProps> = ({
  rate,
  fixed_budget,
  min_hourly_rate,
  max_hourly_rate,
  setRate,
  setFixedBudget,
  setMinHourlyRate,
  setMaxHourlyRate,
  onClose,
  onSave,
}) => {
  const [selectedOption, setSelectedOption] = useState(rate);

  const selectOptionHandler = (option: string) => {
    setSelectedOption(option);
    setRate(option === "Hourly" ? "Hourly" : "Fixed");
  };

  return (
    <>
      <div className="fixed inset-0 z-10 mt-12 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[50%]">
            <div className="flex items-center justify-between">
              <h1 className="font-cardo text-[26px] font-normal text-[#031136]">
                Edit Project Budget
              </h1>
            </div>
            <div className="mt-8">
              <div className="flex-1">
                <div className="mb-8 flex w-full flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <button
                    className={`flex w-full items-center border p-4 sm:block sm:flex-1 ${selectedOption === "Hourly" ? "border-blue-600" : ""} h-[120px] cursor-pointer transition duration-300 hover:border-blue-600 hover:shadow-md sm:h-auto`}
                    onClick={() => selectOptionHandler("Hourly")}
                  >
                    <BsStopwatch className="text-3xl text-blue-600" />
                    <p className="font-cardo text-left text-2xl lg:pt-3">Hourly Rate</p>
                  </button>
                  <button
                    className={`flex w-full items-center border p-4 sm:block sm:flex-1 ${selectedOption === "Fixed" ? "border-blue-600" : ""} h-[120px] cursor-pointer transition duration-300 hover:border-blue-600 hover:shadow-md sm:h-auto`}
                    onClick={() => selectOptionHandler("Fixed")}
                  >
                    <IoIosPricetag className="text-3xl text-blue-600" />
                    <p className="font-cardo text-left text-2xl lg:pt-3">Fixed Budget</p>
                  </button>
                </div>

                <div className="min-h-[200px]">
                  {selectedOption === "Hourly" && (
                    <div>
                      <div className="flex space-x-16">
                        <div className="flex flex-col">
                          <label
                            className="font-cardo mt-3 block text-xl"
                            htmlFor="fromInput"
                          >
                            From
                          </label>
                          <div className="flex items-center">
                            <input
                              id="fromInput"
                              type="number"
                              placeholder=""
                              className="my-1 mr-1 w-full flex-1 rounded-md border p-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                              value={String(min_hourly_rate) ?? ""}
                              onChange={(e) => setMinHourlyRate(Number(e.target.value))}
                            />
                            <span>/hr</span>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <label
                            className="font-cardo mt-3 block text-xl"
                            htmlFor="toInput"
                          >
                            To
                          </label>
                          <div className="flex items-center">
                            <input
                              id="toInput"
                              type="number"
                              placeholder=""
                              className="my-2 mr-1 w-full flex-1 rounded-md border p-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                              value={String(max_hourly_rate) ?? ""}
                              onChange={(e) => setMaxHourlyRate(Number(e.target.value))}
                            />
                            <span>/hr</span>
                          </div>
                        </div>
                      </div>
                      <p className="font-cardo py-4 text-lg font-medium opacity-50">
                        Set your Hourly Rate
                      </p>
                    </div>
                  )}

                  {selectedOption === "Fixed" && (
                    <div>
                      <label
                        className="font-cardo mt-3 block text-xl"
                        htmlFor="maxBudgetInput"
                      >
                        Maximum Budget
                      </label>
                      <input
                        id="maxBudgetInput"
                        type="number"
                        className="my-2 w-full rounded-md border p-2 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        placeholder=""
                        value={String(fixed_budget) ?? ""}
                        onChange={(e) => setFixedBudget(Number(e.target.value))}
                      />
                      <p className="font-cardo py-4 text-lg font-medium opacity-50">
                        Set your Project Budget
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="mr-4 rounded-md bg-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-400"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  onClick={onSave}
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditJobBudgetPopup;
