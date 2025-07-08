// src/theme/components/index.ts
import type { Components, Theme } from '@mui/material/styles';

import baseComponents from './_base';
import formComponents from './_forms';
import navigationComponents from './_navigation';
import contentComponents from './_content';
import dialogComponents from './_dialogs';
import buttonComponents from './_buttons';

// Combine all component overrides into a single object
const components: Components<Theme> = {
  ...baseComponents,
  ...formComponents,
  ...navigationComponents,
  ...contentComponents,
  ...dialogComponents,
  ...buttonComponents,
};

export default components;
