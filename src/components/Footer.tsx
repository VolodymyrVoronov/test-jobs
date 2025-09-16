import { type ReactNode } from "react";

interface IFooterProps {
  children: ReactNode;
}

const Footer = ({ children }: IFooterProps) => {
  return (
    <footer className="grid grid-cols-3 gap-3 max-w-2xl mx-auto px-2">
      {children}
    </footer>
  );
};

export default Footer;
