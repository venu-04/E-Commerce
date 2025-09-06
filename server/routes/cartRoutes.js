const express = require("express");
const Cart = require("../models/Cart");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get cart
router.get("/", authMiddleware, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user }).populate("items.itemId");
  res.json(cart || { items: [] });
});

// Add item to cart
router.post("/", authMiddleware, async (req, res) => {
  const { itemId } = req.body;
  let cart = await Cart.findOne({ userId: req.user });

  if (!cart) {
    cart = new Cart({ userId: req.user, items: [{ itemId, quantity: 1 }] });
  } else {
    const existingItem = cart.items.find(i => i.itemId.toString() === itemId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ itemId, quantity: 1 });
    }
  }

  await cart.save();
  res.json(cart);
});

// Remove item from cart
router.delete("/:itemId", authMiddleware, async (req, res) => {
  const { itemId } = req.params;
  let cart = await Cart.findOne({ userId: req.user });

  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);
  await cart.save();
  res.json(cart);
});

module.exports = router;
