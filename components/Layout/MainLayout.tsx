import * as React from "react";
import TopNavbar from "./TopNavbar";
import BottomNavbar from "./BottomNavbar";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col">
      <TopNavbar />
      <div className="h-full flex-1">{children}</div>
      <BottomNavbar />
    </div>
  );
};

export default MainLayout;
