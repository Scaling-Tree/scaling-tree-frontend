import * as React from "react";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default MainLayout;
