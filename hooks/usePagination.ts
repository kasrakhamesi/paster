import { useMemo } from "react";

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
}

export const DOTS = "...";

interface usePaginationProps {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
}

export default function usePagination({
  currentPage,
  totalCount,
  pageSize,
  siblingCount = 2,
}: usePaginationProps): (typeof DOTS | number)[] {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    if (totalPageCount <= siblingCount + 5) {
      return range(1, totalPageCount);
    }

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    const startSiblingIndex = Math.max(currentPage - siblingCount, firstPageIndex);
    const endSiblingIndex = Math.min(currentPage + siblingCount, lastPageIndex);

    const middleRange = range(startSiblingIndex, endSiblingIndex);

    const shouldShowStartDots = startSiblingIndex > 2;
    const shouldShowEndDots = endSiblingIndex < totalPageCount - 2;

    return [
      ...(shouldShowStartDots
        ? [firstPageIndex, DOTS as typeof DOTS]
        : range(firstPageIndex, startSiblingIndex - 1)),
      ...middleRange,
      ...(shouldShowEndDots
        ? [DOTS as typeof DOTS, lastPageIndex]
        : range(endSiblingIndex + 1, lastPageIndex)),
    ];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}
