import { useEffect, useState } from "react";
import { Box, Button, Divider, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useForm } from '../hooks';

const initialValues = {
  customerName: '',
  customerPhoneNumber: '',
  product: '',
  quantity: 1,
  price: ''
};

export const CreateSalePage = () => {

  const [ date, setDate ] = useState( null );
  const { formData, handleInputChange } = useForm( initialValues );

  useEffect(() => {
    const currentDate = new Date();
    const dateString = currentDate.toLocaleDateString();
    const timeString = currentDate.toLocaleTimeString();
    setDate( `${ dateString } ${ timeString }` );
  }, []);
  
  const { customerName, customerPhoneNumber, product, quantity, price } = formData;

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

        <Box sx={{ display: 'flex', mt: 3, width: '90%', alignSelf: 'center', flexDirection: 'row', gap: 3 }}>

          <Select
            name='product'
            value={ product }
            size='small'
            label='product'
            variant='outlined'
            fullWidth
            onChange={ handleInputChange }
          >
            <MenuItem value={ 'test' }>Test</MenuItem>
          </Select>

          <TextField 
            name='quantity'
            type='number'
            value={ quantity }
            size='small'
            label='Quantity'
            onChange={ handleInputChange }
          />

          <TextField 
            name='price'
            type='number'
            value={ price }
            size='small'
            label='Price'
            onChange={ handleInputChange }
          />

          <TextField 
            name='subtotal'
            type='number'
            value={ price * quantity }
            size='small'
            label='Subtotal'
          />

        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', alignSelf: 'center', alignItems: 'flex-end', mt: 3 }}>
          <Button sx={{ width: 'content-fit', ml: 'auto', bgcolor: '#0B3C5D', color: '#FFF' }}>
            +
          </Button>

          <TextField 
            sx={{ mt: 2 }}
            name='total'
            type='number'
            value={ price * quantity }
            size='small'
            label='Total'
          />
        </Box>
        
      </Box>
    </Box>
  );
};
