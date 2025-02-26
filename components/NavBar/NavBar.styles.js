import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    leftLogoContainer: {
        marginRight: 2,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    // mobileMenuContainer: {
    //     flexGrow: 1,
    //     display: 'none',
    //     [theme.breakpoints.down('sm')]: {
    //         display: 'flex',
    //     },
    // },
    // mobileNavContainer: {
    //     display: 'none',
    //     [theme.breakpoints.down('sm')]: {
    //         display: 'block',
    //     },
    // },
}));

export default useStyles;