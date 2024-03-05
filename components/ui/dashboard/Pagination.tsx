import usePagination, { DOTS } from "@/hooks/usePagination";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (newPage: number) => void;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
  siblingCount = 2,
}: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    siblingCount,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return <></>;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className="flex flex-flow flex-wrap justify-center gap-1 lg:gap-2 mt-auto">
      <button
        className="btn btn-sm lg:btn-md"
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-current w-3 lg:w-4 h-3 lg:h-4"
        >
          <path d="M15.8 20.3c-.2 0-.4-.1-.5-.2l-7.5-7.5c-.3-.3-.3-.8 0-1.1L15.2 4c.3-.3.8-.3 1.1 0s.3.8 0 1.1l-7 7 7 7c.3.3.3.8 0 1.1-.2 0-.4.1-.5.1z" />
        </svg>
      </button>
      {paginationRange.map((pageNumber, index) =>
        pageNumber === DOTS ? (
          <button key={index} className="btn btn-sm lg:btn-md btn-disabled">
            &#8230;
          </button>
        ) : (
          <button
            key={index}
            className={`btn btn-sm lg:btn-md ${
              pageNumber === currentPage ? "btn-active" : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        )
      )}
      <button
        className="btn btn-sm lg:btn-md"
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="fill-current w-3 lg:w-4 h-3 lg:h-4"
        >
          <path d="M8.3 20.3c-.2 0-.4-.1-.5-.2-.3-.3-.3-.8 0-1.1l7-7-7-7c-.4-.3-.4-.7-.1-1s.8-.3 1.1 0l7.5 7.5c.3.3.3.8 0 1.1L8.8 20c-.2.2-.4.3-.5.3z" />
        </svg>
      </button>
    </div>
  );
}
