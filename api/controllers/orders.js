
module.exports = (Order) => {
  const findById = async _id => await Order.findOne({ _id });

  return {
    getAll: async (req, res, next) => {
      try {
        res.json(await Order.find());
      } catch (e) {
        next(e);
      }
    },
    create: async (req, res, next) => {
      try {
        let order = new Order({
          ...req.body
        });
        message = await order.save();
        res.json(message);
      } catch (e) {
        next(e);
      }
    },
    update: async (req, res, next) => {
      try {
        let order = await findById(req.params.orderId);
        order.set(req.body);
        order = await order.save();
        res.json(order);
      } catch (e) {
        next(e);
      }
    },
    delete: async (req, res, next) => {
      try {
        let order = await findById(req.params.orderId);
        await order.remove();
        res.json(true);
      } catch (e) {
        next(e);
      }
    }
  };
};
