import { CheckRounded, CloseRounded, DeleteForeverRounded, EditRounded } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { StyledTableCell, StyledTableRow } from "../helpers";
import { ConfirmationModal } from "./ConfirmationModal";
import { useForm } from "../hooks";
import { SnackbarAlert } from "./SnackbarAlert";
import { useFetchGroups } from "../hooks/useFetchGroups";

export const TableRowItem = ({ row }) => {

    const { formData, handleInputChange, handleResetForm } = useForm( row );
    const { fetchStatus, isSnackbarOpen, snackbarMessage, handleDeleteGroup, handleUpdateGroup, handleToggleSnackbar } = useFetchGroups();

    const [ isEditable, setIsEditable ] = useState( false );
    const [ isModalOpen, setIsModalOpen ] = useState( false );

    const { id, name, state } = formData;
    const { isLoading, hasError, isSuccessful } = fetchStatus;

    const handleToggleModal = () => {
        setIsModalOpen( prev => !prev );
    }

    const handleUpdateRow = () => {
        handleUpdateGroup( id, formData, handleResetForm );
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
            isSuccessful &&
                <tr>
                    <td>
                        <SnackbarAlert 
                            isSnackbarOpen={ isSnackbarOpen }
                            handleToggleSnackbar={ handleToggleSnackbar }
                            type='success'
                            message={ snackbarMessage }
                        />
                    </td>
                </tr>
        }

        {
            hasError &&
                <tr>
                    <td>
                        <SnackbarAlert 
                            isSnackbarOpen={ isSnackbarOpen }
                            handleToggleSnackbar={ handleToggleSnackbar }
                            type='error'
                            message={ snackbarMessage }
                        />
                    </td>
                </tr>
        }

        {
            isModalOpen &&
                <ConfirmationModal
                    isOpen={ isModalOpen }
                    handleToggleModal={ handleToggleModal }
                    title="Delete group"
                    description={ `Do you really want to delete "${ name }" ?` }
                    warning="All the information relationed with this group will also be deleted (including products)."
                    onSubmit={ () => handleDeleteGroup( id, formData ) }
                />
        }
    </>
  )
}
