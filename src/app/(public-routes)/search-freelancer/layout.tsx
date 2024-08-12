"use client";
import React, { ReactNode, FC, Suspense } from "react";
// import AddFreeHireRequest from "@/components/AddFreeHireRequestPopup";
// import { IFreelancerHiringOpen, IFreelancer } from "@/interfaces/index";
import SearchFreelancerHeader from "./SearchFreelancerHeader";
import SearchFreelancerSidebar from "./SearchFreelancerSidebar";

interface IProps {
  children: ReactNode;
}

const SearchFreelancerLayout: FC<IProps> = ({ children }) => {
  //  for use
  // const logindata: IHirerProfile = {
  //   id: 5,
  //   Company_Name: "",
  //   first_Name: "sachin",
  //   last_Name: "sharma",
  //   email: "sachinsharmaece@gmail.com",
  //   contact: "",
  //   Address: "",
  //   images_logo: "/media/images_logo/admin-profle.png",
  //   social_media: "",
  //   about: "",
  //   DOB: null,
  //   Company_Establish: null,
  //   gender: "",
  //   map: "",
  // };
  // const googleUserName = localStorage.getItem("googleUserName");
  // const loginMethod = localStorage.getItem("loginMethod");

  // const [isFreeHiringOpen, setIsFreeHiringOpen] = useState<IFreelancerHiringOpen>({});

  // const openFreeHiring = (freelancerId: number) => {
  //   setIsFreeHiringOpen((prev) => ({ ...prev, [freelancerId]: true }));
  // };

  // Function to close hiring popup for a specific freelancer for use
  // const closeFreeHiring = (freelancerId: number) => {
  //   setIsFreeHiringOpen((prev) => ({ ...prev, [freelancerId]: false }));
  // };

  // const [range, setRange] = useState<number[]>([1, 1000]);

  // const handleSliderChange = (newRange:any) => {
  //   setRange(newRange);
  // };

  // const handleInputChange = (index:any, newValue:string) => {
  //   const updatedRange = [...range];
  //   updatedRange[index] = Number(newValue);
  //   setRange(updatedRange);
  // };

  // interface ShowMoreSkillsState {
  //   [key: string]: {
  //     showAll: boolean;
  //   };
  // }

  // const [showMoreSkills, setShowMoreSkills] = useState<ShowMoreSkillsState>({});

  // // Define the toggleShowMoreSkills function
  // const toggleShowMoreSkills = (freelancerId: number) => {
  //   setShowMoreSkills((prevShowMoreSkills) => ({
  //     ...prevShowMoreSkills,
  //     [freelancerId]: {
  //       showAll: !prevShowMoreSkills[freelancerId]?.showAll,
  //     },
  //   }));
  // };

  // interface ShowMoreDescState {
  //   [key: string]: {
  //     showAllDes: boolean;
  //   };
  // }

  // const [showMoreDes, setShowMoreDes] = useState<ShowMoreDescState>({});

  // const toggleShowMoreDes = (freelancerId: number) => {
  //   setShowMoreDes((prevShowMoreDes) => ({
  //     ...prevShowMoreDes,
  //     [freelancerId]: {
  //       showAllDes: !prevShowMoreDes[freelancerId]?.showAllDes,
  //     },
  //   }));
  // };

  // const getDisplayedText = (text: string, showAll: boolean) => {
  //   if (showAll) return text;

  //   const words = text.split(" ");
  //   if (words.length <= 20) return text;

  //   return words.slice(0, 20).join(" ") + "...";
  // };

  //  for use
  // let displayName = null;

  // if (loginMethod === "google") {
  //   displayName = googleUserName;
  //   displayName =
  //     logindata.first_Name && logindata.last_Name
  //       ? logindata?.first_Name + " " + logindata?.last_Name
  //       : googleUserName;
  // } else if (loginMethod === "traditional") {
  //   displayName = logindata?.first_Name + " " + logindata?.last_Name;
  // }

  return (
    <>
      {/* ---> page Header  */}
      <SearchFreelancerHeader />

      {/* ---> page Body  */}
      <div className="mt-1 px-2 xl:px-20">
        <div className="mx-5 mb-5 flex flex-col md:flex-row">
          {/* ---> side categoy bar */}
          <SearchFreelancerSidebar />

          {/* ---> card container  */}
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </>
  );
};

export default SearchFreelancerLayout;

