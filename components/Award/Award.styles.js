import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  awardContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
    [theme.breakpoints.down('md')]: {
      height: '200px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '300px',
    },
  },
  awardIconContainer: {
    position: 'relative',
    zIndex: 1,
  },
  awardIcon: {
    fontSize: '390px',
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      fontSize: '250px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '390px',
    },
  },
  awardTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -90%)',
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      transform: 'translate(-50%, -80%)',
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'translate(-50%, -90%)',
    },
  },
  starContainer: {
    display: 'flex',
    marginBottom: theme.spacing(2),
    flexWrap: 'nowrap',
  },
  starIcon: {
    color: theme.palette.secondary.light,
    fontSize: 25,
    [theme.breakpoints.down('md')]: {
      fontSize: 17,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 25,
    },
  },
  awardText: {
    color: theme.palette.secondary.light,
    fontSize: '20px !important',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px !important',
      marginTop: -5,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px !important',
      marginTop: 0,
    },
  },
}));

export default useStyles;
