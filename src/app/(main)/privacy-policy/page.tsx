import React from 'react';
import type { Metadata } from 'next';
import { Typography, Box, Divider, Link } from '@mui/material';
import { formatPhoneNumber } from '@/lib/utils';
import { PRIVACY_POLICY } from '@/constants/privacyPolicy';
import LogoWithTextSvg from '@/assets/svg/LogoWithTextSvg/LogoWithTextSvg';
import PageContainer from '@/components/common/PageContainer/PageContainer';
import { darkText, lightBlue, mediumBlue } from '@/styles/theme/colors';
import { COMPANY_EMAIL_ADDRESS, COMPANY_PHONE_NUMBER } from '@/constants/companyDetails';

export const metadata: Metadata = {
  title: 'Privacy Policy | SHS Florida - Your Trusted Home Services Partner',
  description:
    'Read the SHS Florida Privacy Policy to learn how we collect, use, and protect your personal information. Your privacy and security are our top priorities.',
  robots: 'index, follow',
  openGraph: {
    title: 'Privacy Policy | SHS Florida',
    description:
      'Learn how SHS Florida collects, uses, and safeguards your information. Your privacy is important to us.',
    type: 'website',
    url: 'https://shsflorida.com/privacy-policy',
    siteName: 'SHS Florida',
  },
  alternates: {
    canonical: 'https://shsflorida.com/privacy-policy',
  },
};

const ContactLink = ({ href, ariaLabel, content, sx = null, ...props }) => {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      role="link"
      className="contact-link"
      sx={{ whiteSpace: 'nowrap', margin: '0px !important', fontWeight: 500, ...sx }}
      {...props}
    >
      {content}
    </Link>
  );
};

const PrivacyPolicy = () => {
  const { lastUpdated, intro, sections } = PRIVACY_POLICY;

  return (
    <PageContainer maxWidth="lg">
      <Box sx={{ mb: { xxs: 0, sm: 3 } }}>
        <Typography
          id="privacy-policy-title"
          variant="h2"
          component="h1"
          sx={{ fontSize: { xxs: '2rem', sm: '3rem' } }}
          tabIndex={-1}
        >
          Privacy Policy
        </Typography>
        <Typography
          variant="h5"
          align="center"
          id="privacy-policy-updated"
          sx={{ mb: { xxs: 0, sm: 1 }, fontSize: { xxs: '1.2rem', sm: '1.5rem' } }}
        >
          Last updated: {lastUpdated}
        </Typography>
        <Divider className="title-divider" />
        <Box sx={{ mb: 4 }} component="section" aria-labelledby="privacy-policy-intro"></Box>
        <Typography id="privacy-policy-intro">{intro}</Typography>
      </Box>
      {sections
        ? sections.map((section, idx) => (
            <Box key={idx} id={String(idx)} component="section" aria-labelledby={`privacy-policy-collect-${idx}`}>
              <Typography
                id={`privacy-policy-collect-${idx}`}
                variant="h3"
                component="h2"
                mb={2}
                sx={{ textAlign: { xxs: 'center', md: 'left' } }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xxs: 2, sm: 4 } }}>
                <Typography>{section.description}</Typography>
                {section.details
                  ? section.details.map((detail, detailIdx) => (
                      <Typography key={detailIdx} component="h3" sx={{ fontWeight: 600, color: lightBlue }}>
                        {detail.text}
                        <span style={{ marginLeft: 8, color: darkText, fontWeight: 400 }}>{detail.description}</span>
                      </Typography>
                    ))
                  : null}
              </Box>
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
            gap: { xxs: 2, sm: 4, md: 8 },
            mx: 2,
            '@media (max-width: 520px)': { flexDirection: 'column', mx: 0 },
          }}
        >
          <LogoWithTextSvg color={mediumBlue} width={150} height={150} />
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
            <Typography
              variant="h4"
              component="h3"
              className="contact-header"
              sx={{ mb: 1, width: 'fit-content', fontFamily: 'archivo', fontWeight: 800 }}
            >
              SHS Florida
            </Typography>
            <Typography className="contact-link-label">
              Call:{' '}
              <ContactLink
                href={`tel:${COMPANY_PHONE_NUMBER}`}
                ariaLabel={`Call SHS Florida at ${formatPhoneNumber(COMPANY_PHONE_NUMBER)}`}
                content={formatPhoneNumber(COMPANY_PHONE_NUMBER)}
              />
            </Typography>
            <Typography className="contact-link-label">
              Text:{' '}
              <ContactLink
                href={`sms:${COMPANY_PHONE_NUMBER}`}
                ariaLabel={`Text SHS Florida at ${formatPhoneNumber(COMPANY_PHONE_NUMBER)}`}
                content={formatPhoneNumber(COMPANY_PHONE_NUMBER)}
              />
            </Typography>
            <Typography className="contact-link-label">
              Email:{' '}
              <ContactLink
                href={`mailto:${COMPANY_EMAIL_ADDRESS}`}
                ariaLabel={`Email SHS Florida at ${COMPANY_EMAIL_ADDRESS}`}
                content={COMPANY_EMAIL_ADDRESS}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </PageContainer>
  );
};

export default PrivacyPolicy;
