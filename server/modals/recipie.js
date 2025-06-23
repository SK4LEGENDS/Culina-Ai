const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  name: String,
  nationality: String,
  ingredients: [String],
  instructions: String,
  image: String, // optional
});

module.exports = mongoose.model("Recipe", RecipeSchema);
