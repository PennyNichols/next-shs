import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  outterContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: '90vh',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
    zIndex: theme.zIndex.modal,
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
      maxHeight: '100vh',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '-ms-overflow-style': 'none',
    'scrollbar-width': 'none',
  },
}));

export default useStyles;
