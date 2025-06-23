require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3001;

// === Middleware ===
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// === Gemini AI Setup ===
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// === ROUTES ===

// ➤ Generate a recipe using Gemini
app.post("/generate-recipe", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();

    res.json({ recipe: text });
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    res.status(500).json({
      error: "Failed to generate recipe",
      details: error.message || "Unknown error",
    });
  }
});

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
