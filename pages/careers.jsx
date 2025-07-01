import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import JobApplication from '../components/JobApplication/JobApplication';
import { CAREERS } from '../constants/careers';
import { darkGray } from '@/theme';

const CareersPage = () => {
  const { position, basicInfo, jobDetails, about, responsibilities, qualifications, benefits } = CAREERS[0];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
        maxWidth: '900px',
        margin: 'auto',
      }}
    >
      <Typography variant="h2" component="h1" align="center" my={2}>
        Join the SHS Florida Team!
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1, sm: 3 },
          mb: 3,
        }}
      >
        <Container
          sx={{
            minWidth: 20,
            width: { xs: '60%', sm: '100%' },
            flex: { xs: 'none', sm: 1 },
            mt: { xs: 2, sm: 0 },
            height: 2,
            backgroundColor: 'text.primary',
          }}
        />
        <Typography variant="h3" component="h2" color="primary.main" textAlign="center">
          {position}
        </Typography>
        <Container
          sx={{
            minWidth: 20,
            width: { xs: '60%', sm: '100%' },
            flex: { xs: 'none', sm: 1 },
            mb: { xs: 2, sm: 0 },
            height: 2,
            backgroundColor: 'text.primary',
          }}
        />
      </Box>
      {basicInfo &&
        basicInfo.map((info, idx) => (
          <Typography key={idx} variant="body1" textAlign="left" mb={1}>
            <b style={{ fontWeight: 600, color: darkGray }}>{info.label}:</b> {info.description}
          </Typography>
        ))}

      <Typography variant="body1" sx={{ mb: 2, mt: 3 }}>
        {Array.isArray(jobDetails)
          ? jobDetails.map((detail, idx) =>
              detail.bold ? (
                <b style={{ fontWeight: 600, color: darkGray, whiteSpace: 'nowrap' }} key={idx}>
                  {detail.text}
                </b>
              ) : (
                <React.Fragment key={idx}>{detail.text}</React.Fragment>
              ),
            )
          : jobDetails}
      </Typography>

      <Divider sx={{ width: '100%', my: 3 }} />

      <Typography variant="h4" component="h2" fontWeight={600} sx={{ mb: 2 }}>
        About SHS Florida
      </Typography>
      {about &&
        about.map((paragraph, idx) => (
          <Typography key={idx} variant="body1" mb={2}>
            {paragraph}
          </Typography>
        ))}

      <Divider sx={{ width: '100%', my: 3 }} />

      <Typography variant="h4" component="h2" fontWeight={600} sx={{ mb: 2 }}>
        Responsibilities
      </Typography>
      <Typography variant="body1" mb={2}>
        {responsibilities.intro}
      </Typography>
      {responsibilities.tasks &&
        responsibilities.tasks.map((task, idx) => (
          <Typography key={idx} variant="body1" mb={1}>
            {task}
          </Typography>
        ))}

      <Divider sx={{ width: '100%', my: 3 }} />

      <Typography variant="h4" component="h2" fontWeight={600} sx={{ mb: 1 }}>
        Qualifications
      </Typography>
      <Typography variant="body1">{qualifications.intro}</Typography>
      {qualifications.sections &&
        qualifications.sections.map((section, idx) => (
          <React.Fragment key={idx}>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 600, color: 'text.primary', mt: 2, mb: 1 }}>
              {section.title}
            </Typography>
            {section.items &&
              section.items.map((item, itemIdx) =>
                Array.isArray(item) ? (
                  <Typography key={itemIdx} variant="body1">
                    {item.map((part, partIdx) =>
                      part.bold ? (
                        <b key={partIdx} style={{ fontWeight: 600, color: darkGray }}>
                          {part.text}
                        </b>
                      ) : (
                        <React.Fragment key={partIdx}>{part.text}</React.Fragment>
                      ),
                    )}
                  </Typography>
                ) : (
                  <Typography key={itemIdx} variant="body1" mb={1}>
                    {item}
                  </Typography>
                ),
              )}
          </React.Fragment>
        ))}

      <Divider sx={{ width: '100%', my: 3 }} />

      <Typography variant="h4" component="h2" fontWeight={600} sx={{ mb: 1 }}>
        Benefits of Subcontracting with SHS Florida
      </Typography>
      <Typography variant="body1" mt={1} mb={3}>
        {benefits.intro}
      </Typography>
      {benefits.items &&
        benefits.items.map((item, idx) => (
          <Typography key={idx} variant="body1" sx={{ mb: 1 }}>
            <b>{item.title}</b> {item.description}
          </Typography>
        ))}

      <Divider sx={{ width: '100%', mt: 3, mb: 5 }} />

      {/* Make JobApplication full width on xs by wrapping in a Box with negative margin */}
      <Box>
        <JobApplication />
      </Box>
    </Box>
  );
};

export default CareersPage;
