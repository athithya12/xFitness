import { Box, Center, Pagination, Stack, Table } from "@mantine/core";
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
  loading?: boolean;
}

const XTable = <Data extends Ingredient>({
  columns,
  data,
  getTableInstance,
  loading = true,
}: Props<Data>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );

  useEffect(() => {
    table.resetPageIndex();
  }, [data]);

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
    <Stack spacing={0} sx={{ height: "100%", overflowY: "auto" }}>
      <Box sx={{ height: "100%", overflowY: "auto", overflowX: "auto" }}>
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
      </Box>
      <Center
        sx={(theme) => ({
          borderTop: `1px solid ${theme.colors.gray[3]}`,
        })}
        p={16}
      >
        <Pagination
          page={table.getState().pagination.pageIndex + 1}
          onChange={(page) => {
            table.setPageIndex(page - 1);
          }}
          total={table.getPageCount()}
        />
      </Center>
    </Stack>
  );
};

export default XTable;
