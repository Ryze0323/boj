# prototype

프로토타입 기반 객체지향 프로그래밍 언어는 클래스 없이(Class-less)도 객체를 생성할 수 있다.

자바스크립트의 모든 객체는 자신의 부모 역할을 담당하는 객체와 연결되어 있다. 그리고 이것은 마치 객체 지향의 상속 개념과 같이 부모 객체의 프로퍼티 또는 메소드를 상속받아 사용할 수 있게 한다. 이러한 부모 객체를 **Prototype(프로토타입) 객체** 또는 줄여서 Prototype(프로토타입)이라 한다.

Prototype 객체는 생성자 함수에 의해 생성된 각각의 객체에 공유 프로퍼티를 제공하기 위해 사용한다.

```js
var student = {
  name: 'Lee',
  score: 90
};

// student에는 hasOwnProperty 메소드가 없지만 아래 구문은 동작한다.
console.log(student.hasOwnProperty('name')); // true

console.dir(student);
```

[ECMAScript spec](https://tc39.github.io/ecma262/#sec-ordinary-and-exotic-objects-behaviours)에서는 **자바스크립트의 모든 객체는 [[Prototype]]이라는 인터널 슬롯(internal slot)를 가진다. [[Prototype]]의 값은 null 또는 객체이며 상속을 구현하는데 사용된다. [[Prototype]] 객체의 데이터 프로퍼티는 get 액세스를 위해 상속되어 자식 객체의 프로퍼티처럼 사용할 수 있다. 하지만 set 액세스는 허용되지 않는다.** 라고 되어있다.

student 객체는 __ __proto__ __ 프로퍼티로 자신의 부모 객체(프로토타입 객체)인 Object.prototype을 가리키고 있다.

```js
var student = {
  name: 'Lee',
  score: 90
}
console.log(student.__proto__ === Object.prototype); // true
```
객체를 생성할 때 프로토타입은 결정된다. 결정된 프로토타입 객체는 다른 임의의 객체로 변경할 수 있다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다. 이러한 특징을 활용하여 객체의 상속을 구현할 수 있다.

# Prototype chain
자바스크립트는 특정 객체의 프로퍼티나 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 [[Prototype]]이 가리키는 링크를 따라 자신의 부모 역할을 하는 프로토타입 객체의 프로퍼티나 메소드를 차례대로 검색한다. 이것을 프로토타입 체인이라 한다.

```js
var student = {
  name: 'Lee',
  score: 90
}

// Object.prototype.hasOwnProperty()
console.log(student.hasOwnProperty('name')); // true
```

student 객체는 hasOwnProperty 메소드를 가지고 있지 않으므로 에러가 발생하여야 하나 정상적으로 결과가 출력되었다. 이는 student 객체의 [[Prototype]]이 가리키는 링크를 따라가서 student 객체의 부모 역할을 하는 프로토타입 객체(Object.prototype)의 메소드 hasOwnProperty를 호출하였기 때문에 가능한 것이다.

```js
var student = {
  name: 'Lee',
  score: 90
}
console.dir(student);
console.log(student.hasOwnProperty('name')); // true
console.log(student.__proto__ === Object.prototype); // true
console.log(Object.prototype.hasOwnProperty('hasOwnProperty')); // true
```

# Prototype chain 예시
```js
function test() {}
test.prototype.name = "nametest"
var test2 = new test()
test2.name
```

위의 결과 test2.name의 경우 nametest이 출력됨을 알 수 있다.

이걸 이용해서 형태에 맞는 함수를 만들 수 있다

```js
console.log(Array)

var test3 = [2,3,4]
var test4 = new Array(2,3,4)

console.log(Array.prototype)
Array.prototype.arrayTestUtil = function() {
    return this[0] + this[1] + this[2]
}
test3.arrayTestUtil()
test4.arrayTestUtil()
```

sort가 와 이런 형태로 나오는지 알 수 있음 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort