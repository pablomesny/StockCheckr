import { Container } from "@mui/material"

export const FullScreenLogo = () => {
  return (
    <Container sx={{ display: 'flex', width: '100%', height: '100vh', bgcolor: '#0B3C5D', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/src/assets/stockcheckr-login-logo.png" alt="brand logo" className="animate__animated animate__slower animate__fadeIn" />
    </Container>
  )
}
