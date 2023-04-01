import { CheckRounded, CloseRounded, DeleteForeverRounded, EditRounded } from "@mui/icons-material";
import { Box, IconButton, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { StyledTableCell, StyledTableRow } from "../helpers";
import { ConfirmationModal } from "./ConfirmationModal";
import { ENDPOINT, TOKEN_LOCALSTORAGE } from "../utils";
import { useFetch } from "../hooks";
import { StocksContext } from "../context";
import { SnackbarAlert } from "./SnackbarAlert";

// TODO: fix pointer events after update

export const TableRowItem = ({ row }) => {

    const [ rowData, setRowData ] = useState( row );
    const [ isEditable, setIsEditable ] = useState( false );
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const [ isSnackbarOpen, setIsSnackbarOpen ] = useState( false );
    const [ snackbarMessage, setSnackbarMessage ] = useState('');

    const { handleDeleteGroup: handleDeleteGroupFromContext, handleUpdateGroup: handleUpdateGroupFromContext } = useContext( StocksContext );

    const { fetchState, handleIsLoading, handleHasError, handleIsSuccessful } = useFetch();

    const { id, name, state } = rowData;
    const { isLoading, hasError, isSuccessful } = fetchState;

    const handleToggleModal = () => {
        setIsModalOpen( prev => !prev );
    }

    const handleToggleSnackbar = () => {
        setIsSnackbarOpen( prev => !prev );
    }

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        setRowData({
            ...rowData,
            [name]: value
        })
    }

    const handleDeleteGroup = () => {

        handleIsLoading( true );
        handleHasError( null );
        handleIsSuccessful( false );

        fetch( `${ ENDPOINT }/api/groups/${ id }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem( TOKEN_LOCALSTORAGE )
            }
        })
            .then( res => res.json() )
            .then( res => {
                if( !res.ok || res.errors ) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError( error );
                    setSnackbarMessage( error );
                    handleToggleSnackbar();
                    return;
                }

                handleDeleteGroupFromContext( id );
                handleIsSuccessful( true );
                setSnackbarMessage( `Group ${ name } deleted successfully` );
                handleToggleSnackbar();
            })
            .catch( err => {
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( `Error deleting group "${ name }"` )
                handleToggleSnackbar();
            })
            .finally( () => {
                handleIsLoading( false );
                handleToggleModal();
            })
    }

    const handleUpdateGroup = () => {

        handleIsLoading( true );
        handleHasError( null );
        handleIsSuccessful( false );

        fetch( `${ ENDPOINT }/api/groups/${ id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem( TOKEN_LOCALSTORAGE )
            },
            body: JSON.stringify( rowData )
        })
            .then( res => res.json() )
            .then( res => {
                if( !res.ok || res.errors ){
                    const error = res.msg || res.errors[0].msg;
                    handleHasError( error );
                    setSnackbarMessage( error );
                    handleToggleSnackbar();
                    setRowData( row );
                    return;
                }

                handleUpdateGroupFromContext( rowData );
                handleIsSuccessful( true );
                setSnackbarMessage( `Group "${ name }" successfully updated` );
                handleToggleSnackbar();
            })
            .catch( err => {
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( `Error updating group "${ name }"` )
                handleToggleSnackbar();
                setRowData( row );
            })
            .finally( () => {
                handleIsLoading( false )
                setIsEditable( false );
            })
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
                            <IconButton disabled={ isLoading } onClick={ handleUpdateGroup }>
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
                    onSubmit={ handleDeleteGroup }
                />
        }
    </>
  )
}
