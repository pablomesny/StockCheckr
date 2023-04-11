import { useContext, useState } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { Modal } from '../components';
import { TableData } from '../components/TableData';
import { useFetchBrands, useTablePages } from '../hooks';
import { BrandsContext } from '../context';
import { SnackbarAlert } from '../components/SnackbarAlert';

export const BrandsPage = () => {
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    useTablePages();

  const {
    fetchStatus,
    isSnackbarOpen,
    snackbarMessage,
    handleCreateBrand,
    handleDeleteBrand,
    handleUpdateBrand,
    handleToggleSnackbar
  } = useFetchBrands(page, rowsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { brands } = useContext(BrandsContext);

  const { isLoading, hasError, isSuccessful } = fetchStatus;
  const { items, total } = brands;

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
            Brands
          </Typography>
          <Button
            onClick={handleToggleModal}
            variant="contained"
            color="primary"
            disabled={ isLoading }
            sx={{ display: 'flex', ml: 'auto', mr: 2 }}
          >
            { isLoading ? 'Loading...' : 'Add brand' }
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

          <TableData 
            columns={[ 'Name', 'Status', 'Actions' ]}
            data={ items }
            dataLength={ total }
            type="state"
            fetchStatus={ fetchStatus }
            handleDelete={ handleDeleteBrand }
            handleUpdate={ handleUpdateBrand }
            page={ page }
            rowsPerPage={ rowsPerPage }
            handleChangePage={ handleChangePage }
            handleChangeRowsPerPage={ handleChangeRowsPerPage }
          />
        </Box>
      </Box>

      {hasError && (
        <SnackbarAlert
          isSnackbarOpen={isSnackbarOpen}
          handleToggleSnackbar={handleToggleSnackbar}
          message={snackbarMessage}
          type="error"
        />
      )}

      {isSuccessful && (
        <SnackbarAlert
          isSnackbarOpen={isSnackbarOpen}
          handleToggleSnackbar={handleToggleSnackbar}
          message={snackbarMessage}
          type="success"
        />
      )}

      <Modal
        isOpen={isModalOpen}
        handleToggleModal={handleToggleModal}
        title="Add brand"
        inputLabel="Brand"
        onSubmit={ handleCreateBrand }
      />
    </>
  );
};
