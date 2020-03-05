const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const { productController } = require('../controllers');

router.get("/", productController.getAll);

router.post("/", checkAuth, productController.create);

router.patch("/:productId", checkAuth, productController.update);

router.delete("/:productId", checkAuth, productController.delete);

module.exports = router;
