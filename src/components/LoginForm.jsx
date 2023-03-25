import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useFetch, useForm } from "../hooks";
import { ENDPOINT, TOKEN_LOCALSTORAGE, USER_LOCALSTORAGE } from "../utils";
import { AuthContext } from "../context";

const initialState = {
    email: '',
    password: ''
}

export const LoginForm = () => {

    const { formData, onInputChange } = useForm( initialState );
    const { fetchState, handleHasError, handleIsLoading } = useFetch();

    const [ isSecured, setIsSecured ] = useState(true);

    const { auth, handleChangeAuth } = useContext( AuthContext );

    const { email, password } = formData;
    const { isLoading, hasError } = fetchState;

    const handleLogin = () => {
        handleIsLoading( true );
        handleHasError( null );
        handleChangeAuth({
            ...auth,
            status: 'pending'
        })

        fetch( `${ ENDPOINT }/api/auth`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ ...formData })
        })
            .then( res => res.json())
            .then( res => {
                if( !res.ok || res.errors ) {
                    const error = res.msg ?? res.errors[0].msg;
                    handleHasError( error );
                    return;
                }
                const { password, state, ...user } = res.user;
                user.status = 'authenticated';
                localStorage.setItem( TOKEN_LOCALSTORAGE, res.token );
                localStorage.setItem( USER_LOCALSTORAGE, JSON.stringify( user ) );
                handleChangeAuth( user );
            })
            .catch( err => {
                handleHasError( err );
            })
            .finally( () => {
                handleIsLoading( false );
            })
    }

  return (
    <Grid item xs={ 12 } md={ 5 } sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  className="animate__animated animate__fadeIn">
        <Grid container sx={{ justifyContent: 'center', bgcolor: '#FAFAFA', width: 'fit-content', borderRadius: '5px', marginX: 1 }}>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    color="primary"
                    sx={{ textAlign: 'center' }}
                >
                    Login
                </Typography>
            </Grid>

            <form className="login-form">
                <Grid item xs={ 12 }>
                    <TextField
                    sx={{ mt: 2 }}
                    variant="standard"
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                    />
                </Grid>

                <Grid item xs={ 12 }>
                    <TextField
                    sx={{ mt: 2 }}
                    variant="standard"
                    required
                    fullWidth
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <IconButton 
                            onClick={ () => setIsSecured( prev => !prev ) }
                            edge="end"
                            size="small"
                            >
                            { isSecured ? <VisibilityOff /> : <Visibility /> }
                            </IconButton>
                        </InputAdornment>
                        )
                    }}
                    label="Password"
                    type={ isSecured ? "password" : "text" }
                    placeholder="Password"
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                    />
                </Grid>

                {
                    hasError &&
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Alert severity="error">{ hasError }</Alert>
                        </Box>
                }

                <Grid container sx={{ mt: 4, mb: 2 }}>
                    <Grid item xs={ 6 } sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" disabled={ isLoading } onClick={ () => handleLogin() }>
                            { isLoading ? 'Sending...' : 'Login' }
                        </Button>
                    </Grid>

                    <Grid item xs={ 6 } sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            variant="outlined"
                            component={ Link }
                            to="/auth/register"
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    </Grid>
  )
}
