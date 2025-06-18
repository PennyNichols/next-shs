import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Facebook, Google, Instagram } from '@mui/icons-material';
import { EMAIL_ADDRESS, FACEBOOK_URL, GOOGLE_URL, INSTAGRAM_URL, PHONE_NUMBER } from '../../constants/companyDetails';
import { formatPhoneNumber } from '../../functions/utils/utils';
import useStyles from './Footer.styles';
import LogoSvg from '../SVG/LogoSvg';
import useMedia from '../../hooks/useMedia';

const MinFooter = () => {
  const classes = useStyles();
  const { isXs, isSm } = useMedia();
  return (
    <Box component="footer" className={classes.footerOuterContainer}>
      <Container maxWidth="lg">
        <Box component="section" className={classes.middleContainer}>
          <Box className={classes.logoContainer}>
            <LogoSvg width={90} height={70} />
            <Box>
              <Typography variant="body2" color="inherit">
                Serving SW Florida
              </Typography>
              <Typography variant="body2" color="inherit">
                Operating Hours: <br /> M-F 8 AM - 5 PM
              </Typography>
            </Box>
          </Box>
          {!(isXs || isSm) && (
            <Box className={classes.middleContentContainer}>
              <Typography variant="h6" color="inherit">
                Contact Information
              </Typography>
              <Typography variant="body2" color="inherit">
                Phone: {formatPhoneNumber(PHONE_NUMBER)}
              </Typography>
              <Typography variant="body2" color="inherit">
                Email: {EMAIL_ADDRESS}
              </Typography>
            </Box>
          )}
          <Box className={classes.middleContentContainer}>
            <Typography variant="h6" color="inherit" className={classes.quickLinksTitle}>
              Quick Links
            </Typography>
            <Link href="/privacy-policy" color="inherit">
              Privacy Policy
            </Link>
            <br />
            <Link href="/terms-of-service" color="inherit">
              Terms of Service
            </Link>
          </Box>
        </Box>
        <Box component="section" className={classes.bottomContainer}>
          <Box className={classes.socialContainer}>
            <Link href={FACEBOOK_URL} color="inherit" aria-label="Facebook">
              <Facebook className={classes.socialIcon} />
            </Link>
            <Link href={INSTAGRAM_URL} color="inherit" aria-label="Instagram">
              <Instagram className={classes.socialIcon} />
            </Link>
            <Link href={GOOGLE_URL} color="inherit" aria-label="Google">
              <Google className={classes.socialIcon} />
            </Link>
          </Box>
          <Typography variant="body2" color="inherit">
            &copy; 2025 SHS. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default MinFooter;
