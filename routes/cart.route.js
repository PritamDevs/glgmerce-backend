const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const {
  addToCart,
  getCart,
  removeFromCart,
  updateQuantity,
} = require("../controllers/cart.controller");

const router = express.Router();

router.post("/add", auth(["buyer"]), addToCart);
router.get("/", auth(["buyer"]), getCart);
router.delete("/remove/:productId", auth(["buyer"]), removeFromCart);
router.put("/:id", auth(["buyer"]), updateQuantity);

module.exports = router;
