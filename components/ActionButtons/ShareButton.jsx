import React from 'react';
import { Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import SmsIcon from '@mui/icons-material/Sms';
import useStyles from './ActionButtons.styles';
import { URL } from '../../constants/constants';

const ShareButton = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (platform) => {
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${URL}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${URL}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=Check%20this%20out&body=${URL}`;
        break;
      case 'sms':
        shareUrl = `sms:?body=${URL}`;
        break;
      default:
        break;
    }
    window.open(shareUrl, '_blank');
    handleClose();
  };

  return (
    <Box className={classes.shareWrapper}>
      <IconButton aria-label="share" aria-controls="share-menu" aria-haspopup="true" onClick={handleClick}>
        <ShareIcon className={classes.shareIcon} />
      </IconButton>
      <Menu id="share-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
          <FacebookIcon className={classes.socialIcon} />
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
          <TwitterIcon className={classes.socialIcon} />
        </MenuItem>
        <MenuItem onClick={() => handleShare('email')} aria-label="Share via Email">
          <EmailIcon className={classes.socialIcon} />
        </MenuItem>
        <MenuItem onClick={() => handleShare('sms')} aria-label="Share via SMS">
          <SmsIcon className={classes.socialIcon} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ShareButton;
