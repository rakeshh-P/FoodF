import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import { Favorite, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
    } catch (err) {
      setError('Failed to load favorites');
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (menuItemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/favorites/${menuItemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(favorites.filter(item => item._id !== menuItemId));
    } catch (err) {
      setError('Failed to remove favorite');
      console.error('Error removing favorite:', err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
          My Favorites
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            No favorites yet
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            sx={{
              backgroundColor: '#e74c3c',
              '&:hover': { backgroundColor: '#c0392b' }
            }}
          >
            Browse Restaurants
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item._id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${item.price}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<Favorite />}
                      onClick={() => removeFavorite(item._id)}
                      sx={{
                        borderColor: '#e74c3c',
                        color: '#e74c3c',
                        '&:hover': {
                          borderColor: '#c0392b',
                          backgroundColor: '#e74c3c',
                          color: 'white'
                        }
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites; 