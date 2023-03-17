import { Container } from "@mui/material"

export const FullScreenLogo = () => {
  return (
    <Container sx={{ display: 'flex', height: '100vh', width: '100vw', objectFit: 'contain', bgcolor: '#0B3C5D', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/src/assets/stockcheckr-login-logo.png" alt="brand logo" className="fullscreen-logo animate__animated animate__slower animate__fadeIn" />
    </Container>
  )
}
