// src/theme.d.ts (or mui.d.ts)
// This file is for global module augmentations.

import '@mui/material/styles'; // IMPORTANT: Keep this import for global module augmentation.
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
}