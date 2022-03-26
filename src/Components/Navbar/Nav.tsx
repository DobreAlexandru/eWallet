import { Apps, Login, Logout, Settings, Widgets } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';

import { AuthType, useAuth } from '../../Contexts/AuthContext';

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

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      id="primary-search-account-menu"
      keepMounted
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      transitionDuration={0}
    >
      <MenuItem
        component={Link}
        to="/dashboard"
        style={{ textDecoration: 'none' }}
        onClick={handleMenuClose}
      >
        <Widgets /> Dashboard
      </MenuItem>
      <MenuItem
        component={Link}
        to="/settings"
        style={{ textDecoration: 'none' }}
        onClick={handleMenuClose}
      >
        <Settings />
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Logout /> Log Out
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container>
        <AppBar position="static" color="transparent" sx={{ boxShadow: 0 }}>
          <Toolbar>
            <IconButton
              size="large"
              aria-label="logo"
              aria-haspopup="true"
              component={Link}
              to="/"
              color="inherit"
              disableRipple
            >
              eWallet
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex' }}>
              {user ? (
                <>
                  <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                      size="large"
                      edge="end"
                      onClick={handleMenuOpen}
                      color="inherit"
                      disableRipple
                      component={motion.div}
                      whileHover={{ rotate: 135 }}
                    >
                      <Apps />
                    </IconButton>
                  </Box>
                  <Stack
                    direction="row"
                    spacing={5}
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.5,
                        transition: { duration: 1 },
                      }}
                    >
                      <IconButton
                        component={Link}
                        disableRipple
                        to="/dashboard"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onClick={handleMenuClose}
                      >
                        <Widgets />
                      </IconButton>
                    </motion.div>
                    <motion.div
                      whileHover={{
                        scale: 1.5,
                        rotate: 360,
                        transition: { duration: 1 },
                      }}
                    >
                      <IconButton
                        component={Link}
                        disableRipple
                        to="/settings"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        onClick={handleMenuClose}
                      >
                        <Settings />
                      </IconButton>
                    </motion.div>
                    <motion.div
                      whileHover={{
                        scale: 1.5,
                        transition: { duration: 1 },
                      }}
                    >
                      <IconButton
                        disableRipple
                        onClick={handleLogout}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Logout />
                      </IconButton>
                    </motion.div>
                  </Stack>
                </>
              ) : (
                <Button
                  variant="contained"
                  component={Link}
                  to="/signin"
                  style={{ textDecoration: 'none' }}
                  startIcon={<Login />}
                >
                  Log In
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
