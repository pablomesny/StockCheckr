import { AppBar, Button, Container, makeStyles, Toolbar, Typography } from "@mui/material"

export const NavBar = () => {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>

          <img src="/src/assets/stockcheckr-navbar-logo.png" alt="brand logo" className='navbar-logo' />

          <Button variant="text" color="inherit">
            Dashboard
          </Button>

          <Button variant="text" color="inherit">
            Control panel
          </Button>

          <Button variant="contained" color="error" sx={{ marginLeft: 'auto' }}>
            Logout
          </Button>

        </Toolbar>
      </Container>
    </AppBar>
  )
}
