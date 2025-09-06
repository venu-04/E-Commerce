const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      quantity: { type: Number, default: 1 },
    }
  ],
});

module.exports = mongoose.model("Cart", cartSchema);
