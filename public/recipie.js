// Sample recipe data
const recipes = [
  {
    title: "Tandoori Chicken",
    nationality: "Indian",
    meal: "dinner",
    dishType: "main",
    occasion: "festive",
    ingredients: ["Chicken", "Yogurt", "Spices", "Lemon Juice"],
    steps: ["Marinate chicken", "Grill until cooked", "Serve hot"],
  },
  {
    title: "Masala Chai",
    nationality: "Indian",
    meal: "breakfast",
    dishType: "beverage",
    occasion: "everyday",
    ingredients: ["Tea leaves", "Milk", "Spices", "Sugar"],
    steps: ["Boil water with spices", "Add tea and milk", "Strain and serve"],
  },
  {
    title: "Idli Sambar",
    nationality: "Indian",
    meal: "breakfast",
    dishType: "main",
    occasion: "everyday",
    ingredients: ["Rice", "Urad dal", "Vegetables", "Spices"],
    steps: ["Steam idlis", "Prepare sambar", "Serve together"],
  },
  {
    title: "Sushi Rolls",
    nationality: "Japanese",
    meal: "lunch",
    dishType: "main",
    occasion: "romantic",
    ingredients: ["Rice", "Nori", "Salmon", "Avocado"],
    steps: ["Prepare rice", "Add fillings", "Roll and slice"],
  },
  {
    title: "Miso Soup",
    nationality: "Japanese",
    meal: "lunch",
    dishType: "side",
    occasion: "everyday",
    ingredients: ["Miso paste", "Tofu", "Seaweed", "Green onions"],
    steps: ["Boil broth", "Add ingredients", "Simmer and serve"],
  },
  {
    title: "Sweet and Sour Chicken",
    nationality: "Chinese",
    meal: "dinner",
    dishType: "main",
    occasion: "everyday",
    ingredients: ["Chicken", "Pineapple", "Bell peppers", "Vinegar", "Sugar"],
    steps: ["Fry chicken", "Make sauce", "Mix and serve"],
  },
  {
    title: "Spring Rolls",
    nationality: "Chinese",
    meal: "snack",
    dishType: "side",
    occasion: "party",
    ingredients: ["Spring roll wrappers", "Vegetables", "Soy sauce"],
    steps: ["Prepare filling", "Wrap and fry", "Serve with sauce"],
  },
  {
    title: "Tacos",
    nationality: "Mexican",
    meal: "lunch",
    dishType: "main",
    occasion: "party",
    ingredients: ["Tortilla", "Beef", "Lettuce", "Cheese", "Salsa"],
    steps: ["Cook beef", "Assemble tacos", "Serve with salsa"],
  },
  {
    title: "Guacamole",
    nationality: "Mexican",
    meal: "snack",
    dishType: "side",
    occasion: "party",
    ingredients: ["Avocado", "Tomato", "Onion", "Lime", "Cilantro"],
    steps: ["Mash avocado", "Mix ingredients", "Serve fresh"],
  },
  {
    title: "Churros",
    nationality: "Mexican",
    meal: "dessert",
    dishType: "dessert",
    occasion: "festive",
    ingredients: ["Flour", "Sugar", "Cinnamon", "Oil"],
    steps: ["Make dough", "Fry and coat in sugar", "Serve with chocolate"],
  },
  {
    title: "French Toast",
    nationality: "French",
    meal: "breakfast",
    dishType: "main",
    occasion: "romantic",
    ingredients: ["Bread", "Eggs", "Milk", "Cinnamon", "Syrup"],
    steps: ["Dip bread", "Pan fry", "Top with syrup"],
  },
  {
    title: "Margarita",
    nationality: "Mexican",
    meal: "dinner",
    dishType: "beverage",
    occasion: "party",
    ingredients: ["Tequila", "Lime juice", "Triple sec", "Salt"],
    steps: ["Shake ingredients", "Serve in rimmed glass", "Garnish with lime"],
  },
  {
    title: "Mango Lassi",
    nationality: "Indian",
    meal: "lunch",
    dishType: "beverage",
    occasion: "everyday",
    ingredients: ["Mango", "Yogurt", "Sugar", "Cardamom"],
    steps: ["Blend ingredients", "Chill and serve"],
  },
  {
    title: "Green Tea",
    nationality: "Japanese",
    meal: "snack",
    dishType: "beverage",
    occasion: "everyday",
    ingredients: ["Green tea leaves", "Hot water"],
    steps: ["Steep leaves", "Strain and serve"],
  },
  {
    title: "Chocolate Brownies",
    nationality: "American",
    meal: "snack",
    dishType: "dessert",
    occasion: "party",
    ingredients: ["Chocolate", "Butter", "Flour", "Sugar", "Eggs"],
    steps: ["Mix batter", "Bake in oven", "Cool and cut"],
  },
];

// Function to create and append recipe cards
function displayRecipes(filteredRecipes) {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = ""; // Clear old results

  if (filteredRecipes.length === 0) {
    recipeList.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  filteredRecipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const title = document.createElement("h3");
    title.textContent = recipe.title;

    const nationality = document.createElement("p");
    nationality.innerHTML = `<strong>Nationality:</strong> ${recipe.nationality}`;

    const meal = document.createElement("p");
    meal.innerHTML = `<strong>Meal:</strong> ${recipe.meal}`;

    const dishType = document.createElement("p");
    dishType.innerHTML = `<strong>Dish Type:</strong> ${recipe.dishType}`;

    const occasion = document.createElement("p");
    occasion.innerHTML = `<strong>Occasion:</strong> ${recipe.occasion}`;

    const ingredients = document.createElement("p");
    ingredients.innerHTML = `<strong>Ingredients:</strong> ${recipe.ingredients.join(
      ", "
    )}`;

    const steps = document.createElement("p");
    steps.innerHTML = `<strong>Steps:</strong> ${recipe.steps.join(" ➜ ")}`;

    card.appendChild(title);
    card.appendChild(nationality);
    card.appendChild(meal);
    card.appendChild(dishType);
    card.appendChild(occasion);
    card.appendChild(ingredients);
    card.appendChild(steps);

    recipeList.appendChild(card);
  });
}

// Function to handle all filter changes
function handleFilterChange() {
  const nationality = document.getElementById("nationality-select").value;
  const meal = document.getElementById("meal-time-select").value;
  const dishType = document.getElementById("dish-type-select").value;
  const occasion = document.getElementById("occasion-select").value;

  const filtered = recipes.filter((recipe) => {
    return (
      (nationality === "all" || recipe.nationality === nationality) &&
      (meal === "all" || recipe.meal === meal) &&
      (dishType === "all" || recipe.dishType === dishType) &&
      (occasion === "all" || recipe.occasion === occasion)
    );
  });

  displayRecipes(filtered);
}

// Initialize display on load
document.addEventListener("DOMContentLoaded", () => {
  displayRecipes(recipes);

  // Attach listeners to all select filters
  document.querySelectorAll(".filters select").forEach((select) => {
    select.addEventListener("change", handleFilterChange);
  });
});
