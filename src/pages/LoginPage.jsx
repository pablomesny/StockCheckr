import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { FullScreenLogo, LoginForm, RegisterForm } from "../components";

export const LoginPage = () => {

  const [ bigLogo, setBigLogo ] = useState( true );

  const [ isUserRegistered, setIsUserRegistered ] = useState( true );

  useEffect(() => {
    setTimeout(() => {
      setBigLogo( false );
    }, 2500);
  }, []);
  

  const handleChangeForm = () => {
    setIsUserRegistered( prev => !prev );
  }

  return (
    <>
      {
        bigLogo

          ? <FullScreenLogo />

          : (
            <Box sx={{ bgcolor: '#0B3C5D', height: '100vh', minWidth: '100%' }}>
              <Grid container sx={{ height: '100%' }} className="animate__animated animate__fadeIn">
                <Grid item xs={ 12 } md={ 7 } sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/src/assets/stockcheckr-login-logo.png" alt="brand logo" className="login-logo" />
                </Grid>

                {
                  isUserRegistered

                    ? <LoginForm handleChangeForm={ handleChangeForm } />

                    : <RegisterForm handleChangeForm={ handleChangeForm } />
                }
                
              </Grid>

            </Box>
          )
      }

      
    </>

  )
}
