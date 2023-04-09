import { CheckRounded, CloseRounded, DeleteForeverRounded, EditRounded } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../helpers";
import { ConfirmationModal } from "./ConfirmationModal";
import { useForm } from "../hooks";

export const TableRowItem = ({ row, fetchStatus, handleDelete, handleUpdate }) => {

    const { formData, handleInputChange, handleResetForm } = useForm( row );

    const [ isEditable, setIsEditable ] = useState( false );
    const [ isModalOpen, setIsModalOpen ] = useState( false );

    const { id, name, state } = formData;
    const { isLoading } = fetchStatus;

    const handleToggleModal = () => {
        setIsModalOpen( prev => !prev );
    }

    const handleUpdateRow = () => {
        handleUpdate( id, formData, handleResetForm );
        setIsEditable( false );
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
                            <IconButton disabled={ isLoading } onClick={ handleUpdateRow }>
                                <CheckRounded />
                            </IconButton>
                            <IconButton disabled={ isLoading } onClick={ () => setIsEditable( false ) }>
                                <CloseRounded />
                            </IconButton>
                        </StyledTableCell>
                    </StyledTableRow>
                )
                : (
                    <>
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
                                <IconButton disabled={ isLoading } onClick={ () => setIsEditable( true ) }>
                                    <EditRounded />
                                </IconButton>
                                <IconButton disabled={ isLoading } onClick={ handleToggleModal }>
                                    <DeleteForeverRounded />
                                </IconButton>
                            </StyledTableCell>
                        </StyledTableRow>
                    </>
                )
        }

        {
            isModalOpen &&
                <ConfirmationModal
                    isOpen={ isModalOpen }
                    handleToggleModal={ handleToggleModal }
                    title="Delete group"
                    description={ `Do you really want to delete "${ name }" ?` }
                    warning="All the information relationed with this group will also be deleted (including products)."
                    onSubmit={ () => handleDelete( id, formData ) }
                />
        }
    </>
  )
}
