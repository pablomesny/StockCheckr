import { useContext, useEffect, useState } from "react"
import { AuthContext, CategoriesContext } from "../context";
import { useFetchStatus } from "./useFetchStatus";
import { ENDPOINT, TOKEN_LOCALSTORAGE } from "../utils";

export const useFetchCategories = ( page, rowsPerPage ) => {

    const [ isSnackbarOpen, setIsSnackbarOpen ] = useState( false );
    const [ snackbarMessage, setSnackbarMessage ] = useState( '' );

    const { handleSetCategories, handleAddCategory, handleDeleteCategory: handleDeleteCategoryFromContext, handleUpdateCategory: handleUpdateCategoryFromContext } = useContext( CategoriesContext );
    const { auth } = useContext( AuthContext );

    const { fetchStatus, handleIsLoading, handleHasError, handleIsSuccessful, handleStartFetching } = useFetchStatus();

    useEffect( () => {
        const limit = rowsPerPage;
        const from = ( page * rowsPerPage );

        const controller = new AbortController();
        const { signal } = controller;

        handleStartFetching();

        fetch( `${ ENDPOINT }/api/categories/${ auth.id }/?limit=${ limit }&from=${ from }`, { signal } )
            .then( res => res.json() )
            .then( res => {
                if( !res.ok || res.errors ) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError( error );
                    handleOpenSnackbar();
                    return;
                }
                const categories = res.categories.map( category => {
                    const { created_by, ...rest } = category;

                    return rest;
                })
                handleSetCategories( categories, res.total );
            })
            .catch( err => {
                console.log(err);
                handleHasError( String(err) );
                setSnackbarMessage( 'Error while downloading categories data' );
                handleOpenSnackbar();
            })
            .finally( () => {
                handleIsLoading( false );
            })

            return () => controller.abort();
    }, [ page, rowsPerPage ]);

    const handleCreateCategory = ( name ) =>{

        handleStartFetching();

        fetch( `${ ENDPOINT }/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem( TOKEN_LOCALSTORAGE )
            },
            body: JSON.stringify({ name })
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
                handleAddCategory( res.category );
                handleIsSuccessful( true );
                setSnackbarMessage( 'Category created successfully' );
                handleOpenSnackbar();
            })
            .catch( err => {
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( 'Error while creating category' );
                handleOpenSnackbar();
            })
            .finally( () => {
                handleIsLoading( false );
            })
    };

    const handleDeleteCategory = ( id, body ) => {
        const { name } = body;

        handleStartFetching();

        fetch( `${ ENDPOINT }/api/categories/${ id }`, {
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
                handleDeleteCategoryFromContext( id );
                handleIsSuccessful( true );
                setSnackbarMessage( `Group "${ name }" deleted successfully` );
                handleOpenSnackbar();
            })
            .catch( err => {
                console.log( err );
                handleHasError( err );
                setSnackbarMessage( `Error deleting category "${ name }"` );
                handleOpenSnackbar();
            })
            .finally( () => {
                handleIsLoading( false );
            })
    }

    const handleUpdateCategory = ( id, body, resetBody ) => {
        
        const { name } = body;

        handleStartFetching();

        fetch( `${ ENDPOINT }/api/categories/${ id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem( TOKEN_LOCALSTORAGE )
            },
            body: JSON.stringify( body )
        })
            .then( res => res.json() )
            .then( res => {
                if( !res.ok || res.errors ) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError( error );
                    setSnackbarMessage( error );
                    handleOpenSnackbar();
                    resetBody();
                    return;
                }
                handleUpdateCategoryFromContext( body );
                handleIsSuccessful( true );
                setSnackbarMessage( `Category "${ name }" updated successfully` );
                handleOpenSnackbar();
            })
            .catch( err => {
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( `Error updating category "${ name}"` );
                handleOpenSnackbar();
                resetBody();
            })
            .finally( () => {
                handleIsLoading( false );
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
    handleCreateCategory,
    handleDeleteCategory,
    handleUpdateCategory,
    handleOpenSnackbar,
    handleToggleSnackbar
  }
}
