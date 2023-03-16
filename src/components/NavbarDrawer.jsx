import { useState } from "react";
import { Box, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";

export const NavbarDrawer = ({ isOpen, handleToggleDrawer }) => {
  return (
    <Drawer
      open={ isOpen }
      anchor='left'
    >
      <Box sx={{ width: '100vw', height: '100%', bgcolor: '#0B3C5D', zIndex: 1200 }}>
        <List component='nav' aria-label='Menu items'>

          <Container sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <ListItemIcon>
              <IconButton sx={{ mb: 1 }} onClick={ handleToggleDrawer }>
                <CloseRounded style={{ color: 'white' }} />
              </IconButton>
            </ListItemIcon>
          </Container>

          <Divider color="#CCCCCC" variant="middle" />

          <ListItemButton
            sx={{ mt: 1 }}
          >
            <ListItemText primary="Dashboard" primaryTypographyProps={{ style: { color: 'white' } }} sx={{ textAlign: 'center' }}/>
          </ListItemButton>

          <ListItemButton>
            <ListItemText primary="Control panel" primaryTypographyProps={{ style: { color: 'white' } }} sx={{ textAlign: 'center' }} />
          </ListItemButton>


          <ListItemButton>            
            <ListItemText primary="Logout" primaryTypographyProps={{ style: { color: 'white' } }} sx={{ textAlign: 'center' }} />
          </ListItemButton>

        </List>
      </Box>
    </Drawer>
  )
}
