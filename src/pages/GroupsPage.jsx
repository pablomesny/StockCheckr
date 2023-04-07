import { useContext,  useState } from 'react';
import {
    Box,
    Button,
    Divider,
    TextField,
    Typography
} from '@mui/material';
import { Modal } from '../components';
import { TableData } from '../components/TableData';
import { StocksContext } from '../context';
import { SnackbarAlert } from '../components/SnackbarAlert';
import { useFetchGroups } from '../hooks/useFetchGroups';

export const GroupsPage = () => {

    const { fetchStatus, isSnackbarOpen, snackbarMessage, handleCreateGroup, handleToggleSnackbar } = useFetchGroups();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { stocks } = useContext(StocksContext);

    const { isLoading, hasError, isSuccessful } = fetchStatus;
    const { groups } = stocks;

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
                        Groups
                    </Typography>
                    <Button
                        onClick={handleToggleModal}
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        sx={{ display: 'flex', ml: 'auto', mr: 2 }}
                    >
                        {isLoading ? 'Loading...' : 'Add group'}
                    </Button>
                </Box>

                {
                    hasError && (
                        <SnackbarAlert 
                            isSnackbarOpen={ isSnackbarOpen }
                            handleToggleSnackbar={ handleToggleSnackbar }
                            message={ snackbarMessage }
                            type='error'
                        />
                    )
                }

                {
                    isSuccessful && (
                        <SnackbarAlert 
                            isSnackbarOpen={ isSnackbarOpen }
                            handleToggleSnackbar={ handleToggleSnackbar }
                            message={ snackbarMessage }
                            type='success'
                        />
                    )
                }

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
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            margin: 2
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 1
                            }}
                        >
                            <Typography component="p" sx={{ fontSize: '1rem' }}>
                                Show
                            </Typography>

                            <TextField
                                style={{ width: 100 }}
                                size="small"
                                type="number"
                                defaultValue={10}
                            />

                            <Typography component="p" sx={{ fontSize: '1rem' }}>
                                entries
                            </Typography>
                        </Box>

                        <Box
                            sx={{
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
                    </Box>

                    <Divider variant="middle" />

                    <TableData 
                        columns={[ 'Name', 'Status', 'Actions' ]}
                        data={ groups }
                        type='state'
                    />
                </Box>
            </Box>

            <Modal
                isOpen={isModalOpen}
                handleToggleModal={handleToggleModal}
                title="Add group"
                inputLabel="Group"
                onSubmit={handleCreateGroup}
            />
        </>
    );
};
