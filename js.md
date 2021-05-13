# JavaScript 정리

### var, let, const  
  변수 선언 방식으로 모두 hoisting 함  
  > hoisting: 선언을 맨위로 올려 먼저하는거  
 
  ```javascript
  console.log(test1)
  console.log(test2)
  console.log(test3)
  var test1 = 'var'
  let test2 = 'let'
  const test3 = 'const'
  ```
  > 스코프(scrope)  
 
  > 선언과 할당에 따른 선언방식의 차이점  
 
   표 | var | let | const |
  --- | --- | --- | --- |
  재선언 | O | X | X |
  재할당 | O | O | X |

  > but, Object나 Array의 경우 const 선언하더라도 값의 변경이 가능함  
   * 이유: 값을 보는게 아니라 주소를 바라보고 있기 때문에  
   
  ```javascript
    const arrayTest = [1,2,3,4]
    arrayTest[0] = 2
    console.log(arrayTest)
  ```
 
  * ##### 막기 위해 Object.freeze 사용해야함  
 
  ```javascript
    const arrayTest2 = [1,2,3,4]
    Object.freeze(arrayTest2)
    arrayTest2[0] = 2
    console.log(arrayTest2)
  ```

### 타입
  > Boolean  
 
   * Boolean(string)의 경우 문자열의 길이가 0보다 크면 true 아니면 false임  
   * Boolean은 !!로 사용 가능: Boolean(string) === !!string   
   ```javascript
      console.log(Boolean('')) //  false
      console.log(Boolean('23')) //  true
     
      console.log(!!'') //  false
      console.log(!!'23') //  true
     
   ``` 
  > number: javascript에서 사용하는 숫자 타입  
   * 매우 큰 수나 작은 수에 대한 사용 시 아래와 같이 처리 가능한 범위인지 확인 필요  
   ```javascript
      let numbertest = Number.MAX_SAFE_INTEGER
      Number.isSafeInteger(numbertest + numbertest) // 처리 가능한 범위 초과
      Number.isSafeInteger(numbertest - 10) //  처리 가능 범위 안  
   ``` 
   * 소수점 계산의 경우 부동소수점 문제에 의해 같은 같이지만 === false로 나오니 Number.EPSILON 이내면 같다고 보는게 맞음  
   ```javascript
      let n1 = 0.1
      let n2 = 0.2
      let n3 = 0.3
      console.log(n1 + n2 === n3) // 분명 값이 같으니 true가 반환되어야 하지만 false가 반환됨
      console.log(n3 - (n1 + n2) < Number.EPSILON) // 이렇게 사용하는 것을 추천
      console.log(Number.EPSILON) // 2.220446049250313e-16 이 값이 나옴
   ``` 
   
  > bigint 타입: number에서 안정적으로 처리 가능한 MAX_SAFE_INTEGER 또는 Min_SAFE_INTEGER 범위를 벗어나는 정수에 대해 처리하는 타입  
   * 할당시 뒤에 n을 붙히거나 BigInt()로 사용  
   ```javascript
      let biginttest = 1n
      typeof(biginttest)
   ```  
 
   * Math 내장 함수 사용 불가  
   ```javascript
      Math.pow(2,10) // 정상
      Math.pow(biginttest ,10) // 에러
   ```  
   
  > symbol 타입: 유일한 속성 이름을 만들 때 사용하는 타입  
   *  Oject.keys와 for in loop에서 기존 메소드 변경 없이 객체에 새로운 프로퍼티 추가를 위해 사용  
 
   ```javascript
      let obectTest = {}
      obectTest['1'] = 1
      obectTest['2'] = 2
      console.log(Object.keys(obectTest))
     
      let symboltest = Symbol('3') // 심볼 선언
      obectTest[symboltest] = 3
      console.log(obectTest)
      console.log(Object.keys(obectTest))  
   ```
 
   * Symbol.for 사용시 Symbol이 싱글톤처럼 작동함  
   ```javascript
    let symbolTest = Symbol('1')
    let symbolTest2 = Symbol('1')
    let symbolTest3 = Symbol.for('1')
    let symbolTest4 = Symbol.for('1')
   
    console.log(symbolTest === symbolTest2) // false
    console.log(symbolTest3 === symbolTest4) // true
    console.log(symbolTest === symbolTest3) // false
    console.log(symbolTest === symbolTest4) // false
   ```
  > undefined과 null  
   * undefined: 값 할당이 한번도 안됨  
   * null: 값 할당 되었으나 값이 null인 형태 
 
  > 타입 판단
   * typeof를 통해 타입을 판단함
   ```javascript
      console.log(typeof('1')) // String
      console.log(typeof(1)) // Number
      let objectTest = {}
      console.log(typeof(objectTest)) // Object
     
      let arrayTest = []
      console.log(typeof(arrayTest)) // Object
      console.log(typeof(new String('1'))) // Object
      console.log(typeof(null)) // Object
   ```
   * typeof로 판단시 위와 같이 object가 아니지만 object로 판단하는 경우가 많아 아래의 방법 사용 권장  
   ```javascript
      let objectTest = {}
      console.log(Object.prototype.toString.call(objectTest)) // [object Object]
     
      let arrayTest = []
      console.log(Object.prototype.toString.call(arrayTest)) // [object Array]
      console.log(Object.prototype.toString.call(new String('1'))) // [object String]
      console.log(Object.prototype.toString.call(null)) // [object Null]
   ```
 
  > deepCopy: 위의 타입판단을 통해 깊은 복사 구현  
 
  ```javascript
  let deepCopy = function (a) {
    let rst
    let isArray
    if (object.prototype.toString.call(a).indexOf('Array') > -1) {
        rst = []
        isArray = true
    }
    else if (object.prototype.toString.call(a).indexOf('Object') > -1) {
        rst = {}
        isArray = false
    } else {
        return a
    }
    for(let item in a) {
        let tmp
        if(object.prototype.toString.call(a[item]).indexOf('Array') > -1 ||
           object.prototype.toString.call(a[item]).indexOf('Object') > -1){
            tmp = deepCopy(a[item])
        } else {
            tmp = a[item]
        }
        if(isArray) {
            rst.push(tmp)
        } else {
            rst['' + item] = tmp
        }
    }
    return rst
   }
 ```


