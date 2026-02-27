"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export interface TableColumn<T> {
  key: string;
  header: string;
  align?: "left" | "center" | "right";
  render: (row: T) => React.ReactNode;
}

const alignClass = (align?: "left" | "center" | "right") => {
  if (align === "right") return "text-right";
  if (align === "center") return "text-center";
  return "text-left";
};

interface CustomTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  pageSize?: number;
  itemLabel?: string;
  onRowClick?: (row: T) => void;
}

function buildPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const neighbours = new Set(
    [1, total, current, current - 1, current + 1].filter(
      (p) => p >= 1 && p <= total
    )
  );

  const sorted = Array.from(neighbours).sort((a, b) => a - b);

  const result: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(sorted[i]);
  }
  return result;
}

export function CustomTable<T>({
  columns,
  data,
  keyExtractor,
  pageSize = 10,
  itemLabel = "items",
  onRowClick,
}: Readonly<CustomTableProps<T>>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const pageData = data.slice(startIndex, startIndex + pageSize);
  const pageRange = buildPageRange(currentPage, totalPages);
  const pageItems = pageRange.map((page, idx) => ({
    page,
    key: page === "ellipsis"
      ? `ellipsis-${pageRange[idx - 1]}-${pageRange[idx + 1]}`
      : String(page),
  }));

  const goTo = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {/* Table card */}
      <div className="bg-white dark:bg-slate-950 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-colors">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50">
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={`text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3 h-auto ${
                    alignClass(col.align)
                  }`}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageData.map((row) => (
              <TableRow
                key={keyExtractor(row)}
                onClick={() => onRowClick?.(row)}
                className={`border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors${onRowClick ? " cursor-pointer" : ""}`}
              >
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className={`px-5 py-4 whitespace-normal ${alignClass(col.align)}`}
                  >
                    {col.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <p className="text-sm text-gray-500 dark:text-slate-400 order-2 sm:order-1">
            Showing{" "}
            <span className="font-medium text-gray-700 dark:text-slate-300">
              {startIndex + 1}–{Math.min(startIndex + pageSize, data.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-700 dark:text-slate-300">
              {data.length}
            </span>{" "}
            {itemLabel}
          </p>

          <Pagination className="mx-0 w-auto order-1 sm:order-2">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(currentPage - 1);
                  }}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-40"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {pageItems.map(({ page, key }) =>
                page === "ellipsis" ? (
                  <PaginationItem key={key}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={key}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        goTo(page as number);
                      }}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(currentPage + 1);
                  }}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-40"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
