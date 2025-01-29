import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    awardContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
    },
    awardIconContainer: {
        position: 'relative',
        zIndex: 1,
    },
    awardIcon: {
        fontSize: '380px',
        color: theme.palette.primary.main,
    },
    awardTextContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -90%)',
        zIndex: 2,
    },
    starContainer: {
        marginBottom: theme.spacing(2),
    },
    starIcon: {
        color: theme.palette.secondary.light,

    },
    awardText: {
        color: theme.palette.secondary.light,

    },

}));

export default useStyles;