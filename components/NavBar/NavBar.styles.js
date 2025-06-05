import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  leftLogoContainer: {
    marginRight: 2,
  },
  desktopNavLinkContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  mobileNavLinkContainer: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginLeft: 'auto',
    },
  },
  menu: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiPaper-root': {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        right: 0,
        left: 'auto',
        minWidth: 160,
        boxShadow: 'none',
        border: 'none',
        backgroundClip: 'padding-box',
        background: theme.palette.primary.main,
        '&:before, &:after': {
          display: 'none',
          border: 'none',
          background: 'none',
        },
      },
    },
  },
  menuList: {
    backgroundColor: theme.palette.primary.main,
  },
  menuItem: {
    color: theme.palette.secondary.light,
    margin: 1,
    transition: 'letter-spacing 0.3s cubic-bezier(.4,0,.2,1)',
    letterSpacing: '0.02em',
    '&:hover': {
      letterSpacing: '0.1em',
    },
  },
}));

export default useStyles;
