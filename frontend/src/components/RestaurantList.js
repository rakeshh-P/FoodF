import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurants`);
      setRestaurants(response.data);
    } catch (err) {
      setError('Failed to load restaurants');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ 
        textAlign: 'center', 
        fontWeight: 'bold', 
        color: '#2c3e50',
        mb: 4,
        fontFamily: 'Playfair Display, serif'
      }}>
        Discover Amazing Restaurants
      </Typography>
      
      <Grid container spacing={4}>
        {restaurants.map((restaurant) => (
          <Grid item xs={12} sm={6} md={4} key={restaurant._id}>
            <Card
              onClick={() => navigate(`/restaurant/${restaurant._id}`)}
              sx={{
                height: '100%',
                cursor: 'pointer',
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
                image={restaurant.image}
                alt={restaurant.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {restaurant.cuisine}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.location}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                    ⭐ {restaurant.rating}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RestaurantList; 