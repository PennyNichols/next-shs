
import React, { useRef, useState, useEffect } from 'react';
import { Typography } from '@mui/material';

/**
 * Renders a Typography component with a hanging indent that dynamically
 * adjusts based on the width of a bolded label.
 *
 * @param {object} props - The component props.
 * @param {string} props.label - The text for the bolded label (e.g., "Name").
 * @param {string} props.description - The main content text (e.g., "John Doe").
 * @param {object} [props.typographyProps] - Optional: Additional props to pass to the Mui Typography component.
 */
const TypographyHangingIndent = ({ label, description, typographyProps }) => {
  const bRef = useRef(null); // Measures the <b> element
  const [indentWidth, setIndentWidth] = useState(0);

  useEffect(() => {
    const measureLabelWidth = () => {
      if (bRef.current) {
        // Gives the inner width of the element in pixels
        // This includes padding but not borders or margins.
        setIndentWidth(bRef.current.clientWidth);
      }
    };

    // Measures after mount and on window resize
    measureLabelWidth();
    window.addEventListener('resize', measureLabelWidth);

    return () => {
      window.removeEventListener('resize', measureLabelWidth);
    };
  }, [label]);

  return (
    <Typography
      sx={{
        // Apply the hanging indent only if the width has been measured
        // Add skeleton for this component!
        ...(indentWidth > 0 && {
          textIndent: `-${indentWidth}px`,
          paddingLeft: `${indentWidth}px`, 
        }),
      }}
      {...typographyProps} 
    >
      <b ref={bRef}>{label}:</b> {description}
    </Typography>
  );
};

export default TypographyHangingIndent;