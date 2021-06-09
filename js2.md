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

#####  _.partition(collection, iterator)   

#####  _.forEach(collection, iterator)   

#####  _.forIn(object, iterator)   

#####  _.filter(collection, 콜백함수)

#####  _.reject(collection, 콜백함수)

#####  _.isEmpty(collection)   
