# require는 어떻게 동작할까?
대부분 자주 사용하는 코드를 모듈 형식으로 만들어 **module.exports**를 사용해서 객체 인스턴스를 내보내고 이를 다른 파일에서 **require**를 통해서 사용하게 되는데 대부분 여러 파일에서 모듈을 require해 사용하게 됩니다.

이런 require 메서드는 다음과 같은 모양새를 구성하고 있습니다.
```javascript
var require = function(src){                 //line 1
    var fileAsStr = readFile(src)            //line 2
    var module.exports = {}                  //line 3
    eval(fileAsStr)                          //line 4
    return module.exports                    //line 5
}
```
이렇게만 보면 이해하기 힘드니 간단한 예시와 함께 설명 드리겠습니다.

```javascript
// foo.js
const a = 10
exports.a = a;
```
```javascript
// index.js

const foo = require('./foo.js')
console.log(foo.a);
```

이런 소스가 있다고 가정해보겠습니다.

먼저 line 1에서는 src의 인자를 받아옵니다. 즉,

```javascript
const foo = require('foo')
```

와 같은 경우 'foo'를 인자로 받아오는 식입니다.

line 2에서는 소스 파일을 읽어서 fileAsStr에 저장합니다.

line 3에서는 module.exports 라는 빈 해시를 만들어 둡니다.

line 4에서는 fileAsStr을 eval 합니다.

line 4에 대해 조금 더 설명하면
```javascript
const foo = require('./foo.js')
```
를 한다는 것은, 곧 require()의 인자로 "./foo.js"를 넣는 식이고 위 require()의 line 4는
```javascript
eval(fileAsStr)
```
다음과 같이 변경되는 것과 마찬가지 입니다.
```javascript
var require = function(src){
	var fileAsStr = readFild(src)
	var module.exports = {}
	**const a = 10
	exports.a = a;**
	return module.exports
}
```
결국 exports 해시의 a라는 key에 10이 들어가는 모습입니다.

따라서, 아래 코드는
```javascript
// bar.js

const foo = require('./foo.js')
console.log(foo.a);
```
Runtime에는 아래와 같은 모습입니다.
```javascript
const foo = { a:10 }
console.log(foo.a)
```
foo 에서 exports에 들어간 <key, value> 들이 require() 함수의 아웃풋으로 나오는 것입니다.

# require 파일 찾는 원리

입력한 이름으로 파일을 못 찾으면 Node는 그 이름에 .js, .json, .node를 붙이고 해당 파일이 있는지 찾는다.

.js 파일은 JavaScript 텍스트 파일로 Interpret하고 .json은 JSON 텍스트 파일로 Interpret한다.

모듈을 절대 경로로 찾을 때는 모듈 이름을 '/'로 시작하면 된다. 예를 들어, require('home/marco/foo.js')는 /home/marco/foo.js 파일을 로드한다.

모듈을 상대 경로로 찾으려면 모듈 이름이 './'로 시작하면 된다. 즉, foo.js라는 파일에서 require('./circle')라고 호출하면 같은 디렉토리에 있는 circle.js를 로드한다.

'/'이나 './'로 시작하지 않으면 그냥 파일이 아니라 "코어 모듈"이나 node_modules 폴더에 있는 모듈을 찾는다.

주어진 경로가 존재하지 않으면 require()는 code 프로퍼티를 'MODULE_NOT_FOUND'로 설정해서 Error를 던질 것이다.

## Loading from node_modules Folders

require()에 넘어온 모듈 ID가 네이티브 모듈을 가리키는 것도 아니고, 그 모듈 ID가 '/', './', '../'로 시작하지도 않으면 Node는 그 모듈의 상위 디렉토리에서 찾기 시작한다. 상위 디렉토리에 있는 /node_modules에서 해당 모듈을 찾는다.

만약 못 찾으면 상위상위 디렉토리에서 찾고, 그래도 못 찾으면 상위상위상위 디렉토리에서 찾는다. 루트 디렉토리에 다다를 때까지 계속 찾는다.

예를 들어, 'home/ry/projects/foo.js'라는 파일에서 requre('bar.js')라고 호출하면 다음과 같은 순서로 모듈을 찾는다:

- /home/ry/projects/node_modules/bar.js
- /home/ry/node_modules/bar.js
- /home/node_modules/bar.js
- /node_modules/bar.js

