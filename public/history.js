function saveToHistory(prompt, recipe) {
  const history = JSON.parse(localStorage.getItem("culina-history") || "[]");
  history.unshift({ prompt, recipe });
  localStorage.setItem("culina-history", JSON.stringify(history.slice(0, 10))); // limit to 10 entries
}

function loadHistory() {
  const historyList = document.getElementById("history-list");
  const history = JSON.parse(localStorage.getItem("culina-history") || "[]");
  historyList.innerHTML = "";

  history.forEach((entry, index) => {
    const li = document.createElement("li");
    li.textContent = entry.prompt;
    li.addEventListener("click", () => {
      document.getElementById("recipe-output").textContent = entry.recipe;
      document.getElementById("output-section").classList.remove("hidden");
    });
    historyList.appendChild(li);
  });
}
