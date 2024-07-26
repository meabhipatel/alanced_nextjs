import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
