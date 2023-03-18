import { AttachMoneyRounded, ContentCopyRounded, TurnedInRounded, WorkspacesOutlined } from "@mui/icons-material"
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

export const Submenu = () => {
  return (
    <Box sx={{ width: '200px', height: 'calc( 100vh - 64px )', bgcolor: '#8FB8DE' }}>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <WorkspacesOutlined />
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <TurnedInRounded />
          </ListItemIcon>
          <ListItemText primary="Brands" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ContentCopyRounded />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItemButton>
        
        <ListItemButton>
          <ListItemIcon>
            <ContentCopyRounded />
          </ListItemIcon>
          <ListItemText primary="Attributes" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ContentCopyRounded />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <AttachMoneyRounded />
          </ListItemIcon>
          <ListItemText primary="Sales" />
        </ListItemButton>

      </List>
    </Box>
  )
}
