import { CheckRounded, CloseRounded, DeleteForeverRounded, EditRounded } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../helpers";

export const TableRowItem = ({ row }) => {

    const [ isEditable, setIsEditable ] = useState( false );
    const [ rowValue, setRowValue ] = useState( row );

    const { id, name, state } = rowValue;

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        setRowValue({
            ...rowValue,
            [name]: value
        })
    }

    const handleToggleEditMode = () => {
        setIsEditable( prev => !prev );
    }

  return (
    <>
        {
            isEditable
                ? (
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            <TextField 
                                type='text'
                                size='small'
                                value={ name }
                                onChange={ handleInputChange }
                                name='name'
                            />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Select 
                                name='state'
                                size='small'
                                value={ state }
                                onChange={ handleInputChange }
                            >
                                <MenuItem value={ true }>Active</MenuItem>
                                <MenuItem value={ false }>Inactive</MenuItem>
                            </Select>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <IconButton>
                                <CheckRounded />
                            </IconButton>
                            <IconButton onClick={ handleToggleEditMode }>
                                <CloseRounded />
                            </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                )
                : (
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            { name }
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <Box
                                sx={{
                                    width: 'fit-content',
                                    px: 1,
                                    py: 0.5,
                                    ml: 'auto',
                                    borderRadius: 5,
                                    bgcolor: state ? 'green' : 'red'
                                }}
                            >
                                <Typography
                                    variant="p"
                                    component="p"
                                    sx={{ color: 'white' }}
                                >
                                    {state ? 'Active' : 'Inactive'}
                                </Typography>
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            <IconButton onClick={handleToggleEditMode}>
                                <EditRounded />
                            </IconButton>
                            <IconButton>
                                <DeleteForeverRounded />
                            </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                )
        }
    </>
  )
}
