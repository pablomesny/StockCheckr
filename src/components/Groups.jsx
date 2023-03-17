import { Box, Button, Divider, TextField, Typography } from "@mui/material"
import { TableData } from "./TableData"

export const Groups = () => {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', width: '100%', maxHeight: '100%', bgcolor: '#E5E5E5'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, ml: 4, py: 2 }}>
            <Typography component="h2" variant="h5">
                Control panel
            </Typography>
            <Typography component="h3" variant="h6" sx={{ fontWeight: 400, color: '#999999' }}>
                Groups
            </Typography>
            <Button variant="contained" color="primary" sx={{ display: 'flex', ml: 'auto', mr: 2 }}>
                Add group
            </Button>
        </Box>

        <Divider variant="middle" />

        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', height: '100%', margin: 2, padding: 2, bgcolor: '#FAFAFA', borderRadius: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Typography component="p" sx={{ fontSize: '1rem'}}>
                        Show
                    </Typography>

                    <TextField 
                        style={{ width: 100 }}
                        size="small"
                        type="number"
                        defaultValue={ 10 }
                    />

                    <Typography component="p" sx={{ fontSize: '1rem' }}>
                        entries
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Typography component="p" sx={{ fontSize: '1rem' }}>
                        Search:
                    </Typography>
                    
                    <TextField 
                        size="small"
                        type="text"
                    />
                </Box>
            </Box>

            <Divider variant="middle" sx={{ my: 2 }} />

            <TableData />
        </Box>
    </Box>
  )
}