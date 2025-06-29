const mongoose = require('mongoose');
const { restaurants } = require('./data/dummyData');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/food-finder', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Clear existing data
        await Restaurant.deleteMany({});
        await MenuItem.deleteMany({});

        console.log('Cleared existing restaurant and menu data');

        // Create restaurants and menu items
        for (const restaurantData of restaurants) {
            const menuItems = restaurantData.menu;
            delete restaurantData.menu;

            const restaurant = await Restaurant.create(restaurantData);

            // Create menu items with restaurant reference
            const menuItemsWithRestaurant = menuItems.map(item => ({
                ...item,
                restaurant: restaurant._id
            }));

            await MenuItem.insertMany(menuItemsWithRestaurant);
        }

        console.log('Database seeded successfully with restaurants and menu items');
        console.log('Users can now register through the application');
        process.exit(0);
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDatabase(); 