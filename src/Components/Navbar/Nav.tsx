import { Login, Logout, Settings, Widgets } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { AuthType, useAuth } from '../../Contexts/AuthContext';

export default function PrimarySearchAppBar() {
  const { user, logOut } = useAuth() as AuthType;

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err: any) {
      console.log(err.message);
    }
  };

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
                  <Stack direction="row" spacing={{ xs: 1, md: 5 }}>
                    <IconButton
                      component={Link}
                      disableRipple
                      to="/menu"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Widgets />
                    </IconButton>
                    <motion.div
                      whileHover={{
                        rotate: 360,
                        transition: { duration: 1 },
                      }}
                    >
                      <IconButton
                        component={Link}
                        disableRipple
                        to="/settings"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Settings />
                      </IconButton>
                    </motion.div>
                    <IconButton
                      disableRipple
                      onClick={handleLogout}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <Logout />
                    </IconButton>
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
      </Container>
    </Box>
  );
}
