# Custom Tabs Manager

## Manifest File
```json
{
  "manifest_version": 3,
  "name": "Custom Tabs Manager",
  "version": "1.0",
  "description": "An extension that helps you manage your tabs more efficiently.",
  "action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  },
  "permissions": [
    "tabs",
    "storage"
  ]
}
```

## popup.html
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: cornflowerblue;
        color: white;
      }
      button {
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        border-radius: 5px;
        background-color: cornflowerblue;
        color: white;
        cursor: pointer;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      }
    </style>
  </head>
  <body>
    <table id="tabsTable">
      <tr>
        <th>Tab Title</th>
        <th>Tab URL</th>
        <th>Actions</th>
      </tr>
    </table>
    <script src="popup.js"></script>
  </body>
</html>
```

## popup.js
```javascript
// Get the list of all tabs and display them in the table
chrome.tabs.query({}, function(tabs) {
  let tabsTable = document.getElementById("tabsTable");
  tabs.forEach(function(tab) {
    let row = tabsTable.insertRow();
    let titleCell = row.insertCell();
    titleCell.innerHTML = tab.title;
    let urlCell = row.insertCell();
    urlCell.innerHTML = tab.url;
    let actionCell = row.insertCell();
    let saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.addEventListener("click", function() {
      // Save the tab information to storage
      chrome.storage.sync.set({[tab.title]: tab.url});
      saveButton.innerHTML = "Saved";
      saveButton.setAttribute("disabled", true);
    });
    actionCell.appendChild(saveButton);
  });
});
```
위 예제는 현재 나와 있는 탭의 모든 url을 가져와서 chrome storage에 저장하는 예제 입니다.

## Chrome.storage
chrome storage는 조금 다른점을 제외하고는 localStrage API 와 거의 동일한 기능을 제공합니다.

- 사용자 데이터는 storage.sync 를 사용하여 Chrome 과 자동으로 동기화 가능합니다.
- 데이터는 객체로 저장할 수 있다. (localStorage API 는 데이터를 문자열로 저장한다.)
- 읽기 및 쓰기 작업을 비동기로 처리하여 빠르다.
- extension 콘텐츠 스크립트는 background page 없이도 사용자 데이터에 직접 접근할 수 있다.
- 시크릿 모드 incognito 사용중에도 user 의 extension settings 는 유지될 수 있다.
-  관리자가 'storage.managed' 로 설정한 데이터도 읽어올 수 있다.

### Manifest
storage 사용을 위해서 아래와 같이 manifest를 설정해야합니다.
```json
{
  "name": "My extension",
  ...
  "permissions": [
    "storage"
  ],
  ...
}
```
storage.sync 를 사용해서 아래와 같이 사용할 수 있다.
```javascript
chrome.storage.sync.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
```
storage.local 를 사용해서는 아래와 같이 사용할 수 있다.

```javascript
chrome.storage.local.set({key: value}, function() {
  console.log('Value is set to ' + value);
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});
```
### sync 와 local 차이

local은 기본적으로 최대 5MB 까지 저장 가능한데 manifest 파일의 'unlimitedStorage' 를 permission 에 추가해주면 용량 제한 없이 저장이 가능하다.

반면 sync 는 user가 login하는 어느 크롬에서도 데이터를 공유할 수 있지만 아래와 같은 제약 사항이 존재한다.

- 전체 용량제한 : 100KB
- 항목당 용량제한 : 8KB
- 항목 수 제한 : 최대 512개
- 1시간 당 set, remove, clear 사용 제한 : 1800회
- 1분 당 set, remove, clear 사용 제한 : 120회

아래처럼 데이터 변경 내용을 추적하려는 경우 변경 시 이벤트리스너를 추가할 수 있다. 스토리지에 변화가 있을 때마다 해당 이벤트가 발생한다.
```javascript
chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (var key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});
```