그래서 해당 프로그램만의 의존성을 독립적으로 관리할 수 있다. 다른 프로그램에 영향을 끼치지 않는다.

이런 require에 여러파일에서 중복되면 계속해서 새로운 인스턴스를 생성하는지, 그게 아니라면 어떻게 동작되는지 확인해 봅시다.

# Node.js의 모듈 로딩 시스템

Node.js는 간단한 모듈 로딩 시스템을 갖고 있습니다. 

Node.js에서 파일과 모듈은 일대일로 대응하며 각 파일은 별도의 모듈로 처리됩니다. 

그렇기 때문에 여러곳에서 하나의 파일에 작성된 모듈을 필요로 할때 동일한 인스턴스를 사용할 수 있도록 합니다.

즉, 모듈을 require할 때마다 새로운 인스턴스가 생성되는 것이 아니라 캐싱된 객체 인스턴스를 재사용하는 것 입니다.

Node.js 공식 [Documentation](https://nodejs.org/api/globals.html#globals_require)에서 확인할 수 있듯이 한번 로딩(require)된 모듈은 **require.cache**라는 객체에 캐싱됩니다. key값으로 해당 모듈 파일의 경로를 갖게 되는데 key값이 삭제된다면 다음 require 요청시 다시 재로딩 하게됩니다. 다음 코드를 통해서 require.cache에 캐싱된 모듈을 확인해보겠습니다.

```javascript

// foo.js

module.exports = {
  foo: "bar"
};
```

```javascript
// index.js

var foo = require('./foo');

console.log('---------- require.cache ----------')
console.log(require.cache);

console.log('---------- require.cache keys ----------')
console.log(Object.keys(require.cache));

```
foo.js 와 index.js 파일을 통해 확인한 결과는 다음과 같습니다.

```javascript
---------- require.cache ----------
[Object: null prototype] {
  'C:\\Users\\user\\Desktop\\test\\git\\test\\index_test.js': Module {   
    id: '.',
    path: 'C:\\Users\\user\\Desktop\\test\\git\\test',
    exports: {},
    filename: 'C:\\Users\\user\\Desktop\\test\\git\\test\\index_test.js',
    loaded: false,
    children: [ [Module] ],
    paths: [
      'C:\\Users\\user\\Desktop\\test\\git\\test\\node_modules',
      'C:\\Users\\user\\Desktop\\test\\git\\node_modules',
      'C:\\Users\\user\\Desktop\\test\\node_modules',
      'C:\\Users\\user\\Desktop\\node_modules',
      'C:\\Users\\user\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  },
  'C:\\Users\\user\\Desktop\\test\\git\\test\\foo.js': Module {
    id: 'C:\\Users\\user\\Desktop\\test\\git\\test\\foo.js',
    path: 'C:\\Users\\user\\Desktop\\test\\git\\test',
    exports: { foo: 'bar' },
    filename: 'C:\\Users\\user\\Desktop\\test\\git\\test\\foo.js',
    loaded: true,
    children: [],
    paths: [
      'C:\\Users\\user\\Desktop\\test\\git\\test\\node_modules',
      'C:\\Users\\user\\Desktop\\test\\git\\node_modules',
      'C:\\Users\\user\\Desktop\\test\\node_modules',
      'C:\\Users\\user\\Desktop\\node_modules',
      'C:\\Users\\user\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  }
}
---------- require.cache keys ----------
[
  'C:\\Users\\user\\Desktop\\test\\git\\test\\index_test.js',
  'C:\\Users\\user\\Desktop\\test\\git\\test\\foo.js'
]
```
위의 결과에서 확인할 수 있듯이 require.cache 객체는 key값으로 해당 모듈 파일의 경로를 사용해 모듈을 캐싱하고 있습니다.

# require가 갖는 문제점

이제 require를 통해 모듈을 로딩할 경우 파일의 경로를 캐시 키로 사용하여 다른 여러 파일에서 동일한 파일을 필요로하는 경우 동일한 캐싱 된 모듈을 사용하는 것을 알게되었습니다.

이로인해 불필요한 메모리 사용을 피할 수 있습니다. 어찌보면 한번 로딩된 후 재사용되기 때문에 싱글 톤과 같이 동작한다고도 생각할 수 있습니다. 그러나 이러한 모듈의 캐싱 방식이 다음과 같이 제대로 동작하지 않는 경우가 있습니다.

- 파일 이름의 잘못된 대 / 소문자 사용
- 다른 모듈이 NPM에서 동일한 모듈을 설치할 때

# 대 / 소문자 구분
Windows 및 macOS는 기본적으로 파일 시스템에서 대 / 소문자를 구분하지 않습니다. 따라서 “foo.js” 라는 파일과 “FOO.js” 라는 파일을 검색 할 경우, 이 두 검색은 실제 파일 이름의 대소 문자와 상관없이 같은 폴더에서 동일한 파일을 찾습니다.

그러나 Node.js에서는 대/ 소문자를 구별하기 때문에 파일 이름을 두 개의 개별 모듈로 취급하므로 “foo.js”와 “FOO.js”가 같은 파일이라는 것을 알지 못합니다.

이 때문에 Windows와 macOS 모두에서 require 호출의 객체 캐시를 쉽게 파기 할 수 있습니다. 다음의 예시 코드에서 쉽게 확인할 수 있습니다.

```javascript
// foo.js

module.exports = {
  foo: "bar"
};
```
```javascript
// index.js

var foo = require('./foo');
var FOO = require('./FOO');

console.log('---------- require.cache keys ----------')
console.log(Object.keys(require.cache));

FOO.foo = 'different bar';

console.log('---- foo object ----');
console.log(JSON.stringify(foo, null, 2));

console.log('---- FOO object ----');
console.log(JSON.stringify(FOO, null, 2));

console.log('---- foo object ----');
console.log(JSON.stringify(foo, null, 2));
```
결과는 다음과 같습니다.

```javascript
---------- require.cache keys ----------
[
  'C:\\Users\\user\\Desktop\\test\\git\\test\\index_test.js',
  'C:\\Users\\user\\Desktop\\test\\git\\test\\foo.js',
  'C:\\Users\\user\\Desktop\\test\\git\\test\\FOO.js'
]
---- foo object ----
{
  "foo": "bar"
}
---- FOO object ----
{
  "foo": "different bar"
}
---- foo object ----
{
  "foo": "bar"
}

```
결과에서 확인 가능하듯이 require된 모듈은 key값으로 해당 모듈 파일의 경로를 사용해 캐싱되고 있습니다. require시 대 / 소문자를 구분해 key로 사용하기 때문에 2개의 객체가 생성되었으나, 결과적으로는 파일 시스템에 도달하면 같은 파일이 2번 반환된 것입니다. 즉, 같은 파일에 서로 다른 모듈로 2개가 생성되어 있는 것 입니다.

require 문에 파일 이름을 잘못 입력 한 것과 관련된 다른 문제도 있습니다. 대 / 소문자를 구분하는 파일 시스템에 배포하는 경우 실제 파일과 동일하게 처리되지 않은 버전은 파일을 찾지 못합니다.

# NPM 모듈 종속성
모듈 캐싱이 제대로 작동하지 않는 상황은 NPM에서 둘 이상의 **모듈 종속성이 같은 모듈을 설치**할 때 입니다. 즉, 프로젝트가 NPM의 “Foo”와 “Bar”에 의존하고 Foo와 Bar가 둘 다 “Baz”에 의존하면 NPM (버전 2 이하)은에 의존하는 각 모듈에 대해 “Baz”의 다른 사본을 설치합니다.

NPM 버전 3 에서는 종속성 목록을 병합하여 문제를 해결하고 있습니다. Foo와 Bar가 둘 다 동일한 Baz의 버전에 의존하면 하나의 사본만 설치합니다.

그러나, Foo와 Bar가 Baz의 서로 다른 (서로 호환되지 않는) 버전을 사용한다면, 여전히 두 버전을 모두 설치하며, 이 경우 모듈 캐시를 공유하지 않습니다.

# 마치며
반복되는 코드를 모듈화 하거나 각 기능 별로 모듈화 하게되면 결국 다른 파일에서 require를 통해 사용하게 되는데, 이때마다 어떤식으로 동작하게 되는지 궁금했었습니다. 이번 포스팅을 작성하면서 이에 대한 궁금증을 해결할 수 있었고, 결과적으로 한번 로딩된 모듈은 캐싱되어 사용되기 때문에 각기 파일마다 require를 많이 한다고해서 크게 걱정할 필요는 없을 것 같습니다.

또한, 필요에 의해 (필요한 상황이 있을지 모르겠지만?) require.cache에 고의적으로 캐싱된 모듈을 지우고 다시 새로 로딩하여 사용할 수도 있을것 같습니다.