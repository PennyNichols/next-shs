import { Box } from "@mui/material";

const ContentBox = ({children, sx={}, ...props}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, ...sx }} {...props}>
            {children}
        </Box>
    );
}

export default ContentBox;