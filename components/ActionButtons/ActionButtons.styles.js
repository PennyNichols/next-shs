import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    shareWrapper: {
        position: 'fixed',
        top: 90,
        right: 30,
        backgroundColor: theme.palette.primary.main,
        borderRadius: '50%',
    },
    shareIcon: {
        color: theme.palette.background.default,
    },
    socialIcon: {
        color: theme.palette.primary.main,
    },
    quoteButton: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main,
    }
}));

export default useStyles;