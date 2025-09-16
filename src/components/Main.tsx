import parse from "html-react-parser";
import { Link, MapPinHouse, NotebookPen } from "lucide-react";
import { useEffect, useRef } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";

import type { IJob } from "@/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "./ui/button";

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
          <Card key={job.slug + index} className="mb-4 mx-2">
            <CardHeader>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <CardDescription>{job.company_name}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-md font-semibold text-muted-foreground flex flex-row items-center gap-1">
                {job.location}
                <MapPinHouse className="size-4" />
              </p>

              <Collapsible className="space-y-2">
                <CollapsibleTrigger asChild>
                  <Button variant="outline">
                    View Description <NotebookPen className="size-4" />
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <p className="text-sm">
                    {parse(job.description, { trim: true })}
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>

            <CardFooter>
              <Button variant="secondary" asChild>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm"
                >
                  View Job
                  <Link className="size-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        )}
      />
    </main>
  );
};

export default Main;
