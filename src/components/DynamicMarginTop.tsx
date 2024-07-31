"use client";
import { usePathname } from "next/navigation";

export const dontNeedMTScreens = [
  "/",
  "/search-freelancer",
  "/search-job",
  "/login",
  "/signup",
  "/signup-options",
];

const DynamicMarginTop = () => {
  const pathname = usePathname();
  return !dontNeedMTScreens.includes(pathname) && <div className="mt-24" />;
};

export default DynamicMarginTop;
