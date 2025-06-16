import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { serviceCategories } from '../../constants/services';
import useStyles from './ServicesAccordion.styles';
import { useTheme } from '@mui/material/styles';

const ServicesAccordion = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box className={classes.servicesAccordionContainer}>
      {serviceCategories.map((section, idx) => (
        <Accordion
          key={idx}
          className={classes.servicesAccordion}
          disableGutters
          elevation={0}
          square
        >
          <AccordionSummary
            className={classes.servicesAccordionSummary}
            expandIcon={
              <ExpandMoreIcon
                className={classes.servicesAccordionExpandIcon}
              />
            }
            aria-controls={`panel-${idx}-content`}
            id={`panel-${idx}-header`}
            
          >
            <Typography variant="h3">
              {section.sectionTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            className={classes.servicesAccordionDetails}
            >
            <Box
              className={classes.servicesAccordionDetailsContainer}
            >
              {section.typeOfWork.map((work, widx) => (
                <Typography
                  key={widx}
                  variant="body1"
                  className={classes.servicesAccordionDetailsText}
                >
                  <strong className={classes.servicesAccordionDetailTitle} style={{ color: '#001f3f' }}>
                    {work.title}:
                  </strong>{' '}
                  {work.description}
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
