const mongoose = require('mongoose');
const trips = mongoose.model('trips');

/* GET meals view */
const meals = async (req, res) => {
    res.render('meals', { title: 'Foods', meals: await trips.find({}), mealSelected: req.path == '/meals' });
};

module.exports = {
    meals
};