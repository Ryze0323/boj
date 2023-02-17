# Page Redirect

## Manifest File
```json
{
  "manifest_version": 3,
  "name": "Page Redirect",
  "version": "1.0",
  "description": "An extension that redirects users to a specific page.",
  "permissions": [
    "tabs"
  ],
  "action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"]
    }
  ]
}
```
## content.js
```javascript
// The URL to redirect to
const redirectUrl = "https://www.example.com/";
// send redirct url
if(window.location.href !== redirectUrl){
    chrome.runtime.sendMessage({type: "redirect"}, function(response) {
        console.log(response);
    });
}
```

## background.js
```javascript
// The URL to redirect to
const redirectUrl = "https://www.example.com/";

// Redirect the user to the specified URL

chrome.runtime.onMessage.addListener((request, sender, sendResponse )=> {
    if (request.type == "redirect"){
        chrome.tabs.query({active: true,currentWindow: true}, (tabs) => {
                chrome.tabs.update(tabs[0].id, { url: redirectUrl });
        })
        sendResponse('')
    }
});
```
content script과 background를 사용하여 사용자를 특정 URL로 리디렉션하는 Chrome extension 입니다. Chrome extension은 chrome.tabs API를 사용하여 탭을 업데이트하고 사용자를 지정된 URL로 이동합니다. manifest에서 일치 필드를 설정하면 content script가 삽입될 페이지를 제어하여 특정 사이트 또는 페이지 유형을 대상으로 지정할 수 있습니다.

## sendMessge And OnMessage

chrome.runtime.sendMessage 함수는 한 부분에서 다른 부분으로 메시지를 보내는 데 사용됩니다. 이 함수는 JSON 메시지 object와 다른 부분의 응답을 처리하기 위한 콜백을 받습니다. 다음은 함수의 간단한 사용법입니다

```javascript
chrome.runtime.sendMessage({message: "hi"}, (response) => {
  console.log(response.message);
});

// tab에 sendMessage 전송시
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, function(response) {});  
});
```
chrome.runtime.onMessage 함수는 수신 측에서 chrome.runtime.sendMessage 함수가 보낸 메시지에 대한 리스너를 등록하는 데 사용됩니다. 이 함수는 메시지가 도착하면 실행할 콜백 함수를 받습니다. 이 콜백은 3개의 인수를 얻습니다.

- request — 요청에 대한 세부 정보입니다.
- sender — 요청을 sender입니다.
- sendResponse — sender에게 응답을 다시 보낼 수 있도록 하는 response 기능입니다.

간단한 onMessage 예제입니다.

```javascript
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
  if (request.message === "hi")
    sendResponse({message: "hi to you"});
});
```