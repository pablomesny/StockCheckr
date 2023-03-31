import {
  TableContainer,
  Table,
  Paper,
  Box
} from '@mui/material';
import { TableRowList } from './TableRowList';

// Columns received as params will be the headers of the table. They should be passed as an array.
// Data received as params will be part the body of the table. They should be passed as object.

export const TableData = ({ columns = [], data, type = '' }) => {
  return (
    <Box sx={{ mx: 2, mt: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableRowList 
            data={ data }
            columns={ columns }
            type={ type }
          />
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
