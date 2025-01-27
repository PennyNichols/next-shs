import { Box, Typography } from "@mui/material";
import CallButton from "../ActionButtons/CallButton";
import TextButton from "../ActionButtons/TextButton";
import EstimateRequestButton from "../ActionButtons/EstimateRequestButton";
import Image from "next/image";
import useStyles from "./Hero.styles";

const Hero = () => {
    const classes = useStyles();
    return (
        <Box className={classes.heroContainer}>
            <Image src="/images/garden-shed-2.jpg" alt="Hero Image" layout="fill" objectFit="cover" className={classes.heroImage} />
            <Box
                className={classes.heroContent}
            >
                <Typography variant='h1'>Expert Hands. Exceptional Results.</Typography>
                <Typography variant='h5'>From routine maintenance to complex projects, we handle every aspect of your home's upkeep with precision and care.</Typography>
                <Box className={classes.actionButtons}>
                    <CallButton />
                    <TextButton />
                    <EstimateRequestButton />
                </Box>
            </Box>
        </Box>
    );
}

export default Hero;