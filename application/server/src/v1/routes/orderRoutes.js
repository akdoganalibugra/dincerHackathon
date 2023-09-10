const express = require('express');
const orderController = require('../../controllers/orderController');

const router = express.Router();

router.get("/", orderController.getAllOrders);

router.get("/:orderId", orderController.getOneOrder);

router.post("/", orderController.createNewOrder);

router.patch("/:orderId", orderController.updateOneOrder);

module.exports = router;