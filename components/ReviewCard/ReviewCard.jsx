import React, { useRef, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import theme from '@/theme/theme';
import useStyles from './ReviewCard.styles';
import { alpha } from '@mui/material/styles';
import { truncateText } from '../../functions/utils/utils';

function ReviewCard({ rating = 5, review, platform }) {
  const words = review.split(' ');
  const isTruncated = words.length > 10;

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const accentColor = theme.palette.accent.main; // gold
  const classes = useStyles();
  return (
    <>
      <Card className={classes.reviewCard}>
        <Box className={classes.ratingContainer} display="flex" alignItems="center">
          <Rating
            value={rating}
            precision={1}
            readOnly
            icon={<StarIcon className={classes.starIcon} fontSize="inherit" htmlColor={accentColor} />}
            emptyIcon={
              <StarIcon
                className={classes.starIcon}
                fontSize="inherit"
                htmlColor={`${alpha(theme.palette.primary.main)}, 0.2`}
              />
            }
          />
        </Box>
        <CardContent className={classes.cardContentWrapper}>
          <Typography variant="body1" className={classes.reviewText}>
            “{truncateText(review, 10)}” <br />
            {isTruncated && (
              <span className={classes.readMoreButton} onClick={handleOpen} tabIndex={0} role="button">
                read more
              </span>
            )}
          </Typography>
        </CardContent>
        {platform && (
          <Box className={classes.platformContainer}>
            <div className={classes.platformDecoration} />
            <Typography variant="subtitle2" className={classes.platformText}>
              {platform}
            </Typography>
            <div className={classes.platformDecoration} />
          </Box>
        )}
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
      >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 3,
              top: 3,
              color: theme.palette.primary.light,
            }}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{
              fontStyle: 'italic',
            }}
          >
            “{review}”
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ReviewCard;
