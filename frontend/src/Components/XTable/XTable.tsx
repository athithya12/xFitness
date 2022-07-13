import { Box, Center, Pagination, Table } from "@mantine/core";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  Table as ReactTable,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Ingredient } from "Types";

interface Props<Data> {
  columns: ColumnDef<Data>[];
  data: Data[];
  getTableInstance: (table: ReactTable<Data>) => void;
}

const XTable = <Data extends Ingredient>({
  columns,
  data,
  getTableInstance,
}: Props<Data>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );

  const table = useReactTable({
    columns,
    data,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
  });

  useEffect(() => {
    getTableInstance(table);
  }, [table, getTableInstance]);

  return (
    <Box>
      <Table verticalSpacing='md'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
      <Center
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colors.gray[3]}`,
        })}
        p={16}
      >
        <Pagination
          onChange={(page) => {
            table.setPageIndex(page - 1);
          }}
          total={table.getPageCount()}
        />
      </Center>
    </Box>
  );
};

export default XTable;
