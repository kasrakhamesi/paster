import { MutableRefObject, PropsWithChildren } from "react";
import { DataLoaderState, useDataLoader } from "@/hooks/useDataLoader";

interface DataLoaderViewProps {
  state: DataLoaderState;
  errorSize?: "withMessage" | "buttonOnly";
}

export function DataLoaderView({
  state: { isLoading, isError, reload },
  errorSize = "withMessage",
  children,
}: PropsWithChildren<DataLoaderViewProps>) {
  if (isLoading)
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (isError)
    return (
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        {errorSize === "withMessage" && <h1 className="m-0">Error</h1>}
        {errorSize === "withMessage" && (
          <p className="mx-0 my-3 max-w-sm">
            There is a temporary problem with your network connection. Please
            make sure you are connected to the internet and then try again.
          </p>
        )}
        <button onClick={reload} className="btn btn-accent">
          Retry
        </button>
      </div>
    );

  return <>{children}</>;
}

interface DataLoaderProps<DT> {
  load: () => CancelableRequest<DT> | void;
  setData: (data: DT) => void;
  deps?: unknown[];
  initialFetch?: boolean;
  errorSize?: "withMessage" | "buttonOnly";
  reloadRef?: MutableRefObject<(() => void) | null>;
}

export default function DataLoader<DT>({
  load,
  setData,
  deps = [],
  initialFetch = true,
  reloadRef,
  errorSize,
  children,
}: PropsWithChildren<DataLoaderProps<DT>>) {
  const state = useDataLoader({
    load,
    setData,
    deps,
    initialFetch,
  });

  if (reloadRef) reloadRef.current = state.reload;

  return (
    <DataLoaderView state={state} errorSize={errorSize}>
      {children}
    </DataLoaderView>
  );
}
