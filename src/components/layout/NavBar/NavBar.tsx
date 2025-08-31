'use client';

import React, { useEffect, useState, useRef } from 'react';
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
import {
  Handyman,
  HomeRepairService,
  AccountCircle,
  Dashboard,
  Settings,
  Login,
  Logout,
  AssignmentIndOutlined,
} from '@mui/icons-material';
import useMedia from '../../../hooks/useMedia';
import { customBorderRadius, customTransitions } from '@/styles/theme/otherThemeConstants';
import theme from '@/styles/theme';
import { ClickAwayListener, Collapse, Avatar, alpha } from '@mui/material';
import ActionButton from '@/components/common/ActionButton/ActionButton';
import NavButton from '@/components/common/NavButton/NavButton';
import StylableLogo from '../../../assets/svg/LogoSvg/LogoSvg';
import { useAuth } from '@/contexts/AuthContext/AuthContext';
import { useRouter } from 'next/navigation';
import { getDashboardRouteForRole } from '@/lib/utils/roleBasedRouting';
import useUser from '@/hooks/auth/useUser';
import { useImpersonation } from '@/contexts/ImpersonationContext';
import ActOnBehalfSelector from '@/components/ActOnBehalfSelector/ActOnBehalfSelector';

const NavBar = () => {
  const { currentUser, signOutUser } = useAuth();
  const { user } = useUser();
  const { canImpersonate } = useImpersonation();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [logoColor, setLogoColor] = useState(theme.palette.background.paper);
  const logoHoverColor = theme.palette.accent.primary;
  const [logoScale, setLogoScale] = useState(1);

  const [showClientContent, setShowClientContent] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Dynamic pages array - no longer includes sign in/out
  const pages = [
    // { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Careers', href: '/careers' },
    // { name: 'Blog', href: '/blog' },
    // { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/FAQ' },
  ];

  const dashboardURL = getDashboardRouteForRole(user?.role);

  const settingsURL = '/account-settings';

  useEffect(() => {
    setShowClientContent(true);
  }, []);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    // Initial height calculation
    updateHeaderHeight();

    // Update on resize
    const observer = new ResizeObserver(updateHeaderHeight);
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, [showClientContent]); // Re-run when content changes

  const handleMenuToggle = () => setIsMenuOpen((prev) => !prev);
  const handleMenuClose = () => setIsMenuOpen(false);

  const handleAccountMenuToggle = () => setIsAccountMenuOpen((prev) => !prev);
  const handleAccountMenuClose = () => setIsAccountMenuOpen(false);

  const handleSignOut = async () => {
    try {
      handleAccountMenuClose();
      await signOutUser();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        handleMenuClose();
        handleAccountMenuClose();
      }}
    >
      <AppBar position="sticky" ref={headerRef} sx={{ py: 0 }}>
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
                  }}
                  onMouseEnter={() => setLogoColor(logoHoverColor)}
                  onMouseLeave={() => setLogoColor(theme.palette.background.paper)}
                  onMouseDown={() => setLogoScale(0.9)}
                  onMouseUp={() => setLogoScale(1)}
                  onTouchStart={() => setLogoScale(0.9)}
                  onTouchEnd={() => setLogoScale(1)}
                >
                  <StylableLogo
                    color={logoColor}
                    sx={{
                      height: { xxs: 55, md: 60, xl: 70 },
                      width: { xxs: 65, md: 70, xl: 82 },
                      margin: { xxs: 0.7, md: 1 },
                    }}
                  />
                </Box>
              </Link>
            </Box>

            {/* Act on Behalf Selector - Global Position */}
            {showClientContent && canImpersonate && (
              <Box
                sx={{
                  mx: 2,
                  minWidth: 200,
                  display: 'block',
                }}
              >
                <ActOnBehalfSelector />
              </Box>
            )}

            {/* Desktop Links */}
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: 'flex-end',
                display: { xxs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
              }}
            >
              {pages.map((page) => (
                <Link className="nav-menu-item" key={page.name} href={page.href} passHref>
                  <NavButton text={page.name} />
                </Link>
              ))}

              {/* Account Menu Button */}
              <IconButton
                onClick={handleAccountMenuToggle}
                sx={{
                  color: 'background.paper',
                  transition: 'all 0.5s ease-in-out, transform 0.1s ease-in-out',
                  '&:hover': {
                    color: 'accent.primary',
                    filter: `drop-shadow(0px 3px 8px ${alpha(theme.palette.accent.primary, 0.6)}) drop-shadow(0px 3px 5px ${alpha(theme.palette.accent.primary, 0.4)})`,
                  },
                  ml: 1,
                }}
              >
                <AccountCircle />
              </IconButton>

              {/* Account Menu */}
              <Collapse in={isAccountMenuOpen} timeout="auto" unmountOnExit sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    py: 2,
                    backgroundColor: 'primary.main',
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {!currentUser ? (
                    <>
                      <MenuItem
                        onClick={() => {
                          handleAccountMenuClose();
                        }}
                      >
                        <Link className="nav-menu-item" href="/sign-in" passHref>
                          <NavButton text="Sign In" icon={<Login />} />
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleAccountMenuClose();
                        }}
                      >
                        <Link className="nav-menu-item" href="/sign-up" passHref>
                          <NavButton text="Sign Up" icon={<AssignmentIndOutlined />} />
                        </Link>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        onClick={() => {
                          handleAccountMenuClose();
                        }}
                      >
                        <Link className="nav-menu-item" href={dashboardURL} passHref>
                          <NavButton text="Dashboard" icon={<Dashboard />} />
                        </Link>
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleAccountMenuClose();
                        }}
                      >
                        <Link className="nav-menu-item" href={settingsURL} passHref>
                          <NavButton text="Settings" icon={<Settings />} />
                        </Link>
                      </MenuItem>
                      <MenuItem
                        key="sign-out"
                        onClick={() => {
                          handleSignOut();
                          handleAccountMenuClose();
                        }}
                      >
                        <Link className="nav-menu-item" href="/" passHref>
                          <NavButton text="Sign Out" icon={<Logout />} />
                        </Link>
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Collapse>
            </Box>
            {/* Mobile Hamburger */}
            <Box
              sx={{
                display: { xxs: 'flex', md: 'none' },
                justifyContent: 'flex-end',
                marginLeft: 'auto',
              }}
            >
              <IconButton size="medium" aria-label="menu" onClick={handleMenuToggle} color="inherit">
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
          </Toolbar>
        </Container>

        <Collapse in={isMenuOpen} timeout="auto" unmountOnExit sx={{ display: { xxs: 'flex', md: 'none' } }}>
          <Box
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
              <MenuItem onClick={handleMenuClose} key={page.name} sx={{ justifyContent: 'center' }}>
                <Link className="nav-menu-item" key={page.name} href={page.href} passHref>
                  <NavButton text={page.name} />
                </Link>
              </MenuItem>
            ))}

            {/* Act on Behalf Selector for Mobile */}
            {showClientContent && canImpersonate && (
              <Box sx={{ px: 2, py: 1, borderBottom: '1px solid rgba(255,255,255,0.1)', mb: 1 }}>
                <ActOnBehalfSelector />
              </Box>
            )}

            {/* Mobile Account Menu Items */}
            {!currentUser ? (
              <MenuItem onClick={handleMenuClose} sx={{ justifyContent: 'center' }}>
                <Link className="nav-menu-item" href="/sign-in" passHref>
                  <NavButton text="Sign In" icon={<Login />} />
                </Link>
              </MenuItem>
            ) : (
              <>
                <MenuItem onClick={handleMenuClose} sx={{ justifyContent: 'center' }}>
                  <Link className="nav-menu-item" href={dashboardURL} passHref>
                    <NavButton text="Dashboard" />
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose} sx={{ justifyContent: 'center' }}>
                  <Link className="nav-menu-item" href={settingsURL} passHref>
                    <NavButton text="Settings" />
                  </Link>
                </MenuItem>
                <MenuItem
                  sx={{ justifyContent: 'center' }}
                  onClick={() => {
                    handleSignOut();
                    handleMenuClose();
                  }}
                >
                  <Link className="nav-menu-item" href="/" passHref>
                    <NavButton text="Sign Out" icon={<Logout />} />
                  </Link>
                </MenuItem>
              </>
            )}
          </Box>
        </Collapse>
      </AppBar>
    </ClickAwayListener>
  );
};

export default NavBar;
