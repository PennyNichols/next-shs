import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => {
  const mainColor = theme.palette.accent.main;

  return {
    formContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing(1),
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
