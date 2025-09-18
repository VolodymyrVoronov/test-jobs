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
    <header className="border-b px-2 flex flex-row items-center justify-between max-w-full">
      <h1
        className="text-2xl font-bold"
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
        <JobsTags items={items} />
      </Suspense>

      <ThemeSwitcher />
    </header>
  );
};

export default Header;
