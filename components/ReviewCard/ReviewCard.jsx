import React, { useState } from 'react';
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
import { alpha } from '@mui/material/styles';
import { customBorderRadius } from '@/theme/otherThemeConstants';
import theme from '@/theme';
import { navyBlue, gold } from '@/theme/colors';

function ReviewCard({ rating = 5, review, platform }) {
  const words = review.split(' ');
  const isTruncated = words.length > 10;

  const [open, setOpen] = useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <Card
        sx={{
          width: 220,
          height: 260,
          borderRadius: customBorderRadius.medium,
          boxShadow: 3,
          background: `linear-gradient(135deg, secondary.main, 0.5)} 100%, rgba(237,235,243,0.18) 100%)`,
          backdropFilter: 'blur(8px)',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
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
                htmlColor={gold}
              />
            }
            emptyIcon={
              <StarIcon
                sx={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))',
                }}
                fontSize="inherit"
                htmlColor={`${alpha(navyBlue, 0.2)}`}
              />
            }
          />
        </Box>
        <CardContent sx={{ p: 0 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'primary.dark',
              fontSize: '1rem',
              fontStyle: 'italic',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textShadow: '0 1px 4px rgba(0,0,0,0.18)',
              margin: '1 0',
            }}
          >
            “{review}” <br />
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
          </Typography>
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
                color: theme.palette.primary.light,
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
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 3,
            top: 3,
            color: 'primary.light',
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
