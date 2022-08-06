# 커링

## 커링이란?
여러 개의 인자를 가지는 함수를 단일 인자로 갖는 함수들의 계층구조로 바꾸는 것.

ex) 3 + 4 일 경우 3과 4를 받아야함. 이걸 단일 인자로 받는 것

쉽게 말해, 단일 인자를 받는 함수들을 쭉~~ 연결 시킨 구조 --> 많아 지면 메모리 문제가 발생 할 수 있으므로 장/단점 고려!

또한 함수가 연결 되어 진다면 콜백 지옥과 같은 경험도 할 수 있다.

### 값은 언제 반환?
함수가 필요로 하는 인자의 갯수 만큼 충족되지 않았다면 계속 함수를 반환.

만약, 함수가 필요로 하는 인자의 갯수를 모두 충족 했다면 --> 최종적인 값을 반환함.

```javascript
// 인자 2개 받는 기존 함수 
function sum1(x, y) {
    return x + y;
}
console.log(sum1(3, 4));
```

위의 함수를 커링 함수로 변경

```javascript
// 단인 인자만 받아 처리하는 커링 함수
function sum(x) {
    return function (y) {
        return x + y;
    }
}
const sum2 = sum(3)
console.log(sum2(4));
console.log(sum(3)(4));
```

## 또 다른 커링 예시

커링 변환을 하는 curry(f) 함수 (일반함수 ver)
```javascript
// 일반 함수 커링 버전
function curry(f) {
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// 커링 변환을 하는 curry(f) 함수 (화살표함수 ver)
const curry = f => a => b => f(a, b);

// f에 전달된 함수
const sum = (a, b) => a + b;

const curriedSum = curry(sum);

console.log(curriedSum(1)(2)); // 3
```

위 함수는 다음의 순서로 동작 됩니다.

curry(func)의 반환 값은 function(a) 형태입니다.
curriedSum(1) 과 같은 함수가 호출되었을 때, 1은 렉시컬 환경에 저장이 되고 function(b)가 반환됩니다.
반환된 function(b) 함수가 2를 인수로 호출됩니다. 반환 값이 원래의 sum으로 넘겨져서 호출됩니다.
최종적으로 sum(1, 2) 가 호출되어 1 + 2인 3이 반환됩니다.

## lodash를 통한 커링
lodash를 사용하면 좀 더 간단하게 커링을 구현할 수 있습니다.
```javascript
const _ = require('lodash');

const sum = (a, b) => a + b;

const curriedSum = _.curry(sum);

console.log(curriedSum(1)(2));
```
> lodash 라이브러리를 사용하여 curry함수를 사용자가 직접 정의할 필요 없이, _.curry를 사용하여 함수를 인수로 전달하여 curriedSum을 정의하였습니다.

## 객체 데이터를 가져오는 커링

*커링을 사용하지 않은 경우*
``` javascript
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

const getTodosIdArr = todos => todos.map(todo => todo.id);
const getTodosContentArr = todos => todos.map(todo => todo.content);
const getTodosCompletedArr = todos => todos.map(todo => todo.completed);

console.log(getTodosIdArr(todos)); // [ 3, 2, 1 ]
console.log(getTodosContentArr(todos)); // [ 'HTML', 'CSS', 'Javascript' ]
console.log(getTodosCompletedArr(todos)); // [ false, true, false ]
``` 

일반적인 경우 코드를 작성하면 위와 같이 작성하게 됩니다. 여기에 커링을 적용하면 아래와 같이 코드를 작성할 수 있습니다.

커링 사용 후

``` javascript
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

const get = property => object => object[property];

const getId = get('id');
const getContent = get('content');
const getCompleted = get('completed');

const getTodosIdArr = todos => todos.map(getId);
const getTodosContentArr = todos => todos.map(getContent);
const getTodosCompletedArr = todos => todos.map(getCompleted);

console.log(getTodosIdArr(todos)); // [ 3, 2, 1 ]
console.log(getTodosContentArr(todos)); // [ 'HTML', 'CSS', 'Javascript' ]
console.log(getTodosCompletedArr(todos)); // [ false, true, false ]
``` 

``` javascript
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

const getArray = array => property => array.map(object => object[property]);

const todosGetArray = getArray(todos);

const getTodosIdArr = todosGetArray('id');
const getTodosContentArr = todosGetArray('content');
const getTodosCompletedArr = todosGetArray('completed');

console.log(getTodosIdArr); // [ 3, 2, 1 ]
console.log(getTodosContentArr); // [ 'HTML', 'CSS', 'Javascript' ]
console.log(getTodosCompletedArr); // [ false, true, false ]
``` 
> 커링을 사용하는 경우 인자의 순서는 중요한데, 앞에 존재하는 인자일 수록 변동가능성이 적고 뒤에 있는 인자일 수록 변동가능성이 높기 때문에 이 순서를 고려하여 코드를 설계하는 것이 중요하다고 합니다.

## 커링의 활용
링의 이점을 이해하기 위해 하나의 사례를 가정하였습니다.

정보를 형식화하고 출력하는 로그함수가 있다고 가정하고, 실제 프로젝트에서 이러한 함수는 네트워크를 통해 로그를 보내는 것과 같은 많은 유용한 기능을 제공한다고 합니다.

``` javascript
function log(date, importance, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] ${date} [${importance}] ${message}`);
}
```
이곳에 lodash를 이용한 커링을 적용하여 아래와 같이 만들었습니다.

``` javascript
const {curry} = require('lodash');

function log(date, importance, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] ${date} [${importance}] ${message}`);
}

log = curry(log);

log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
```
이 경우 둘다 정상적으로 작동이 됩니다.

이 이후 아래처럼 현재 시간으로 로그를 출력하는데 편리하도록 log함수를 작성해서 사용할 수 있습니다
``` javascript
const {curry} = require('lodash');

function log(date, importance, message) {
    console.log(`[${date.getHours()}:${date.getMinutes()}] ${date} [${importance}] ${message}`);
}
log = curry(log);

// logNow는 log의 첫 번째 인수가 고정된 partial
const logNow = log(new Date());

logNow("INFO", "message"); // [HH:mm] INFO message

const debugNow = logNow("DEBUG");

debugNow("message"); // [HH:mm] DEBUG message
```
최종적으로 커링한 후에 잃은 것은 없으며, log는 아직 보통때처럼 호출할 수 있습니다. 더하여 partial함수를 쉽게 작성하여 고정 값들은 고정시켜 원하는 값만 도출되게하여 디버깅하는데 편리하게 해줍니다.