import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    footerOuterContainer: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        position: 'fixed',
        bottom: 0,
        width: '100%',
    }
}));

export default useStyles;