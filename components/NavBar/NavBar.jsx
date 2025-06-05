import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import Image from 'next/image';
import useStyles from './NavBar.styles';
import theme from '@/theme/theme';
import LogoSvg from '../SVG/LogoSvg';

const pages = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'FAQ', href: '/FAQ' },
];

function ResponsiveAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar disableGutters>
          {/* Logo (always visible) */}
          <Box className={classes.leftLogoContainer}>
            <Link href="/" passHref>
              <LogoSvg color={theme.palette.secondary.light} width={70} height={50} />
            </Link>
          </Box>
          {/* Desktop Links */}
          <Box className={classes.desktopNavLinkContainer}>
            {pages.map((page) => (
              <Link key={page.name} href={page.href} passHref>
                <Button className={classes.menuItem}>{page.name}</Button>
              </Link>
            ))}
          </Box>
          {/* Mobile Hamburger */}
          <Box className={classes.mobileNavLinkContainer}>
            <IconButton size="large" aria-label="menu" onClick={handleMenuOpen} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              disableScrollLock={true}
              className={classes.menu}
              MenuListProps={{
                className: classes.menuList,
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleMenuClose}>
                  <Link href={page.href} passHref>
                    <Typography variant="button" className={classes.menuItem} textAlign="center">
                      {page.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
