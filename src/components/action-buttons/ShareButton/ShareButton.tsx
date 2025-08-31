'use client';

import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, IconButton, Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import { COMPANY_URL } from '../../../constants/companyDetails';
import { customBorderRadius, customTransitions } from '@/styles/theme/otherThemeConstants';
import theme from '@/styles/theme';

// Change to use MUI Speed Dial instead

const ShareButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (platform: string) => {
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${COMPANY_URL}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${COMPANY_URL}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Check%20this%20out&body=${COMPANY_URL}`;
        break;
      case 'sms':
        shareUrl = `sms:?body=${COMPANY_URL}`;
        break;
      default:
        break;
    }
    if (typeof window !== 'undefined') {
      window.open(shareUrl, '_blank');
    }
    handleClose();
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 200,
        right: 30,
        borderRadius: customBorderRadius.circle,
        zIndex: 1300,
        border: `2px solid ${theme.palette.background.default}`,
        transition: customTransitions.standard,
        backgroundColor: 'primary.main',
        opacity: 0.7,
        '&:hover': {
          backgroundColor: 'accent.primary',
          borderColor: 'primary.main',
          '& $shareIcon': {
            color: 'primary.main',
          },
        },
      }}
    >
      <IconButton aria-label="share" aria-controls="share-menu" aria-haspopup="true" onClick={handleClick}>
        <ShareIcon
          sx={{
            color: 'background.default',
          }}
        />
      </IconButton>
      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableScrollLock={true}
        sx={{ mt: 1 }}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: 'primary.main',
            },
          },
        }}
      >
        <MenuItem onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
          <FacebookIcon
            sx={{
              color: 'secondary.light',
              transition: customTransitions.standard,
              '&:hover': {
                color: 'accent.primary',
              },
            }}
          />
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
          <TwitterIcon
            sx={{
              color: 'secondary.light',
              transition: customTransitions.standard,
              '&:hover': {
                color: 'accent.primary',
              },
            }}
          />
        </MenuItem>
        <MenuItem onClick={() => handleShare('email')} aria-label="Share via Email">
          <EmailIcon
            sx={{
              color: 'secondary.light',
              transition: customTransitions.standard,
              '&:hover': {
                color: 'accent.primary',
              },
            }}
          />
        </MenuItem>
        <MenuItem onClick={() => handleShare('sms')} aria-label="Share via SMS">
          <SmsIcon
            sx={{
              color: 'secondary.light',
              transition: customTransitions.standard,
              '&:hover': {
                color: 'accent.primary',
              },
            }}
          />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ShareButton;
