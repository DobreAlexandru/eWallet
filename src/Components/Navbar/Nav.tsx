import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Container,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Avatar from "@mui/material/Avatar";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

export default function PrimarySearchAppBar() {
  const { user, logOut } = useAuth() as any;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    setMobileMoreAnchorEl(event.currentTarget);
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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        component={Link}
        to="/dashboard"
        style={{ textDecoration: "none" }}
        onClick={handleMenuClose}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        component={Link}
        to="/settings"
        style={{ textDecoration: "none" }}
        onClick={handleMenuClose}
      >
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        component={Link}
        to="/dashboard"
        style={{ textDecoration: "none" }}
        onClick={handleMenuClose}
      >
        Dashboard
      </MenuItem>
      <MenuItem
        component={Link}
        to="/settings"
        style={{ textDecoration: "none" }}
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
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
                  style={{ textDecoration: "none" }}
                >
                  Sign In
                </Button>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
                  style={{ textDecoration: "none" }}
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
