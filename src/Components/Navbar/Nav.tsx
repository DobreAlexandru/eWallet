import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthType, useAuth } from '../Contexts/AuthContext';

export default function PrimarySearchAppBar() {
  const { user, logOut } = useAuth() as AuthType;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (e: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(e.currentTarget);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      handleMenuClose();
      handleMobileMenuClose();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        component={Link}
        to="/dashboard"
        style={{ textDecoration: 'none' }}
        onClick={handleMenuClose}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        component={Link}
        to="/settings"
        style={{ textDecoration: 'none' }}
        onClick={handleMenuClose}
      >
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        component={Link}
        to="/dashboard"
        style={{ textDecoration: 'none' }}
        onClick={handleMenuClose}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        component={Link}
        to="/settings"
        style={{ textDecoration: 'none' }}
        onClick={handleMenuClose}
      >
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <AppBar position="static" color="transparent" sx={{ boxShadow: 0 }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="end"
              aria-label="logo"
              aria-haspopup="true"
              component={Link}
              to="/"
              color="inherit"
              disableRipple={true}
            >
              eWallet
              <AccountBalanceWalletOutlinedIcon fontSize="large" />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {user && (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  disableRipple={true}
                >
                  {user.photoURL ? (
                    <Avatar alt="PFP" src={user.photoURL} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              )}
              {!user && (
                <Button
                  variant="contained"
                  component={Link}
                  to="/signin"
                  style={{ textDecoration: 'none' }}
                >
                  Sign In
                </Button>
              )}
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              {user && (
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  {user.photoURL ? (
                    <Avatar alt="PFP" src={user.photoURL} />
                  ) : (
                    <AccountCircle />
                  )}
                </IconButton>
              )}
              {!user && (
                <Button
                  variant="contained"
                  component={Link}
                  to="/signin"
                  style={{ textDecoration: 'none' }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        {user && renderMobileMenu}
        {user && renderMenu}
      </Container>
    </Box>
  );
}
