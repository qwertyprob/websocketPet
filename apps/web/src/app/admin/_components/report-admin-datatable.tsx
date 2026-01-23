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
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { parseDateTime } from "@/lib/dateParser";
import type { ReportIssue } from "@/types/report";

export function AdminReportDataTable({ data }: { data: ReportIssue[] }) {
  const router = useRouter();
  // ==================== КОЛОНКИ ====================
  const columns: ColumnDef<ReportIssue>[] = [
    {
      accessorKey: "status",
      header: () => (
        <div className="flex items-center justify-center">Status</div>
      ),
      cell: ({ row }) => {
        const status: number = row.getValue("status");
        const statusMap: Record<number, { text: string; color: string }> = {
          0: { text: "Open", color: "text-green-500" },
          1: { text: "In Progress", color: "text-orange-400" },
          2: { text: "Closed", color: "text-red-600" },
        };
        const { text, color } = statusMap[status] || statusMap[0];
        return (
          <div className={`text-center font-semibold ${color}`}>{text}</div>
        );
      },
      filterFn: (row, id, value) =>
        value === "" || row.getValue(id) === Number(value),
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="flex items-center justify-center">Title</div>
      ),
      cell: ({ row }) => (
        <div className="flex h-full items-center justify-center">
          {row.getValue("title")}
        </div>
      ),
      filterFn: "includesString",
    },
    {
      accessorKey: "description",
      header: () => (
        <div className="flex items-center justify-center">Description</div>
      ),
      cell: ({ row }) => {
        const value = row.getValue("description") as string;

        const displayValue =
          value.length > 10 ? `${value.slice(0, 20)}...` : value;

        return <div className="text-center">{displayValue || "-"}</div>;
      },
      filterFn: "includesString",
    },
    {
      accessorKey: "createdAt",
      header: () => (
        <div className="flex items-center justify-center">Created</div>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return (
          <div className="text-center">{parseDateTime(date.toISOString())}</div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="flex items-center justify-center">Actions</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-transparent hover:bg-neutral-400">
                <MoreHorizontal className="h-4 w-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
              <DropdownMenuItem
                onClick={() => router.push(`/admin/reports/${row.original.id}`)}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Edit", row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Delete", row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  // ==================== КОМПОНЕНТ ====================

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
          className="rounded border px-3 py-1 disabled:opacity-50"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          Previous
        </Button>
        <Button
          className="rounded border px-3 py-1 disabled:opacity-50"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