// {/* <div className="w-full bg-[#FFFFFF] pb-8 pt-3 text-left lg:w-[70%]">
// <div className="px-4 pt-4 md:px-8">
//   <div className="flex items-center">
//     <h1 className="mr-1 text-[21px] font-semibold text-[#031136]">
//       Freelancers that Matches your Job
//     </h1>
//   </div>
//   <div className="relative mt-3 w-40">
//     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0909E9] to-[#00D4FF]"></div>
//     <div className="rounded-lg border-b-2 border-gray-600"></div>
//   </div>
// </div>

// {viewFreelancer !== null ? (
//   viewFreelancer.length > 0 ? (
//     <div className="grid w-full grid-cols-1 gap-x-5 md:grid-cols-2 lg:pl-3.5">
//       {viewFreelancer &&
//         viewFreelancer.map((free, index) => {
//           return (
//             <>
//               <div
//                 key={index}
//                 className="relative mt-4 w-full flex-shrink-0 cursor-pointer rounded-lg px-4 py-5 shadow-lg hover:bg-[#F6FAFD] md:px-8"
//               >
//                 <div className="flex items-center">
//                   <Image
//                     src={"https://www.api.alanced.com" + free.images_logo}
//                     alt=""
//                     height={96}
//                     width={96}
//                     // variant="rounded"
//                     className="mr-4 h-24 w-24 rounded-lg"
//                   />
//                   <div>
//                     <p className="text-[18px] font-semibold text-[#0A142F]">
//                       {highlightText(
//                         free.first_Name + " " + free.last_Name,
//                         searchQuery
//                       )}
//                     </p>
//                     <p className="text-[14px] text-[#0A142F] opacity-50">
//                       {highlightText(free.category, searchQuery)}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="inline-block pt-4 text-[14px] text-[#0A142F] opacity-50">
//                     {highlightText(
//                       getDisplayedText(free.about, showMoreDes[free.id]?.showAllDes),
//                       searchQuery
//                     )}
//                   </p>
//                   {free.about && free.about.split(" ").length > 20 && (
//                     <button
//                       onClick={() => toggleShowMoreDes(free.id)}
//                       className="mb-2 inline-block cursor-pointer text-[14px] font-bold text-blue-600"
//                     >
//                       {showMoreDes[free.id] && showMoreDes[free.id].showAllDes
//                         ? "See Less"
//                         : "See More"}
//                     </button>
//                   )}
//                 </div>

//                 {free.skills &&
//                   JSON.parse(free.skills.replace(/'/g, '"')).map(
//                     (skill: string, skillIndex: number) => (
//                       <Link
//                         href={""}
//                         key={skillIndex}
//                       >
//                         <span
//                           className={`my-2 mr-2 inline-block rounded border border-gray-300 px-4 py-1 text-[13px] text-[#0A142F] opacity-50 ${
//                             skillIndex < 4 ||
//                             (showMoreSkills[free.id] && showMoreSkills[free.id].showAll)
//                               ? ""
//                               : "hidden"
//                           }`}
//                         >
//                           {highlightText(skill, searchQuery)}
//                         </span>
//                       </Link>
//                     )
//                   )}
//                 {free.skills &&
//                   JSON.parse(free.skills.replace(/'/g, '"')).length > 4 && (
//                     <button
//                       onClick={() => toggleShowMoreSkills(free.id)}
//                       className="cursor-pointer text-[14px] font-bold text-blue-600"
//                     >
//                       {showMoreSkills[free.id] && showMoreSkills[free.id].showAll
//                         ? " Less"
//                         : " More"}
//                     </button>
//                   )}

//                 <div className="mb-12">
//                   <RiVerifiedBadgeFill className="text-md mr-1 inline-block text-green-600" />
//                   <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
//                     Account verified
//                   </p>
//                   <div className="mx-3 inline-block text-[16px] text-[#FFC107]">
//                     ★★★★★
//                   </div>
//                   <p className="mr-1 inline-block text-[14px] text-[#0A142F] opacity-80">
//                     ${free.hourly_rate ? free.hourly_rate : 0}/Hr
//                   </p>
//                   <p className="mr-3 inline-block text-[14px] text-[#0A142F] opacity-50">
//                     Hourly Rate
//                   </p>
//                   <p className="mr-2 inline-block text-[14px] text-[#0A142F] opacity-50">
//                     {highlightText(
//                       free.experience_level.replace(/_/g, " "),
//                       searchQuery
//                     )}
//                   </p>

//                   <IoLocationOutline className="text-md mr-1 inline-block" />
//                   <p className="inline-block text-[14px] text-[#0A142F] opacity-50">
//                     {highlightText(free.Address ? free.Address : "NA", searchQuery)}
//                   </p>
//                 </div>

