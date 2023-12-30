import { FC, ReactNode } from "react";
import { Header } from "../common";

type PropsType = {
  children: ReactNode;
};

export const MainLayout: FC<PropsType> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className=" px-6 py-3 h-full">{children}</main>
    </div>
  );
};
