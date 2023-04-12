import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Modal } from '../components';
import { useTablePages } from '../hooks';
import { TableData } from '../components/TableData';

export const CategoriesPage = () => {

  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useTablePages();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <>
      <Box
        className="animate__animated animate__fadeIn"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '100%',
          bgcolor: '#E5E5E5'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
            ml: 4,
            py: 2
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
            Categories
          </Typography>
          <Button
            onClick={handleToggleModal}
            variant="contained"
            color="primary"
            sx={{ display: 'flex', ml: 'auto', mr: 2 }}
          >
            Add category
          </Button>
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
            mb: 1
          }}
        >
          <Box
            sx={{
              alignSelf: 'flex-end',
              m: 2,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1
            }}
          >
              <Typography component="p" sx={{ fontSize: '1rem' }}>
                Search:
              </Typography>

              <TextField size="small" type="text" />
          </Box>

          <Divider variant="middle" />

          {/* <TableData /> */}
        </Box>
      </Box>

      <Modal
        isOpen={isModalOpen}
        handleToggleModal={handleToggleModal}
        title="Add category"
        inputLabel="Category"
      />
    </>
  );
};
