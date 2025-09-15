import { usePageParam } from "./hooks/usePageParam";
import { useGetJobsQuery } from "./services/jobApi";

import { Button } from "./components/ui/button";

const App = () => {
  const [page, setPage] = usePageParam(1);
  const { data: jobs, error, isLoading } = useGetJobsQuery(page);

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Failed to fetch jobs.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <ul className="space-y-4">
        {jobs?.data.map((job) => (
          <li key={job.slug} className="border p-4 rounded-xl shadow-sm">
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
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
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
    </div>
  );
};

export default App;

