import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  shareWrapper: {
    position: 'fixed',
    top: 90,
    right: 30,
    borderRadius: '50%',
    zIndex: 1300,
    border: `2px solid ${theme.palette.background.default}`,
    transition: theme.transitions.slow,
    backgroundColor: theme.palette.primary.main,
    opacity: 0.7,
    '&:hover': {
      backgroundColor: theme.palette.accent.main,
      borderColor: theme.palette.primary.main,
      '& $shareIcon': {
        color: theme.palette.primary.main,
      },
    },
  },
  shareIcon: {
    color: theme.palette.background.default,
  },
  shareMenu: {
    marginTop: theme.spacing(1),
  },
  socialIcon: {
    color: theme.palette.secondary.light,
    transition: theme.transitions.standard,
    '&:hover': {
      color: theme.palette.accent.main,
    },
  },
  menuList: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
