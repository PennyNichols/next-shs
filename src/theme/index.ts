import { createTheme, Shadows } from '@mui/material/styles';
import palette from './palette';
import { customShadows, customBorderRadius, customBreakpoints } from './otherThemeConstants';
import typography from './typography';
import components from './components';

const theme = createTheme({
  palette: palette,
  breakpoints: {
    values: customBreakpoints,
  },
  spacing: 8,
  shadows: customShadows as Shadows,
  shape: {
    borderRadius: customBorderRadius.small,
  },
  typography: typography,
  components: components,
});

export default theme;
