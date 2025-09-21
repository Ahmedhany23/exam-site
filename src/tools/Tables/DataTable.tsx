"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Skeleton } from "@/src/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "center" | "right";
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  page: number;
  pageSize: number;
  total: number;
  loading?: boolean;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  title?: string;
  description?: string;
}

export function DataTable<T>({
  data,
  columns,
  page,
  pageSize,
  total,
  loading = false,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
  title,
  description,
}: DataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const hasData = data.length > 0;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  const alignClass = (align?: "left" | "center" | "right") =>
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  return (
    <div className="space-y-6">
      {/* Header */}
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}

      {/* Card wrapper */}
      <div className="rounded-xl border bg-card shadow-md dark:shadow-lg transition-shadow hover:shadow-lg dark:hover:shadow-xl overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                {columns.map((col) => (
                  <TableHead
                    key={String(col.key)}
                    className={`px-6 py-3 text-sm font-medium text-muted-foreground ${alignClass(
                      col.align
                    )}`}
                  >
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading &&
                Array.from({ length: pageSize }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {columns.map((col) => (
                      <TableCell key={String(col.key)} className="px-6 py-4">
                        <Skeleton className="h-5 w-full max-w-[200px] rounded-md" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {!loading &&
                hasData &&
                data.map((row, i) => (
                  <TableRow
                    key={i}
                    className="transition-colors hover:bg-muted/30 focus-within:bg-muted/40"
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={String(col.key)}
                        className={`px-6 py-4 text-sm ${alignClass(col.align)}`}
                      >
                        {col.render ? col.render(row) : String(row[col.key])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

              {!loading && !hasData && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="px-6 py-12 text-center text-sm text-muted-foreground"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && hasData && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t bg-muted/40 px-6 py-4">
            {/* Results info */}
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">{start}</span>–
              <span className="font-medium text-foreground">{end}</span> of{" "}
              <span className="font-medium text-foreground">{total}</span>
            </p>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {pageSizeOptions.length > 1 && (
                <Select
                  value={String(pageSize)}
                  onValueChange={(v) => onPageSizeChange(Number(v))}
                >
                  <SelectTrigger className="h-8 w-20 text-sm rounded-md border-muted bg-background hover:bg-muted/20 transition">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizeOptions.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onPageChange(1)}
                  disabled={page === 1}
                  className="h-8 w-8 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onPageChange(page - 1)}
                  disabled={page === 1}
                  className="h-8 w-8 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-2 text-sm text-muted-foreground">
                  {page} / {totalPages}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onPageChange(page + 1)}
                  disabled={page === totalPages}
                  className="h-8 w-8 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onPageChange(totalPages)}
                  disabled={page === totalPages}
                  className="h-8 w-8 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
