import {createTheme} from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';

export const defaultPMSTheme = createTheme({
    palette:{
        primary:{
            main: blue[700],
            contrastText: '#ffffff',
        },
        secondary:{
            main: grey[400],
            contrastText: '#ffffff',
        },
        error:{
            main: red[400],
            contrastText: '#ffffff',
        }
    }
})