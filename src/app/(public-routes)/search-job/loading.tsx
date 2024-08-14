import React from "react";

const Loading = () => {
  return (
    <div className="mt-5 flex h-full w-full flex-col gap-2 p-5">
      {[...Array(5)].map((_, index) => {
        return (
          <div
            key={index}
            className="h-60 w-full animate-pulse bg-gray-100 duration-300"
          />
        );
      })}
    </div>
  );
};

export default Loading;
