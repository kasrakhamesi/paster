import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

export interface DataLoaderState {
  isLoading: boolean;
  isError: boolean;
  reload: () => void;
}

interface UseDataLoaderOptions<DT> {
  load: () => CancelableRequest<DT> | void;
  setData: (data: DT) => void;
  deps?: unknown[];
  initialFetch?: boolean;
}

export function useDataLoader<DT>({
  load,
  setData,
  deps = [],
  initialFetch = true,
}: UseDataLoaderOptions<DT>): DataLoaderState {
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [isLoading, setIsLoading] = useState(initialFetch);
  const [isError, setIsError] = useState(false);
  const currentRequestAbortController = useRef<AbortController | null>(null);

  const fetchData = () => {
    if (isFirstRender) {
      setIsFirstRender(false);
      if (!initialFetch) return;
    }

    const loadReturn = load();
    if (loadReturn) {
      setIsLoading(true);
      setIsError(false);
      loadReturn.promise
        .then((data) => {
          if (data !== undefined) {
            setData(data);
            setIsLoading(false);
          }
        })
        .catch((error: Error) => {
          toast.error(error.message);
          setIsError(true);
          setIsLoading(false);
        });
    }
    currentRequestAbortController.current = loadReturn?.abortController || null;

    return () => {
      if (currentRequestAbortController.current) {
        currentRequestAbortController.current.abort();
        currentRequestAbortController.current = null;
      }
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchData, deps);

  return { isLoading, isError, reload: fetchData };
}
