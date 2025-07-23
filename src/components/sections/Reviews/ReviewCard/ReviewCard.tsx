'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { alpha } from '@mui/material/styles';
import theme from '@/styles/theme';

function ReviewCard({ rating = 5, review, platform }) {
  const [scale, setScale] = useState(1);
  const [open, setOpen] = useState(false);
  const [showExpand, setShowExpand] = useState(false);
  const reviewTextRef = useRef(null);

  useEffect(() => {
    if (reviewTextRef.current) {
      const height = reviewTextRef.current.scrollHeight;
      const maxHeightInRem = 7.2;
      const maxHeightInPx = maxHeightInRem * parseFloat(getComputedStyle(document.documentElement).fontSize);
      setShowExpand(height > maxHeightInPx);
    }
  }, [review]);

  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card className="review-card">
        <Box display="flex" alignItems="center">
          <Rating
            value={rating}
            precision={1}
            readOnly
            icon={
              <StarIcon
                sx={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                }}
                fontSize="inherit"
                htmlColor={theme.palette.accent.primary}
              />
            }
            emptyIcon={
              <StarIcon
                sx={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                }}
                fontSize="inherit"
                htmlColor={`${alpha(theme.palette.primary.main, 0.2)}`}
              />
            }
          />
        </Box>
        <CardContent sx={{ p: 0 }}>
          <Typography
            ref={reviewTextRef}
            className="review-text"
            sx={{
              lineHeight: '1.2rem',
              display: '-webkit-box',
              WebkitLineClamp: 6,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '1rem',
            }}
          >
            “{review}”
          </Typography>

          {showExpand && (
            <Typography
              variant="body2"
              component="span"
              sx={{
                textDecoration: 'underline',
                textDecorationThickness: 1,
                textUnderlineOffset: '3px',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
              onClick={handleOpen}
              tabIndex={0}
              role="button"
            >
              Expand
            </Typography>
          )}
        </CardContent>
        {platform && (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Box
              sx={{
                height: 2,
                flexGrow: 1,
                backgroundColor: 'primary.light',
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                color: 'primary.light',
                fontSize: '0.875rem',
                textShadow: '0 1px 2px rgba(0,0,0,0.12)',
                fontWeight: 500,
              }}
            >
              {platform}
            </Typography>
            <Box
              sx={{
                height: 2,
                flexGrow: 1,
                backgroundColor: 'primary.light',
              }}
            />
          </Box>
        )}
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <span style={{flexGrow: 1}}>{platform} Review</span>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ 
              transform: `scale(${scale})`,
              transition: 'transform 0.1s ease-out',
              padding: 0,
              '&:hover': {
                transform: `scale(${scale * 1.2}) !important`, // Force override with !important
              }
            }}
            onMouseDown={() => setScale(0.9)}
            onMouseUp={() => setScale(1)}
            onMouseLeave={() => setScale(1)} // Reset scale when mouse leaves
            onTouchStart={() => setScale(0.9)}
            onTouchEnd={() => setScale(1)}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{
              fontStyle: 'italic',
              textAlign: 'center',
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
