import { lazy, Suspense } from "react";

import type { IJob } from "@/types";

import ThemeSwitcher from "./ThemeSwitcher";

import "@fontsource/bangers/400.css";
import Spinner from "./Spinner";

const JobsTags = lazy(() => import("./JobsTags"));

interface IHeaderProps {
  items: IJob[];
}

const Header = ({ items }: IHeaderProps) => {
  return (
    <header className="border-b px-2 grid grid-cols-3 items-center w-full">
      <h1
        className="text-2xl font-bold justify-self-start"
        style={{
          fontFamily: "Bangers, cursive, system-ui",
        }}
      >
        Jobs
      </h1>

      <Suspense
        fallback={
          <Spinner
            wrapperClassName="h-full flex items-center justify-center"
            loaderClassName="size-4"
          />
        }
      >
        <div className="justify-self-center">
          <JobsTags items={items} />
        </div>
      </Suspense>

      <div className="justify-self-end">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
