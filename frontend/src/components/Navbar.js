import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Food Finder
        </Typography>
        {isAuthenticated && (
          <Box>
            <Button
              color="inherit"
              component={RouterLink}
              to="/"
              sx={{ mx: 1 }}
            >
              Restaurants
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/favorites"
              sx={{ mx: 1 }}
            >
              Favorites
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{ mx: 1 }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 