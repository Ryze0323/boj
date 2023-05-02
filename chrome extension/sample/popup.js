// Get the fetch button element and add an event listener to it
let fetchButton = document.getElementById("fetch-button");
fetchButton.addEventListener("click", function() {
  chrome.runtime.sendMessage({ action: "fetchData" });
});