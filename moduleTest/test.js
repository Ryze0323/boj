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