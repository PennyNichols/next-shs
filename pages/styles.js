import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'center',
    padding: theme.spacing(5),
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px !important',
    },
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
    minWidth: 350,
    [theme.breakpoints.down('md')]: {
      margin: 0,
      marginBottom: theme.spacing(4),
      flexBasis: 300,
    },
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
    },
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
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
      margin: 0,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  imageContainer: {
    margin: 'auto',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
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
