import { type ReactNode } from "react";

interface IFooterProps {
  children: ReactNode;
}

const Footer = ({ children }: IFooterProps) => {
  return (
    <footer className="border-t py-2">
      <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto px-2">
        {children}
      </div>
    </footer>
  );
};

export default Footer;
