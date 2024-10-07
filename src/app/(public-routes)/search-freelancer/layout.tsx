import React, { ReactNode, FC, Suspense } from "react";
import SearchFreelancerHeader from "./SearchFreelancerHeader";
import SearchFreelancerSidebar from "./SearchFreelancerSidebar";

interface IProps {
  children: ReactNode;
}

const SearchFreelancerLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      {/* ---> page Header  */}
      <SearchFreelancerHeader />

      {/* ---> page Body  */}
      <div className="container mt-1 sm:px-5 md:px-10 lg:px-20">
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
