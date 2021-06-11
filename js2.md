# javascript 정리   
 
### lodash   
 js 유틸 라이브러리   

#####  _.head( array )   
배열의 첫번째 요소를 리턴

```javaScript
  let arrayTest = [1, 2, 3];
  console.log(_.head(arrayTest));
  // 첫요소인 1 리턴
  let objectTest = {
    test: '1',
    test2: '2',
    test3: '3'
  }
  console.log(_.head(objectTest));
  // undefined 출력
```

#####  _.last( array )   
배열의 마지막 요소를 리턴

```javaScript
  let arrayTest = [1, 2, 3];
  console.log(_.last(arrayTest));
  // 마지막 요소인 3 리턴
```

#####  _.assign( obj, obj... )   
 오브젝트를 병합하는 함수

```javaScript
  console.log(_.assign({}, { a: 'a' }, { a: 'bb' }));
```

 > 비슷하지만 다른 함수들   
 - merge   
 - dafaults   
 - defaultsDeep   


```javaScript
  console.log(_.assign({}, { a: 'a' }, { a: 'bb' }));
  console.log(_.merge({}, { a: 'a' }, { a: 'bb' }));
  console.log(_.defaults({}, { a: 'a' }, { a: 'bb' }));
  console.log(_.defaultsDeep({}, { a: 'a' }, { a: 'bb' }));
  console.log("------------------------------------------")
```
<details>
  <summary>답</summary>
  <div markdown="1">   
  
```javaScript
// => { a: 'bb' }  값을 덮어씀 O
// => { a: 'bb' } 값을 덮어씀 O
// => { a: 'a' } 값을 덮어씀 X
// => { a: 'a' } 값을 덮어씀 X
```
  </div>
</details>

```javaScript
  console.log(_.assign({}, { a: 'a'  }, { a: undefined }))
  console.log(_.merge({}, { a: 'a'  }, { a: undefined }))
  console.log(_.defaults({}, { a: undefined }, { a: 'bb' }))
  console.log(_.defaultsDeep({}, { a: undefined }, { a: 'bb' }))
```
<details>
  <summary>답</summary>
  <div markdown="1">   
  
```javaScript
  // => { a: undefined } undefined 값도 덮어씀
  // => { a: "a" } undefined 값은 덮어쓰지 않음
  // => { a: "bb" } undefined 면 값을 덮어씀
  // => { a: "bb" } undefined 면 값을 덮어씀
```
  </div>
</details>

```javaScript
  console.log(_.assign({}, { a: 'a'  }, { a: null }))
  console.log(_.merge({}, { a: 'a'  }, { a: null }))
  console.log(_.defaults({}, { a: null }, { a: 'bb' }))
  console.log(_.defaultsDeep({}, { a: null }, { a: 'bb' }))
```

<details>
  <summary>답</summary>
  <div markdown="1">   
  
```javaScript
  // 모두 null을 값이 있다고 판단
  // => { a: null } 
  // => { a: null }
  // => { a: null }
  // => { a: null }
```
  </div>
</details>

```javaScript 
  console.log(_.assign({}, {a:{a:'a'}}, {a:{b:'bb'}}))
  console.log(_.merge({}, {a:{a:'a'}}, {a:{b:'bb'}}))
  console.log(_.defaults({}, {a:{a:'a'}}, {a:{b:'bb'}}))
  console.log(_.defaultsDeep({}, {a:{a:'a'}}, {a:{b:'bb'}}))
```   

<details>
  <summary>답</summary>
  <div markdown="1">   
  
```javaScript
  // => { "a": { "b": "bb" }} 자식요소까지 병합 수행 X
  // => { "a": { "a": "a", "b": "bb" }} 자식요소까지 병합 수행 O
  // => { "a": { "a": "a" }} 자식요소까지 병합 수행 O
  // => { "a": { "a": "a", "b": "bb" }} 자식요소까지 병합 수행 X
```
  </div>
</details>  

#####  _.get(object, path)   
 path의 object에서 값을 가져옴

```javaScript
console.log(_.get(object, 'a'));
console.log(_.get(object, 'b'));
console.log(_.get(object, 'a[0].b'));
console.log(_.get(object, 'a[0].b.c'));
```
<details>
  <summary>답</summary>
  <div markdown="1">   
  
```javaScript
[ { b: { c: 3 } } ]
undefined
{ c: 3 }
3
```
  </div>
</details>  

##### _.uniq( 배열 )
 해당 배열의 중복 값을 제거한 값만 가져옴

```javaScript
_.uniq([1, 1, 3]);
```

#####  _.map(collection, iterator)   
 iterator를 통해 collection 각 요소들을 뽑아 array 반환

```javaScript
function square(n) {
 return n * n;
}
   
console.log(_.map([4, 8], square))
console.log(_.map({ 'a': 4, 'b': 8 }, square));
console.log(_.map({ 'b': 4, 'a': 8, 'c': 'dd' }, square));

var users = [
 { 'user': 'barney' },
 { 'user': 'fred' },
 { 'notuser': 'fred' }
];

console.log(_.map(users, 'user'));
console.log(_.map(['1', '2'], 'user'));
```

<details>
  <summary>답</summary>
  <div markdown="1">   
  
```javaScript
  [ 16, 64 ]
  [ 16, 64 ]
  [ 16, 64, NaN ]
  [ 'barney', 'fred', undefined ]
  [ undefined, undefined ]
```
  </div>
</details>  

#####  _.forEach(collection, iterator)   
 for과 비슷한 형태로 첫 파라미터가 value, 두번째 파라미터가 key임
 
```javaScript
  _.forEach([1, 2], function(value, key) {
    console.log({value});
    console.log({key});
  });
  
  _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
    console.log({value});
    console.log({key});
  });
```

