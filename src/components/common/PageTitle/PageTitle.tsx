import { SxProps, Theme, Typography } from '@mui/material';

interface PageTitleProps {
  children: React.ReactNode;
  component?: React.ElementType;
  sx?: SxProps<Theme>;
}

const PageTitle: React.FC<PageTitleProps> = ({ children, component = 'h1', sx = {}, ...props }) => {
  return (
    <Typography variant="pageTitle" component={component} sx={{ ...sx }}>
      {children}
    </Typography>
  );
};

export default PageTitle;
