import { useContext, useEffect, useState } from "react"
import { AuthContext, CategoriesContext } from "../context";
import { useFetchStatus } from "./useFetchStatus";

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
    }, [ page, rowsPerPage ])

  return (
    <div>useFetchCategories</div>
  )
}
