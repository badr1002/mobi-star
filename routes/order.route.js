const express = require("express");
const router = express.Router();
const orderControlles = require("../controllers/order.controller");
const auth = require("../middleware/auth");

router.post("/addOrder", auth, orderControlles.addOrder);
router.patch("/completeOrder", auth, orderControlles.completeOrder);
router.get("/allOrders", auth, orderControlles.allOrders);
router.get("/allOrdersForAdmin", auth, orderControlles.allOrdersForAdmin);
router.patch("/deleteOrder", auth, orderControlles.deleteOrder);

module.exports = router;
