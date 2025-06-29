const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

// Get all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find().select('name description image');
        res.json(restaurants);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single restaurant with menu
router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get menu items for a restaurant
router.get('/:id/menu', async (req, res) => {
    try {
        const menuItems = await MenuItem.find({ restaurant: req.params.id });
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 