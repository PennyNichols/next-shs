import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  reviewCard: {
    width: 220,
    height: 260,
    borderRadius: 4,
    boxShadow: theme.shadows[3],
    background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.5)} 100%, rgba(237,235,243,0.18) 100%)`,
    backdropFilter: 'blur(8px)',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
  },
  starIcon: {
    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
  },
  cardContentWrapper: {
    padding: 0,
  },
  reviewText: {
    color: theme.palette.primary.dark,
    fontSize: 16,
    fontStyle: 'italic',
    textShadow: '0 1px 4px rgba(0,0,0,0.18)',
    margin: theme.spacing(1, 0),
  },
  readMoreButton: {
      textDecoration: 'underline',
      textDecorationThickness: 1,
      textUnderlineOffset: '3px',
      '&:hover': {
        cursor: 'pointer',
    },
  },
  platformContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
  },
  platformDecoration: {
    height: 2,
    flexGrow: 1,
    backgroundColor: theme.palette.primary.light,
  },
  platformText: {
    color: theme.palette.primary.light,
    fontSize: 14,
    textShadow: '0 1px 2px rgba(0,0,0,0.12)',
    fontWeight: 500,
  },
}));

export default useStyles;
