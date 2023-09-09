"use client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC, useMemo } from "react";
import {
  useExpanded,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";

// component props interface
interface CustomTableProps {
  data: object[];
  columnShape: object[];
  rowClick?: (rowData: object) => void;
}

const CustomTable: FC<CustomTableProps> = (props) => {
  const {
    data,
    rowClick,
    columnShape,
  } = props;

  const tableData: any = useMemo(() => data, [data]);
  const columns: any = useMemo(() => columnShape, [columnShape]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  }: any = useTable(
    {
      columns,
      data: tableData,
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  return (
    <Box>
        <Table
          {...getTableProps()}
          sx={{ borderSpacing: "0 0.7rem", borderCollapse: "separate" }}
        >
          <TableHead>
            {headerGroups.map((headerGroup: any) => (
              // eslint-disable-next-line react/jsx-key
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any, index: number) => (
                  <TableCell
                    key={index}
                    align="left"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    sx={{
                      paddingY: 0,
                      fontSize: 12,
                      fontWeight: 600,
                      borderBottom: 0,
                      width: column.width,
                      color: "text.secondary",
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                      "&:first-of-type": { paddingLeft: "16px" },
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()}>
            {page.map((row: any, index: number) => {
              prepareRow(row);
              return (
                  // eslint-disable-next-line react/jsx-key
                  <TableRow
                    {...row.getRowProps()}
                    onClick={rowClick && rowClick(row.original)}
                    sx={{
                      position: "relative",
                      opacity: 1,
                      cursor: "pointer",
                      backgroundColor: "background.paper",
                      "& td:first-of-type": {
                        borderLeft: "0",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                      },
                      "& td:last-of-type": {
                        borderRight: "0",
                        borderTopRightRadius: "8px",
                        borderBottomRightRadius: "8px",
                      },
                    }}
                  >
                    {row.cells.map((cell: any, index: number) => {
                      return (
                        <TableCell
                          key={index}
                          align="left"
                          {...cell.getCellProps()}
                          sx={{
                            border: 0,
                            fontSize: 13,
                            fontWeight: 500,
                            color: "text.secondary",
                            "&:first-of-type": { paddingLeft: "16px" },
                            "&:last-child": { paddingRight: "16px" },
                          }}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
              );
            })}
          </TableBody>
        </Table>
    </Box>
  );
};

export default CustomTable;
