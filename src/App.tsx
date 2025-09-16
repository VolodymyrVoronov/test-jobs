import { Virtuoso } from "react-virtuoso";

import { usePageParam } from "./hooks/usePageParam";
import { useGetJobsQuery } from "./services/jobApi";

import AppLayout from "./layout/AppLayout";

import Header from "./components/Header";
import { Button } from "./components/ui/button";

const App = () => {
  const [page, setPage] = usePageParam(1);
  const { data: jobs, error, isLoading } = useGetJobsQuery(page);
  const items = jobs?.data ?? [];

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Failed to fetch jobs.</p>;

  return (
    <AppLayout>
      <Header />

      <div className="h-[calc(100vh-36px-40px)] max-w-2xl mx-auto px-2">
        <Virtuoso
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
      </div>

      <div className="flex justify-between">
        <Button
          variant="default"
          disabled={!jobs?.links.prev}
          onClick={() => setPage(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          variant="default"
          disabled={!jobs?.links.next}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </AppLayout>
  );
};

export default App;

