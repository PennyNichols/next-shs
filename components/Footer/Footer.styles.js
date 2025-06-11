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
  },
  middleContentContainer: {},
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
  },
}));

export default useStyles;
