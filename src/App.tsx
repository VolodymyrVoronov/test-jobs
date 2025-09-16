import { ArrowLeft, ArrowRight, Home } from "lucide-react";

import { usePageParam } from "./hooks/usePageParam";
import { useGetJobsQuery } from "./services/jobApi";

import AppLayout from "./layout/AppLayout";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { Button } from "./components/ui/button";

const App = () => {
  const [page, setPage] = usePageParam(1);
  const { data: jobs, error, isLoading, isFetching } = useGetJobsQuery(page);
  const items = jobs?.data ?? [];

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Failed to fetch jobs.</p>;

  return (
    <AppLayout>
      <Header />

      <Main items={items} page={page} />

      <Footer>
        <Button
          variant="default"
          disabled={!jobs?.links.prev || isLoading || isFetching}
          onClick={() => setPage(Math.max(1, page - 1))}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <Button
          variant="default"
          disabled={isLoading || isFetching}
          onClick={() => setPage(1)}
          className="flex items-center gap-2"
        >
          <Home className="size-4" />
          Home
        </Button>

        <Button
          variant="default"
          disabled={!jobs?.links.next || isLoading || isFetching}
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-2"
        >
          Next
          <ArrowRight className="size-4" />
        </Button>
      </Footer>
    </AppLayout>
  );
};

export default App;

