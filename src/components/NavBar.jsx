import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Button, Container, IconButton, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from "../context/AuthContext";
import { NavbarDrawer } from "./NavbarDrawer";
import { TOKEN_LOCALSTORAGE, USER_LOCALSTORAGE } from "../utils";
import { ConfirmationModal } from "./ConfirmationModal";
import { StocksContext } from "../context";

export const Navbar = () => {

  const [ isOpen, setIsOpen ] = useState( false );
  const [ isModalOpen, setIsModalOpen ] = useState( false );
  
  const { onLogout } = useContext( AuthContext );
  const { handleResetStocks } = useContext( StocksContext );

  const handleToggleDrawer = () => {
    setIsOpen( prev => !prev );
  }

  const handleToggleModal = () => {
    setIsModalOpen( prev => !prev );
  }

  const handleLogout = () => {
    localStorage.removeItem( USER_LOCALSTORAGE );
    localStorage.removeItem( TOKEN_LOCALSTORAGE );
    setIsModalOpen( false );
    handleResetStocks();
    onLogout();
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>

            <IconButton 
              onClick={ handleToggleDrawer }
              color="inherit" 
              aria-label="Menu"
              sx={{ display: { md: 'none' }, mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <div className="navbar-logo-container">
              <img src="/src/assets/stockcheckr-navbar-logo.png" alt="brand logo" className='navbar-logo' />
            </div>

            <Button 
              sx={{ 
                display: { xs: 'none', md: 'flex' },
                ':hover': { color: '#000000' }
              }}
              component={ NavLink }
              to="/dashboard"
              variant="text" 
              color="inherit"
            >
              Dashboard
            </Button>

            <Button 
              sx={{ 
                display: { xs: 'none', md: 'flex', lg: 'flex' },
                ':hover': { color: '#000000' }
              }}
              component={ NavLink }
              to="/panel"
              variant="text" 
              color="inherit"
            >
              Control panel
            </Button>

            <Button 
              sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'flex' } }}
              variant="contained" 
              color="error"
              onClick={ handleToggleModal }
            >
              Logout
            </Button>

          </Toolbar>
        </Container>
      </AppBar>

      <NavbarDrawer isOpen={ isOpen } handleToggleDrawer={ handleToggleDrawer }/>

      <ConfirmationModal 
        isOpen={ isModalOpen } 
        handleToggleModal={ handleToggleModal } 
        title='LOGOUT' 
        description="Do you really want to logout from this webpage?" 
        onSubmit={ handleLogout } 
      />
    </>
  )
}