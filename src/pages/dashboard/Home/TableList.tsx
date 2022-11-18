import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { v4 as uuidv4 } from 'uuid';
//Types
import { ICoronaVirusCases } from "../../services/coronavirus.types";

interface Data {
  id: string | number;
  data: string;
  uf: string;
  city: string;
  dailyConfirmation: number;
}

interface IProps {
  coronaVirusCasesData: ICoronaVirusCases;
}

type Order = "asc" | "desc";

const createData = (
  id: string | number,
  data: string,
  uf: string,
  city: string,
  dailyConfirmation: number
): Data => {
  return {
    id,
    city,
    dailyConfirmation,
    data,
    uf,
  };
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "data",
    numeric: false,
    disablePadding: false,
    label: "Data",
  },
  {
    id: "uf",
    numeric: false,
    disablePadding: false,
    label: "UF",
  },
  {
    id: "city",
    numeric: false,
    disablePadding: false,
    label: "Município",
  },
  {
    id: "dailyConfirmation",
    numeric: true,
    disablePadding: false,
    label: "Confirmações no dia",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const TableList: React.FC<IProps> = ({ coronaVirusCasesData }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("data");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.data);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const rows = coronaVirusCasesData?.results?.map((coronaVirusCase) => {
    return createData(
      coronaVirusCase.city_ibge_code + uuidv4(),
      coronaVirusCase.date,
      coronaVirusCase.state,
      coronaVirusCase.city,
      coronaVirusCase.new_confirmed
    );
  });

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
        <Table size="small" stickyHeader>
          <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows?.length || 0}
          />
          <TableBody>
            {rows?.sort(getComparator(order, orderBy)).map((row) => {
              return (
                <TableRow hover key={row.id}>
                  <TableCell align="left">{row.data}</TableCell>
                  <TableCell align="left">{row.uf}</TableCell>
                  <TableCell align="left">{row.city}</TableCell>
                  <TableCell align="left">{row.dailyConfirmation}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableList;
