/* GET homepage */
const index = (req, res) => {
    res.render('index', { titles: 'Travlr Getaways' });
};
module.exports = {
    index
};