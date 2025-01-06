
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
  pageParamKey?: string;
}

const getSliceStart = (currentPageIndex: number) => {
  if(currentPageIndex - 1 > -1) {
    return currentPageIndex - 1
  }
  return 0
};

const getPaginationRange = (totalPages: number, currentPage: number): number[] => {
  const totalPageRange = Array.from(
    { length: (totalPages - 1) / 1 + 1 },
    (value, index) => 1 + index * 1
  )
  const currentPageIndex = totalPageRange.findIndex(page => page === currentPage);
  const sliceStart = getSliceStart(currentPageIndex);
  return totalPageRange.slice(sliceStart, sliceStart + 3);
}

const CharacterPagination: FC<Props> = ({totalPages, currentPage, pageParamKey = 'page'}) => {
    const paginationRange = useMemo(() => getPaginationRange(totalPages, currentPage), [totalPages, currentPage])

    return(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?${pageParamKey}=${currentPage - 1}`} />
          </PaginationItem>

          {currentPage < totalPages - 2 ? paginationRange.map(pageNumber => <PaginationItem key={'page-nav-'+pageNumber}>
            <PaginationLink href={`?${pageParamKey}=${pageNumber}`} isActive={pageNumber === currentPage}>
              {pageNumber}
            </PaginationLink>
            </PaginationItem>) : 
            <PaginationItem>
              <PaginationLink href={`?${pageParamKey}=1`}>1</PaginationLink>
            </PaginationItem>
          }

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          {currentPage >= totalPages - 2 ? paginationRange.map(pageNumber => <PaginationItem key={'page-nav-'+pageNumber}>
            <PaginationLink href={`?${pageParamKey}=${pageNumber}`} isActive={pageNumber === currentPage}>
              {pageNumber}
            </PaginationLink>
            </PaginationItem>) : 
            <PaginationItem>
              <PaginationLink href={`?${pageParamKey}=${totalPages}`}>{totalPages}</PaginationLink>
            </PaginationItem>
          }

          <PaginationItem>
            <PaginationNext href={`?${pageParamKey}=${currentPage + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
}

export default CharacterPagination
