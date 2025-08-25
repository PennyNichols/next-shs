'use client';

import theme from '@/styles/theme';
import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Container, Typography } from '@mui/material';
import { FAQ } from '@/constants/FAQ';
import React, { useState } from 'react';

const FAQPage = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Container className="page-wrapper">
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: theme.palette.primary.dark, // Using your theme for consistency
          [theme.breakpoints.down('sm')]: {
            fontSize: '2.5rem',
          },
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Box sx={{ mb: 4, maxWidth: '900px', mx: 'auto' }}>
        {FAQ.map((faq, index) => (
          <Accordion
            key={faq.id}
            expanded={typeof expanded === 'string' && expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              mb: 2.5,
              boxShadow: 2,
              borderRadius: theme.shape.borderRadius,
              '&:before': {
                // Remove the default accordion border on expanded state
                display: 'none',
              },
              '&.Mui-expanded': {
                margin: '8px 0', // Adjust margin when expanded
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: theme.palette.secondary.main }} />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
              sx={{
                backgroundColor:
                  typeof expanded === 'string' && expanded === `panel${index}`
                    ? alpha(theme.palette.primary.light, 0.1)
                    : theme.palette.background.paper,
                // Adding a bottom border when not expanded for separation, or thicker when expanded
                borderBottom:
                  typeof expanded === 'string' && expanded === `panel${index}`
                    ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                    : 'none',
                minHeight: 64,
                '& .MuiAccordionSummary-content': {
                  my: 1,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color:
                    typeof expanded === 'string' && expanded === `panel${index}`
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                  flexShrink: 0,
                  transition: 'color 0.3s ease-in-out',
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                p: 3,
                borderTop: `1px solid ${alpha(theme.palette.primary.light, 0.4)}`, // Consistent border on top of details
                backgroundColor: theme.palette.background.default, // A slightly different background for the answer
              }}
            >
              <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQPage;
