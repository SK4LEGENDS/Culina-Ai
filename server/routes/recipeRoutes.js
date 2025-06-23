const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// GET all recipes or filter by nationality
router.get("/", async (req, res) => {
  try {
    const { nationality } = req.query;
    const filter = nationality && nationality !== "all" ? { nationality } : {};
    const recipes = await Recipe.find(filter);
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
