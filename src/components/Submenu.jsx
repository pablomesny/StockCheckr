import { useState } from "react";
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { AttachMoneyRounded, ContentCopyRounded, ControlPointRounded, ExpandLessRounded, ExpandMoreRounded, FormatListBulletedRounded, TurnedInRounded, WorkspacesOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Submenu = () => {

  const [ isOpen, setIsOpen ] = useState( false );

  return (
    <Box sx={{ width: '250px', height: '100%', bgcolor: '#8FB8DE' }}>
      <List>
        <ListItemButton component={ Link } to="/panel/groups">
          <ListItemIcon>
            <WorkspacesOutlined />
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItemButton>

        <ListItemButton component={ Link } to="/panel/brands">
          <ListItemIcon>
            <TurnedInRounded />
          </ListItemIcon>
          <ListItemText primary="Brands" />
        </ListItemButton>

        <ListItemButton component={ Link } to="/panel/categories">
          <ListItemIcon>
            <ContentCopyRounded />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
        
        <ListItemButton component={ Link } to="/panel/attributes">
          <ListItemIcon>
            <ContentCopyRounded />
          </ListItemIcon>
          <ListItemText primary="Attributes" />
        </ListItemButton>

        <ListItemButton component={ Link } to="/panel/products">
          <ListItemIcon>
            <ContentCopyRounded />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton onClick={ () => setIsOpen( prev => !prev ) }>
          <ListItemIcon>
            <AttachMoneyRounded />
          </ListItemIcon>
          <ListItemText primary="Sales" />
          { isOpen ? <ExpandLessRounded /> : <ExpandMoreRounded /> }
        </ListItemButton>

        <Collapse in={ isOpen } timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }} component={ Link } to="/panel/sales/create">
              <ListItemIcon>
                <ControlPointRounded />
              </ListItemIcon>
              <ListItemText primary="Create sale" />
            </ListItemButton>

            <ListItemButton sx={{ pl: 4 }} component={ Link } to="/panel/sales/manage">
              <ListItemIcon>
                <FormatListBulletedRounded />
              </ListItemIcon>
              <ListItemText primary="Manage sales" />
            </ListItemButton>
          </List>
        </Collapse>

      </List>
    </Box>
  )
}
