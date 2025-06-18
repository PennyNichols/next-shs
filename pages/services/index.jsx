import { Box, Typography } from '@mui/material';
import React from 'react';
import ServicesAccordion from '../../components/ServicesAccordion/ServicesAccordion';
import useStyles from './styles';
import Slider from 'react-slick';
import useMedia from '../../hooks/useMedia';
import theme from '@/theme/theme';
import { CustomNextArrow, CustomPrevArrow } from '../../components/ReusableComponents/ArrowButtons/ArrowButtons';

const carouselImages = [
  '/images/servicesCarousel1.png',
  '/images/servicesCarousel2.png',
  '/images/servicesCarousel3.png',
  '/images/servicesCarousel4.png',
  '/images/servicesCarousel5.png',
  '/images/servicesCarousel6.png',
  '/images/servicesCarousel7.png',
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5, // Default for larger screens
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
  arrows: true,
  swipeToSlide: true,
  // --- Add breakpoints here ---
  responsive: [
    {
      breakpoint: theme.breakpoints.values.xl, // For screens smaller than 1200px (e.g., desktops down to large tablets)
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: theme.breakpoints.values.lg, // For screens smaller than 1200px (e.g., desktops down to large tablets)
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: theme.breakpoints.values.sm, // For screens smaller than 900px (e.g., tablets)
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
        arrows: false, // You might hide arrows on smaller screens
      },
    },
    {
      breakpoint: theme.breakpoints.values.xs, // For screens smaller than 600px (e.g., mobile devices)
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

const ServicesPage = () => {
  const classes = useStyles();
  const { isXs } = useMedia();
  const imageDisplayHeight = isXs ? '200px' : '200px';
  return (
    <Box
      className={classes.servicesPageContainer}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3, px: 3 }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          textAlign: 'center',
          mb: 4,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            minWidth: 20,
            height: 2,
            backgroundColor: theme.palette.secondary.dark,
            flex: 1,
            mx: { sm: theme.spacing(2), md: theme.spacing(3), lg: theme.spacing(4) },
          }}
        />
        <Typography variant="h2" className={classes.servicesPageTitle}>
          Our Services
        </Typography>
        <Box
          sx={{ minWidth: 20, height: 2, backgroundColor: theme.palette.secondary.dark, flex: 1, mx: theme.spacing(3) }}
        />
      </Box>
      {/* Image Carousel */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 900,
          mb: 6,
          position: 'relative',
        }}
      >
        <Slider {...sliderSettings}>
          {carouselImages.map((src, idx) => (
            <Box
              key={idx}
              sx={{
                p: 2,
                height: imageDisplayHeight, // Fixed height for the container
                overflow: 'hidden', // Hide overflow if image is cropped
                borderRadius: 2, // Consistent border radius
              }}
            >
              <img
                src={src}
                alt={`Service ${idx + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 8,
                  objectFit: 'cover',
                  boxShadow: theme.shadows[2],
                }}
              />
            </Box>
          ))}
        </Slider>
      </Box>
      <ServicesAccordion />
    </Box>
  );
};

export default ServicesPage;
