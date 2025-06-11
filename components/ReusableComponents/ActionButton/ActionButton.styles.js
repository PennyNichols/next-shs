import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  actionButton: (props) => ({
    backgroundColor: props.darkBackground ? theme.palette.accent.main : theme.palette.primary.main,
    color: props.darkBackground ? theme.palette.primary.main : theme.palette.secondary.light,
  }),
}));

export default useStyles;
