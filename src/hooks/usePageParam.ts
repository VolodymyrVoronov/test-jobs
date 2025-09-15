import { useCallback, useEffect, useState } from "react";

export function usePageParam(defaultPage = 1) {
  const [page, setPageState] = useState<number>(defaultPage);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageFromUrl = Number(params.get("page"));
    if (!isNaN(pageFromUrl) && pageFromUrl > 0) {
      setPageState(pageFromUrl);
    }
  }, []);

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", String(newPage));
    window.history.pushState({}, "", `?${params.toString()}`);
  }, []);

  return [page, setPage] as const;
}