#####  _.filter(collection, 콜백함수)
 배열 안에 요소들 중, 특정 값만 filter하고 싶을때

```javaScript
  var users = [
    { 'user': '1', 'age': 36, 'active': true },
    { 'user': '2',  'age': 40, 'active': false }
  ];
  
  console.log(_.filter(users, function(o) { return !o.active; }));
  console.log(_.filter(users, { 'age': 36, 'active': true }));
  console.log(_.filter(users, ['active', false]));
  console.log( _.filter(users, 'active'));
```

#####  _.isEmpty(collection)   
 해당 필드가 비어있는지 여부를 리턴. 비어있으면 true, 아니면 false   

```javaScript
let testString = "12";
let testString1 = "";
let testString2 = " ";

let testNumber = 1;
let testNumber1 = 0;

let testUndefined;
let testNull = null;

let testObject = {};
let testObject1 = {'test': 1};

let testArray = [];
let testArray1 = ['1'];

let testBoolean = false;
let testBoolean1 = true;

console.log(_.isEmpty(testString));
console.log(_.isEmpty(testString1));
console.log(_.isEmpty(testString2));
console.log();
console.log(_.isEmpty(testNumber));
console.log(_.isEmpty(testNumber1));
console.log();
console.log(_.isEmpty(testUndefined));
console.log(_.isEmpty(testNull));
console.log();
console.log(_.isEmpty(testObject));
console.log(_.isEmpty(testObject1));
console.log();
console.log(_.isEmpty(testArray));
console.log(_.isEmpty(testArray1));
console.log();
console.log(_.isEmpty(testBoolean));
console.log(_.isEmpty(testBoolean1));
```

### ES6 문법 정리   
 다양한 웹 브라우저에서 자바스크립트가 공통되게 잘 작동하기 위해서 표준규격
 
##### Arrows Function
 문법을 사용하는 축약형 함수
 
 * 매개변수 지정 방법   
 
 ```
 () => { ... } // 매개변수가 없을 경우
 x => { ... } // 매개변수가 한 개인 경우, 소괄호를 생략할 수 있다.
(x, y) => { ... } // 매개변수가 여러 개인 경우, 소괄호를 생략할 수 없다.
 ```
 
 * 함수 몸체 지정 방법   
 위와 아래가 같은 형태를 지님

 ```
x => { return x * x } 
x => x * x             // 위와 같은 형태로 한줄의 구문이라면 중괄호를 생략 가능

() => { return { a: 1 }; }
() => ({ a: 1 }) // 위와 같은 형태로 객체 반환시 소괄호를 사용함
 ```
 
 * this   
  일반 함수와 매우 큰 차이점을 지님
  
   * 일반함수: 함수를 호출할 때 함수가 어떻게 호출되었는지에 따라 this에 바인딩할 객체가 동적으로 결정됨   
   * arrow function: 언제나 상위 스코프의 this를 가리킴. 이걸 Lexical this라 부름   
   * 예시(일반함수)   
   
   ```javascript
    function Prefixer(prefix) {
        this.prefix = prefix;
    }
      
    Prefixer.prototype.prefixArray = function (arr) {
        console.log('A');
        console.log(this); // this는 생성자 함수 Prefixer가 생성한 객체, 즉 생성자 함수의 인스턴스(pre)
        console.log('A');
        return arr.map(function (x) {
            console.log('B');
            console.log(this); // 전역 객체 window
            console.log('B');
            return this.prefix + ' ' + x;
        });
    };
      
    var pre = new Prefixer('Hi');
    console.log(pre.prefixArray(['Lee', 'Kim']));
   
   ```
   * 콜백함수의 내부 this를 생성자 함수 인스턴스로 가르키는 방법 3가지
   
   ```javascript
    function Prefixer(prefix) {
        this.prefix = prefix;
    }
    // 1. 다른 변수를 만들어 this를 매핑한다
    Prefixer.prototype.prefixArray = function (arr) {
      var that = this;  // this: Prefixer 생성자 함수의 인스턴스
      console.log('A');
      console.log(this);
      console.log('A');
      return arr.map(function (x) {
          console.log('B');
          console.log(that);
          console.log('B');
          return that.prefix + ' ' + x;
      });
    };
    
    // this를 넘긴다?
    Prefixer.prototype.prefixArray = function (arr) {
        console.log('A');
        console.log(this);
        console.log('A');
        return arr.map(function (x) {
            console.log('B');
            console.log(this);
            console.log('B');
            return this.prefix + ' ' + x;
        }, this); // this: Prefixer 생성자 함수의 인스턴스
    };
    
    // bind 함수를 이용하여 this를 바인드 한다
    Prefixer.prototype.prefixArray = function (arr) {
        console.log('A');
        console.log(this);
        console.log('A');
        return arr.map(function (x) {
            console.log('B');
            console.log(this);
            console.log('B');
            return this.prefix + ' ' + x;
        }.bind(this)); // this: Prefixer 생성자 함수의 인스턴스
    };
      
    var pre = new Prefixer('Hi');
    console.log(pre.prefixArray(['Lee', 'Kim']));
   
   ```
   
   * 예시(arrow fuction)   
   
   ```javascript
   function Prefixer(prefix) {
      this.prefix = prefix;
   }
      
   Prefixer.prototype.prefixArray = function (arr) {
      console.log('A');
      console.log(this);
      console.log('A');
      return arr.map(x => {
          console.log('B')
          console.log(this)
          console.log('B')
      return `${this.prefix}  ${x}`});
    };
      
    const pre = new Prefixer('Hi');
    console.log(pre.prefixArray(['Lee', 'Kim']));
   ```   
  
   * 주의: arrow Function의 경우 call, apply, bind를 통해 this를 변경 불가
