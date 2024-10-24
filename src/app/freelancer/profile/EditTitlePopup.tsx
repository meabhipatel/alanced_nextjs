import React, { useEffect, useRef, useState } from "react";

import CategoryList from "@/constant/allSelectionData/categoryList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { handleGetUpdatedProfileAsync } from "@/store/features/auth/authApi";

interface IEditTitlePoup {
  closeEditTitle: () => void;
}

const EditTitlePopup: React.FC<IEditTitlePoup> = ({ closeEditTitle }) => {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const freelancerselfprofile = useAppSelector((state) => state.auth.userProfile);

  useEffect(() => {
    if (freelancerselfprofile && freelancerselfprofile) {
      setCategory(freelancerselfprofile.category);
      setDescription(freelancerselfprofile.about);
    }
  }, [freelancerselfprofile]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("category", category);
    formData.append("about", description);

    const res = await axiosWithAuth.put("/account/freelancer/profile/update", formData);
    dispatch(handleGetUpdatedProfileAsync());
    toast.success(res.data.message);

    closeEditTitle();
  };

  const [categories] = useState(CategoryList.sort());

  const [searchTerm, setSearchTerm] = useState(category || "");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10 mt-12 overflow-y-auto">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative z-20 w-[90%] rounded-lg bg-white p-6 px-8 md:w-[50%]">
            <div className="flex items-center justify-between">
              {/* <h1 className="font-cardo text-[26px] text-[#031136] font-normal">Edit About Me Section</h1> */}
              <h1 className="font-cardo text-[26px] font-normal text-[#031136]">
                {category && category.length > 0 ? "Edit Profile" : "Add Profile"}
              </h1>
              <button
                onClick={closeEditTitle}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoClose className="text-3xl" />
              </button>
            </div>
            <div className="mt-8">
              <h1 className="text-left text-[20px] font-normal text-[#031136]">Your Designation</h1>

              <div
                ref={wrapperRef}
                className="relative"
              >
                <input
                  type="text"
                  value={category}
                  onClick={() => setIsOpen(!isOpen)}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCategory(e.target.value);
                    setIsOpen(true);
                  }}
                  className="my-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  placeholder="Select Category"
                />
                {isOpen && (
                  <ul className="absolute z-50 max-h-[200px] w-full list-none overflow-y-auto border border-[#ccc] bg-white p-0">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat, index) => (
                        <li key={index}>
                          <button
                            className="h-full w-full px-4 py-1 text-start hover:bg-[#f7f7f7]"
                            onClick={() => {
                              setSearchTerm(cat);
                              setCategory(cat);
                              setIsOpen(false);
                            }}
                          >
                            {cat}
                          </button>
                        </li>
                      ))
                    ) : (
                      <li>No results found</li>
                    )}
                  </ul>
                )}
              </div>

              <h1 className="font-cardo pt-5 text-left text-[20px] font-normal text-[#031136]">
                About You
              </h1>
              <textarea
                name=""
                id=""
                cols={30}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-6 mt-2 w-full rounded-md border px-2 py-1.5 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600"
              ></textarea>
              <div className="mt-8 flex justify-end">
                <button onClick={handleSave}>
                  <span className="mr-3 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white">
                    Save
                  </span>
                </button>
                <button
                  className="inline-block rounded bg-gradient-to-b from-[#0909E9] to-[#00D4FF] p-0.5"
                  onClick={closeEditTitle}
                >
                  <button className="rounded-[3px] bg-white px-2 py-1">
                    <p className="from-primary to-danger bg-gradient-to-r bg-clip-text px-[8px] py-[4px] text-sm font-semibold text-transparent">
                      Cancel
                    </p>
                  </button>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTitlePopup;
