import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    heroContainer: {
        position: 'relative',
        width: '100%',
        height: '60vh',
    },
    heroContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        background: `linear-gradient(to bottom, rgba(0, 31, 63, 0.95), rgba(255, 255, 255, 0.95))`,
        alignContent: 'bottom',
        padding: theme.spacing(4),
    },
    actionButtons: {
        display: 'flex',
        gap: theme.spacing(2),
        margin: theme.spacing(4),
        marginBottom: theme.spacing(8),
    }
}));

export default useStyles;