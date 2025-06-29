import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './components/Login';
import Register from './components/Register';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import Favorites from './components/Favorites';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { createContext, useContext, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const LoadingContext = createContext();
export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(255,255,255,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={70} thickness={5} color="secondary" />
        </Box>
      )}
      {children}
    </LoadingContext.Provider>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingProvider>
        <AuthProvider>
          <Router>
            <Navbar />
            <Box sx={{ mt: 8 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <RestaurantList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/restaurant/:id"
                  element={
                    <PrivateRoute>
                      <RestaurantDetail />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <PrivateRoute>
                      <Favorites />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Box>
          </Router>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
