import { EmojiEvents, Star } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import useStyles from "./Award.styles";

const Award = () => {
    const classes = useStyles();
    return (
        <Box className={classes.awardContainer}>
            <Box className={classes.awardIconContainer}>
                <EmojiEvents className={classes.awardIcon} />
            </Box>
            <Box className={classes.awardTextContainer}>
                <Box className={classes.starContainer}>
                    <Star className={classes.starIcon} />
                    <Star className={classes.starIcon} />
                    <Star className={classes.starIcon} />
                    <Star className={classes.starIcon} />
                    <Star className={classes.starIcon} />

                </Box>
                <Typography className={classes.awardText}>Top-Rated<br />Home<br />Services</Typography>
            </Box>
        </Box>
    );
}

export default Award;