import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'center',
        padding: theme.spacing(5),
        display: 'flex',
    },
    leftContent: {
        flexBasis: 500,
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Slightly darker semi-transparent white background
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow
        backdropFilter: 'blur(10px)', // Frosted glass effect
        borderRadius: '10px', // Rounded corners
        border: '1px solid rgba(255, 255, 255, 0.3)', // Border to enhance the frosted glass effect
        padding: theme.spacing(5), // Padding inside the box
        margin: theme.spacing(4),
        height: 'fit-content',
    },
    divider: {
        height: '2px',
        backgroundColor: theme.palette.primary.main,
        width: '90%',
        margin: 'auto',
        marginBottom: theme.spacing(4),
    },
    rightContent: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(4),

    },
    imageContainer: {
        margin: 'auto',
        flexGrow: 1,
    },
    image: {
        maxWidth: '300px', // Adjust the width as needed
        height: 'auto', // Adjust the height as needed
    },
}));

export default useStyles;