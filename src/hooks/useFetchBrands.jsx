import { useContext, useEffect, useState } from "react";
import { AuthContext, BrandsContext } from "../context";
import { useFetchStatus } from "./useFetchStatus";
import { ENDPOINT, TOKEN_LOCALSTORAGE } from "../utils";

export const useFetchBrands = ( page, rowsPerPage ) => {

    const [ isSnackbarOpen, setIsSnackbarOpen ] = useState( false );
    const [ snackbarMessage, setSnackbarMessage ] = useState( '' );

    const { handleSetBrands, handleAddBrand, handleDeleteBrand: handleDeleteBrandFromContext, handleUpdateBrand: handleUpdateBrandFromContext } = useContext( BrandsContext );
    const { auth } = useContext( AuthContext );

    const { fetchStatus, handleIsLoading, handleHasError, handleIsSuccessful, handleStartFetching } = useFetchStatus();

    useEffect( () => {
        const limit = rowsPerPage;
        const from = ( page * rowsPerPage );

        const controller = new AbortController();

        const { signal } = controller;

        handleStartFetching();

        fetch( `${ ENDPOINT }/api/brands/${ auth.id }/?limit=${ limit }&from=${ from }`, { signal } )
            .then( res => res.json() )
            .then( res => {
                if( !res.ok || res.errors ) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError( error );
                    handleOpenSnackbar();
                    return;
                }
                const brands = res.brands.map( brand => {
                    const { created_by, ...rest } = brand;
                    return rest;
                })
                handleSetBrands( brands, res.total );
            })
            .catch( err => {
                console.log(err);
                handleHasError( String( err ) );
                setSnackbarMessage( 'Error while downloading brands data' );
                handleOpenSnackbar();
            })
            .finally( () => {
                handleIsLoading( false );
            });

        return () => controller.abort();
    }, [ page, rowsPerPage ]);

    const handleCreateBrand = ( name ) => {

        handleStartFetching();

        fetch( `${ ENDPOINT }/api/brands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem( TOKEN_LOCALSTORAGE )
            },
            body: JSON.stringify({ name })
        })
            .then( res => res.json() )
            .then( res => {
                if ( !res.ok || res.errors ) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError( error );
                    setSnackbarMessage( error );
                    handleOpenSnackbar();
                    return;
                }
                handleAddBrand( res.brand );
                handleIsSuccessful( true );
                setSnackbarMessage( 'Brand created successfully' );
                handleOpenSnackbar();
            })
            .catch( err => {
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( 'Error while creating brand' );
                handleOpenSnackbar();
            })
            .finally( () => {
                handleIsLoading( false );
            })
    }

    const handleDeleteBrand = ( id, body ) => {

        const { name } = body;

        handleStartFetching();

        fetch( `${ ENDPOINT }/api/brands/${ id }`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem( TOKEN_LOCALSTORAGE )
            }
        } )
            .then( res => res.json() )
            .then( res => {
                if( !res.ok || res.errors ) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError( error );
                    setSnackbarMessage( error );
                    handleOpenSnackbar();
                }
                handleDeleteBrandFromContext( id );
                handleIsSuccessful( true );
                setSnackbarMessage( `Brand "${ name }" deleted successfully` );
                handleOpenSnackbar();
            })
            .catch( err =>{
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( `Error deleting brand "${ name }"` );
                handleOpenSnackbar();
            })
            .finally( () => {
                handleIsLoading( false );
            })
    }

    const handleUpdateBrand = ( id, body, resetBody ) => {

        const { name } = body;

        handleStartFetching();

        fetch( `${ ENDPOINT }/api/brands/${ id }`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'apllication/json',
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
                handleUpdateBrandFromContext( body );
                handleIsSuccessful( true );
                setSnackbarMessage( `Brand "${ name }" updated successfully` );
                handleOpenSnackbar();
            })
            .catch( err => {
                console.log(err);
                handleHasError( err );
                setSnackbarMessage( `Error updating brand "${ name }"` );
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
    handleCreateBrand,
    handleDeleteBrand,
    handleUpdateBrand,
    handleOpenSnackbar,
    handleToggleSnackbar
  }
}
