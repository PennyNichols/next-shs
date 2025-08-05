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
import LogoSvg from '../../../assets/svg/LogoSvg/LogoSvg';
import { Handyman, HomeRepairService } from '@mui/icons-material';
import useMedia from '../../../hooks/useMedia';
import { customTransitions } from '@/styles/theme/otherThemeConstants';
import theme from '@/styles/theme';
import { ClickAwayListener, Collapse } from '@mui/material';
import ActionButton from '@/components/common/ActionButton/ActionButton';
import NavButton from '@/components/common/NavButton/NavButton';

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
  const [logoColor, setLogoColor] = useState(theme.palette.background.paper);
  const logoHoverColor = theme.palette.accent.primary;
  const [logoScale, setLogoScale] = useState(1);

  const [showClientContent, setShowClientContent] = useState(false);

  useEffect(() => {
    setShowClientContent(true);
  }, []);

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  return (
    <ClickAwayListener onClickAway={handleMenuClose}>
      <AppBar position="sticky" sx={{ py: 0 }}>
        <Container>
          <Toolbar disableGutters>
            <Box mr={1}>
              <Link href="/" passHref>
                <Box
                  component="span"
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 0,
                    cursor: 'pointer',
                    transition: 'all .1s ease-in-out',
                    transform: `scale(${logoScale})`,
                    width: { xxs: 70, sm: 80, lg: 90, xl: 100 },
                    height: { xxs: 50, sm: 60, lg: 70, xl: 80 },
                  }}
                  onMouseEnter={() => setLogoColor(logoHoverColor)}
                  onMouseLeave={() => setLogoColor(theme.palette.background.paper)}
                  onMouseDown={() => setLogoScale(0.9)}
                  onMouseUp={() => setLogoScale(1)}
                  onTouchStart={() => setLogoScale(0.9)}
                  onTouchEnd={() => setLogoScale(1)}
                >
                  <LogoSvg color={logoColor} />
                </Box>
              </Link>
            </Box>{' '}
            {/* Desktop Links */}
            {showClientContent && (
              <Box
                sx={{
                  flexGrow: 1,
                  justifyContent: 'flex-end',
                  display: { xxs: 'none', md: 'flex' },
                }}
              >
                {pages.map((page) => (
                  <Link className="nav-menu-item" key={page.name} href={page.href} passHref>
                    <NavButton text={page.name} />
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
                  display: { xxs: 'none', md: 'flex' },
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
            {showClientContent && (
              <Box
                sx={{
                  display: { xxs: 'flex', md: 'none' },
                  justifyContent: 'flex-end',
                  marginLeft: 'auto',
                }}
              >
                <IconButton size="large" aria-label="menu" onClick={handleMenuToggle} color="inherit">
                  <Box
                    sx={{
                      position: 'relative',
                      width: { xxs: 45, sm: 55 },
                      height: { xxs: 45, sm: 55 },
                    }}
                  >
                    <Handyman
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        color: 'background.paper',
                        transition: `${customTransitions.slow}, transform 0.3s ease-out, opacity 0.3s ease-out`,
                        fontSize: { xxs: 45, sm: 55 },
                        '&:hover': { color: 'accent.primary' },
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen ? 'rotate(0deg)' : 'rotate(-180deg)',
                        pointerEvents: isMenuOpen ? 'auto' : 'none',
                      }}
                    />
                    <HomeRepairService
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        color: 'background.paper',
                        transition: `${customTransitions.slow}, transform 0.3s ease-out, opacity 0.3s ease-out`,
                        fontSize: { xxs: 42, sm: 52 },
                        '&:hover': { color: 'accent.primary' },
                        opacity: isMenuOpen ? 0 : 1,
                        transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        pointerEvents: isMenuOpen ? 'none' : 'auto',
                      }}
                    />
                  </Box>
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>

        <Collapse in={isMenuOpen} timeout="auto" unmountOnExit sx={{ display: { xxs: 'flex', md: 'none' } }}>
          <Box
            onClick={handleMenuClose}
            sx={{
              py: 2,
              backgroundColor: 'primary.main',
              position: 'absolute',
              top: 'calc(100% - 4px)',
              left: 0,
              right: 0,
              boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.3)',
              width: { xxs: '100%', sm: 'auto' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.name} sx={{ justifyContent: 'center' }} onClick={handleMenuClose}>
                <Link className="nav-menu-item" key={page.name} href={page.href} passHref>
                  <NavButton text={page.name} />
                </Link>
              </MenuItem>
            ))}
          </Box>
        </Collapse>

        {/* Mobile Skeleton */}
        {!showClientContent && (
          <Box
            sx={{
              display: { xxs: 'flex', md: 'none' },
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
