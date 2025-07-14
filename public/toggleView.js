
const toggleButton = document.getElementById("toggleView");
const detailView = document.getElementById("detail-view");
const listView = document.getElementById("list-view");
const clearButton = document.getElementById("clearView");
// Set initial button text and view states

toggleButton.addEventListener("click", () => {
    const isDetailVisible = detailView.style.display === "block";
    detailView.style.display = isDetailVisible ? "none" : "block";
    listView.style.display = isDetailVisible ? "block" : "none";
    clearButton.style.display = isDetailVisible ? "none" : "block";
    toggleButton.style.display = isDetailVisible ? "block" : "none";
});
clearButton.addEventListener("click", () => {
    const isDetailVisible = detailView.style.display === "block";
    detailView.style.display = isDetailVisible ? "none" : "block";
    listView.style.display = isDetailVisible ? "block" : "none";
    clearButton.style.display = isDetailVisible ? "none" : "block";
    toggleButton.style.display = isDetailVisible ? "block" : "none";
});

window.addEventListener("DOMContentLoaded", () => {
  detailView.style.display = "block";
  listView.style.display = "none";
  clearButton.style.display = "block";
  toggleButton.style.display = "none";
});

