import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  shareWrapper: {
    position: 'fixed',
    top: 90,
    right: 30,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    zIndex: 1300,
  },
  shareIcon: {
    color: theme.palette.background.default,
  },
  shareMenu: {
    marginTop: theme.spacing(1),
  },
  socialIcon: {
    color: theme.palette.secondary.light,
  },
  menuList: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default useStyles;
