import { useContext, useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Divider,
    Snackbar,
    TextField,
    Typography
} from '@mui/material';
import { useFetch } from '../hooks';
import { Modal } from '../components';
import { TableData } from '../components/TableData';
import { AuthContext, StocksContext } from '../context';
import { ENDPOINT } from '../utils';

export const GroupsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const { stocks, handleAddGroup, handleSetGroups } = useContext(StocksContext);
    const { auth } = useContext(AuthContext);

    const { fetchState, handleIsLoading, handleHasError, handleIsSuccessful } = useFetch();

    const { isLoading, hasError, isSuccessful } = fetchState;
    const { groups } = stocks;


    useEffect(() => {
        const controller = new AbortController();

        if (groups.length === 0) {
            const { signal } = controller;

            handleIsLoading(true);
            handleHasError(null);
            handleIsSuccessful(false);

            fetch(`${ENDPOINT}/api/groups/?limit=5&from=0`, { signal })
                .then(res => res.json())
                .then(res => {
                    if (!res.ok || res.errors) {
                        const error = res.msg || res.errors[0].msg;
                        handleHasError(error);
                        return;
                    }
                    handleIsSuccessful(true);

                    const groups = res.groups.filter( group => group.created_by === auth.id )
                                                .map( group => {
                                                    const { created_by, ...rest } = group;
                                                    return rest;
                                                });
                    handleSetGroups(groups);
                })
                .catch(err => {
                    handleHasError( String(err) );
                })
                .finally(() => {
                    handleIsLoading(false);
                });
        }

        return () => controller.abort();
    }, []);

    const handleToggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    const handleCreateGroup = name => {
        handleIsLoading(true);
        handleHasError(null);
        handleIsSuccessful(false);

        fetch(`${ENDPOINT}/api/groups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('x-token')
            },
            body: JSON.stringify({ name })
        })
            .then(res => res.json())
            .then(res => {
                if (!res.ok || res.errors) {
                    const error = res.msg || res.errors[0].msg;
                    handleHasError(error);
                    setIsSnackbarOpen(true);
                    return;
                }
                handleAddGroup(res.group);
                setIsSnackbarOpen(true);
            })
            .catch(err => {
                handleHasError(err);
                setIsSnackbarOpen(true);
            })
            .finally(() => {
                handleIsLoading(false);
            });
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
                        <>
                            <Snackbar
                                open={isSnackbarOpen}
                                autoHideDuration={4000}
                                onClose={() => setIsSnackbarOpen(false)}
                            >
                                <Box sx={{ width: '100%' }}>
                                    <Alert severity="error">{hasError}</Alert>
                                </Box>
                            </Snackbar>
                        </>
                    )
                }

                {
                    isSuccessful && (
                        <Snackbar
                            open={isSnackbarOpen}
                            autoHideDuration={4000}
                            onClose={() => setIsSnackbarOpen(false)}
                        >
                            <Box sx={{ width: '100%' }}>
                                <Alert severity="success">
                                    Group created successfully
                                </Alert>
                            </Box>
                        </Snackbar>
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
