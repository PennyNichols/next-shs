'use client';

// NEED TO FIX LINK BG COLORS AND HOVER BG COLORS
// STYLE MIGRATION TO SX BROKE IT
// INTEGRATE INTO THEME, CAN USE CUSTOM CLASSNAMES IN GLOBAL THEME
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
import { customShadows, customTransitions } from '@/theme/otherThemeConstants';
import theme from '@/theme';
import { gold, white } from '@/theme/colors';
import { ClickAwayListener, Collapse } from '@mui/material';
import { useRouter } from 'next/router';
import ActionButton from 'components/ReusableComponents/ActionButton/ActionButton';

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
  const logoHoverColor = theme.palette.accent.main;
  const [logoScale, setLogoScale] = useState(1);

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

  const iconSize = '2.5rem';

  return (
    <ClickAwayListener onClickAway={handleMenuClose}>
      <AppBar position="sticky" sx={{ py: 1 }}>
        <Container>
          <Toolbar disableGutters>
            <Box mr={1}>
              <Link href="/" passHref>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    pt: 0.5,
                    cursor: 'pointer',
                    transition: 'all .1s ease-in-out',
                    transform: `scale(${logoScale})`,
                  }}
                  onMouseEnter={() => setLogoColor(logoHoverColor)}
                  onMouseLeave={() => setLogoColor(white)}
                  onMouseDown={() => setLogoScale(0.9)}
                  onMouseUp={() => setLogoScale(1)}
                >
                  <LogoSvg color={logoColor} width={70} height={50} />
                </Box>
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
                  <Link className="nav-menu-item" key={page.name} href={page.href} passHref>
                    <ActionButton text={page.name} />
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
                  <Box
                    sx={{
                      position: 'relative',
                      width: iconSize,
                      height: iconSize,
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
                        fontSize: iconSize,
                        '&:hover': { color: 'accent.main' },
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
                        fontSize: iconSize,
                        '&:hover': { color: 'accent.main' },
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
                boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.3)',
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  className="nav-menu-item"
                  sx={{ justifyContent: 'center' }}
                  onClick={handleMenuClose}
                >
                  <Link href={page.href} passHref>
                    <Typography variant="button" className="nav-link">
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
