import { Briefcase, Building, Laptop, Link, MapPin, Tag } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
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
import { Button } from "./ui/button";
import Spinner from "./Spinner";

const JobDescription = lazy(() => import("./JobDescription"));
const JobsButtons = lazy(() => import("./JobsButtons"));

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

    setClickedJob(null);
  }, [page, items.length]);

  const scrollToJob = (index: number) => {
    virtuosoRef.current?.scrollToIndex({
      index,
      behavior: "smooth",
      align: "center",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Suspense
        fallback={
          <Spinner className="h-full flex items-center justify-center" />
        }
      >
        <JobsButtons
          items={items}
          clickedJob={clickedJob}
          scrollAreaRef={scrollAreaRef}
          onJobClick={setClickedJob}
          scrollToJob={scrollToJob}
        />
      </Suspense>

      <main className="h-[calc(100vh-106px)] px-2">
        <Virtuoso
          ref={virtuosoRef}
          data={items}
          className="custom-scroll"
          itemContent={(index, job) => (
            <Card
              ref={cardRef}
              key={job.slug + index}
              className={cn("mb-4 mx-2 hover:shadow-lg transition ", {
                "bg-rose-100 dark:bg-rose-900/80":
                  job.slug === clickedJob?.slug,
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
                  <div className="flex items-center gap-1 text-sm text-muted-foreground font-semibold">
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
                    <Suspense
                      fallback={
                        <Spinner
                          className="h-full flex items-center justify-center"
                          loaderClassName="size-4"
                        />
                      }
                    >
                      <JobDescription description={job.description} />
                    </Suspense>
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
