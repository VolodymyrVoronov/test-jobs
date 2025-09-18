import { Briefcase } from "lucide-react";
import { useEffect, useState, type RefObject } from "react";
import { useWindowSize } from "usehooks-ts";

import type { IJob } from "@/types";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
  const { width } = useWindowSize();

  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  useEffect(() => {
    if (width > 768) {
      onClose();
    }
  }, [width]);

  return (
    <>
      <Drawer open={open} onClose={onClose}>
        <DrawerTrigger asChild>
          <Button
            onClick={onOpen}
            size="icon"
            className="absolute flex top-10 -right-0 z-50 justify-center items-center md:hidden shadow-none"
          >
            <Briefcase className="size-5" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader hidden>
            <DrawerTitle>Available Jobs</DrawerTitle>
            <DrawerDescription>Here you can select a job</DrawerDescription>
          </DrawerHeader>

          <aside className="p-2 pt-4 overflow-auto">
            <div className="grid grid-cols-1 gap-1 pb-2">
              {items.map((job, index) => (
                <Button
                  key={job.slug}
                  title={job.title}
                  className="p-1.5 text-left shadow-none border flex items-center justify-start"
                  variant={
                    job.slug === clickedJob?.slug ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    onJobClick(job);
                    scrollToJob(index);
                    onClose();
                  }}
                >
                  <span className="truncate">
                    {index + 1}. {job.title}
                  </span>
                </Button>
              ))}
            </div>
          </aside>
        </DrawerContent>
      </Drawer>

      <aside className="hidden md:block">
        <ScrollArea
          ref={scrollAreaRef}
          type="auto"
          className="h-[calc(100vh-106px)] pl-2 pr-4 pb-2"
        >
          <div className="grid grid-cols-1 lg:flex lg:flex-wrap gap-1 pb-2">
            {items.map((job, index) => (
              <Button
                key={job.slug}
                title={job.title}
                className="p-1.5 text-left shadow-none border flex items-center justify-start"
                variant={job.slug === clickedJob?.slug ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  onJobClick(job);
                  scrollToJob(index);
                }}
              >
                <span className="truncate">
                  {index + 1}. {job.title}
                </span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default JobsButtons;
