import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  const mainColor = theme.palette.accent.main;

  return {
    formContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    },
    input: {
      '& .MuiInputBase-input': {
        color: mainColor,
      },
      '& .MuiInputLabel-root': {
        color: mainColor,
        '&.Mui-focused': {
          color: mainColor,
        },
      },
      '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius.small,
        '& fieldset': {
          borderColor: mainColor,
        },
        '&:hover fieldset': {
          borderColor: mainColor,
        },
        '&.Mui-focused fieldset': {
          borderColor: mainColor,
        },
      },
    },
  };
});

export default useStyles;
