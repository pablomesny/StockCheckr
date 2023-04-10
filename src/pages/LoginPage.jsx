import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import { FullScreenLogo, LoginForm, RegisterForm } from "../components";
import { useLocation } from "react-router-dom";

export const LoginPage = () => {

  const [ bigLogo, setBigLogo ] = useState( true );
  
  const location = useLocation();
  const path = location.pathname.split('/').slice(-1).join();
  
  useEffect(() => {
    setTimeout(() => {
      setBigLogo( false );
    }, 2500);
  }, []);

  return (
    <>
      {
        bigLogo

          ? <FullScreenLogo />

          : (
            <Box sx={{ bgcolor: '#0B3C5D', height: '100vh', minWidth: '100%' }}>
              <Grid container sx={{ height: '100%' }}>
                <Grid item xs={ 12 } md={ 7 } sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="animate__animated animate__fadeIn">
                  <img src="/src/assets/stockcheckr-login-logo.png" alt="brand logo" className="login-logo" />
                </Grid>

                {
                  path === 'login'

                    ? <LoginForm />

                    : <RegisterForm />
                }
                
              </Grid>

            </Box>
          )
      }
    </>

  )
}
