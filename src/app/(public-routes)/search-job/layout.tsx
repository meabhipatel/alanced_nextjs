import React, { ReactNode, FC, Suspense } from "react";
import SearchJobHeader from "./SearchJobHeader";
import SearchJobSidebar from "./SearchJobSidebar";

interface IProps {
  children: ReactNode;
}

const SearchJobLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      {/* ---> page Header  */}
      <SearchJobHeader />

      {/* ---> page Body  */}
      <div className="mt-1 px-2 xl:px-20">
        <div className="mx-5 mb-5 flex flex-col md:flex-row">
          {/* ---> side categoy bar */}
          <SearchJobSidebar />

          {/* ---> card container  */}
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </>
  );
};

export default SearchJobLayout;
