# Fetch Example Extension

## Manifest File
```json
{
  "manifest_version": 3,
  "name": "Fetch Example Extension",
  "version": "1.0",
  "description": "An extension that fetches data from an API.",
  "permissions": [
    "storage",
    "webRequest",
    "tabs"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }]
}
```

## background.js
```javascript
// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "fetchData") {
    let url = "https://jsonplaceholder.typicode.com/posts/1";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Send the data to the content script
        chrome.tabs.query({}, function(tabs) {
          for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, { action: "displayData", data: data });
          }
        });
      })
      .catch(error => console.error(error));
  }
});
```

## popup.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Fetch Example Extension</title>
  </head>
  <body>
    <button id="fetch-button">Fetch Data</button>
  </body>
  <script src="popup.js"></script>
</html>
```

## popup.js
```javascript
// Get the fetch button element and add an event listener to it
let fetchButton = document.getElementById("fetch-button");
fetchButton.addEventListener("click", function() {
  chrome.runtime.sendMessage({ action: "fetchData" });
});
```

## content.js
```javascript
// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "displayData") {
      let data = request.data;
      // Display the data on the page
      alert(JSON.stringify(data));
    }
  });
```