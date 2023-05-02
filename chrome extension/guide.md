# Guide to Creating a Chrome Extension
Chrome extension는 Google Chrome 브라우저의 기능을 더하는(?) 확장하는 소프트웨어 프로그램입니다. 

## 전제 조건
Chrome extension 프로그램을 만들기 전에 다음이 있는지 확인하세요.:

- Google Chrome browser 설치
- HTML, CSS, JavaScript와 같은 웹 기술에 대한 기본적인 이해
- extension 코드를 작성하기 위한 Visual Studio Code 또는 Sublime Text와 같은 텍스트 편집기(있으면 좋은것)
  
## Creating the Manifest File
Chrome extension을 만드는 첫 번째 단계는 manifest file을 만드는 것입니다. manifest file은 이름, 버전 번호, 설명 및 필요한 권한 목록과 같은 extension에 대한 중요한 정보가 포함된 JSON 파일입니다.

manifest file:

```json
{
  "manifest_version": 3,
  "name": "My Extension",
  "version": "1.0",
  "description": "A simple extension that adds a button to the browser.",
  "action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  },
  "permissions": [
    "activeTab"
  ]
}
```
**manifest_version**필드는 manifest의 버전을 나타내므로 현재 최신 버전인 3을 사용합니다.

**name** 및 **description** 필드는 Chrome 웹 스토어에 표시될 extension의 이름과 설명을 지정합니다.

**browser_action** 필드는 브라우저에서 extension 프로그램의 모양을 지정합니다. 이 예제에서는 extension의 기본 아이콘을 icon.png로 지정하고 사용자가 extension 아이콘을 클릭할 때 표시되는 기본 팝업을 **popup.html**로 지정합니다.

**권한** 필드에는 활성 탭에 대한 액세스와 같이 extension에 필요한 권한이 나열됩니다.

## 작성
manifest를 만들고 나면 작성을 시작할 수 있습니다. HTML, CSS 및 JavaScript로 작성할 수 있습니다.

### popup.html
**popup.html** 파일은 사용자가 extension 아이콘을 클릭할 때 표시되는 HTML 파일입니다. 다음은 간단한 **popup.html** 파일의 예입니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      button {
        height: 30px;
        width: 100px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <button id="myButton">Click Me</button>
    <script src="popup.js"></script>
  </body>
</html>
```
이 예에서는 HTML 파일에 버튼을 추가하고 **popup.js**라는 JavaScript 파일에 연결했습니다.

### popup.js
**popup.js** 파일은 extension에 대한 코드가 포함된 JavaScript 파일입니다. 다음은 간단한 **popup.js** 파일의 예입니다.

```javascript
document.getElementById("myButton").addEventListener("click", function() {
  alert("Button was clicked!");
});
```

이 예제에서는 ID가 **myButton**인 버튼에 클릭 이벤트 리스너를 추가했습니다. 버튼을 클릭하면 "Button was clicked!"라는 메시지와 함께 경고가 표시됩니다.

## Packaging and Installing the Extension

manifest 파일을 만들고 코드를 작성했으면 패키징하고 Chrome 브라우저에 설치할 수 있습니다.

패키징하려면 매니페스트 파일, HTML, CSS 및 JavaScript 파일을 포함하여 확장 파일의 ZIP 파일을 생성해야 합니다.

설치하려면 다음 단계를 따르세요.

1. Google Chrome을 열고 chrome://extensions/로 이동합니다.
2. "개발자 모드" 토글 스위치를 켭니다.
3. "Load unpacked" 버튼을 클릭합니다.
4. 생성한 ZIP 파일을 선택합니다.

이제 extension이 설치되어 Chrome 브라우저에 표시됩니다. 브라우저에서 extension 아이콘을 클릭하여 테스트할 수 있습니다.
