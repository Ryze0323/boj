# javascript 정리   
 
### lodash   
 js 유틸 라이브러리   
 
#####  _.head( array )   
배열의 첫번째 요소를 리턴

```javascript
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

```javascript
  let arrayTest = [1, 2, 3];
  console.log(_.last(arrayTest));
  // 첫요소인 3 리턴
```

#####  _.assign( obj, obj... )   
 오브젝트를 병합하는 함수

```javascript
  console.log(_.assign({}, { a: 'a' }, { a: 'bb' }));
```

 > 비슷하지만 다른 함수들   
 - merge   
 - dafaults   
 - defaultsDeep   


```javascript
  console.log(_.assign({}, { a: 'a' }, { a: 'bb' }));
  console.log(_.merge({}, { a: 'a' }, { a: 'bb' }));
  console.log(_.defaults({}, { a: 'a' }, { a: 'bb' }));
  console.log(_.defaultsDeep({}, { a: 'a' }, { a: 'bb' }));
  // { a: 'bb' }
  // { a: 'bb' }
  // { a: 'a' }
  // { a: 'a' }
```
