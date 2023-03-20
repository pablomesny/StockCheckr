import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

// TODO: add submit function by props

export const Modal = ({ isOpen, handleToggleModal, title, inputLabel }) => {
  return (
    <Dialog 
        open={ isOpen } 
        onClose={ handleToggleModal }
        fullWidth 
        maxWidth="xs" 
    >
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label={ inputLabel }
                type="text"
                fullWidth
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleToggleModal }>Close</Button>
            <Button variant="contained" onClick={ handleToggleModal }>Save changes</Button>
        </DialogActions>
    </Dialog>
  )
}
