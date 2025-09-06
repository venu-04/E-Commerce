const express = require("express");
const Item = require("../models/Item");

const router = express.Router();

// ✅ Get all items with filters
router.get("/", async (req, res) => {
  const { category, min, max } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (min || max) filter.price = {};
  if (min) filter.price.$gte = Number(min);
  if (max) filter.price.$lte = Number(max);

  try {
    const items = await Item.find(filter);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Error fetching items", error: err.message });
  }
});

// ✅ Create new item
router.post("/", async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "Error creating item", error: err.message });
  }
});

// ✅ Update item
router.put("/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: "Error updating item", error: err.message });
  }
});

// ✅ Delete item
router.delete("/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item", error: err.message });
  }
});

module.exports = router;
