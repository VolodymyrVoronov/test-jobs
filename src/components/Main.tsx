import parse from "html-react-parser";
import {
  Briefcase,
  Laptop,
  Link,
  MapPinHouse,
  NotebookPen,
  Tag,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

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
                <MapPinHouse className="size-3" />
                {job.location}
              </p>

              <Badge
                variant={job.remote ? "default" : "secondary"}
                className="flex items-center gap-1"
              >
                <Laptop className="size-4" />
                {job.remote ? "Remote" : "On-site"}
              </Badge>

              {job.job_types?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {job.job_types.map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      className="flex items-center gap-1 text-xs"
                    >
                      <Briefcase className="size-3" />
                      {type}
                    </Badge>
                  ))}
                </div>
              )}

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

              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="flex items-center gap-1 text-xs"
                  >
                    <Tag className="size-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
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
