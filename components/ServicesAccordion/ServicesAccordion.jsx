import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SERVICE_CATEGORIES } from '../../constants/services';
import { customBorderRadius } from '@/theme/otherThemeConstants';
import theme from '@/theme';

const ServicesAccordion = () => {
  return (
    <Box
      sx={{
        mt: 3,
        maxWidth: { xs: '90vw', sm: '70vw' },
      }}
    >
      {SERVICE_CATEGORIES.map((section, idx) => (
        <Accordion
          key={idx}
          sx={{
            mb: 3,
            p: { xs: 1, md: 2 },
            borderRadius: customBorderRadius.small,
            border: `3px solid ${theme.palette.accent.primary}`,
            '&:before': { display: 'none' },
            '&.Mui-expanded': {},
          }}
          disableGutters
          elevation={0}
          square
        >
          <AccordionSummary
            sx={{
              padding: '1 2',
              borderRadius: customBorderRadius.medium,
              color: 'text.primary',
              fontWeight: 600,
              '& .MuiTypography-root': {
                color: 'primary.dark',
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.25rem' },
              },
            }}
            expandIcon={
              <ExpandMoreIcon
                sx={{
                  color: 'primary.dark',
                  fontSize: '2rem',
                }}
              />
            }
            aria-controls={`panel-${idx}-content`}
            id={`panel-${idx}-header`}
          >
            <Typography variant="h3">{section.sectionTitle}</Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: '1 2',
              borderTop: `2px solid ${theme.palette.accent.primary}`,
              '&.MuiAccordionDetails-root': {
                backgroundColor: 'background.paper',
              },
            }}
          >
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              }}
            >
              {section.typesOfWork.map((work, widx) => (
                <Typography
                  key={widx}
                  variant="body1"
                  sx={{
                    color: 'primary.main',
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                    fontWeight: 500,
                    pl: 2,
                    mb: 1,
                  }}
                >
                  <strong style={{ color: '#001f3f' }}>{work.title}:</strong> {work.description}
                </Typography>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ServicesAccordion;
