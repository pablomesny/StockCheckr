import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0B3C5D'
        },
        secondary: {
            main: '#8FB8DE'
        },
        error: {
            main: red.A400
        }
    }
})