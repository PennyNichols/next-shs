import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

// marquee needs to be adjusted for the number of reviews to maintain correct speed
// possibly monthly checks? Would prefer to find a dynamic, automated solution
// @keyframes are parsed before components are rendered, so we can't use props to set the duration dynamically

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(5),
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    gap: theme.spacing(10),
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(5),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 0),
    },
  },
  sectionTitle: {
    textAlign: 'center',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      fontSize: 28,
    },
  },
  lightTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      gap: theme.spacing(1),
    },
  },
  lightTitleDecoration: {
    flex: 1,
    height: 2,
    backgroundColor: theme.palette.accent.main,
    margin: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      margin: `${theme.spacing(5)} ${theme.spacing(1)}`,
    },
  },
  lightTitle: {
    color: theme.palette.secondary.light,
  },
  services: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius.medium,
    width: '100%',
    maxWidth: 1200,
    boxShadow: theme.shadows[2],
    [theme.breakpoints.down('xs')]: {
      borderRadius: theme.shape.borderRadius.none,
    },
  },
  serviceAreas: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    marginTop: theme.spacing(3),
    padding: theme.spacing(4),
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius.medium,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      borderRadius: theme.shape.borderRadius.none,
      marginTop: theme.spacing(1),
    },
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
    height: 2,
    backgroundColor: theme.palette.accent.main,
  },
  separationDot: {
    width: 8,
    height: 8,
    borderRadius: theme.shape.borderRadius.circle,
    backgroundColor: theme.palette.primary.main,
  },
  serviceAreaListItem: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 24,
    },
  },
  reviews: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(4, 0),
    marginBottom: theme.spacing(2),
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius.medium,
    width: '100%',
    maxWidth: 1200,
    [theme.breakpoints.down('xs')]: {
      borderRadius: theme.shape.borderRadius.none,
    },
  },
  reviewTitle: {
    margin: theme.spacing(0, 3),
    marginBottom: theme.spacing(1),
  },

  reviewContentContainer: {
    minWidth: '100%',
    position: 'relative',
    minHeight: 220,
  },
  reviewsBg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: theme.spacing(1),
  },
  reviewsSvg: {
    width: '60%',
    height: 'auto',
    display: 'block',
    margin: '0 auto',
  },
  reviewContent: {
    display: 'flex',
    width: 'max-content',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'nowrap',
    pointerEvents: 'none',
  },
  reviewCardsContainer: {
    width: '100%',
    height: '120%',
    position: 'absolute',
    left: 0,
    top: -40,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      top: -30,
    },
  },
  reviewContentMarquee: {
    animation: '$marquee 60s linear infinite',
    willChange: 'transform',
    pointerEvents: 'none',
    '&:hover': {
      animationPlayState: 'paused',
    },
  },
  '@keyframes marquee': {
    '0%': {
      transform: 'translateX(0%)',
    },
    '100%': {
      transform: 'translateX(-50%)',
    },
  },
  image: {
    flexGrow: 1,
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
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
