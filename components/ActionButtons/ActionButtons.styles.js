import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  shareWrapper: {
    position: 'fixed',
    top: 90,
    right: 30,
    borderRadius: '50%',
    zIndex: 1300,
    transition: 'background-color 0.8s ease-in-out, color 0.8s ease-in-out',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.accent.main,
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
    transition: 'color 0.4s ease-in-out',
    '&:hover': {
      color: theme.palette.accent.main,
    },
  },
  menuList: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
