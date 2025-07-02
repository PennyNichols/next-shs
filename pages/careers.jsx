import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import JobApplication from '../components/JobApplication/JobApplication';
import { CAREERS } from '../constants/careers';
import { darkGray } from '@/theme';
import useMedia from 'hooks/useMedia';

const CareersPage = () => {
  const { position, basicInfo, jobDetails, about, responsibilities, qualifications, benefits } = CAREERS[0];
  const { isXs } = useMedia();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '800px',
        margin: 'auto',
        py: { xs: 6 },
      }}
    >
      <Typography variant="h2" component="h1" align="center">
        Join the SHS
        <wbr /> Florida Team!
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Divider className="side" sx={{ marginRight: 3 }} />
        <Typography
          variant="h3"
          component="h2"
          color="primary.main"
          textAlign="center"
          sx={{ margin: '0px !important' }}
        >
          {position}
        </Typography>
        <Divider className="side" sx={{ marginLeft: 3 }} />
      </Box>
      {basicInfo &&
        basicInfo.map((info, idx) => (
          <Typography key={idx}>
            <b>{info.label}:</b> {info.description}
          </Typography>
        ))}

      <Typography>
        {Array.isArray(jobDetails)
          ? jobDetails.map((detail, idx) =>
              detail.bold ? (
                <b style={{ whiteSpace: isXs ? 'wrap' : 'nowrap' }} key={idx}>
                  {detail.text}
                </b>
              ) : (
                <React.Fragment key={idx}>{detail.text}</React.Fragment>
              ),
            )
          : jobDetails}
      </Typography>

      <Divider />

      <Typography variant="h4" component="h2">
        About SHS Florida
      </Typography>
      {about && about.map((paragraph, idx) => <Typography key={idx}>{paragraph}</Typography>)}

      <Divider />

      <Typography variant="h4" component="h2">
        Responsibilities
      </Typography>
      <Typography>{responsibilities.intro}</Typography>
      {responsibilities.tasks && responsibilities.tasks.map((task, idx) => <Typography key={idx}>{task}</Typography>)}

      <Divider />

      <Typography variant="h4" component="h2">
        Qualifications
      </Typography>
      <Typography>{qualifications.intro}</Typography>
      {qualifications.sections &&
        qualifications.sections.map((section, idx) => (
          <React.Fragment key={idx}>
            <Typography variant="h5" component="h3">
              {section.title}
            </Typography>
            {section.items &&
              section.items.map((item, itemIdx) =>
                Array.isArray(item) ? (
                  <Typography key={itemIdx}>
                    {item.map((part, partIdx) =>
                      part.bold ? (
                        <b key={partIdx}>{part.text}</b>
                      ) : (
                        <React.Fragment key={partIdx}>{part.text}</React.Fragment>
                      ),
                    )}
                  </Typography>
                ) : (
                  <Typography key={itemIdx}>{item}</Typography>
                ),
              )}
          </React.Fragment>
        ))}

      <Divider />

      <Typography variant="h4" component="h2">
        Benefits of Subcontracting with SHS Florida
      </Typography>
      <Typography>{benefits.intro}</Typography>
      {benefits.items &&
        benefits.items.map((item, idx) => (
          <Typography key={idx}>
            <b>{item.title}</b> {item.description}
          </Typography>
        ))}

      {/* <Divider sx={{ mb: 5, width: '110%' }} /> */}

      {/* Make JobApplication full width on xs by wrapping in a Box with negative margin */}
      <Box mt={6}>
        <JobApplication />
      </Box>
    </Box>
  );
};

export default CareersPage;
