## util.promisify
콜백 스타일 함수를 프로미스 스타일 함수로 바꾸는 함수

아래는 hello.txt와 test.js 파일이 있다.
fs는 비동기 콜백 함수인지라 아래와 같이 사용한다.

```javascript
const fs = require('fs');

function execute(){
  fs.readFile('./hello.txt', 'utf-8', (err, result) => {
    console.log(result);
    console.log('종료');
    // 추가 처리가 필요하거나 추가적인 콜백이 있으면 더 깊어진다.
  });
}

execute()

```

콜백함수를 피하기 위해 프로미스를 사용한다.

```javascript
const fs = require('fs');

const getDataFromFile = function(filePath) {
  return new Promise((resolve, reject)=>{
    fs.readFile(filePath, 'utf-8', (err, result) => {
      if(result === undefined){
        reject(err);
      }else{
        resolve(result);
      }
    });
  }); 
}; 


async function execute(){
  const data = await getDataFromFile('./hello.txt')
  console.log(data);
  console.log('종료');
}

execute()
```

util의 promisify 사용시 아래와 같이 된다.

```javascript
const util = require('util');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

async function execute(){
  const data = await readFile('./hello.txt', 'utf-8')
  console.log(data);
  console.log('종료');
}

execute()
```

>  주의: 특정 형태의 함수에 대해서만 promisify 사용 가능하다.
```javascript
const Fun = function(arg..., callback) {
    ~~~
};
```

## fs.readFile, fs.readFileSync 
파일을 읽는 node js 내장 모듈이다.
sync는 동기 일단은 비동기이다

```javascript
const fs = require('fs');
fs.readFile('./hello.txt', 'utf-8', (err, result) => {
    console.log(result);
});
const result = fs.readFileSync('./hello.txt', 'utf-8');
console.log(result);
```

## child_process.exec, child_process.execSync
노드에서 cmd 명령어를 실행하는 모듈
```javascript
// 비동기 방식
const exec = require('child_process').exec

exec('cd ../ & git branch',(error, stdout, stderr)=> {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
})

// 동기 방식
const execSync = require('child_process').execSync

const result = execSync('cd ../ & git branch')
console.log(result.toJSON())
console.log(result.toString())
```

## 동기와 비동기 처리

### 여러번 동작하는 이벤트는 비동기가 무조건 동기 보다 빠르다?

아래의 함수는 동일 기능에 대해 비동기, 동기로 처리하는 fs 함수들이다
모든 처리에 대해 시간을 걸어 보겠다.

```javascript
const fs = require('fs');
const start = new Date()
fs.readFile('./hello.txt', 'utf-8', (err, result) => {
    console.log(result);
    console.log('readFile time: ' + (new Date() - start));
});
const result = fs.readFileSync('./hello.txt', 'utf-8');
console.log(result);
console.log('readFileSync time: ' + (new Date() - start));
```

시간을 걸어보면 당연히 sync가 되고 비동기는 다음 이벤트 루프에 따라 실행되는 것을 확인 할 수 있다.

만약 동기를 적은 횟수로 여러면 호출하면 어떻게 될까?

```javascript
// 동기
const fs = require('fs');

const start = new Date()
function excute() {
  for (let i = 0; i < 5; i++) {
    const result = fs.readFileSync('./hello.txt', 'utf-8');
    console.log(result);
    console.log('readFileSync time: ' + (new Date() - start));
  }
  console.log('readFileSync final time: ' + (new Date() - start));
}

excute()
```

```javascript
// 비동기
const {promisify} = require('util');
const readFile = promisify(require('fs').readFile);

const start = new Date()

async function excute() {
    for (let i = 0; i < 5; i++) {
        const result = await readFile('./hello.txt', 'utf-8');
        console.log(result);
        console.log('readFile time: ' + (new Date() - start));
    }
    console.log('readFile final time: ' + (new Date() - start));
}
excute()
```

이 경우 for에 의해 여러번 처리하더라도 동기가 빠름을 확인 할 수 있다.

아무래도 이벤트 루프를 타기 때문에 비동기 처리는 기다리기에 조금 늦는 거 같다.

이 상태에서 횟수를 크게 늘려본다.

```javascript
// 동기
const fs = require('fs');

const start = new Date()
function excute() {
  for (let i = 0; i < 100; i++) {
    const result = fs.readFileSync('./hello.txt', 'utf-8');
  }
  console.log('readFileSync final time: ' + (new Date() - start));
}

excute()
```

```javascript
// 비동기
const {promisify} = require('util');
const readFile = promisify(require('fs').readFile);

const start = new Date()

async function excute() {
    for (let i = 0; i < 100; i++) {
        const result = await readFile('./hello.txt', 'utf-8');
        console.log(result);
        console.log('readFile time: ' + (new Date() - start));
    }
    console.log('readFile final time: ' + (new Date() - start));
}
excute()
```

횟수를 크게 늘리더라도 조금이라도 동기가 빠르거나 비슷하게 실행됨을 알 수 있다.

### 그럼 비동기가 동기보다 무조건 느리나?

또 다른 테스트를 해보겠다.

아래는 비동기로된 exec 함수이다.

```javascript
const exec = require('child_process').exec
const start = new Date()
async function execute(){
  exec('cd ../ & git branch -a',(error, stdout, stderr)=> {
    console.log('exec final time: ' + (new Date() - start));
  })
}

execute()
```

아래는 동기로된 exec 함수이다.

```javascript
const execSync = require('child_process').execSync
const start = new Date()
async function execute(){
  execSync('cd ../ & git branch -a')
  console.log('exec final time: ' + (new Date() - start));
}

execute()
```

한번씩 호출할때는 아까와 동일하게 동기가 더욱 빠름을 알 수 있다.

그럼 이걸 for을 통해 여러번 호출해 본다.

```javascript
// 동기
const execSync = require('child_process').execSync
const start = new Date()
async function execute(){
  for (let i = 0; i < 5; i++) {
    execSync('cd ../ & git branch -a')
  }
  console.log('exec final time: ' + (new Date() - start));
}

execute()
```

```javascript
// 비동기
const {promisify} = require('util');
const exec = promisify(require('child_process').exec)
const start = new Date()
const ary = []
async function execute(){
    for (let i = 0; i < 5; i++) {
        ary.push(i)
    }
    
    await Promise.all(ary.map(()=> {
        return exec('cd ../ & git branch -a')
    }))
    console.log('exec final time: ' + (new Date() - start));
}

execute()
```

이때는 비동기가 동기에 비해 훨씬 빠름을 알 수 있다.

즉 한번 호출할 떄는 동기가 이벤트 루프를 안타고 바로 호출기에 더욱 빠르다는 것을 알 수 있고 여러번 동일 이벤트를 호출할 때에는 빠른 시간에 처리되는 작업의 경우 동기가 빠를 수 있다는 것을 알 수 있고 병렬처리가 가능하고 처리시간이 오래 걸리는 경우는 비동기가 빠르다는 것을 알 수 있었다. 