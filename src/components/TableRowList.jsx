import {
    TableBody,
    TableHead,
    TableRow
} from '@mui/material';
import { StyledTableCell } from '../helpers';
import { TableRowItem } from './TableRowItem';

export const TableRowList = ({ data, columns, type }) => {
    return (
        <>
            {
                type === 'state' && (
                    <>
                        <TableHead>
                            <TableRow>
                                {
                                    columns.map( ( column, i ) => {
                                        if (i >= 1) {
                                            return (
                                                <StyledTableCell
                                                    key={column}
                                                    align="right"
                                                >
                                                    {column}
                                                </StyledTableCell>
                                            );
                                        } else {
                                            return (
                                                <StyledTableCell key={column}>
                                                    {column}
                                                </StyledTableCell>
                                            );
                                        }
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                data.map( row => (
                                    <TableRowItem
                                        key={ row.id } 
                                        row={ row }
                                    />
                                ))
                            }
                        </TableBody>
                    </>
                )
            }
        </>
    );
};
