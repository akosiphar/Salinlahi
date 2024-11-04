function openTab(event, tabId) {
  // Hide all tab contents
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => (content.style.display = "none"));

  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((button) => button.classList.remove("active"));

  // Show the selected tab content and set the active button
  document.getElementById(tabId).style.display = "block";
  event.currentTarget.classList.add("active");
}
