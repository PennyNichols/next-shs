import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#001f3f', // Navy Blue
        },
        secondary: {
            main: '#d3d3d3', // Warm Gray
        },
        accent: {
            main: '#ffd700', // Gold
        },
        background: {
            default: '#f8f8ff', // Off White Background
            paper: '#fff', // White paper background
        },
        text: {
            primary: '#333', // Dark Gray or Black for text
        },
    },
    //other theme settings like typography, spacing, etc. can go here
});

export default theme;