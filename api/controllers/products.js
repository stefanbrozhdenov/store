const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = (Product) => {
  const findById = async _id => await Product.findOne({ _id });

  return {
    getAll: async (req, res, next) => {
      try {
        res.json(await Product.find());
      } catch (e) {
        next(e);
      }
    },
    create: async (req, res, next) => {
      const vat = await axios.get("https://jsonvat.com/");
      const vatData = vat.data.rates;
      const token = req.headers.authorization.split(" ")[1];
      let decode = jwt.verify(token, process.env.JWT_KEY);
      
      let currentRate = vatData.find(function(data) {
        if (data.code === decode.code) {
          return data;
        }
      });
 
      const price = req.body.price;
      req.body.price = price + price*currentRate.periods[0].rates.standard/100;

      try {
        let product = new Product({
          ...req.body
        });
        product = await product.save();
        res.json(product);
      } catch (e) {
        next(e);
      }
    },
    update: async (req, res, next) => {
      try {
        let product = await findById(req.params.productId);
        product.set(req.body);
        product = await product.save();
        res.json(product);
      } catch (e) {
        next(e);
      }
    },
    delete: async (req, res, next) => {
      try {
        let product = await findById(req.params.productId);
        await product.remove();
        res.json(true);
      } catch (e) {
        next(e);
      }
    }
  };
};