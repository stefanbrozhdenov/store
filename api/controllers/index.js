const { Order, Product } = require('../models');

module.exports = {
  orderController: require('./orders')(Order),
  productController: require('./products')(Product),
};