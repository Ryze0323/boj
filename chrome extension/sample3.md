# Tab Closing Timer

## Manifest File
```json
{
  "manifest_version": 3,
  "name": "Tab Closing Timer",
  "version": "1.0",
  "description": "An extension that closes inactive tabs after a set amount of time.",
  "permissions": [
    "tabs"
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

## background.js
```javascript
// Set the timer interval to 30 minutes
const timerInterval = 1000;

// An array to keep track of active tabs
let activeTabs = [];

// Check the status of tabs every minute
setInterval(function() {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      if (!activeTabs.includes(tab.id)) {
        // If the tab is not in the active tabs array, add it
        activeTabs.push(tab.id);
        // Set a timer to remove the tab from the active tabs array after the interval
        setTimeout(function() {
          let index = activeTabs.indexOf(tab.id);
          if (index > -1) {
            activeTabs.splice(index, 1);
          }
        }, timerInterval);
      }
    });
    // Close any tabs that are no longer in the active tabs array
    tabs.forEach(function(tab) {
      if (!activeTabs.includes(tab.id)) {
        chrome.tabs.remove(tab.id);
      }
    });
  });
}, 1000);
```
백그라운드 JavaScript 파일을 사용하여 일정 시간이 지나면 비활성 탭을 닫는 Chrome extension을 만드는 방법입니다. 타이머 간격을 원하는 값으로 조정할 수 있으며 extension은 활성 탭을 추적하여 간격보다 오랫동안 비활성 상태인 탭을 닫습니다.