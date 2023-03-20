import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom"
import { FullScreenLogo, LoginForm, RegisterForm } from "../components";

export const AuthRoutes = () => {
 
  const [ bigLogo, setBigLogo ] = useState( true );

  useEffect(() => {
    if( bigLogo ) {
      setTimeout(() => {
        setBigLogo( false );
      }, 2500);
    }
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

                <Routes>
                    <Route path="/login" element={ <LoginForm /> } />
                    <Route path="/register" element={ <RegisterForm /> } />

                    <Route path="/*" element={ <Navigate to="/login" /> } />
                </Routes>
                
              </Grid>

            </Box>
          )
      }
    </>
  )
}
