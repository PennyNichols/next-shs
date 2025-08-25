'use client';

import { Box, Typography, Skeleton, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { useMedia } from '@/hooks';
import { customBorderRadius, customBreakpoints, customShadows } from '@/styles/theme/otherThemeConstants';
import { ServicesAccordion } from '@/components/sections';
import { CustomNextArrow, CustomPrevArrow } from '@/components/common/ArrowButtons';
import PageContainer from '@/components/common/PageContainer/PageContainer';

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
      breakpoint: customBreakpoints.xl, // For screens smaller than 1200px (e.g., desktops down to large tablets)
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: customBreakpoints.lg, // For screens smaller than 1200px (e.g., desktops down to large tablets)
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: customBreakpoints.md, // For screens smaller than 900px (e.g., tablets)
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 2,
        arrows: false, // You might hide arrows on smaller screens
      },
    },
    {
      breakpoint: customBreakpoints.sm, // For screens smaller than 600px (e.g., mobile devices)
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

const ServicesPage = () => {
  const { isXxs: initialIsXxs, isXs: initialIsXs } = useMedia();
  const [showClientContent, setShowClientContent] = useState(false);
  const [isXxs, setIsXxs] = useState(false);
  const [isXs, setIsXs] = useState(false);

  useEffect(() => {
    setShowClientContent(true);
    setIsXxs(initialIsXxs);
    setIsXs(initialIsXs);
  }, [initialIsXxs, initialIsXs]);
  const imageDisplayHeight = isXxs || isXs ? '300px' : '200px';
  return (
    <PageContainer>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          px: 2,
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1200,
            mb: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              minWidth: 20,
              height: 2,
              backgroundColor: 'secondary.dark',
              flex: 1,
              display: { xxs: 'none', xs: 'block' },
              mx: { xxs: 2, sm: 3, md: 4, lg: 5 },
            }}
          />
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Our Services
          </Typography>
          <Box
            sx={{
              minWidth: 20,
              height: 2,
              backgroundColor: 'secondary.dark',
              flex: 1,
              mx: { xxs: 2, sm: 3, md: 4, lg: 5 },
              display: { xxs: 'none', xs: 'block' },
            }}
          />
        </Box>{' '}
        {/* Image Carousel */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 900,
            mb: 6,
            position: 'relative',
          }}
        >
          {showClientContent ? (
            <Slider {...sliderSettings}>
              {carouselImages.map((src, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 2,
                    height: imageDisplayHeight, // Fixed height for the container
                    overflow: 'hidden', // Hide overflow if image is cropped
                    borderRadius: customBorderRadius.small, // Consistent border radius
                  }}
                >
                  <img
                    src={src}
                    alt={`Service ${idx + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: customBorderRadius.medium,
                      objectFit: 'cover',
                      boxShadow: customShadows[2],
                    }}
                  />
                </Box>
              ))}
            </Slider>
          ) : (
            // Skeleton for carousel
            <Box sx={{ display: 'flex', gap: 2, overflow: 'hidden' }}>
              {Array.from({ length: isXs ? 1 : 5 }).map((_, idx) => (
                <Skeleton
                  key={idx}
                  variant="rectangular"
                  sx={{
                    flex: isXxs || isXs ? '1' : '0 0 calc(20% - 16px)',
                    height: imageDisplayHeight,
                    borderRadius: customBorderRadius.medium,
                    minWidth: isXxs || isXs ? '100%' : 'auto',
                  }}
                />
              ))}
            </Box>
          )}{' '}
        </Box>
        {showClientContent ? (
          <ServicesAccordion />
        ) : (
          // Skeleton for Services Accordion
          <Box sx={{ width: '100%', maxWidth: 1200 }}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Box key={idx} sx={{ mb: 2 }}>
                <Skeleton
                  variant="rectangular"
                  height={60}
                  sx={{
                    borderRadius: customBorderRadius.small,
                    mb: 1,
                  }}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </PageContainer>
  );
};

export default ServicesPage;
