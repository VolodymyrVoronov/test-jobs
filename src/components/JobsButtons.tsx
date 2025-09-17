import { type RefObject } from "react";

import type { IJob } from "@/types";

import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface IJobsButtonsProps {
  items: IJob[];
  clickedJob: IJob | null;
  scrollAreaRef: RefObject<HTMLDivElement | null>;

  onJobClick: (job: IJob) => void;
  scrollToJob: (index: number) => void;
}

const JobsButtons = ({
  items,
  clickedJob,
  scrollAreaRef,

  onJobClick,
  scrollToJob,
}: IJobsButtonsProps) => {
  return (
    <aside>
      <ScrollArea
        ref={scrollAreaRef}
        type="auto"
        className="h-[calc(100vh-90px)] pl-2 pr-4 pb-2"
      >
        <div className="flex flex-wrap gap-1 pb-2">
          {items.map((job, index) => (
            <Button
              key={job.slug}
              className="p-1.5 text-left shadow-none border"
              variant={job.slug === clickedJob?.slug ? "default" : "outline"}
              size="sm"
              onClick={() => {
                onJobClick(job);
                scrollToJob(index);
              }}
            >
              {index + 1}. {job.title}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};

export default JobsButtons;
