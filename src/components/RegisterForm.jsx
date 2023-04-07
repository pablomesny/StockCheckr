import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Box, Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { ENDPOINT } from "../utils";
import { useFetchStatus, useForm } from "../hooks";

const initialState = {
    username: '',
    email: '',
    password: '',
    passwordCheck: ''
}

export const RegisterForm = () => {

    const { formData, isInputValid, handleInputChange, handleInputValidation, handlePasswordMatch } = useForm( initialState );
    const { fetchStatus, handleIsLoading, handleHasError, handleIsSuccessful, handleStartFetching } = useFetchStatus();

    const [ isSecured, setIsSecured ] = useState({
        password: true,
        passwordCheck: true
    });    
    
    const { username, email, password, passwordCheck } = formData;
    const { isPasswordValid, isEmailValid, doesPasswordsMatch } = isInputValid;
    const { isLoading, hasError, isSuccessful } = fetchStatus;

    const handleCreateUser = () => {
        handleStartFetching();

        if( isPasswordValid && isEmailValid && doesPasswordsMatch ) {
            fetch( `${ ENDPOINT }/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formData })
            } )
                .then( res => res.json() )
                .then( ( res ) => {
                    if( !res.ok || res.errors ) {
                        const error = res.msg || res.errors[0].msg;
                        handleHasError( error );
                        return;
                    }
                    handleIsSuccessful( true );
                })
                .catch( ( err ) => {
                    console.log(err);
                    handleHasError( err );
                })
                .finally( () => {
                    handleIsLoading( false );
                })
        }
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
                    Register
                </Typography>
            </Grid>

            <form className="login-form">
                <Grid item xs={ 12 }>
                    <TextField
                        sx={{ mt: 2 }}
                        variant="standard"
                        required
                        fullWidth
                        label="Username"
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={ username }
                        onChange={ handleInputChange }
                    />
                </Grid>

                <Grid item xs={ 12 }>
                    <TextField
                        sx={{ mt: 2 }}
                        variant="standard"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        error={ !isEmailValid }
                        placeholder="your@email.com"
                        name="email"
                        helperText={ isEmailValid ? '' : 'Email is not valid' }
                        value={ email }
                        onChange={ handleInputChange }
                        onBlur={ handleInputValidation }
                    />
                </Grid>

                <Grid item xs={ 12 }>
                    <TextField
                        sx={{ mt: 2 }}
                        variant="standard"
                        required
                        fullWidth
                        label="Password"
                        type={ isSecured.password ? "password" : "text" }
                        error={ !isPasswordValid }
                        placeholder="Password"
                        name="password"
                        helperText={ isPasswordValid ? '' : 'Enter at least 8 characters' }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton 
                                        onClick={ () => setIsSecured( prev => ({
                                            ...isSecured,
                                            password: !prev.password
                                        }))}
                                        edge="end"
                                        size="small"
                                    >
                                        { isSecured.password ? <VisibilityOff /> : <Visibility /> }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        value={ password }
                        onChange={ handleInputChange }
                        onBlur={ handleInputValidation }
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
                                        onClick={ () => setIsSecured( prev => ({
                                            ...isSecured,
                                            passwordCheck: !prev.passwordCheck
                                        }))}
                                        edge="end"
                                        size="small"
                                    >
                                        { isSecured.passwordCheck ? <VisibilityOff /> : <Visibility /> }
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        label="Repeat password"
                        type={ isSecured.passwordCheck ? "password" : "text" }
                        placeholder="Repeat password"
                        name="passwordCheck"
                        value={ passwordCheck }
                        error={ !doesPasswordsMatch }
                        helperText={ doesPasswordsMatch ? '' : 'Passwords do not match' }
                        onChange={ handleInputChange }
                        onBlur={ () => handlePasswordMatch( password, passwordCheck ) }
                    />
                </Grid>

                {
                    isSuccessful && (
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Alert severity="success">USER CREATED SUCCESSFULLY</Alert>
                        </Box>
                    )
                }

                {
                    hasError && (
                        <Box sx={{ width: '100%', mt: 2 }}>
                            <Alert severity="error">{ hasError }</Alert>
                        </Box>
                    )
                }

                <Grid container sx={{ mt: 4, mb: 2 }}>
                    <Grid item xs={ 6 } sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" disabled={ isLoading } onClick={ handleCreateUser }>
                            { isLoading ? 'Sending...' : 'Create user' }
                        </Button>
                    </Grid>

                    <Grid item xs={ 6 } sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            variant="outlined"
                            component={ Link }
                            to="/auth/login"
                        >
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    </Grid>
  )
}
