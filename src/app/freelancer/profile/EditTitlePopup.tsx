import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import {
//   GetFreelancerSelfProfileAction,
//   UpdateFreelancerProfileAction,
// } from "../../../redux/Freelancer/FreelancerAction";
import CategoryList from "@/constant/allSelectionData/categoryList";
import { useAppSelector } from "@/store/hooks";
import { axiosWithAuth } from "@/utils/axiosWithAuth";
import toast from "react-hot-toast";

interface IEditTitlePoup {
  closeEditTitle: () => void;
}

const EditTitlePopup: React.FC<IEditTitlePoup> = ({ closeEditTitle }) => {
  //   const accessToken =
  //     useSelector((state) => state.login.accessToken) || localStorage.getItem("jwtToken");

  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  //   const dispatch = useDispatch();
  //   const freelancerselfprofile = useSelector((state) => state.freelancer.freelancerselfprofile);
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
    // dispatch(UpdateFreelancerProfileAction({ experience_level: experiencelevel }, accessToken));
    const res = await axiosWithAuth.put("/account/freelancer/profile/update", formData);
    toast.success(res.data.message);
    // dispatch(
    //   UpdateFreelancerProfileAction({ category: category, about: description }, accessToken)
    // );
    closeEditTitle();
    // dispatch(GetFreelancerSelfProfileAction(accessToken));
  };

  //   const [categories] = useState([
  //     'Web Development',
  //     'Web Designing',
  //     'Software Development',
  //     'Data Science',
  //     'Logo Designing',
  //     'Graphics Designing',
  //     'Artificial Intelligence',
  //     'Machine Learning',
  //     'UI/UX Designing'
  // ]);

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
      <style>
        {`
    .dropdown-list {
        border: 1px solid #ccc;
        max-height: 200px;
        overflow-y: auto;
        position: absolute;
        width: 90%;
        z-index: 1000;
        list-style: none;
        padding: 0;
        margin: 0;
        background-color: #fff;
    }
    
    .dropdown-list li {
        padding: 10px;
        cursor: pointer;
    }

    .dropdown-list li:hover {
        background-color: #f7f7f7;
    }
    `}
      </style>

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
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="mt-8">
              <h1 className="font-cardo text-left text-[20px] font-normal text-[#031136]">
                Your Designation
              </h1>
              {/* <input type="text" value={category} onChange={e => setCategory(e.target.value)} className='border my-2 py-1.5 px-2 rounded-md w-full focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-600' placeholder='Python Developer'/> */}
              <div ref={wrapperRef}>
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
                  <ul className="dropdown-list">
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((cat, index) => (
                        <li key={index}>
                          <button
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
    </>
  );
};

export default EditTitlePopup;
