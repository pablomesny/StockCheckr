import { ContentCopyRounded, TurnedInRounded } from "@mui/icons-material"
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

export const Submenu = () => {
  return (
    <Box sx={{ width: '200px', height: 'calc( 100vh - 64px )', bgcolor: '#8FB8DE', borderRight: '1px solid black' }}>
      <List>
        <ListItemButton>
          <ListItemIcon>
            <TurnedInRounded />
          </ListItemIcon>
          <ListItemText primary="Brand" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ContentCopyRounded />
          </ListItemIcon>
          <ListItemText primary="Category" />
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

      </List>
    </Box>
  )
}
