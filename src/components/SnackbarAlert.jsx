import { Alert, Box, Snackbar } from "@mui/material"

export const SnackbarAlert = ({ isSnackbarOpen, handleToggleSnackbar, type, message }) => {
  return (
    <Snackbar
        open={ isSnackbarOpen }
        autoHideDuration={ 4000 }
        onClose={ handleToggleSnackbar }
    >
        <Box sx={{ width: '100%' }}>
            <Alert severity={ type }>
                { message }
            </Alert>
        </Box>
    </Snackbar>
  )
}
