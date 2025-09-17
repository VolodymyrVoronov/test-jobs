import { Briefcase, Building, Laptop, Link, MapPin, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";

import { findScrollableDescendant } from "@/helpers";
import { cn } from "@/lib/utils";
import type { IJob } from "@/types";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import JobDescription from "./JobDescription";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface IMainProps {
  items: IJob[];
  page: number;
}

const Main = ({ items, page }: IMainProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [clickedJob, setClickedJob] = useState<IJob | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      virtuosoRef.current?.scrollToIndex({ index: 0, behavior: "auto" });

      const viewport = findScrollableDescendant(scrollAreaRef.current);
      if (viewport) {
        viewport.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [page, items.length]);

  const scrollToJob = (index: number) => {
    virtuosoRef.current?.scrollToIndex({ index, behavior: "smooth" });
  };

  return (
    <div className="grid grid-cols-2">
      <aside>
        <ScrollArea
          ref={scrollAreaRef}
          type="auto"
          className="h-[calc(100vh-90px)] pl-2 pr-4 pb-2"
        >
          <div className="flex flex-wrap gap-2 pb-2">
            {items.map((job, index) => (
              <Button
                key={job.slug}
                className="p-1.5 text-left"
                variant={job.slug === clickedJob?.slug ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  scrollToJob(index);
                  setClickedJob(job);
                }}
              >
                {index + 1}. {job.title}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      <main className="h-[calc(100vh-90px)] px-2">
        <Virtuoso
          ref={virtuosoRef}
          data={items}
          itemContent={(index, job) => (
            <Card
              ref={cardRef}
              key={job.slug + index}
              className={cn("mb-4 mx-2 hover:shadow-lg transition", {
                "bg-rose-50": job.slug === clickedJob?.slug,
              })}
            >
              <CardHeader>
                <CardTitle className="text-lg">
                  {index + 1}. {job.title}
                </CardTitle>
                <CardDescription>{job.company_name}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="size-4" />
                    {job.location}
                  </div>

                  <Badge
                    variant={job.remote ? "default" : "secondary"}
                    className="flex items-center gap-1 text-xs"
                  >
                    {job.remote ? (
                      <Laptop className="size-3" />
                    ) : (
                      <Building className="size-3" />
                    )}
                    {job.remote ? "Remote" : "On-site"}
                  </Badge>

                  {job.job_types?.map((type) => (
                    <Badge
                      key={type}
                      variant="outline"
                      className="flex items-center gap-1 text-xs"
                    >
                      <Briefcase className="size-3" />
                      {type.at(0)?.toUpperCase() + type.slice(1)}
                    </Badge>
                  ))}
                </div>

                <div className="gap-4 flex flex-col">
                  {job.description && (
                    <JobDescription description={job.description} />
                  )}

                  {job.tags.length > 0 && (
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
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-wrap gap-2">
                <Button variant="secondary" asChild>
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                  >
                    View Job <Link className="size-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          )}
        />
      </main>
    </div>
  );
};

export default Main;
