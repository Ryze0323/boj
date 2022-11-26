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