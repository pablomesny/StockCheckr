import { useContext, useEffect, useState } from "react";
import { AuthContext, GroupsContext } from "../context";
import { useFetchStatus } from "./useFetchStatus";
import { ENDPOINT, TOKEN_LOCALSTORAGE } from "../utils";

export const useFetchGroups = ( page, rowsPerPage ) => {

    const [ isSnackbarOpen, setIsSnackbarOpen ] = useState(false);
    const [ snackbarMessage, setSnackbarMessage ] = useState( '' );

    const { handleSetGroups, handleDeleteGroup: handleDeleteGroupFromContext, handleUpdateGroup: handleUpdateGroupFromContext } = useContext( GroupsContext );
    const { auth } = useContext( AuthContext );

    const { fetchStatus, handleIsLoading, handleHasError, handleIsSuccessful, handleStartFetching } = useFetchStatus();

    useEffect(() => {
        const limit = rowsPerPage;
        const from = ( page * rowsPerPage );

        console.log({limit});
        console.log({from});
        
        const controller = new AbortController();

        const { signal } = controller;

        handleStartFetching();

        fetch(`${ENDPOINT}/api/groups/${ auth.id }/?limit=${ limit }&from=${ from }`, { signal })
            .then(res => res.json())
            .then(res => {
                if (!res.ok || res.errors) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError(error);
                    handleOpenSnackbar();
                    return;
                }
                const groups = res.groups.map( group => {
                                                const { created_by, ...rest } = group;
                                                return rest;
                                            });
                handleSetGroups( groups, res.total );
            })
            .catch(err => {
                console.log(err);
                handleHasError( String(err) );
                setSnackbarMessage( 'Error while downloading groups data' );
                handleOpenSnackbar();
            })
            .finally(() => {
                handleIsLoading(false);
            });

        return () => controller.abort();
    }, [ page, rowsPerPage ]);

    const handleCreateGroup = ( name ) => {
        
        handleStartFetching();

        fetch(`${ENDPOINT}/api/groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('x-token')
            },
            body: JSON.stringify({ name })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.ok || res.errors) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError(error);
                    setSnackbarMessage( error );
                    setIsSnackbarOpen(true);
                    return;
                }
                handleIsSuccessful( true );
                setSnackbarMessage( 'Group created successfully' );
                setIsSnackbarOpen(true);
            })
            .catch(err => {
                handleHasError(err);
                setSnackbarMessage( 'Error while creating group' );
                handleOpenSnackbar();
            })
            .finally(() => {
                handleIsLoading(false);
            });
    };

    const handleDeleteGroup = ( id, body ) => {

        const { name } = body;

        handleStartFetching();

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
                    handleOpenSnackbar();
                    return;
                }

                handleDeleteGroupFromContext( id );
                handleIsSuccessful( true );
                setSnackbarMessage( `Group ${ name } deleted successfully` );
                handleOpenSnackbar();
            })
            .catch( err => {
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( `Error deleting group "${ name }"` )
                handleOpenSnackbar();
            })
            .finally( () => {
                handleIsLoading( false );
            })
    }

    const handleUpdateGroup = ( id, body, resetBody ) => {

        const { name } = body;

        handleIsLoading( true );
        handleHasError( null );
        handleIsSuccessful( false );

        fetch( `${ ENDPOINT }/api/groups/${ id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem( TOKEN_LOCALSTORAGE )
            },
            body: JSON.stringify( body )
        })
            .then( res => res.json() )
            .then( res => {
                if( !res.ok || res.errors ){
                    const error = res.msg || res.errors[0].msg;
                    handleHasError( error );
                    setSnackbarMessage( error );
                    handleOpenSnackbar();
                    resetBody();
                    return;
                }

                handleUpdateGroupFromContext( body );
                handleIsSuccessful( true );
                setSnackbarMessage( `Group "${ name }" successfully updated` );
                handleOpenSnackbar();
            })
            .catch( err => {
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( `Error updating group "${ name }"` )
                handleOpenSnackbar();
                resetBody();
            })
            .finally( () => {
                handleIsLoading( false )
            })
    }

    const handleOpenSnackbar = () => {
        setIsSnackbarOpen( true );
    }

    const handleToggleSnackbar = () => {
        setIsSnackbarOpen( prev => !prev );
    }

  return {
    fetchStatus,
    isSnackbarOpen,
    snackbarMessage,
    handleCreateGroup,
    handleDeleteGroup,
    handleUpdateGroup,
    handleOpenSnackbar,
    handleToggleSnackbar
  }
}
