import '@mui/material/styles';
import '@mui/material/Typography';

declare module '@mui/material/styles' {
  /**
   * Extend the Theme's Palette interface to include 'accent'.
   * This is for when you access theme.palette.accent directly.
   */
  interface Palette {
    accent: {
      primary: string;
      secondary?: string;
    };
  }

  /**
   * Extend the Theme's PaletteOptions interface to allow 'accent'
   * to be passed when creating the theme with createTheme.
   */
  interface PaletteOptions {
    accent?: {
      primary?: string;
      secondary?: string;
    };
  }

  interface TypeBackground {
    dark?: string;
  }

  // Extend breakpoints to include custom 'xxs' breakpoint
  interface BreakpointOverrides {
    xxs: true; // adds the `xxs` breakpoint
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
  }

  // 1. Extend the TypographyVariants interface:
  //    This makes your custom variant names available on `theme.typography`
  interface TypographyVariants {
    pageTitle: React.CSSProperties; // Example: A large title for pages
    sectionTitle: React.CSSProperties; // Example: A header for sections
    // Add any other custom variant names here
  }

  // 2. Extend the TypographyVariantsOptions interface:
  //    This allows you to define the styles for your custom variants
  //    directly within the `typography` section of `createTheme`.
  interface TypographyVariantsOptions {
    pageTitle?: React.CSSProperties;
    sectionTitle?: React.CSSProperties;
    // Add any other custom variant names here
  }
}
declare module '@mui/material/Typography' {
  // This is the CRITICAL part for the `variant` prop to recognize your new types.
  interface TypographyPropsVariantOverrides {
    pageTitle: true; // Enables <Typography variant="pageTitle">
    sectionTitle: true; // Enables <Typography variant="sectionTitle">
    // Add any other custom variant names here with 'true'
    // You can also disable default variants here if you wish (e.g., h3: false)
  }
}
