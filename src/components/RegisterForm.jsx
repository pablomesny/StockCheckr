import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"

export const RegisterForm = ({ handleChangeForm }) => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordCheck: ''
    });

    const [ isSecured, setIsSecured ] = useState({
        password: true,
        passwordCheck: true
    });

    const { username, email, password, passwordCheck } = formData;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [ name ]: value
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
                        onChange={ onInputChange }
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
                        label="Password"
                        type={ isSecured.password ? "password" : "text" }
                        placeholder="Password"
                        name="password"
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
                        onChange={ onInputChange }
                    />
                </Grid>

                <Grid container sx={{ mt: 4, mb: 2 }}>
                    <Grid item xs={ 6 } sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained">
                            Create
                        </Button>
                    </Grid>

                    <Grid item xs={ 6 } sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            variant="outlined"
                            onClick={ handleChangeForm }
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
