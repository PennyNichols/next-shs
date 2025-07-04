// src/theme.d.ts (or mui.d.ts)
// This file is for global module augmentations.

import '@mui/material/styles'; // IMPORTANT: Keep this import for global module augmentation.
import '@mui/material/Typography';
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  /**
   * Extend the Theme's Palette interface to include 'accent'.
   * This is for when you access theme.palette.accent directly.
   */
  interface Palette {
    accent: PaletteColor;
  }

  /**
   * Extend the Theme's PaletteOptions interface to allow 'accent'
   * to be passed when creating the theme with createTheme.
   */
  interface PaletteOptions {
    accent?: PaletteColorOptions;
  }

  /**
   * Optional: If you want to add 'accent' as a color in `theme.palette.augmentColor` (e.g., for `Button` color prop),
   * you would extend the `PaletteColor` interface.
   *
   * Example (if you want <Button color="accent"> to work):
   * declare module '@mui/material/Button' {
   * interface ButtonPropsColorOverrides {
   * accent: true;
   * }
   * }
   */

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

  // 3. Extend the TypographyPropsVariantOverrides interface:
  //    This makes your custom variant names valid for the `variant` prop of <Typography>.
  interface TypographyPropsVariantOverrides {
    pageTitle: true; // Enables <Typography variant="pageTitle">
    sectionTitle: true; // Enables <Typography variant="sectionTitle">
    // Add any other custom variant names here with 'true'
    // You can also disable default variants here if you wish (e.g., h3: false)
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
