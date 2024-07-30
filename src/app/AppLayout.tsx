import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface IProps {
  children: ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1536px] bg-white">
      <Navbar />
      {children}
      <Footer />
      <Toaster toastOptions={{ duration: 1500 }} />
    </div>
  );
};

export default AppLayout;
