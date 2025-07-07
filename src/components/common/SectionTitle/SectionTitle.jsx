import { Typography } from "@mui/material";

const SectionTitle = ({children, sx={}, ...props}) => {
    return (
        <Typography variant='sectionTitle' component='h2' sx={{...sx}} {...props}>
            {children}
        </Typography>
    );
}

export default SectionTitle;
