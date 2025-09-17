import { ChevronLeftIcon, NotebookPen } from "lucide-react";
import parse from "html-react-parser";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JobDescriptionProps {
  description: string;
}

const JobDescription = ({ description }: JobDescriptionProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <NotebookPen className="size-4" />
          View Description
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[min(600px,80vh)] flex-col gap-0 p-0 sm:max-w-md">
        <DialogHeader className="contents space-y-0 text-left">
          <ScrollArea className="flex max-h-full flex-col overflow-hidden">
            <DialogTitle className="px-6 pt-6">Job Description</DialogTitle>
            <DialogDescription asChild>
              <p className="text-sm lg:pt-6 pr-8 lg:pb-6 lg:pl-6 pt-4 pb-4 pl-4">
                {parse(description, { trim: true })}
              </p>
            </DialogDescription>
          </ScrollArea>
        </DialogHeader>
        <DialogFooter className="flex-row items-center justify-end border-t px-6 py-4">
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              <ChevronLeftIcon className="size-4" />
              Back
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JobDescription;
