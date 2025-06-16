import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  servicesAccordionContainer: {
    marginTop: theme.spacing(3),
    maxWidth: '70vw',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '90vw',
    },
  },
  servicesAccordion: {
    marginBottom: theme.spacing(3),
    borderRadius: theme.shape.borderRadius.small,
    border: `3px solid ${theme.palette.accent.main}`,
    '&:before': { display: 'none' },
    '&.Mui-expanded': {},
},
servicesAccordionSummary: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: theme.shape.borderRadius.medium,
    color: theme.palette.accent.darkText,
    fontWeight: 600,
    '& .MuiTypography-root': {
        color: theme.palette.primary.dark,
        fontWeight: 600,
        fontSize: 20,
        [theme.breakpoints.down('xs')]: {
            fontSize: 16,
        },
    },
},
servicesAccordionExpandIcon: {
    color: theme.palette.primary.dark,
    fontSize: 32,
},
servicesAccordionDetails: {
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderTop: `2px solid ${theme.palette.accent.main}`,
    '&.MuiAccordionDetails-root': {
        backgroundColor: theme.palette.background.paper,
    },
},
servicesAccordionDetailsContainer: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
},
servicesAccordionDetailsText: {
    color: theme.palette.primary.main,
    fontSize: 18,
    fontWeight: 500,
    paddingLeft: theme.spacing(2),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
  servicesAccordionDetailTitle: {},
}));

export default useStyles;
