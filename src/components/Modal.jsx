import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export const Modal = ({ isOpen, handleToggleModal, title, inputLabel, onSubmit }) => {

    const [ inputFieldValue, setInputFieldValue ] = useState('');

    useEffect(() => {
      setInputFieldValue( '' );
    }, [ handleToggleModal ]);
    

    const handleInputChange = ({ target }) => {
        setInputFieldValue( target.value );
    }

    const handleModalSubmit = () => {
        onSubmit( inputFieldValue );
        handleToggleModal();
    }

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
                value={ inputFieldValue }
                onChange={ handleInputChange }
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleToggleModal }>Close</Button>
            <Button variant="contained" onClick={ handleModalSubmit }>Save changes</Button>
        </DialogActions>
    </Dialog>
  )
}
