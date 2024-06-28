const express = require("express");
const router = express.Router();
const { createCheckoutSession, getOrders } = require("../controllers/paymentsController");

router.post("/create-checkout-session", createCheckoutSession);
router.get("/orders", getOrders);

module.exports = router;
