const express = require('express');
const router = express.Router();
const User = require('../models/User');
const MenuItem = require('../models/MenuItem');
const auth = require('../middleware/auth');

// Get user favorites
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).populate('favorites');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.favorites);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add to favorites
router.post('/:menuItemId', auth, async (req, res) => {
    try {
        const menuItem = await MenuItem.findById(req.params.menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.favorites.includes(menuItem._id)) {
            user.favorites.push(menuItem._id);
            await user.save();
        }

        res.json({ message: 'Added to favorites' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Remove from favorites
router.delete('/:menuItemId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.favorites = user.favorites.filter(
            item => item.toString() !== req.params.menuItemId
        );
        await user.save();
        res.json({ message: 'Removed from favorites' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 