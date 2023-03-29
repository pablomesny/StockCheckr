import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  styled,
  TableCell,
  Paper,
  tableCellClasses,
  TablePagination,
  Box
} from '@mui/material';
import { TableRowList } from './TableRowList';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
];

// Columns received as params will be the headers of the table. They should be passed as an array.
// Rows received as params will be part the body of the table. They should be passed as object/arrays.

export const TableData = ({ columns, data }) => {
  return (
    <Box sx={{ mx: 2, mt: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {
                columns.map( ( column, i ) => {
                  if( i >= 1 ){
                    return <StyledTableCell key={ column } align="right">{ column }</StyledTableCell>
                  } else {
                    return <StyledTableCell key={ column }>{ column }</StyledTableCell>
                  }
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map( row => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    { row.name }
                  </StyledTableCell>
                  <TableRowList
                    data={ row.state }
                  />
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                // count={rows.length}
                rowsPerPage={ 5 }
                page={ 1 }
                // onPageChange={handleChangePage}
                // onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
    </Box>
  );
};
