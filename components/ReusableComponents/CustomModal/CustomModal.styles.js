import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    outterContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        maxHeight: '100vh',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 10,
        padding: theme.spacing(2, 4, 3),
        zIndex: theme.zIndex.modal,
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%',
        },
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        // Hide scrollbar for Internet Explorer and Edge
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none', // Hide scrollbar for Firefox
    },
}));

export default useStyles;