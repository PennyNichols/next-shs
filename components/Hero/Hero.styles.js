import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    heroContainer: {
        position: 'relative',
        width: '100%',
        height: '60vh',
        [theme.breakpoints.down('md')]: {
            height: '70vh',
        },
        [theme.breakpoints.down('xs')]: {
            height: '100vh',
        },
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
        background: `linear-gradient(to bottom, rgba(0, 31, 63, 0.75), rgba(255, 255, 255, 0.75))`,
        alignContent: 'bottom',
        padding: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            paddingBottom: 0,
        },
        [theme.breakpoints.down('xs')]: {
            paddingBottom: theme.spacing(3),
        },
    },
    headerContainer: {
        gap: 0,
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
        },
    },
    header: {
        lineHeight: .75,
        [theme.breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.5rem',
        },
    },
    subheader: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '1rem',
            marginBottom: theme.spacing(3),
        },


    },
    actionButtons: {
        display: 'flex',
        gap: theme.spacing(2),
        margin: theme.spacing(4),
        marginBottom: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(4),
        },
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            margin: theme.spacing(0, 0, 4, 0),
            gap: theme.spacing(1.5),
        },
    }
}));

export default useStyles;