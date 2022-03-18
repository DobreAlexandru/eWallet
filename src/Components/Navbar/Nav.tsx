import AppsIcon from '@mui/icons-material/Apps';
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
import { motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthType, useAuth } from '../Contexts/AuthContext';

export default function PrimarySearchAppBar() {
  const { user, logOut } = useAuth() as AuthType;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      handleMenuClose();
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
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
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex' }}>
              {user && (
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="menu"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleMenuOpen}
                  color="inherit"
                  disableRipple={true}
                  component={motion.div}
                  whileHover={{ rotate: 135 }}
                >
                  <AppsIcon />
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
        {user && renderMenu}
      </Container>
    </Box>
  );
}
