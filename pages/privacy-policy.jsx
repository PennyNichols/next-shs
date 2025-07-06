import React from 'react';
import Head from 'next/head';
import { Container, Typography, Box, Divider, Link } from '@mui/material';
import { EMAIL_ADDRESS, PHONE_NUMBER } from '../constants/companyDetails';
import { formatPhoneNumber } from '../utils/utils';
import { PRIVACY_POLICY } from '../constants/privacyPolicy';
import { customTransitions } from '@/theme/otherThemeConstants';
import theme from '@/theme';
import LogoSvg from 'components/SVG/LogoSvg';
import LogoWithTextSvg from 'components/SVG/LogoWithTextSvg';

const ContactLink = ({ href, ariaLabel, content, sx = null, ...props }) => {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      role="link"
      className="contact-link"
      sx={{ whiteSpace: 'nowrap', margin: '0px !important', ...sx }}
      {...props}
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
      <Container className="page-wrapper" role="region" aria-labelledby="privacy-policy-title">
        <Box sx={{ mb: 3 }}>
          <Typography id="privacy-policy-title" variant="h2" component="h1" tabIndex={-1}>
            Privacy Policy
          </Typography>
        </Box>
        <Typography variant="h5" align="center" id="privacy-policy-updated" sx={{ mb: { xs: 0, sm: 1 } }}>
          Last updated: {lastUpdated}
        </Typography>
        <Divider className="title-divider" />
        <Box sx={{ mb: 4 }} component="section" aria-labelledby="privacy-policy-intro">
          <Typography id="privacy-policy-intro">{intro}</Typography>
        </Box>
        {sections
          ? sections.map((section, idx) => (
              <Box
                key={idx}
                id={String(idx)}
                sx={{ mb: 3 }}
                component="section"
                aria-labelledby={`privacy-policy-collect-${idx}`}
              >
                <Typography id={`privacy-policy-collect-${idx}`} variant="h3" component="h2" mb={2}>
                  {section.title}
                </Typography>
                <Typography sx={{ mb: '1.5rem' }}>{section.description}</Typography>
                {section.details
                  ? section.details.map((detail, detailIdx) => (
                      <Typography
                        key={detailIdx}
                        variant="h6"
                        component="h3"
                        sx={{ marginBottom: '1.5rem', textIndent: '-1.5rem', pl: '1.5rem' }}
                      >
                        {detail.text}
                        <span style={{ marginLeft: theme.spacing(1) }}>{detail.description}</span>
                      </Typography>
                    ))
                  : null}
              </Box>
            ))
          : null}
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              gap: { xs: 2, sm: 4, md: 8 },
              mx: 2,
              [theme.breakpoints.down(520)]: { flexDirection: 'column', mx: 0 },
            }}
          >
            <LogoWithTextSvg color={theme.palette.primary.main} width={150} height={150} />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'fit-content',
                '& .MuiTypography-body1': { mb: 0.5 },
                '& .contact-header': { mb: 1, letterSpacing: '5px' },
              }}
            >
              <Typography variant="h4" component="h3" className="contact-header" sx={{ mb: 1, width: 'fit-content' }}>
                SHS Florida
              </Typography>
              <Typography className="contact-link-label">
                Call:{' '}
                <ContactLink
                  href={`tel:${PHONE_NUMBER}`}
                  ariaLabel={`Call SHS Florida at ${formatPhoneNumber(PHONE_NUMBER)}`}
                  content={formatPhoneNumber(PHONE_NUMBER)}
                />
              </Typography>
              <Typography className="contact-link-label">
                Text:{' '}
                <ContactLink
                  href={`sms:${PHONE_NUMBER}`}
                  ariaLabel={`Text SHS Florida at ${formatPhoneNumber(PHONE_NUMBER)}`}
                  content={formatPhoneNumber(PHONE_NUMBER)}
                />
              </Typography>
              <Typography className="contact-link-label">
                Email:{' '}
                <ContactLink
                  href={`mailto:${EMAIL_ADDRESS}`}
                  ariaLabel={`Email SHS Florida at ${EMAIL_ADDRESS}`}
                  content={EMAIL_ADDRESS}
                />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
