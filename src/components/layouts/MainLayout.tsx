import { FC, ReactNode } from "react";
import { Header } from "../common";

type PropsType = {
  children: ReactNode;
};

export const MainLayout: FC<PropsType> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100">{children}</main>
    </div>
  );
};
