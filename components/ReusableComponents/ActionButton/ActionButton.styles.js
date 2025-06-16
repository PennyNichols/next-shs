import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  actionButton: (props) => ({
    backgroundColor: props.darkBackground ? theme.palette.accent.main : theme.palette.primary.main,
    color: props.darkBackground ? theme.palette.primary.main : theme.palette.secondary.light,
    borderRadius: theme.shape.borderRadius.small,
    border: `2px solid transparent`,
    transition: theme.transitions.standard,
    '&:hover': {
      color: theme.palette.accent.main,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.accent.main,
    },
  }),
}));

export default useStyles;
