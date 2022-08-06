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