### 문법

 > 비구조화 문법(destructuring): 배열이나 객체의 값을 변수로 쉽게 꺼낼 수 있는 문법   
 
  * 장점: tmp 없이 변수의 값 교환이 용이함   
  ```javascript
     let a = 1   
     let b = 2   
     console.log({a})
     console.log({b})
     
     [a,b] = [b,a]   
     console.log({a})
     console.log({b})
  ```
 
  * 객체의 비구조화는 키를 중점으로 값을 가져옴 따라서 키가 없으면 undefined가 할당됨   
  * 객체 비구조화에서 undefined만 기본값이 할당되고 null은 할당되지 않음   

 > nullish coalessing : 기본값 할당 문법   
  ```javascript
    const name = person.name ?? 'unknown'   
    const name = person.name === null || person.name === undefined ? 'unknown' : person.name   
  ```
   * 단점: 0이나 ''의 경우 기본값이 있다고 판단함 -> 빈문자열이나 0을 값으로 인정하면 ?? 사용 아니면 || 사용   
   * 논리연산자와 사용시 ()로 묶어줘야함 (a || b) ?? 'dfdf' 이런식으로   

 > optional chaining   
  ```javascript
     const name = person?.name   
     const name = person === null || person === undefined ? undefined : person.name   
  ```
   * 위의 두 문법이 동일함   
   * 함수의 경우 실행전 => () 전에 ?. 추가시 해당 함수가 할당되었는지 판단가능   
   * nullish coalescing과 함께 쓰기 좋음 
   ```javascript  
     const name = person?.friends?.[0] ?? 'default name'   
   ```
 
 > shorthand property names(단축 속성명)   
  ```javascript
      // 사용 X   
      function makePerson1(age, name) {
        return {age:age, name: name};
      }
     
      // 사용 O
      function makePerson2(age, name) {
        return {age, name}
      }
  ex2) const name = 'mike', age = 21
       console.log({name, age})
  ```   
 
 > computed property names(계산된 속성명)
  ```javascript
      // 사용 X
      function makeObject1(key, value) {
        const obj = {}
        obj[key] = value
        return obj
      }
     
      // 사용 O
      function makeObject1(key, value) {
        return { [key]: value }
      }
   ```   
   
 > spread operator(전개 연산자): 배열이나 객체의 모든 속성을 풀어 놓을 때 사용하는 문법
  * 장점 기존의 배열이나 객체의 값을 변경 시키지 않고 깊은 복사(?, 1단계 복사)가 가능함
  ```javascript
       const arr = [1,2,3,4]
       const arr2 = [...arr]
       const arr3 = arr
       arr2.push(5)
       arr3.push(6)
       console.log(arr,arr2, arr3) = > [1,2,3,4,6], [1,2,3,4,5], [1,2,3,4,6] 
  ```
