import { DeleteForeverRounded, EditRounded } from '@mui/icons-material';
import { Box, IconButton, styled, TableCell, tableCellClasses, Typography } from '@mui/material';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

export const TableRowList = ({ data }) => {

    const [ editMode, setEditMode ] = useState( false );

    const handleToggleEditMode = () => {
        setEditMode( prev => !prev );
    }

    return (
        <>
            <StyledTableCell align="right">
                <Box sx={{ width: 'fit-content', px: 1, py: 0.5, ml: 'auto', borderRadius: 5, bgcolor: data ? 'green' : 'red' }}>
                    <Typography variant='p' component='p' sx={{ color: 'white' }} >
                        { data ? 'Active' : 'Inactive' }
                    </Typography>
                </Box>
            </StyledTableCell>
            <StyledTableCell align="right">
                <IconButton onClick={ handleToggleEditMode }>
                    <EditRounded />
                </IconButton>
                <IconButton>
                    <DeleteForeverRounded />
                </IconButton>
            </StyledTableCell>
        </>
    );
};
