# Highlight Text

## Manifest File
```json
{
  "manifest_version": 3,
  "name": "Highlight Text",
  "version": "1.0",
  "description": "An extension that highlights text on the page.",
  "permissions": [
    "activeTab",
    "storage"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icon.png"
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

## content.js
```javascript
const setColor = ()=> {
    // Get the saved color from storage
    chrome.storage.sync.get("color", function(data) {
      // Highlight all text on the page with the saved color
      let elements = document.getElementsByTagName("p");
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = data.color;
      }
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse )=> {
    if (request.action == "update"){
        setColor()
        sendResponse('')
    }
});

setColor()
```
## popup.html
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      select {
        width: 100%;
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 16px;
        font-size: 18px;
        font-family: Arial, sans-serif;
      }
      button {
        width: 100%;
        padding: 12px;
        border-radius: 4px;
        margin-bottom: 16px;
        background-color: #4CAF50;
        color: white;
        font-size: 18px;
        font-family: Arial, sans-serif;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <select id="color-select">
      <option value="yellow">Yellow</option>
      <option value="pink">Pink</option>
      <option value="cyan">Cyan</option>
    </select>
    <button id="save-button">Save</button>
    <script src="popup.js"></script>
  </body>
</html>
```

## popup.js
```javascript
// Get the color select element and save button
let colorSelect = document.getElementById("color-select");
let saveButton = document.getElementById("save-button");

// Save the selected color when the save button is clicked
saveButton.addEventListener("click", function() {
  let selectedColor = colorSelect.options[colorSelect.selectedIndex].value;
  chrome.storage.sync.set({ color: selectedColor }, function() {
    // Send a message to the background script to update the content script
    chrome.runtime.sendMessage({ action: "update" });
  });
});
```

## background.js
```javascript
// Listen for messages from the popup script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "update") {
    // Notify all content scripts to update the text highlighting
    chrome.tabs.query({}, function(tabs) {
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, { action: "update" });
      }
    });
  }
});
```

이 설정으로 사용자는 팝업에서 강조 색상을 선택할 수 있으며 `chrome.storage.sync` API를 사용하여 저장됩니다. content-script는 저장된 색상을 검색하여 페이지의 모든 `<p>` 요소를 강조 표시하는 데 사용합니다. 사용자가 팝업에서 저장 버튼을 클릭하면 백그라운드 스크립트가 메시지를 수신하고 모든 콘텐츠 스크립트에 메시지를 보내 강조 표시를 업데이트합니다.