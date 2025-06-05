import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  serviceAreas: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
  sectionTitle: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  serviceAreasList: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(8),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
    },
  },
  dividerLine: {
    width: '50%',
    height: '2px',
    backgroundColor: theme.palette.primary.main,
  },
  separationDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
  serviceAreaListItem: {},
  image: {
    flexGrow: 1,
    maxWidth: '100%', // Ensure the image scales correctly
    width: '100%', // Allow the image to resize based on the container
    height: 'auto', // Maintain the aspect ratio
    objectFit: 'contain',
  },
  authWrapper: {
    display: 'flex',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: theme.spacing(5),
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    },
  },
}));

export default useStyles;
