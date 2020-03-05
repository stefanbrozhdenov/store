const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    products: [{type: Array, required: true }],
    date: { type: Date, required: true },
    status:  { type: String, required: true }
});

module.exports = mongoose.model('Order', orderSchema);