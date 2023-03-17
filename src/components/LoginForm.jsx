import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material"
import { useState } from "react";

export const LoginForm = ({ handleChangeForm }) => {

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
      });
    
    const [ isSecured ,setIsSecured ] = useState(true);

    const { email, password } = formData;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormData({
            ...formData,
            [ name ]: value
        })
    }

  return (
    <Grid item xs={ 12 } md={ 5 } sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid container sx={{ justifyContent: 'center', bgcolor: '#FAFAFA', width: 'fit-content', borderRadius: '5px' }}>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    color="inherit"
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

                <Grid container sx={{ mt: 4, mb: 2 }}>
                    <Grid item xs={ 6 } sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained">
                            Login
                        </Button>
                    </Grid>

                    <Grid item xs={ 6 } sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button 
                            variant="outlined"
                            onClick={ handleChangeForm }
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
