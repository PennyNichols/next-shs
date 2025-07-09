'use client';

import { Box, Container, Divider, Typography } from '@mui/material';
import React from 'react';
import JobApplication from '@/components/forms/JobApplication/JobApplication';
import { CAREERS } from '@/constants/careers';
import useMedia from '@/hooks/useMedia';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import theme from '@/styles/theme';
import PageTitle from '@/components/common/PageTitle/PageTitle';
import Section from '@/components/common/Section/Section';
import ContentBox from '@/components/common/ContentBox/ContentBox';

const CareersPage = () => {
  const { position, basicInfo, jobDetails, about, responsibilities, qualifications, benefits } = CAREERS[0];
  const { isXxs, isXs } = useMedia();
  return (
    <Container className="page-wrapper" maxWidth="md" sx={{ paddingTop: 2, paddingBottom: 2 }}>
      <Section>
        <PageTitle>
          Join the SHS
          <wbr /> Florida Team!
        </PageTitle>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: { xxs: 'column', sm: 'row' },
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 4,
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
      </Section>
      {basicInfo && (
        <Section>
          {basicInfo.map((info, idx) => (
            <Typography component="h3" key={idx}>
              <b style={{ margin: '0px' }}>{info.label}:</b> {info.description}
            </Typography>
          ))}
        </Section>
      )}
      {jobDetails && (
        <Section>
          <Typography>
            {Array.isArray(jobDetails)
              ? jobDetails.map((detail, idx) =>
                  detail.bold ? (
                    <b style={{ whiteSpace: isXxs || isXs ? 'wrap' : 'nowrap' }} key={idx}>
                      {detail.text}
                    </b>
                  ) : (
                    <React.Fragment key={idx}>{detail.text}</React.Fragment>
                  ),
                )
              : jobDetails}
          </Typography>
        </Section>
      )}
      <Divider />
      {about && (
        <Section>
          <SectionTitle>About SHS Florida</SectionTitle>
          <ContentBox>
            {about.map((paragraph, idx) => (
              <Typography key={idx}>{paragraph}</Typography>
            ))}
          </ContentBox>
        </Section>
      )}

      <Divider />
      {responsibilities && (
        <Section>
          <SectionTitle>Responsibilities</SectionTitle>
          <ContentBox sx={{ gap: 0.5 }}>
            <Typography>{responsibilities.intro}</Typography>
            {responsibilities.tasks &&
              responsibilities.tasks.map((task, idx) => <Typography key={idx}>{task}</Typography>)}
          </ContentBox>
        </Section>
      )}

      <Divider />
      {qualifications && (
        <Section>
          <SectionTitle>Qualifications</SectionTitle>
          <ContentBox>
            <Typography>{qualifications.intro}</Typography>
            {qualifications.sections &&
              qualifications.sections.map((section, idx) => (
                <Section key={idx}>
                  <ContentBox>
                    <Typography variant="h6" component="h3">
                      {section.title}
                    </Typography>
                    {section.items && (
                      <ContentBox sx={{ gap: 0.5, marginLeft: 3 }}>
                        {section.items.map((item, itemIdx) =>
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
                      </ContentBox>
                    )}
                  </ContentBox>
                </Section>
              ))}
          </ContentBox>
        </Section>
      )}

      <Divider />
      <Section>
        <SectionTitle>Benefits</SectionTitle>
        <ContentBox>
          <Typography>{benefits.intro}</Typography>
          {benefits.items && (
            <ContentBox>
              {benefits.items.map((item, idx) => (
                <Typography key={idx}>
                  <b style={{ fontWeight: 500, color: theme.palette.primary.light }}>{item.title}</b> {item.description}
                </Typography>
              ))}
            </ContentBox>
          )}
        </ContentBox>
      </Section>
      {/* <Divider sx={{ mb: 5, width: '110%' }} /> */}

      {/* Make JobApplication full width on xs by wrapping in a Box with negative margin */}
      <Section>
        <JobApplication />
      </Section>
    </Container>
  );
};

export default CareersPage;
