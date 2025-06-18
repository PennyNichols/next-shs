import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  cementMixerDrive: {
    animation: '$driveBackAndForth 20s linear infinite',
    display: 'inline-block',
    transformOrigin: 'center center',
    position: 'relative',
    zIndex: 10,
  },
  cementMixerBounce: {
    animation: '$bounce 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite alternate',
    display: 'inline-block',
    position: 'relative',
    zIndex: 10,
  },
  road: {
    width: '100vw',
    height: 40,
    border: `1px solid ${theme.palette.text.primary}`,
    backgroundColor: theme.palette.secondary.dark,
    marginTop: theme.spacing(1),
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  roadLine: {
    width: '100vw',
    height: 2,
    backgroundImage: `repeating-linear-gradient(
      to right,
      ${theme.palette.accent.main},
      ${theme.palette.accent.main} 16px,
      transparent 16px,
      transparent 32px
    )`,
    backgroundRepeat: 'repeat-x',
    backgroundPosition: 'center',
    backgroundSize: 'auto 2px',
    border: 'none',
  },
  '@keyframes driveBackAndForth': {
    '0%': {
      transform: 'translateX(calc(-60vw - 100px)) scaleX(1)',
    },
    '49%': {
      transform: 'translateX(calc(60vw + 100px)) scaleX(1)',
    },
    '50%': {
      transform: 'translateX(calc(60vw + 100px)) scaleX(-1)',
    },
    '99%': {
      transform: 'translateX(calc(-60vw - 100px)) scaleX(-1)',
    },
    '100%': {
      transform: 'translateX(calc(-60vw - 100px)) scaleX(1)',
    },
  },
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '25%': {
      transform: 'translateY(-2px)',
    },
    '75%': {
      transform: 'translateY(2px)',
    },
  },
}));

export default useStyles;
