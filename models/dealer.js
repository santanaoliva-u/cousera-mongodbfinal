const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
    name: String,
    location: String,
    reviews: [String]
});

const Dealer = mongoose.model('Dealer', dealerSchema);
module.exports = Dealer;

app.get('/dealers', async (req, res) => {
    const dealers = await Dealer.find();
    res.json(dealers);
});

app.get('/dealers/:state', async (req, res) => {
    const state = req.params.state;
    const dealers = await Dealer.find({ location: state });
    res.json(dealers);
});

app.post('/dealers/:id/reviews', async (req, res) => {
    const dealer = await Dealer.findById(req.params.id);
    dealer.reviews.push(req.body.review);
    await dealer.save();
    res.json(dealer);
});


