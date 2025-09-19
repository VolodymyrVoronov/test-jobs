import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { usePageParam } from "./hooks/usePageParam";
import { useGetJobsQuery } from "./services/jobApi";
import { resetTags } from "./store/appSlice";
import type { RootState } from "./store/store";

import AppLayout from "./layout/AppLayout";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Spinner from "./components/Spinner";
import { Button } from "./components/ui/button";

const App = () => {
  const dispatch = useDispatch();
  const [page, setPage] = usePageParam(1);
  const { data: jobs, error, isLoading, isFetching } = useGetJobsQuery(page);
  const tags = useSelector((state: RootState) => state.app.tags);

  const items = jobs?.data ?? [];

  if (isLoading)
    return (
      <Spinner
        wrapperClassName="h-screen flex items-center justify-center"
        loaderClassName="size-4"
      />
    );
  if (error) return <p>Failed to fetch jobs.</p>;

  const handleResetTags = () => dispatch(resetTags());

  const onPreviousPageClick = () => {
    setPage(Math.max(1, page - 1));
    handleResetTags();
  };

  const onHomePageClick = () => {
    setPage(1);
    handleResetTags();
  };

  const onNextPageClick = () => {
    setPage(page + 1);
    handleResetTags();
  };

  const tagsAmount = tags.length;
  const noTagsSelected = tagsAmount === 0;

  const filteredItems = noTagsSelected
    ? items
    : items.filter((item) => item.tags.some((tag) => tags.includes(tag)));

  return (
    <AppLayout>
      <Header items={items} />

      <Main items={filteredItems} page={page} />

      <Footer>
        <Button
          variant="default"
          disabled={!jobs?.links.prev || isLoading || isFetching}
          onClick={onPreviousPageClick}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          Previous
        </Button>

        <Button
          variant="default"
          disabled={isLoading || isFetching || page === 1}
          onClick={onHomePageClick}
          className="flex items-center gap-2"
        >
          <Home className="size-4" />
          Home
        </Button>

        <Button
          variant="default"
          disabled={!jobs?.links.next || isLoading || isFetching}
          onClick={onNextPageClick}
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

