import { useState } from "react";
import { Box, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

export const NavbarDrawer = ({ isOpen, handleToggleDrawer }) => {

  const [ selectedIndex, setSelectedIndex ] = useState();

  return (
    <Drawer
      open={ isOpen }
      anchor='left'
    >
      <Box sx={{ width: '100vw', height: '100%', bgcolor: '#FAFAFA', zIndex: 1200 }}>
        <List component='nav' aria-label='Menu items'>

          <Container sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <ListItemIcon>
              <IconButton onClick={ handleToggleDrawer }>
                <CloseRounded />
              </IconButton>
            </ListItemIcon>
          </Container>

          <Divider />

          <ListItemButton 
            selected={ selectedIndex === 1 }
            onClick={ () => setSelectedIndex( 1 ) }
          >
            <ListItemText primary="Dashboard" sx={{ textAlign: 'center' }}/>
          </ListItemButton>

          <ListItemButton 
            selected={ selectedIndex === 2 }
            onClick={ () => setSelectedIndex( 2 ) }
          >
            <ListItemText primary="Control panel" sx={{ textAlign: 'center' }} />
          </ListItemButton>


          <ListItemButton>            
            <ListItemText primary="Logout" sx={{ textAlign: 'center' }} />
          </ListItemButton>

        </List>
      </Box>
    </Drawer>
  )
}
