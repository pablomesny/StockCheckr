import {
  TableContainer,
  Table,
  Paper,
  Box,
  TablePagination
} from '@mui/material';
import { TableRowList } from './TableRowList';

// Columns received as params will be the headers of the table. They should be passed as an array.
// Data received as params will be part the body of the table. They should be passed as object.

export const TableData = ({ columns = [], data, dataLength, type = '', fetchStatus, handleDelete, handleUpdate, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) => {
  return (
    <Box sx={{ mx: 2, mt: 2 }}>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="customized table">
          <TableRowList 
            data={ data }
            columns={ columns }
            type={ type }
            fetchStatus={ fetchStatus }
            handleDelete={ handleDelete }
            handleUpdate={ handleUpdate }
          />
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={ dataLength }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
