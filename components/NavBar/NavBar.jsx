'use client';
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import LogoSvg from '../SVG/LogoSvg';
import { Handyman, HomeRepairService } from '@mui/icons-material';
import useMedia from '../../hooks/useMedia';
import { customTransitions } from '@/theme/otherThemeConstants';
import theme from '@/theme';
import { gold, white } from '@/theme/colors';
import { ClickAwayListener, Collapse } from '@mui/material';

const pages = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'FAQ', href: '/FAQ' },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoColor, setLogoColor] = useState(white);
  const logoHoverColor = gold;

  const { isXs: initialIsXs, isSm: initialIsSm } = useMedia();
  const [showClientContent, setShowClientContent] = useState(false);
  const [isXs, setIsXs] = useState(false);
  const [isSm, setIsSm] = useState(false);

  useEffect(() => {
    setShowClientContent(true);
    setIsXs(initialIsXs);
    setIsSm(initialIsSm);
  }, [initialIsXs, initialIsSm]);
  const isMobile = isXs || isSm;

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <ClickAwayListener onClickAway={handleMenuClose}>
      <AppBar position="sticky">
        <Container>
          <Toolbar disableGutters>
            <Box mr={1}>
              <Link href="/" passHref>
                <span
                  style={{
                    display: 'inline-block',
                    paddingTop: 7,
                  }}
                  onMouseEnter={() => setLogoColor(logoHoverColor)}
                  onMouseLeave={() => setLogoColor(white)}
                >
                  <LogoSvg color={logoColor} width={70} height={50} />
                </span>
              </Link>
            </Box>{' '}
            {/* Desktop Links */}
            {showClientContent && !isMobile && (
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: 'flex-end',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                {pages.map((page) => (
                  <Link key={page.name} href={page.href} passHref>
                    <Button
                      sx={{
                        color: 'secondary.light',
                        margin: 1,
                        textAlign: 'center',
                        fontSize: '1rem',
                        transition: customTransitions.standard,
                        letterSpacing: 1,
                        textShadow: 'none',
                        '&:hover': {
                          letterSpacing: 2.5,
                          textShadow: `
                        0px 8px 12px ${theme.palette.accent.main},
                        0px 8px 12px ${theme.palette.accent.main}
                        `,
                        },
                      }}
                    >
                      {page.name}
                    </Button>
                  </Link>
                ))}
              </Box>
            )}
            {/* Desktop Skeleton */}
            {!showClientContent && (
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: 'flex-end',
                  display: { xs: 'none', md: 'flex' },
                  gap: 2,
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rectangular"
                    width={80}
                    height={36}
                    sx={{
                      borderRadius: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                    }}
                  />
                ))}
              </Box>
            )}
            {/* Mobile Hamburger */}
            {showClientContent && isMobile && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginLeft: 'auto',
                }}
              >
                <IconButton size="large" aria-label="menu" onClick={handleMenuToggle} color="inherit">
                  {isMenuOpen ? (
                    <Handyman
                      sx={{
                        color: 'background.paper',
                        transition: customTransitions.slow,
                        fontSize: '2.5rem',
                        '&:hover': { color: 'accent.main' },
                      }}
                    />
                  ) : (
                    <HomeRepairService
                      sx={{
                        color: 'background.paper',
                        transition: customTransitions.slow,
                        fontSize: '2.5rem',
                        '&:hover': { color: 'accent.main' },
                      }}
                    />
                  )}
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>

        {isMobile && (
          <Collapse in={isMenuOpen} timeout="auto" unmountOnExit>
            <Box
              onClick={handleMenuClose}
              sx={{
                py: 2,
                backgroundColor: 'primary.main',
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                width: { xs: '100vw', sm: 'auto' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} sx={{ justifyContent: 'center' }} onClick={handleMenuClose}>
                  <Link href={page.href} passHref>
                    <Typography
                      variant="button"
                      sx={{
                        color: 'secondary.light',
                        margin: 1,
                        textAlign: 'center',
                        fontSize: '1rem',
                        transition: customTransitions.standard,
                        letterSpacing: 1,
                        textShadow: 'none',
                        '&:hover': {
                          letterSpacing: 2.5,
                          textShadow: `
                            0px 8px 12px ${theme.palette.accent.main},
                          0px 8px 12px ${theme.palette.accent.main}
                          `,
                        },
                      }}
                    >
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Box>
          </Collapse>
        )}

        {/* Mobile Skeleton */}
        {!showClientContent && (
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
              marginLeft: 'auto',
            }}
          >
            <Skeleton
              variant="circular"
              width={48}
              height={48}
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              }}
            />
          </Box>
        )}
      </AppBar>
    </ClickAwayListener>
  );
};

export default NavBar;
