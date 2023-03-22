import { Button, Dialog, DialogActions, DialogContentText, DialogTitle } from "@mui/material"

export const ConfirmationModal = ({ isOpen, handleToggleModal, title, description, onSubmit }) => {
  return (
    <Dialog 
        open={ isOpen } 
        onClose={ handleToggleModal }
        fullWidth 
        maxWidth="xs" 
    >
        <DialogTitle>{ title }</DialogTitle>
        <DialogContentText sx={{ textAlign: 'center', mt: 2 }}>
            { description }
        </DialogContentText>
        <DialogActions sx={{ mt: 4 }}>
            <Button onClick={ handleToggleModal }>Close</Button>
            <Button variant="contained" onClick={ onSubmit }>OK</Button>
        </DialogActions>
    </Dialog>
  )
}
