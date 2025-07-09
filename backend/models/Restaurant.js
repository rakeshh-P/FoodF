const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: String,
    image: String
});

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    address: String,
    phone: String,
    supportsCOD: Boolean,
    supportsMobilePayment: Boolean,
    image: String,
    menu: [menuItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema); 