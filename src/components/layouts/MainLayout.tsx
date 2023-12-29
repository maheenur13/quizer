import { FC, ReactNode } from "react";

type PropsType = {
  children: ReactNode;
};

export const MainLayout: FC<PropsType> = ({ children }) => {
  return <div>{children}</div>;
};
