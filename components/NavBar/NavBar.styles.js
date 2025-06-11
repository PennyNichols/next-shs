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
  menuIcon: {
    color: theme.palette.background.paper,
    fontSize: 30,
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
    textAlign: 'center',
    fontSize: 16,
    transition: 'letter-spacing 0.5s ease-in-out, text-shadow 0.3s ease-in-out',
    letterSpacing: 1,
    textShadow: 'none',
    '&:hover': {
      letterSpacing: 2.5,
      textShadow: `
        0px 8px 12px ${theme.palette.accent.main},
        0px 8px 12px ${theme.palette.accent.main}
      `,
    },
  },
  mobileMenuItem: {
    justifyContent: 'center',
  },
}));

export default useStyles;
