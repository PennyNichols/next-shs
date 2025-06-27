import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Divider, Link } from '@mui/material';
import { EMAIL_ADDRESS, PHONE_NUMBER } from '../constants/companyDetails';
import { formatPhoneNumber } from '../functions/utils/utils';
import { PRIVACY_POLICY } from '../constants/privacyPolicy';
import { customTransitions } from '@/theme/otherThemeConstants';

const ContactLink = ({ href, ariaLabel, content }) => {
  return (
    <Link
      href={href}
      sx={{
        transition: customTransitions.standard,
        textDecoration: 'none',
        '&:hover': { color: 'accent.main', textDecoration: 'none' },
      }}
      aria-label={ariaLabel}
      role="link"
    >
      {content}
    </Link>
  );
};

const PrivacyPolicy = () => {
  const { lastUpdated, intro, sections } = PRIVACY_POLICY;

  return (
    <>
      <Head>
        <title>Privacy Policy | SHS Florida - Your Trusted Home Services Partner</title>
        <meta
          name="description"
          content="Read the SHS Florida Privacy Policy to learn how we collect, use, and protect your personal information. Your privacy and security are our top priorities."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Privacy Policy | SHS Florida" />
        <meta
          property="og:description"
          content="Learn how SHS Florida collects, uses, and safeguards your information. Your privacy is important to us."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shsflorida.com/privacy-policy" />
        <meta property="og:site_name" content="SHS Florida" />
        <link rel="canonical" href="https://shsflorida.com/privacy-policy" />
      </Head>
      <Container
        component="main"
        maxWidth={false}
        sx={{ maxWidth: 900, py: 6, px: { xs: 3, sm: 5, lg: 7 } }}
        role="region"
        aria-labelledby="privacy-policy-title"
      >
        <Box sx={{ mb: 4 }}>
          <Typography id="privacy-policy-title" variant="h1" align="center" gutterBottom tabIndex={-1}>
            Privacy Policy
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" id="privacy-policy-updated">
            Last updated: {lastUpdated}
          </Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />
        <Box sx={{ mb: 4 }} component="section" aria-labelledby="privacy-policy-intro">
          <Typography id="privacy-policy-intro" variant="body1">
            {intro}
          </Typography>
        </Box>
        {sections
          ? sections.map((section, idx) => (
              <Box id={String(idx)} sx={{ mb: 3 }} component="section" aria-labelledby="privacy-policy-collect">
                <Typography id="privacy-policy-collect" variant="h3" component="h2" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1">{section.description}</Typography>
                {section.details
                  ? section.details.map((detail, detailIdx) => (
                      <Typography id={String(detailIdx)} variant="body1" sx={{ mt: 2 }}>
                        <Typography variant="body1" component="span" sx={{ fontWeight: 600 }}>
                          {detail.text}
                        </Typography>{' '}
                        {detail.description}
                      </Typography>
                    ))
                  : null}
              </Box>
            ))
          : null}
        <Box>
          <Box>
            <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 800, mt: 2, mb: 1, color: 'primary.main' }}>
              SHS Florida
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Call:{' '}
              <ContactLink
                href={`tel:${PHONE_NUMBER}`}
                ariaLabel={`Call SHS Florida at ${formatPhoneNumber(PHONE_NUMBER)}`}
                content={formatPhoneNumber(PHONE_NUMBER)}
              />
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Text:{' '}
              <ContactLink
                href={`sms:${PHONE_NUMBER}`}
                ariaLabel={`Text SHS Florida at ${formatPhoneNumber(PHONE_NUMBER)}`}
                content={formatPhoneNumber(PHONE_NUMBER)}
              />
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Email:{' '}
              <ContactLink
                href={`mailto:${EMAIL_ADDRESS}`}
                ariaLabel={`Email SHS Florida at ${EMAIL_ADDRESS}`}
                content={EMAIL_ADDRESS}
              />
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
