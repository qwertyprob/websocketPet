"use client";

import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import parseDate from "@/lib/dateParser";
import type { ReportIssue } from "@/types/report";

// ==================== КОЛОНКИ ====================
export const columns: ColumnDef<ReportIssue>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: number = row.getValue("status");
      const statusMap: Record<number, { text: string; color: string }> = {
        0: { text: "Open", color: "text-green-500" },
        1: { text: "In Progress", color: "text-orange-400" },
        2: { text: "Closed", color: "text-red-600" },
      };
      const { text, color } = statusMap[status] || statusMap[0];
      return <div className={`text-center font-semibold ${color}`}>{text}</div>;
    },
    filterFn: (row, id, value) =>
      value === "" || row.getValue(id) === Number(value),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("title")}</div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("description") ?? "-"}</div>
    ),
    filterFn: "includesString",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="text-center">{parseDate(date.toISOString())}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex justify-center gap-2">
        <Button size="sm" variant="outline" >
          View
        </Button>
        <Button size="sm" variant="secondary">
          Edit
        </Button>
        <Button size="sm" variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
];

// ==================== КОМПОНЕНТ ====================
export function AdminReportDataTable({ data }: { data: ReportIssue[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters, globalFilter, sorting },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId))
        .toLowerCase()
        .includes(filterValue.toLowerCase()),
  });

  return (
    <div className="w-full space-y-4">
      {/* Глобальный поиск */}
      <div className="flex items-center gap-2">
        <Input
          className="max-w-sm"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          value={globalFilter ?? ""}
        />
        {/* Фильтр по статусу */}
        <Select
          onValueChange={(value: string) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? undefined : value)
          }
          value={String(
            columnFilters.find((f) => f.id === "status")?.value ?? "all"
          )}
        >
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="0">Open</SelectItem>
            <SelectItem value="1">In Progress</SelectItem>
            <SelectItem value="2">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Таблица */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Пагинация */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
          size="sm"
          variant="outline"
        >
          Previous
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
          size="sm"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
