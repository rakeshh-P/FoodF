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
  IconButton,
  Chip
} from '@mui/material';
import { Favorite, FavoriteBorder, ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurantData();
  }, [id]);

  const fetchRestaurantData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [restaurantRes, menuRes, favoritesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/restaurants/${id}`),
        axios.get(`${API_BASE_URL}/restaurants/${id}/menu`),
        axios.get(`${API_BASE_URL}/favorites`, { headers })
      ]);

      setRestaurant(restaurantRes.data);
      setMenuItems(menuRes.data);
      setFavorites(favoritesRes.data.map(fav => fav._id));
    } catch (err) {
      setError('Failed to load restaurant data');
      console.error('Error fetching restaurant data:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (menuItemId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const isFavorite = favorites.includes(menuItemId);
      
      if (isFavorite) {
        await axios.delete(`${API_BASE_URL}/favorites/${menuItemId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(favorites.filter(id => id !== menuItemId));
      } else {
        await axios.post(`${API_BASE_URL}/favorites/${menuItemId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites([...favorites, menuItemId]);
      }
    } catch (err) {
      setError('Failed to update favorite');
      console.error('Error toggling favorite:', err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error || !restaurant) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error || 'Restaurant not found'}</Alert>
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
          {restaurant.name}
        </Typography>
      </Box>

      <Card sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
        <CardMedia
          component="img"
          height="300"
          image={restaurant.image}
          alt={restaurant.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {restaurant.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {restaurant.description}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip label={restaurant.cuisine} color="primary" />
                <Chip label={`⭐ ${restaurant.rating}`} color="secondary" />
              </Box>
            </Box>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
              {restaurant.location}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 3, color: '#2c3e50' }}>
        Menu
      </Typography>

      <Grid container spacing={3}>
        {menuItems.map((item) => (
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
                <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    ${item.price}
                  </Typography>
                  <IconButton
                    onClick={() => toggleFavorite(item._id)}
                    color={favorites.includes(item._id) ? 'error' : 'default'}
                    sx={{
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    {favorites.includes(item._id) ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RestaurantDetail; 