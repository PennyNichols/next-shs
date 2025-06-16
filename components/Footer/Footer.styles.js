import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  footerOuterContainer: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    width: '100%',
  },
  topContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  actionButtonsContainer: {
    display: 'flex',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  logo: {
    maxWidth: 70,
    maxHeight: 60,
  },
  middleContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'top',
    margin: theme.spacing(3),
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  middleContentContainer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  },
  quickLinksTitle: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  bottomContainer: {
    display: 'flex',
    alignItems: 'end',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  socialIcon: {
    color: theme.palette.accent.main,
    transition: theme.transitions.standard,
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
}));

export default useStyles;
