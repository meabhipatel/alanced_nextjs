"use client";
import DynamicMarginTop from "@/components/DynamicMarginTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface IProps {
  children: ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => {
  const pathname = usePathname();

  const withoutNavbarScreens = [
    "/login",
    "/signup/freelancer",
    "/signup/hirer",
    "/signup-options",
    "/reset-password",
  ];

  return (
    <div className="mx-auto max-w-[1536px] bg-white">
      {!withoutNavbarScreens.includes(pathname) && (
        <>
          <Navbar />
          <DynamicMarginTop />
        </>
      )}

      {children}
      {!withoutNavbarScreens.includes(pathname) && <Footer />}
      <Toaster toastOptions={{ duration: 1500 }} />
    </div>
  );
};

export default AppLayout;
