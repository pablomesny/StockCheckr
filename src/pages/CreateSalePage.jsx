import { useEffect, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";

export const CreateSalePage = () => {

  const [ date, setDate ] = useState( null );
  const [ formData, setFormData ] = useState({
    customerName: '',
    customerPhoneNumber: '',
  });

  useEffect(() => {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const timeString = currentDate.toLocaleTimeString();
    setDate( `${ dateString } ${ timeString }` );
  }, []);
  
  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setFormData({
      ...formData,
      [ name ]: value
    })
  }

  const { customerName, customerPhoneNumber } = formData;

  return (
    <Box
      className="animate__animated animate__fadeIn"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '100%',
        bgcolor: '#E5E5E5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 3,
          ml: 4,
          py: 2,
        }}
      >
        <Typography component="h2" variant="h5">
          Control panel
        </Typography>
        <Typography
          component="h3"
          variant="h6"
          sx={{ fontWeight: 400, color: '#999999' }}
        >
          Sales
        </Typography>
      </Box>

      <Divider variant="middle" />

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          height: '100%',
          bgcolor: '#FAFAFA',
          borderRadius: 1,
          mx: 2,
          mb: 1,
          p: 2
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mb: 2 }}>
          <Typography component="h6" variant="h6" sx={{ fontWeight: 400 }}>
            Create sale
          </Typography>

          <Typography component="h6" variant="p">
            Date: { date }
          </Typography>
        </Box>

        <Divider variant="middle" />

        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', mt: 2 }}>
          <TextField 
            type="text"
            size="small"
            variant="outlined"
            label="Customer name"
            name="customerName"
            value={ customerName }
            onChange={ handleInputChange }
          />

          <TextField 
            type="number"
            size="small"
            variant="outlined"
            label="Phone number"
            name="customerPhoneNumber"
            value={ customerPhoneNumber }
            onChange={ handleInputChange }
          />
        </Box>
        
      </Box>
    </Box>
  );
};
