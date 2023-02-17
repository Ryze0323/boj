# 현재 시간과 날짜를 보여주는 extension

## Manifest File
```json
{
  "manifest_version": 3,
  "name": "Time and Date Display",
  "version": "1.0",
  "description": "An extension that displays the current time and date.",
  "action": {
    "default_icon": "icon.png",
    "default_popup": "popup.html"
  }
}
```

## popup.html
```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      h1 {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1 id="timeDisplay"></h1>
    <script src="popup.js"></script>
  </body>
</html>
```

## popup.js
```javascript
function updateTimeDisplay() {
  let date = new Date();
  let time = date.toLocaleTimeString();
  document.getElementById("timeDisplay").innerText = time;
}

setInterval(updateTimeDisplay, 1000);
```

이 예에서는 시간을 표시하기 위해 HTML 파일에 **h1** 요소를 추가했습니다. JavaScript 파일에서 Date 객체와 **toLocaleTimeString** 메서드를 사용하여 **h1** 요소에 표시되는 시간을 업데이트하는 **updateTimeDisplay** 함수를 정의했습니다. 그런 다음 표시되는 시간이 항상 최신 상태인지 확인하기 위해 **setInterval** 함수를 사용하여 매초마다 함수가 호출됩니다.

별도의 애플리케이션이나 웹 사이트를 열지 않고도 쉽고 빠르게 현재 시간과 날짜를 확인할 수 있는 extension 예시 입니다.