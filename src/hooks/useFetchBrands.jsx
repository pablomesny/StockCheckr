import { useContext, useState } from "react";
import { AuthContext } from "../context";

export const useFetchBrands = ( page, rowsPerPage ) => {

    const [ isSnackbarOpen, setIsSnackbarOpen ] = useState( false );
    const [ snackbarMessage, setSnackbarMessage ] = useState( '' );

    const { auth } = useContext( AuthContext );

  return {

  }
}
