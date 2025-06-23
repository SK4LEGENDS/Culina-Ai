document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("user-input");
  const generateBtn = document.getElementById("generate-btn");
  const outputSection = document.getElementById("output-section");
  const output = document.getElementById("recipe-output");
  const historyList = document.getElementById("history-list");
  const downloadBtn = document.getElementById("download-btn");
  const statusMessage = document.getElementById("status-message");
  const recipeList = document.getElementById("recipe-list");
  const nationalitySelect = document.getElementById("nationality-select");

  // === Load & Render History ===
  function loadHistory() {
    const history = JSON.parse(localStorage.getItem("recipeHistory")) || [];
    historyList.innerHTML = "";
    history.forEach((recipe, index) => {
      const li = document.createElement("li");
      li.classList.add("history-item");
      li.textContent = recipe.title || `Recipe #${index + 1}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.title = "Delete this recipe";

      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        history.splice(index, 1);
        localStorage.setItem("recipeHistory", JSON.stringify(history));
        loadHistory();
      });

      li.addEventListener("click", () => {
        output.textContent = recipe.content;
        outputSection.classList.remove("hidden");
      });

      li.appendChild(deleteBtn);
      historyList.appendChild(li);
    });
  }

  function saveToHistory(prompt, content) {
    const history = JSON.parse(localStorage.getItem("recipeHistory")) || [];
    history.unshift({ title: prompt, content });
    localStorage.setItem("recipeHistory", JSON.stringify(history));
    loadHistory();
  }

  // === Generate Recipe with Gemini ===
  generateBtn.addEventListener("click", async () => {
    const userPrompt = input.value.trim();
    if (!userPrompt) {
      alert("Please enter ingredients or a dish name.");
      return;
    }

    const prompt = `You are a professional chef. Generate a detailed and authentic recipe for: "${userPrompt}". Do not ask questions. Just output the complete recipe with ingredients and preparation steps.`;

    if (statusMessage) statusMessage.classList.remove("hidden");
    outputSection.classList.add("hidden");

    try {
      const response = await fetch("http://localhost:3001/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.details || "Failed to generate recipe");

      const cleanedRecipe = data.recipe
        .replace(/^#+\s*/gm, "")
        .replace(/^\*+\s*/gm, "")
        .replace(/\*\*/g, "")
        .replace(/\*/g, "");

      output.textContent = cleanedRecipe;
      outputSection.classList.remove("hidden");
      saveToHistory(userPrompt, cleanedRecipe);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
      output.textContent = "An error occurred. Please try again.";
      outputSection.classList.remove("hidden");
    } finally {
      if (statusMessage) statusMessage.classList.add("hidden");
    }
  });

  // === Download Recipe ===
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const recipeText = output.textContent;
      const blob = new Blob([recipeText], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "recipe.txt";
      link.click();
    });
  }

  // === Fetch Recipes from MongoDB & Render ===
  async function fetchRecipes(nationality = "all") {
    try {
      const res = await fetch(
        `http://localhost:3001/api/recipes?nationality=${nationality}`
      );
      const data = await res.json();
      renderRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      recipeList.innerHTML = `<p>Failed to load recipes.</p>`;
    }
  }

  function renderRecipes(recipes) {
    recipeList.innerHTML = "";
    if (recipes.length === 0) {
      recipeList.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    recipes.forEach((recipe) => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <h4>${recipe.name}</h4>
        <p><strong>Nationality:</strong> ${recipe.nationality}</p>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <p><strong>Instructions:</strong> ${recipe.instructions}</p>
      `;
      recipeList.appendChild(card);
    });
  }

  if (nationalitySelect) {
    nationalitySelect.addEventListener("change", () => {
      const selected = nationalitySelect.value;
      fetchRecipes(selected);
    });
    fetchRecipes(); // Load all on initial page load
  }

  loadHistory();
});
