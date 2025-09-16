import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import { useEffect, useRef } from "react";

import type { IJob } from "@/types";

interface IMainProps {
  items: IJob[];
  page: number;
}

const Main = ({ items, page }: IMainProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  useEffect(() => {
    if (items.length > 0) {
      virtuosoRef.current?.scrollToIndex({ index: 0, behavior: "auto" });
    }
  }, [page, items.length]);

  return (
    <main className="h-[calc(100vh-90px)] max-w-2xl mx-auto px-2">
      <Virtuoso
        ref={virtuosoRef}
        data={items}
        itemContent={(index, job) => (
          <div
            key={job.slug + index}
            className="border p-4 rounded-xl shadow-sm mb-4"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company_name}</p>
            <p className="text-sm">{job.location}</p>
            <a
              href={job.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View Job
            </a>
          </div>
        )}
      />
    </main>
  );
};

export default Main;
