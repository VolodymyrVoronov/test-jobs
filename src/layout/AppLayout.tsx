import { type ReactNode } from "react";

interface IAppLayoutProps {
  children: [ReactNode, ReactNode, ReactNode];
}

const AppLayout = ({ children }: IAppLayoutProps) => {
  const header = children[0];
  const main = children[1];
  const footer = children[2];

  return (
    <div className="space-y-2">
      {header}
      {main}
      {footer}
    </div>
  );
};

export default AppLayout;
