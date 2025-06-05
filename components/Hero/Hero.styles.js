import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '60vh',
    [theme.breakpoints.down('md')]: {
      height: '70vh',
    },
    [theme.breakpoints.down('sm')]: {
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
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    background: 'linear-gradient(to bottom, rgba(27, 78, 130, 0.8), rgba(255, 255, 255, 0.8))',
    alignContent: 'bottom',
    padding: theme.spacing(4),
  },
  headerContainer: {
    gap: 0,
    marginBottom: theme.spacing(2),
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
  headerText: {},
  subheader: {},
  actionButtons: {
    display: 'flex',
    gap: theme.spacing(2),
    margin: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(1.5),
    },
  },
}));

export default useStyles;
