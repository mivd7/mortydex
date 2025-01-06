'use client';

import { FC, useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Props {
  totalPages: number;
  currentPage: number;
}

const getSliceStart = (currentPageIndex: number) => {
  if(currentPageIndex - 1 > -1) {
    return currentPageIndex - 1
  }
  return 0
  // const result = currentPageIndex - 1 > -1 ? currentPageIndex - 1 : 0
  // console.log('returning result', result);
  // return result
};

const getPaginationRange = (totalPages: number, currentPage: number): number[] => {
  const totalPageRange = Array.from(
    { length: (totalPages - 1) / 1 + 1 },
    (value, index) => 1 + index * 1
  )
  const currentPageIndex = totalPageRange.findIndex(page => page === currentPage);
  const sliceStart = getSliceStart(currentPageIndex);
  console.log('slice start', sliceStart);
  const x = totalPageRange.slice(sliceStart, sliceStart + 3);
  console.log('sliced', x);
  return x
}

const CharacterPagination: FC<Props> = ({totalPages, currentPage}) => {
    const paginationRange = useMemo(() => getPaginationRange(totalPages, currentPage), [totalPages])

    return(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {currentPage < totalPages - 2 ? paginationRange.map(pageNumber => <PaginationItem key={'page-nav-'+pageNumber}>
            <PaginationLink href={`?page=${pageNumber}`} isActive={pageNumber === currentPage}>
              {pageNumber}
            </PaginationLink>
            </PaginationItem>) : 
            <PaginationItem>
              <PaginationLink href={`?page=1`}>1</PaginationLink>
            </PaginationItem>
          }

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          {currentPage >= totalPages - 2 ? paginationRange.map(pageNumber => <PaginationItem key={'page-nav-'+pageNumber}>
            <PaginationLink href={`?page=${pageNumber}`} isActive={pageNumber === currentPage}>
              {pageNumber}
            </PaginationLink>
            </PaginationItem>) : 
            <PaginationItem>
              <PaginationLink href={`?page=${totalPages}`}>{totalPages}</PaginationLink>
            </PaginationItem>
          }

          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
}

export default CharacterPagination
