const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const { orderController } = require('../controllers');

// Handle incoming GET requests to /orders
router.get("/",  checkAuth, orderController.getAll);

router.post("/", checkAuth, orderController.create);

router.patch("/:orderId", checkAuth, orderController.update);

router.delete("/:orderId", checkAuth, orderController.delete);

module.exports = router;
