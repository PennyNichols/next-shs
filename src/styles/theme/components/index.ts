import type { Components, Theme } from '@mui/material/styles';

import baseComponents from './_base';
import formComponents from './_forms';
import navigationComponents from './_navigation';
import contentComponents from './_content';
import dialogComponents from './_dialogs';
import buttonComponents from './_buttons';

const components: Components<Theme> = {
  ...baseComponents,
  ...formComponents,
  ...contentComponents,
  ...dialogComponents,
  ...buttonComponents,
  ...navigationComponents,
};

export default components;
