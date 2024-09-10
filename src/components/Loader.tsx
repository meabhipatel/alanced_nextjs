import React, { FC } from "react";

interface IProps {
  size?: "sm" | "md" | "lg";
  color?: "white" | "primary";
}

const Loader: FC<IProps> = ({ size = "sm", color = "white" }) => {
  switch (size) {
    case "sm":
      return (
        <div
          className={`mx-auto h-5 w-5 animate-spin rounded-full border-2 border-transparent ${color === "white" ? "border-r-white border-t-white" : "border-r-[#00D4FF] border-t-[#00D4FF]"}`}
        />
      );
    case "md":
      return (
        <div
          className={`mx-auto h-8 w-8 animate-spin rounded-full border-[2px] border-transparent ${color === "white" ? "border-r-white border-t-white" : "border-r-[#00D4FF] border-t-[#00D4FF]"}`}
        />
      );
    case "lg":
      return (
        <div
          className={`mx-auto h-12 w-12 animate-spin rounded-full border-[3px] border-transparent ${color === "white" ? "border-r-white border-t-white" : "border-r-[#00D4FF] border-t-[#00D4FF]"}`}
        />
      );
  }
};

export default Loader;