//                 <div className="flex flex-row">
//                   <div className="absolute bottom-4 basis-8/12 cursor-pointer items-center text-[14px] font-bold text-blue-600 hover:underline">
//                     <Link
//                       href="/view-freelancer/details"
//                       // state={{ free }}
//                     >
//                       <p>View more detail</p>
//                     </Link>
//                   </div>
//                   <div className="absolute bottom-2 right-6 ml-auto basis-4/12 items-center space-x-2">
//                     <Link href="/login">
//                       <span className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0">
//                         Hire Now
//                       </span>
//                     </Link>
//                     <button
//                       className="mt-4 inline-block rounded border border-none bg-gradient-to-r from-[#0909E9] to-[#00D4FF] px-4 py-[10px] text-sm font-semibold text-white lg:mt-0"
//                       onClick={() => openFreeHiring(free.id)}
//                     >
//                       Hire Now
//                     </button>
//                   </div>
//                   {isFreeHiringOpen[free.id] && (
//                     <AddFreeHireRequest
//                       closeFreeHiring={() => closeFreeHiring(free.id)}
//                       free={free}
//                     />
//                   )}
//                 </div>
//               </div>
//             </>
//           );
//         })}
//     </div>
//   ) : (
//     <div className="mt-20">
//       <Image
//         src={FileIcon}
//         alt=""
//         className="mx-auto w-[18%]"
//       />
//       <p className="mt-5 bg-white text-center text-xl opacity-70">
//         There are no results that match your search.
//       </p>
//       <p className="mt-3 bg-white text-center text-sm opacity-60">
//         Please try adjusting your search keywords or filters.
//       </p>
//     </div>
//   )
// ) : (
//   <div className="grid w-[70%] grid-cols-2 pl-3.5 md:w-full">
//     {[...Array(6)].map((_, index) => {
//       return (
//         <div
//           key={index}
//           className="relative mt-4 h-[467px] w-[26vw] flex-shrink-0 cursor-pointer rounded-lg border-t border-opacity-30 px-4 py-5 shadow-lg hover:bg-[#F6FAFD] md:px-8"
//         >
//           {/* <Skeleton
//             height={90}
//             width={90}
//             inline={true}
//             style={{ borderRadius: "10%", float: "left" }}
//           />
//           <Skeleton
//             height={20}
//             width={200}
//             style={{ marginLeft: 10, marginTop: 20 }}
//           />
//           <Skeleton
//             height={20}
//             width={200}
//             style={{ marginLeft: 10, marginTop: 10 }}
//           />
//           <Skeleton
//             height={200}
//             width={300}
//             style={{ marginTop: 20 }}
//           />
//           <Skeleton
//             height={50}
//             width={200}
//             style={{ marginTop: 10 }}
//           />
//           <Skeleton
//             height={35}
//             width={80}
//             style={{ marginTop: 20, float: "right" }}
//           /> */}
//         </div>
//       );
//     })}
//   </div>
// )}
// <div>
//   {totalPages > 1 && (
//     <div className="m-4 flex items-center justify-end gap-6">
//       <button
//         // size="sm"
//         // variant="outlined"
//         onClick={prev}
//         disabled={currentPage === 1}
//         className="rounded-lg p-1"
//         style={{
//           backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
//           border: "none",
//         }}
//       >
//         <RxArrowLeft
//           // strokeWidth={2}
//           className="text-2xl text-white"
//         />
//       </button>

//       {[...Array(totalPages)].map((_, index) => {
//         const pageNumber = index + 1;
//         return (
//           <button
//             key={pageNumber}
//             className={`px-0 py-1 ${
//               currentPage === pageNumber
//                 ? "cursor-pointer bg-gradient-to-r from-[#0909E9] to-[#00D4FF] bg-clip-text text-[14px] font-bold text-transparent"
//                 : "cursor-pointer text-[14px] font-bold text-[#0A142F]"
//             }`}
//             onClick={() => {
//               setCurrentPage(pageNumber);
//             }}
//           >
//             {pageNumber}
//           </button>
//         );
//       })}

//       <button
//         // size="sm"
//         // variant="outlined"
//         onClick={next}
//         disabled={currentPage === totalPages}
//         className="rounded-lg p-1"
//         style={{
//           backgroundImage: "linear-gradient(45deg, #0909E9, #00D4FF)",
//           border: "none",
//         }}
//       >
//         <RxArrowRight
//           // strokeWidth={2}
//           className="text-2xl text-white"
//         />
//       </button>
//     </div>
//   )}
// </div>
// </div> */}
