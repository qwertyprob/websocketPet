"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// ==================== КОЛОНКИ ТАБЛИЦЫ ====================
export const columns: ColumnDef<ReportIssue>[] = [
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        className="flex w-full items-center justify-center space-y-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        variant="ghost"
      >
        Status <ArrowUpDown />
      </Button>
    ),
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
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        className="flex w-full items-center justify-center space-y-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        variant="ghost"
      >
        <span className="text-center">Title</span>
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) => (
      <div className="text-center">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("description") ?? "-"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        variant="ghost"
      >
        Created <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));

      return (
        <div className="text-start">{parseDate(date.toLocaleDateString())}</div>
      );
    },
  },
];

// ==================== КОМПОНЕНТ ТАБЛИЦЫ ====================
export function UserDataTable({ data }: { data: ReportIssue[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="w-full">
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
