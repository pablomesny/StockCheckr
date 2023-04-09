import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Collapse, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AttachMoneyRounded, CloseRounded, ContentCopyRounded, ControlPointRounded, ExpandLessRounded, ExpandMoreRounded, FormatListBulletedRounded, StarBorder, TurnedInRounded, WorkspacesRounded } from "@mui/icons-material";
import { ConfirmationModal } from "./ConfirmationModal";
import { AuthContext } from "../context";
import { TOKEN_LOCALSTORAGE, USER_LOCALSTORAGE } from "../utils";
import { handleResetStocks } from "../helpers";

export const NavbarDrawer = ({ isOpen, handleToggleDrawer }) => {

  const { onLogout } = useContext( AuthContext );

  const [ isModalOpen, setIsModalOpen ] = useState( false );
  const [ isControlPanelOpen, setIsControlPanelOpen ] = useState( false );
  const [ isSalesOpen, setIsSalesOpen ] = useState( false );

  const { handleResetStocks: handleResetData } = handleResetStocks();

  const handleToggleModal = () => {
    setIsModalOpen( prev => !prev );
  }

  const handleLogout = () => {
    localStorage.removeItem( USER_LOCALSTORAGE );
    localStorage.removeItem( TOKEN_LOCALSTORAGE );
    setIsModalOpen( false );
    handleResetData();
    onLogout();
  }

  return (
    <>
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

            <List>
              <ListItemButton
                sx={{ mt: 1 }}
                component={ Link }
                to="/dashboard"
              >
                <ListItemText primary="Dashboard" primaryTypographyProps={{ style: { color: 'white' } }}/>
              </ListItemButton>

              <ListItemButton 
                onClick={ () => setIsControlPanelOpen( prev => !prev ) }
              >
                <ListItemText primary="Control panel" primaryTypographyProps={{ style: { color: 'white' } }} />
                { isControlPanelOpen ? <ExpandLessRounded style={{ color: 'white' }} sx={{ mr: 4 }} /> : <ExpandMoreRounded style={{ color: 'white' }} sx={{ mr: 4 }} /> }
              </ListItemButton>

              <Collapse in={ isControlPanelOpen } timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton 
                    component={ Link }
                    to="/panel/groups"
                    sx={{ pl: 4, color: 'white' }}
                  >
                    <ListItemIcon>
                      <WorkspacesRounded style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Groups" />
                  </ListItemButton>

                  <ListItemButton 
                    component={ Link }
                    to="/panel/brands"
                    sx={{ pl: 4, color: 'white' }}
                  >
                    <ListItemIcon>
                      <TurnedInRounded style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Brands" />
                  </ListItemButton>

                  <ListItemButton 
                    component={ Link }
                    to="/panel/categories"
                    sx={{ pl: 4, color: 'white' }}
                  >
                    <ListItemIcon>
                      <ContentCopyRounded style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Categories" />
                  </ListItemButton>

                  <ListItemButton 
                    component={ Link }
                    to="/panel/attributes"
                    sx={{ pl: 4, color: 'white' }}
                  >
                    <ListItemIcon>
                      <ContentCopyRounded style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Attributes" />
                  </ListItemButton>

                  <ListItemButton 
                    component={ Link }
                    to="/panel/products"
                    sx={{ pl: 4, color: 'white' }}
                  >
                    <ListItemIcon>
                      <ContentCopyRounded style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                  </ListItemButton>

                  <ListItemButton sx={{ pl: 4, color: 'white' }} onClick={ () => setIsSalesOpen( prev => !prev ) }>
                    <ListItemIcon>
                      <AttachMoneyRounded style={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Sales" />
                    { isSalesOpen ? <ExpandLessRounded style={{ color: 'white' }} /> : <ExpandMoreRounded style={{ color: 'white' }} /> }
                  </ListItemButton>

                  <Collapse in={ isSalesOpen } timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton 
                        component={ Link }
                        to="/panel/sales/create"
                        sx={{ pl: 8, color: 'white' }}
                      >
                        <ListItemIcon>
                          <ControlPointRounded style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Create sale" />
                      </ListItemButton>

                      <ListItemButton 
                        component={ Link }
                        to="/panel/sales/manage"
                        sx={{ pl: 8, color: 'white' }}
                      >
                        <ListItemIcon>
                          <FormatListBulletedRounded style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText primary="Manage sales" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </Collapse>

              <ListItemButton>            
                <ListItemText 
                  primary="Logout" 
                  primaryTypographyProps={{ style: { color: 'white' } }} 
                  sx={{ textAlign: 'center' }} 
                  onClick={ handleToggleModal } 
                />
              </ListItemButton>
            </List>
          </List>
        </Box>
      </Drawer>

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
